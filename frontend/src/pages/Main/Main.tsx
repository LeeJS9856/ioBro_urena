import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import TopNavigation from '../../components/Navigation/TopNavigation';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import Styles from '../../styles/Styles';

const Main: React.FC = () => {
  return (
    <SafeAreaView style={Styles.background}>
      <TopNavigation styleType={1}/>
      <View style={Styles.container}>
        <Text>메인 화면</Text>
      </View>
      <BottomNavigation/>
    </SafeAreaView>
  );
};

export default Main;
