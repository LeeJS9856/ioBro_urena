import { StyleSheet } from 'react-native';
import { TextNotoSans } from '../../utils/CustomText';

const VDFTestStyles = StyleSheet.create({
    titleContainer: {
        backgroundColor: '#714DF5',
        width: '100%',
        paddingVertical: 25,
        alignItems: 'center',
    },
    titleText : {
        color : 'white',
        fontSize: 20,
        fontWeight: 700,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 30,
    },
    progressBarContainer : {
        marginBottom: 25,
        gap: 16,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    ProgressText: {
        fontWeight: 700,
        fontSize: 14,
    },
});

export default VDFTestStyles;
