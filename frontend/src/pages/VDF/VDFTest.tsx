import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Styles from '../../styles/Styles';
import VDFTestStyles from './VDFTestStyles';
import { questions } from '../../utils/VDFQuestion';
import VDFTestPage from './VDFTestPage';
import { useNavigation } from '@react-navigation/native';

const QUESTIONS_PER_PAGE = 10;

const VDFTest: React.FC = () => {
    const navigation = useNavigation();
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});

    const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
        else {
            navigation.goBack();
        }
    };

    const handleAnswer = (questionId: number, answer: number) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const startIndex = currentPage * QUESTIONS_PER_PAGE;
    const endIndex = Math.min(startIndex + QUESTIONS_PER_PAGE, questions.length);
    const currentQuestions = questions.slice(startIndex, endIndex);

    return (
        <SafeAreaView style={Styles.background}>
            <View style={VDFTestStyles.titleContainer}>
                <Text style={VDFTestStyles.titleText}>
                    VDF 테스트
                </Text>
            </View>
            <View style={Styles.startContainer}>
                <VDFTestPage
                    questions={currentQuestions}
                    answers={answers}
                    onAnswer={handleAnswer}
                    onNext={handleNextPage}
                    onPrev={handlePrevPage}
                    isLastPage={currentPage === totalPages - 1}
                />
            </View>
        </SafeAreaView>
    );
};

export default VDFTest;
