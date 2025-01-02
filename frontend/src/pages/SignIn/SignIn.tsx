import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../components/Logo';
import SignInInput from '../../components/Inputs/SignInInput';
import SignInButton from '../../components/Buttons/SignInButton';
import SignInStyles from './SignInStyles';
import Styles from '../../styles/Styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const tempIdPw = ['admin', 'admin']; // 임시 아이디와 비밀번호

  const handleSignIn = () => {
    if (id === tempIdPw[0] && password === tempIdPw[1]) {
      navigation.navigate('Main' as never);
    }
  };

  return (
    <SafeAreaView style={Styles.background}>
      <View style={Styles.centerContainer}>
        <View style={SignInStyles.logo}>
          <Logo size={24}/>
        </View>
        <SignInInput
          placeholder="아이디"
          value={id}
          onChangeText={setId} />
        <SignInInput
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          isPassword={true} />
        <SignInButton
          value="로그인"
          onPress={handleSignIn} />
        <Text style={SignInStyles.signUp}>회원가입</Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
