import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TestButtonProps {
  value: string;
  backgroundColor: string;
  fontColor: string;
  onPress: ()=> void;
}

const TestButton: React.FC<TestButtonProps> = ({ value, backgroundColor, fontColor, onPress }) => {
  return (
    <TouchableOpacity
        onPress={onPress}>
        <Text style={[styles.buttonText, { backgroundColor: backgroundColor, color: fontColor }]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginBottom: 16,
        maxWidth: 300,
    },
    buttonText: {
        paddingVertical:5,
        paddingHorizontal: 50,
        borderRadius: 20,
        fontFamily: 'NotoSansKR-Medium',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default TestButton;