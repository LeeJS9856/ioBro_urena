import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor:'#ffffff',
  },
  centerContainer: {
    flex: 1,
    marginHorizontal : 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startContainer: {
    flex: 1,
    marginHorizontal : 16,
    marginVertical: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Styles;
