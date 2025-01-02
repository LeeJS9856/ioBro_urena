import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onPress: ()=>void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChangeText, onPress }) => {
  return (
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder='Message'
            value={value}
            onChangeText={onChangeText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={onPress}>
            <Icon name='arrow-up' size={20} style={styles.sendIcon}/>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E7EEF1',
    fontFamily: 'NotoSansKR-Light',
    fontWeight: '400',
    fontSize: 14,
    paddingVertical: 0,
    paddingHorizontal: 10,
    lineHeight: 20,
    marginRight: 10,
    color: '#000000',
  },
  sendButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#714DF5',
    color: '#ffffff',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    color: '#ffffff',
    fontWeight: '900',
  },
});

export default ChatInput;
