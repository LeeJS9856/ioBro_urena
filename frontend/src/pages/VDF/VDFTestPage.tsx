import React, { useRef } from 'react';
import { View, ScrollView } from 'react-native';
import Question from '../../components/VDFQuestion/VDFQuestion';
import { Question as QuestionType } from '../../utils/VDFQuestion';
import TestButton from '../../components/Buttons/TestButton';
import VDFTestStyles from './VDFTestStyles';

interface VDFTestPageProps {
    questions: QuestionType[];
    answers: Record<number, number>;
    onAnswer: (questionId: number, answer: number) => void;
    onNext: () => void;
    onPrev: () => void;
    isLastPage: boolean;
}

const VDFTestPage: React.FC<VDFTestPageProps> = ({
    questions,
    answers,
    onAnswer,
    onNext,
    onPrev,
    isLastPage
}) => {
    const scrollViewRef = useRef<ScrollView>(null);

    const handleNext = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        onNext();
    };

    return (
        <ScrollView ref={scrollViewRef}>
            {questions.map((question) => (
                <Question
                    key={question.id}
                    question={question.text}
                    onSelect={(option) => onAnswer(question.id, option)}
                    selectedAnswer={answers[question.id]}
                />
            ))}
            <View style={VDFTestStyles.buttonContainer}>
                <TestButton 
                    value="이전"
                    onPress={onPrev}
                    backgroundColor='#E6EEF2'
                    fontColor='#464A4D'/>
                <TestButton 
                    value={isLastPage ? "제출" : "다음"} 
                    onPress={handleNext}
                    backgroundColor='#713DF5'
                    fontColor='white'
                />
            </View>
        </ScrollView>
    );
};

export default VDFTestPage;