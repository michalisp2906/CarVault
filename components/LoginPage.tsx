import '../firebaseConfig'
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import React from "react";
import {View} from "react-native";
import {
    Alert,
    AlertIcon,
    AlertText,
    Box,
    Button,
    ButtonText,
    InfoIcon,
    Input,
    InputField,
    Text
} from "@gluestack-ui/themed";


export default function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("")

    const auth = getAuth();
    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };
    const signIn = () => {
        console.log("Attempting to sign in with email ..." + email)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Encountered error when trying to log in: " + errorMessage)
                setErrorMsg(errorMessage)
            });
    }


    const mapErrorMessage = (errorMsg) => {
        if (errorMsg == "Firebase: Error (auth/invalid-email).") {
            return "Invalid login credentials."
        } else if (errorMsg == "Firebase: Error (auth/missing-password).") {
            return "No password."
        }
        else {
            return "An unknown error occurred."
        }
    }
    return (
        <View>
                <View style={{ alignItems: 'center' }}>

                    <Input variant="outline" w="75%" size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                        <InputField
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}
                        />

                    </Input>

                    <Input variant="outline" w={"75%"} size="md" isDisabled={false} isInvalid={false} isReadOnly={false} >
                        <InputField
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChangeText={setPassword   }
                        />
                    </Input>

                    <Button onPress={signIn} w={"30%"} mt={"$2"}>
                        <ButtonText>Log in</ButtonText>
                    </Button>
                    <Box mt={"$10"} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 8 }}>Don't have an account?</Text>
                        <Button size={'sm'} action={'secondary'}>
                            <ButtonText>Sign up</ButtonText>
                        </Button>
                    </Box>



                    {errorMsg != "" &&
                        <Alert mx='$2.5' action="error" variant="outline" mt={"$2"}>
                            <AlertIcon as={InfoIcon} mr="$3"/>
                            <AlertText>
                                {mapErrorMessage(errorMsg)}
                            </AlertText>
                        </Alert>
                    }
                </View>
        </View>
    );




}

