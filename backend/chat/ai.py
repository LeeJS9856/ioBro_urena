from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
from django.conf import settings
from .models import UserQuestion

class VDFAdvisor:
    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0.7,
            openai_api_key=settings.OPENAI_API_KEY
        )
        self.embeddings = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
        self.vectorstore = Chroma(embedding_function=self.embeddings)

        # 대화 기억을 위한 메모리 추가
        self.memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )
        
        # 초기 VDF 지식 로드
        self._initialize_vdf_knowledge()
    
    def _initialize_vdf_knowledge(self):
        """VDF 관련 기본 지식 초기화"""
        vdf_knowledge = [
            {
                "vdf": "v2",
                "content": """
                강한 비전 성향(V2)의 특징:
                - 큰 목표를 중요시함
                - 장기적인 계획을 선호
                - 의미 있는 학습을 추구
                
                효과적인 학습 방법:
                1. 전체 그림 먼저 파악
                2. 목표와 연계된 학습 계획
                3. 개념 중심의 학습
                """
            },
            {
                "vdf": "d2",
                "content": """
                강한 방향성 성향(D2)의 특징:
                - 체계적인 접근 선호
                - 단계별 학습 중시
                - 명확한 방법론 필요
                
                효과적인 학습 방법:
                1. 상세한 로드맵 작성
                2. 체크리스트 활용
                3. 순차적 학습 진행
                """
            },
            # 다른 VDF 유형들 추가...
        ]
        
        # 기존 데이터 삭제 후 새로 추가
        self.vectorstore.delete_collection()
        self.vectorstore = Chroma(embedding_function=self.embeddings)
        
        for knowledge in vdf_knowledge:
            self.vectorstore.add_texts(
                texts=[knowledge["content"]],
                metadatas=[{"vdf": knowledge["vdf"]}]
            )
    
    def get_relevant_vdf_knowledge(self, vdf_type, question):
        """관련 VDF 지식 검색"""
        search_query = f"{vdf_type} {question}"
        relevant_docs = self.vectorstore.similarity_search(
            search_query,
            k=2  # 상위 2개 문서 검색
        )
        return "\n".join(doc.page_content for doc in relevant_docs)
    
    def create_prompt(self, vdf_type, question, relevant_knowledge):
        """프롬프트 생성"""
        return ChatPromptTemplate.from_messages([
            ("system", """
            당신은 VDF(Vision, Direction, Force) 기반의 학습 컨설턴트입니다.
            다음 VDF 관련 지식을 참고하여 학습자에게 맞춤형 조언을 제공해주세요
            이때 학습자의 vdf 유형은 {vdf_type}입니다.:
            
             참고할 VDF 지식:
            {relevant_knowledge}
             
             이전 대화 기록:
            {chat_history}
            
            답변 작성 기준:
            1. VDF 특성을 충분히 반영
            2. 구체적이고 실천 가능한 조언
            3. 단계별 실행 계획 포함
            4. 동기부여 요소 포함
            """),
            ("human", "{question}")
        ])
    
    def generate_response(self, vdf_type, question):
        """최종 응답 생성"""
        # 1. 관련 VDF 지식 검색
        relevant_knowledge = self.get_relevant_vdf_knowledge(vdf_type, question)

        # 2. 이전 대화 기록 가져오기
        chat_history = self.memory.load_memory_variables({})
        
        # 3. 프롬프트 생성
        prompt = self.create_prompt(vdf_type, question, relevant_knowledge)
        
        # 4. 체인 구성 및 실행
        chain = prompt | self.llm
        response = chain.invoke({
            "vdf_type": vdf_type,
            "relevant_knowledge": relevant_knowledge,
            "question": question,
            "chat_history": chat_history.get("chat_history", [])
        })

        # 5. 대화 저장
        self.memory.save_context(
            {"input": question},
            {"output": response.content}
        )
        
        return response.content
    
# VDFAdvisor 인스턴스를 전역으로 유지
_advisor_instances = {}
# 메인 함수
def ai_chat(question, vdf, session_id):
    if session_id not in _advisor_instances:
        _advisor_instances[session_id] = VDFAdvisor()
    
    advisor = _advisor_instances[session_id]
    response = advisor.generate_response(vdf, question)
    
    return response