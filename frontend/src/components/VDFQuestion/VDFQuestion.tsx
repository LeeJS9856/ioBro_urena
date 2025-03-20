import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuestionProps {
    question: string;
    onSelect: (option: number) => void;
    selectedAnswer?: number;
}

const VDFQuestion: React.FC<QuestionProps> = ({question, onSelect, selectedAnswer}) => {
    const options = [1, 2, 3, 4, 5];

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>
                {question}
            </Text>
            <View style={styles.optionsWrapper}>
                {options.map((option) => (
                    <View key={option} style={styles.optionContainer}>
                        {/* 1과 5에만 라벨 추가 */}
                        {option === 1 && <Text style={styles.label}>전혀 아니다</Text>}
                        {option === 5 && <Text style={styles.label}>매우 그렇다</Text>}

                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                selectedAnswer === option && styles.selectedOption,
                            ]}
                            onPress={() => onSelect(option)}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    selectedAnswer === option && styles.selectedOptionText,
                                ]}
                            >
                                {option}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        width: '100%',
    },
    questionText: {
        fontSize: 16,
        marginBottom: 40,
        fontWeight: 700,
    },
    optionsWrapper: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    optionContainer: {
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        fontWeight: 700,
        color: '#464A4D',
        position: 'absolute',
        textAlign: 'center',
        top: -25,
    },
    optionButton: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#E6EEF2',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 13,
    },
    selectedOption: {
        backgroundColor: '#714DF5', // 선택된 버튼 색 변경
    },
    optionText: {
        fontSize: 16,
        color: '#464A4D',
        fontWeight: 700,
    },
    selectedOptionText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    nextButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#E6EEF2', // 비활성화 상태
        borderRadius: 5,
    },
    activeNextButton: {
        backgroundColor: '#714DF5', // 활성화 상태
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default VDFQuestion;
