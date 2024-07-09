import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import styles from '@/app/styles'
import {getAuth, onAuthStateChanged} from "firebase/auth";
import React from "react";
import {Avatar, AvatarFallbackText} from "@gluestack-ui/themed";
import {doc, getDoc, getFirestore} from "@firebase/firestore";

export default function TabTwoScreen() {
  const auth = getAuth();
  const db = getFirestore();
  const [username, setUsername] = React.useState("")
  const [fullName, setFullName] = React.useState("")
  const [userId, setUserId] = React.useState("")
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid)
      const docRef = doc(db, 'User', user.uid)
      const docSnap = getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              console.log(docSnap.data())
              setUsername(docSnap.data().username)
              setFullName(docSnap.data().user_full_name)
            } else {
              console.log("Logged in user cannot be found...");
            }
          })
    } else {
      setUserId("")
    }
  });


  const signOut = () => {
    auth.signOut()
  }


  return (
    <SafeAreaView style={styles.container}>
        {userId != "" && (
            <View style={stylesLocal.container}>
              <Avatar bgColor="$amber600" size="md" borderRadius="$full">
                <AvatarFallbackText>{fullName}</AvatarFallbackText>
              </Avatar>
              <Text style={stylesLocal.text}>{username}</Text>
              <TouchableOpacity style={stylesLocal.logoutButton} onPress={signOut}>
                <Text style={stylesLocal.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
        )}
         </SafeAreaView>
  );
}

const stylesLocal = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // This makes the image circular
    marginBottom: 20, // Space between image and text
  },
  text: {
    fontSize: 15,
    color: 'grey', // British racing green for text
    marginBottom: 10, // Space between text lines
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5, // Padding to position content correctly
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#9B1D20', // Dark red background for the button
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
