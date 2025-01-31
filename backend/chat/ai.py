from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.schema import HumanMessage, AIMessage
from django.conf import settings

class VDFAdvisor:
    def __init__(self):
        self.llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0.7,
            openai_api_key=settings.OPENAI_API_KEY
        )

        # 대화 기억을 위한 메모리 추가
        self.memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )
        
        # VDF 지식을 딕셔너리로 저장
        self.vdf_knowledge = {
            "v2": """
            강한 비전 성향(V2)의 특징:
            - 큰 목표를 중요시함
            - 장기적인 계획을 선호
            - 의미 있는 학습을 추구
            
            효과적인 학습 방법:
            1. 전체 그림 먼저 파악
            2. 목표와 연계된 학습 계획
            3. 개념 중심의 학습
            """,
            "d2": """
            강한 방향성 성향(D2)의 특징:
            - 체계적인 접근 선호
            - 단계별 학습 중시
            - 명확한 방법론 필요
            
            효과적인 학습 방법:
            1. 상세한 로드맵 작성
            2. 체크리스트 활용
            3. 순차적 학습 진행
            """
        }
    
    def get_vdf_knowledge(self, vdf_type):
        """해당 VDF 유형의 기본 지식 반환"""
        return self.vdf_knowledge.get(vdf_type, "해당 VDF 유형에 대한 정보가 없습니다.")
    
    def create_prompt(self, vdf_type, question, chat_history):
        """프롬프트 생성"""
        messages = [
            ("system", f"""
            당신은 VDF(Vision, Direction, Force) 기반의 학습 컨설턴트입니다.
            학습자의 VDF 유형은 {vdf_type}입니다.
            
            🔹 참고할 VDF 지식:
            {self.get_vdf_knowledge(vdf_type)}
            """)
        ]

        # 🔹 이전 대화 기록을 ChatPromptTemplate 형식에 맞게 추가
        for chat in chat_history:
            if isinstance(chat, HumanMessage):
                messages.append(("human", chat.content))  # `content` 속성 사용
            elif isinstance(chat, AIMessage):
                messages.append(("assistant", chat.content))

        # 현재 질문 추가
        messages.append(("human", "{question}"))  # 변수를 명확히 지정

        return ChatPromptTemplate.from_messages(messages)

    
    def generate_response(self, vdf_type, question):
        """최종 응답 생성"""
        # 1. 이전 대화 기록 가져오기
        chat_history = self.memory.load_memory_variables({}).get("chat_history", [])

        # 2. 프롬프트 생성
        prompt = self.create_prompt(vdf_type, question, chat_history)
        
        # 3. 체인 구성 및 실행
        chain = prompt | self.llm
        response = chain.invoke({
            "question": question  # 올바른 변수만 전달
        })

        # 4. 대화 저장
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
