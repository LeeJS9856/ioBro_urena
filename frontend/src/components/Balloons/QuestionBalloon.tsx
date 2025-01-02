import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface QuestionBalloonProps {
  text: string;
}

const QuestionBalloon: React.FC<QuestionBalloonProps> = ({ text }) => {
  return (
    <View style={styles.QuestionContainer}>
        <View style={styles.QuestionBallon}>
            <Text style={styles.QuestionText}>{ text }</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    QuestionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    QuestionBallon: {
        maxWidth: '70%',
        borderRadius: 16,
        backgroundColor: '#E6EEF2',
    },
    QuestionText: {
        width: 'auto',
        fontFamily: 'NotoSansKR-Medium',
        fontWeight: '700',
        fontSize: 14,
        color: '#000000',
        padding: 13,
    },
});

export default QuestionBalloon;
