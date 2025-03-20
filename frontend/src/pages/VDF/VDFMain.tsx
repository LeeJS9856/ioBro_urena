import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../styles/Styles';
import VDFMainStyles from './VDFMainStyles';
import Logo from '../../components/Logo';
import TestButton from '../../components/Buttons/SignInButton';

const VDFMain: React.FC = () => {
    const navigation = useNavigation();
    const handleTest = () => {
        navigation.navigate('VDFTest' as never);
    };
    const handleLast = () => {
        navigation.navigate('Main' as never);
    };

    return (
    <SafeAreaView style={Styles.background}>
      <View style={Styles.startContainer}>
        <View style={VDFMainStyles.logo}>
          <Logo size={24}/>
        </View>
        <View>
            <Text style={[VDFMainStyles.VDFScripts, VDFMainStyles.scriptsSpace]}>
                유레나에 오신 것을 환영합니다!
            </Text>
            <Text style={VDFMainStyles.VDFScripts}>
                본 테스트에서 원활한 서비스 진행을 위해
            </Text>
            <Text style={VDFMainStyles.VDFScripts}>
                목표 의식, 방향성, 실행력을 검사하고
            </Text>
            <Text style={[VDFMainStyles.VDFScripts, VDFMainStyles.scriptsSpace]}>
                15가지 유형을 제시합니다.
            </Text>
            <Text style={VDFMainStyles.VDFScripts}>
                자신의 유형과 성향을 파악하고 URENA AI가
            </Text>
            <Text style={[VDFMainStyles.VDFScripts, VDFMainStyles.scriptsEnd]}>
                적합한 솔루션을 제시할 수 있도록 도움을 줍니다.
            </Text>
        </View>
        <View style={VDFMainStyles.buttonContainer}>
            <TestButton
                value="VDF 검사하러 가기"
                onPress={handleTest} />
        </View>
        <View>
            <Text 
                style={VDFMainStyles.later}
                onPress={handleLast}>
                나중에 하기
            </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VDFMain;
