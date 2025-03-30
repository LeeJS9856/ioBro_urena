import React, { useState, useCallback } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Styles from '../../styles/Styles';
import VDFTestStyles from './VDFTestStyles';
import { questions } from '../../utils/VDFQuestion';
import VDFTestPage from './VDFTestPage';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from 'react-native-progress-step-bar';

const QUESTIONS_PER_PAGE = 10;

const VDFTest: React.FC = () => {
    const navigation = useNavigation();
    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [currentStep, setCurrentStep] = useState(0);

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

    const handleNextStep = useCallback(() => {
        setCurrentStep((prevStep) => prevStep + 1);
    }, []);

    const handleAnswer = (questionId: number, answer: number) => {
        setAnswers(prev => {
            const isNewAnswer = !(questionId in prev);
            if (isNewAnswer) {
                handleNextStep();
            }
            return {
                ...prev,
                [questionId]: answer
            };
        });
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
            <View style={VDFTestStyles.progressBarContainer}>
                <Text style={VDFTestStyles.ProgressText}>
                    {currentStep}/63
                </Text>
                <ProgressBar
                steps={63}
                width={300}
                height={10}
                currentStep={currentStep}
                filledBarStyle={{ borderRadius: 10, backgroundColor: '#713DF5' }}
                backgroundBarStyle={{ borderRadius: 10, backgroundColor: '#E6EEF2' }}
                filledBarContainerStyle={{ borderRadius: 10 }}
                stepToStepAnimationDuration={300}
                withDots={false}
            />
            </View>
        </SafeAreaView>
    );
};

export default VDFTest;
