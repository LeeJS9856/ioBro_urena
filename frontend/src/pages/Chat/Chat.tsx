import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TopNavigation from '../../components/Navigation/TopNavigation';
import QuestionBalloon from '../../components/Balloons/QuestionBalloon';
import AnswerBalloon from '../../components/Balloons/AnswerBalloon';
import ChatInput from '../../components/Inputs/ChatInput';
import Styles from '../../styles/Styles';

interface QnA {
  Q?: string;
  A?: string;
}

const Chat: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [sampleQnA, setSampleQnA] = useState([{}]);
  const navigation = useNavigation();

  const handleQuestion = () => {
    setSampleQnA(prevQnA => [...prevQnA, {Q: question}]);
    setSampleQnA(prevQnA => [...prevQnA, {A: '답변입니다.'}]);
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
