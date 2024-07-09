import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import LoginPage from "@/components/LoginPage";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import styles from '@/app/styles'
import {Heading} from "@gluestack-ui/themed";

export default function HomeScreen() {
  const auth = getAuth();
  const [userId, setUserId] = React.useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid)
      console.log("user successfully logged in: " + user.uid)

    } else {
      setUserId("")
      console.log("no user is currently logged in.")
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>CarVault</Text>
      </View>
      {userId == "" &&
          <View style={styles.container}>
            <LoginPage/>
          </View>
      }
      {userId != "" &&
          <View style={styles.container}>
            <View style={styles.header}>
              <Heading style={styles.logoText}>
                Main page
              </Heading>
            </View>

          </View >
      }
    </SafeAreaView>
  );
}

