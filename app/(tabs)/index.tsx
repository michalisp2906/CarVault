import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LoginPage from "@/components/LoginPage";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {Button} from "@gluestack-ui/themed";

export default function HomeScreen() {
  const auth = getAuth();
  const [userId, setUserId] = React.useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid)
      console.log("user successfully logged in: " + user)

    } else {
      setUserId("")
      console.log("no user is currently logged in.")
    }
  });

  const signOut = () => {
    auth.signOut()
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>CarVault</Text>
        <Button action={'negative'} onPress={signOut}></Button>
      </View>
      {userId == "" &&
          <View style={styles.container}>
            <LoginPage/>
          </View>
      }
      {userId != "" &&
          <View style={styles.container}>
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
          </View >
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004225', // Light grey background
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
    marginTop: '5%'
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
