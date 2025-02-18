import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextGmarketSans } from '../../utils/CustomText';
import { ActivityIndicator } from 'react-native-paper';
import Markdown from 'react-native-markdown-display';

interface AnswerBalloonProps {
  text: string;
  loading: boolean;
}

const AnswerBalloon: React.FC<AnswerBalloonProps> = ({ text, loading }) => {
  return (
    <View style={styles.AnswerContainer}>
        <View style={styles.Icon}>
            <TextGmarketSans style={styles.IconText}>U</TextGmarketSans>
        </View>
        <View style={styles.AnswerBallon}>
            {loading ? (
            <ActivityIndicator
                animating={true}
                size="small"
                color="#714DF5" />
            ) : (
            <Markdown style={markdownStyles}>{text}</Markdown>
            )}
        </View>
    </View>
  );
};

const markdownStyles = StyleSheet.create({
    body: {
        fontSize: 14,
        color: '#000000',
        fontFamily: 'NotoSansKR-Medium',
        fontWeight: '700',
        paddingHorizontal: 13,
    },
});

const styles = StyleSheet.create({
    AnswerContainer: {
        width: '100%',
        flexDirection: 'row',
        marginVertical: 15,
    },
    AnswerBallon: {
        flex: 1,
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
