import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const BottomNavigation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  const handleIconPress = (index: number) => {
    setActiveIndex(index);

    switch (index) {
      case 0:
        navigation.navigate('Main' as never);
        break;
      case 2:
        navigation.navigate('Chat' as never);
        break;
      default:
        break;
    }
  };

  const renderBottomNavigation = () => {
    const navItems = [
      { name: 'home', label: '홈' },
      { name: 'book-open', label: '학교생활' },
      { name: 'message-circle', label: '채팅' },
      { name: 'menu', label: '커뮤니티' },
      { name: 'user', label: 'MY' },
    ];

    return (
      <View style={styles.navigationContainer}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => handleIconPress(index)}
          >
            <Icon
              name={item.name}
              size={24}
              style={{
                color: activeIndex === index ? '#714DF5' : '#464A4D',
              }}
            />
            <Text
              style={{
                color: activeIndex === index ? '#714DF5' : '#464A4D', 
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return renderBottomNavigation();
};

const styles = StyleSheet.create({
  navigationContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#ffffff',
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomNavigation;
