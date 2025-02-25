import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextGmarketSans } from '../../utils/CustomText';
import { ActivityIndicator } from 'react-native-paper';
import Markdown from 'react-native-markdown-display';
import Icon from 'react-native-vector-icons/Feather';

interface AnswerBalloonProps {
  text: string;
  loading: boolean;
}

const AnswerBalloon: React.FC<AnswerBalloonProps> = ({ text, loading }) => {
    const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
    const handleFeedback = (type: string) => {
        setSelectedFeedback((prev) => (prev === type ? null : type));
    };
    return (
        <View style={styles.AnswerContainer}>
            <View style={styles.urenaIcon}>
                <TextGmarketSans style={styles.IconText}>U</TextGmarketSans>
            </View>
            <View style={styles.AnswerBallon}>
                {loading ? (
                <ActivityIndicator
                    animating={true}
                    size="small"
                    color="#714DF5" />
                ) : (
                <>
                    <Markdown style={markdownStyles}>{text}</Markdown>
                    <View style={styles.feedback}>
                        {selectedFeedback === null && (
                            <>
                            <TouchableOpacity>
                                <Icon name="copy" size={20}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleFeedback('thumbs-up')}>
                                <Icon name="thumbs-up" size={20}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleFeedback('thumbs-down')}>
                                <Icon name="thumbs-down" size={20}/>
                            </TouchableOpacity>
                            </>
                        )}
                        {selectedFeedback !== null && (
                            <>
                                <TouchableOpacity>
                                    <Icon name="copy" size={20}/>
                                </TouchableOpacity>
                                <Icon
                                    name={selectedFeedback}
                                    size={20}
                                    />
                            </>
                        )}
                    </View>
                </>
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
    urenaIcon: {
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
    feedback: {
        flexDirection: 'row',
        marginTop: 8,
        paddingHorizontal: 13,
        gap: 19,
    },
    Icon: {
        color: '#464A4D',
    },
});

export default AnswerBalloon;
