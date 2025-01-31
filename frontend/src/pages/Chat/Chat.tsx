import React, { useState } from 'react';
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
}

const Chat: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [sampleQnA, setSampleQnA] = useState([{}]);
  const navigation = useNavigation();

  const handleQuestion = async () => {
    console.log(question);
    const response = await apiClient.post('/api/chat/', {
      vdf: 'v2',
      question : question,
    });
    console.log(response.data);
    const { answer } = response.data;
      setSampleQnA(prevQnA => [...prevQnA, {Q: question}]);
      setSampleQnA(prevQnA => [...prevQnA, {A: answer}]);
      setQuestion('');
    };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
  } else {
      navigation.navigate('Main' as never);
  }
  };


  return (
    <SafeAreaView style={Styles.background}>
      <TopNavigation styleType={2} onBackPress={handleGoBack}/>
      <ScrollView>
        <View style={Styles.startContainer}>
          {sampleQnA.map((item: QnA, index)=> {
            if(item.Q) {
              return <QuestionBalloon key={index} text={item.Q}/>;
            }
            else if(item.A) {
              return <AnswerBalloon key={index} text={item.A}/>;
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
