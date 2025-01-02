import React from 'react';
import { SafeAreaView, View } from 'react-native';
import TopNavigation from '../../components/Navigation/TopNavigation';
import QuestionBalloon from '../../components/Balloons/QuestionBalloon';
import Styles from '../../styles/Styles';

const Chat: React.FC = () => {
  return (
    <SafeAreaView style={Styles.background}>
      <TopNavigation styleType={2}/>
      <View style={Styles.startContainer}>
        <QuestionBalloon text={"질문입니다."}/>
        <QuestionBalloon text={"동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세"}/>
        <QuestionBalloon text={"질문입니다."}/>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
