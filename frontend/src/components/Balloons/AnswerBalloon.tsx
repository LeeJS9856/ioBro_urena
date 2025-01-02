import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TextGmarketSans } from '../../utils/CustomText';

interface AnswerBalloonProps {
  text: string;
}

const AnswerBalloon: React.FC<AnswerBalloonProps> = ({ text }) => {
  return (
    <View style={styles.AnswerContainer}>
        <View style={styles.Icon}>
            <TextGmarketSans style={styles.IconText}>U</TextGmarketSans>
        </View>
        <View style={styles.AnswerBallon}>
            <Text style={styles.AnswerText}>{ text }</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    AnswerContainer: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 15,
    },
    AnswerBallon: {
        flex: 1,
    },
    AnswerText: {
        width: 'auto',
        fontFamily: 'NotoSansKR-Medium',
        fontWeight: '700',
        fontSize: 14,
        color: '#000000',
        padding: 13,
    },
    Icon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#714DF5',
        marginTop: 6.5,
    },
    IconText: {
        textAlign: 'center',
        lineHeight: 16,
        color: '#714DF5',
        fontSize: 16,
    },
});

export default AnswerBalloon;
