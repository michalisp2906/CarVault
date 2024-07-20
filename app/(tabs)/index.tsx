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
import { SafeAreaView, Text, View, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '@/firebaseConfig'; // Correctly import db and auth
import LoginPage from '@/components/LoginPage';
import { Heading } from '@gluestack-ui/themed';

export default function HomeScreen() {
  const [userId, setUserId] = useState<string>("");
  const [manufacturer, setManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const [cars, setCars] = useState<Array<any>>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);

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
    console.log("Fetching cars for user: " + userId);
    try {
      const q = query(collection(db, 'Car'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const fetchedCars: Array<any> = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Fetched car data: ", data);
        fetchedCars.push({ id: doc.id, ...data });
      });
      console.log("Fetched cars array: ", fetchedCars);
      setCars(fetchedCars);
    } catch (error) {
      console.error("Error fetching cars: ", error);
    }
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
        console.log("Vehicle added successfully");
        fetchCars(userId);
        setManufacturer('');
        setModel('');
        setPictureUrl('');
        setFormVisible(false);
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
          {!formVisible && (
            <TouchableOpacity style={styles.addButton} onPress={() => setFormVisible(true)}>
              <Text style={styles.addButtonText}>Add Vehicle</Text>
            </TouchableOpacity>
          )}
          {formVisible && (
            <View style={styles.formContainer}>
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
              <Button title="Back" onPress={() => setFormVisible(false)} color="gray" />
            </View>
          )}
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.carItem}>
                <View style={styles.carDetails}>
                  <Text style={styles.carText}>Manufacturer: {item.manufacturer}</Text>
                  <Text style={styles.carText}>Model: {item.model}</Text>
                </View>
                <View style={styles.carImageContainer}>
                  <Image source={{ uri: item.picture_url }} style={styles.carImage} />
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>No vehicles found.</Text>
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
  addButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#004225', // British racing green
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  carItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  carDetails: {
    flex: 3,
  },
  carText: {
    fontSize: 16,
    marginBottom: 5,
  },
  carImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});




