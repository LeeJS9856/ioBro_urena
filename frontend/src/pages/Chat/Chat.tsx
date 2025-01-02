import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import TopNavigation from '../../components/Navigation/TopNavigation';
import Styles from '../../styles/Styles';

const Chat: React.FC = () => {
  return (
    <SafeAreaView style={Styles.background}>
      <TopNavigation styleType={2}/>
      <View style={Styles.container}>
        <Text>채팅</Text>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
