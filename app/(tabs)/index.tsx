// import React from 'react';
// import {SafeAreaView, Text, View} from 'react-native';
// import LoginPage from "@/components/LoginPage";
// import {getAuth, onAuthStateChanged} from "firebase/auth";
// import styles from '@/app/styles'
// import {Heading} from "@gluestack-ui/themed";

// export default function HomeScreen() {
//   const auth = getAuth();
//   const [userId, setUserId] = React.useState("");

//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       setUserId(user.uid)
//       console.log("user successfully logged in: " + user.uid)
//     } else {
//       setUserId("")
//       console.log("no user is currently logged in.")
//     }
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.logoText}>CarVault</Text>
//       </View>
//       {userId == "" &&
//           <View style={styles.container}>
//             <LoginPage/>
//           </View>
//       }
//       {userId != "" &&
//           <View style={styles.container}>
//             <View style={styles.header}>
//               <Heading style={styles.logoText}>
//                 Main page
//               </Heading>
//             </View>
//             {/* Write code here */}
//           </View >
//       }
//     </SafeAreaView>
//   );
// }

import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/firebaseConfig';
import LoginPage from "@/components/LoginPage";
import { Heading } from "@gluestack-ui/themed";

export default function HomeScreen() {
  const auth = getAuth();
  const [userId, setUserId] = useState<string>("");
  const [manufacturer, setManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const [cars, setCars] = useState<Array<any>>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        console.log("User successfully logged in: " + user.uid);
        fetchCars(user.uid);
      } else {
        setUserId("");
        console.log("No user is currently logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCars = async (userId: string) => {
    const q = query(collection(db, 'Car'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const fetchedCars: Array<any> = [];
    querySnapshot.forEach((doc) => {
      fetchedCars.push({ id: doc.id, ...doc.data() });
    });
    setCars(fetchedCars);
  };

  const addVehicle = async () => {
    if (manufacturer && model && pictureUrl && userId) {
      try {
        await addDoc(collection(db, 'Car'), {
          manufacturer,
          model,
          picture_url: pictureUrl,
          userId,
        });
        fetchCars(userId);
        setManufacturer('');
        setModel('');
        setPictureUrl('');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>CarVault</Text>
      </View>
      {userId === "" && (
        <View style={styles.container}>
          <LoginPage />
        </View>
      )}
      {userId !== "" && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Heading style={styles.logoText}>Main page</Heading>
          </View>
          {/* Form to add a vehicle */}
          <TextInput
            style={styles.input}
            placeholder="Manufacturer"
            value={manufacturer}
            onChangeText={setManufacturer}
          />
          <TextInput
            style={styles.input}
            placeholder="Model"
            value={model}
            onChangeText={setModel}
          />
          <TextInput
            style={styles.input}
            placeholder="Picture URL"
            value={pictureUrl}
            onChangeText={setPictureUrl}
          />
          <Button title="Add Vehicle" onPress={addVehicle} />
          {/* List of vehicles */}
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.carItem}>
                <Text>{item.manufacturer} {item.model}</Text>
                <Image source={{ uri: item.picture_url }} style={styles.carImage} />
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  carItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  carImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});



