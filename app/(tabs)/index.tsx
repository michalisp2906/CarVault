import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>CarVault</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.photoContainer}>
          {/* Add your photo component here */}
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Garage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mechanics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3', // Light grey background
  },
  header: {
    flex: 1 / 5,
    backgroundColor: '#004225', // British racing green
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 4 / 5,
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
    height: '10%',
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
