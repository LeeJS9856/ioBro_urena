import { StyleSheet, Platform } from 'react-native';

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
        paddingBottom: 30,
        paddingTop: 20,
        gap: 16,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
    },
    ProgressText: {
        fontWeight: 700,
        fontSize: 14,
    },
});

export default VDFTestStyles;
