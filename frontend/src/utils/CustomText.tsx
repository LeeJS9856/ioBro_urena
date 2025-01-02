import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

interface CustomTextProps extends TextProps {}

const TextNotoSans: React.FC<CustomTextProps> = ({ style, ...rest}) => {
    const textNotoSans = {
        fontFamily: 'NotoSansKR-Light',
        color: '#000000',
    };

    return <RNText style={[textNotoSans, style]} {...rest} />;
};

const TextGmarketSans: React.FC<CustomTextProps> = ({ style, ...rest}) => {
    const textGmarketSans = {
        fontFamily: 'GmarketSansBold',
        color: '#000000',
    };

    return <RNText style={[textGmarketSans, style]} {...rest} />;
};

export { TextNotoSans, TextGmarketSans };
