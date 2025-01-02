import React from 'react';
import { StyleSheet } from 'react-native';
import { TextGmarketSans } from '../utils/CustomText';

interface LogoProps {
  size: number;
}

const Logo: React.FC<LogoProps> = ({ size }) => {

  return (
    <TextGmarketSans style={[styles.logo, { fontSize: size }]}>URENA</TextGmarketSans>
  );
};

const styles = StyleSheet.create({
  logo: {
    textAlign: 'center',
    color: '#714DF5',
  },
});

export default Logo;
