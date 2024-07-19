// src/styles/styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004225', // British racing green background
  },
  header: {
    height: 60,
    backgroundColor: '#004225',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderColor: '#004225',
    borderWidth: 2,
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#E0E0E0', // Lighter grey bar
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: '30%',
    height: '70%',
    backgroundColor: '#C0C0C0', // Light grey for buttons
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004225', // British racing green for text
  },
});

export default styles;
