import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopNavigation from '../../components/Navigation/TopNavigation';
import QuestionBalloon from '../../components/Balloons/QuestionBalloon';
import AnswerBalloon from '../../components/Balloons/AnswerBalloon';
import ChatInput from '../../components/Inputs/ChatInput';
import Styles from '../../styles/Styles';
import apiClient from '../../services/apiClient';
interface QnA {
  Q?: string;
  A?: string;
  loading?: boolean;
}

const Chat: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [sampleQnA, setSampleQnA] = useState<QnA[]>([]);
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [displayText, setDisplayText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  const handleQuestion = async () => {
    setSampleQnA(prevQnA => [...prevQnA, { Q: question }, { loading: true }]);
    setQuestion('');
    try {
      const response = await apiClient.post('/api/chat/', {
        vdf: 'v2',
        question: question,
      });
      const { answer } = response.data;
      setSampleQnA(prevQnA => {
        const updatedQnA = [...prevQnA];
        updatedQnA[updatedQnA.length - 1] = { A: answer, loading: false };
        return updatedQnA;
      });
    } catch (error) {
      console.error('API 요청 실패:', error);
      setSampleQnA(prevQnA => {
        const updatedQnA = [...prevQnA];
        updatedQnA[updatedQnA.length - 1] = { A: '답변을 가져오지 못했습니다.', loading: false };
        return updatedQnA;
      });
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [sampleQnA]);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
  } else {
      navigation.navigate('Main' as never);
  }
  };

  useEffect(() => {
    if (sampleQnA.length === 0) {
      return;
    }
    const lastItem = sampleQnA[sampleQnA.length - 1];
    if (lastItem.A) {
      setDisplayText('');
      setTypingIndex(0);
    }
  }, [sampleQnA]);

  useEffect(() => {
    if (sampleQnA.length === 0) {
      return;
    }
    const lastItem = sampleQnA[sampleQnA.length - 1];
    if (lastItem.A && typingIndex < lastItem.A.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + lastItem.A![typingIndex]);
        setTypingIndex(prev => prev + 1);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, sampleQnA]);


  return (
    <SafeAreaView style={Styles.background}>
      <TopNavigation styleType={2} onBackPress={handleGoBack}/>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
        <View style={Styles.startContainer}>
          {sampleQnA.map((item: QnA, index)=> {
            if(item.Q) {
              return <QuestionBalloon key={index} text={item.Q}/>;
            }
            else if (item.A || item.loading) {
              return <AnswerBalloon key={index} text={index === sampleQnA.length - 1 ? displayText : item.A || ''} loading={item.loading || false} />;
            }
          })}
        </View>
      </ScrollView>
      <ChatInput
        value={question}
        onChangeText={setQuestion}
        onPress={handleQuestion} />
    </SafeAreaView>
  );
};

export default Chat;
