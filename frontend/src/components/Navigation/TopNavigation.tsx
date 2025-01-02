import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Logo from '../Logo';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface TopNavigationProps {
  onBackPress?: () => void;
  styleType: number;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ onBackPress, styleType }) => {
  const renderTopNavigation = () => {
    switch(styleType) {
      case 1:
        return (
          <View style={styles.navigationContainer}>
            <Logo size={16} />
            <View style={styles.iconContainer}>
              <Icon name='notifications-none' size={24} style={styles.icon} />
              <Icon name='menu' size={24} style={styles.icon}/>
            </View>
          </View>
        );
        case 2:
          return (
            <View style={styles.navigationContainer}>
              <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                <Icon name='arrow-back' size={24}/>
              </TouchableOpacity>
              <View style={styles.centerContainer}>
                <Logo size={20} />
                <Text style={styles.chatRoomName}>채팅방 이름</Text>
              </View>
              <View style={styles.iconContainer}>
                <Icon name='notifications-none' size={24} style={styles.icon} />
                <Icon name='menu' size={24} style={styles.icon}/>
              </View>
            </View>
        );
    }
  };

  return renderTopNavigation();
};

const styles = StyleSheet.create({
  navigationContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#ffffff',
    padding: 18,
    position: 'relative',
    elevation: 1,
  },
  backButton: {
    position: 'absolute',
    left: 18,
  },
  iconContainer: {
    position: 'absolute', // 오른쪽에 고정
    right: 18, // 오른쪽 여백
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 20,
    color: '#464A4D',
  },
  centerContainer: {
    alignItems: 'center', // 수평 중앙 정렬
    width: '100%', // 전체 너비를 차지하도록 설정
  },
  chatRoomName: {
    fontSize: 10,
    color: '#464A4D',
  },
});

export default TopNavigation;
