import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface ChatInputProps {
  placeholder: string;
  value: string;
  isPassword?: boolean;
  onChangeText: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ placeholder, value, onChangeText, isPassword = false }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#464A4D"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        textAlign = "center"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
    width: '100%',
    maxWidth: 300,
  },
  input: {
    height: 43,
    borderRadius: 16,
    backgroundColor: '#E7EEF1',
    fontFamily: 'NotoSansKR-Light',
    fontWeight: '400',
    fontSize: 14,
    paddingVertical: 0,
    paddingHorizontal: 10,
    lineHeight: 19.6,
    color: '#000000',
  },
});

export default ChatInput;