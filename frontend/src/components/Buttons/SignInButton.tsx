import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface SignInButtonProps {
  value: string;
  onPress: ()=> void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ value, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginBottom: 16,
        width: '100%',
        maxWidth: 300,
    },
    buttonText: {
        height: 43,
        borderRadius: 16,
        backgroundColor: '#714DF5',
        fontFamily: 'NotoSansKR-Medium',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 14,
        color: '#ffffff',
    },
});

export default SignInButton;