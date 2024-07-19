import '../firebaseConfig'
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import React from "react";
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from "react-native";
import {ArrowLeftFromLine} from "lucide-react-native";
import {
    Alert,
    AlertIcon,
    AlertText,
    Button,
    ButtonIcon,
    ButtonText,
    InfoIcon,
    Input,
    InputField
} from "@gluestack-ui/themed";
import {doc, getFirestore, setDoc} from "@firebase/firestore";


export default function LoginPage() {
    const [name, setName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("")
    const [currentView, setCurrentView] = React.useState('initial');
    const [nameFocused, setNameFocused] = React.useState(false);
    const [usernameFocused, setUsernameFocused] = React.useState(false);
    const [phoneNumberFocused, setPhoneNumberFocused] = React.useState(false);
    const [emailFocused, setEmailFocused] = React.useState(false);
    const [passwordFocused, setPasswordFocused] = React.useState(false);

    const handleSignInPress = () => {
        setCurrentView('signIn');
    };
    const handleSignUpPress = () => {
        setCurrentView('signUp');

    };

    const handleBackPress = () => {
        setCurrentView('initial');
        setNameFocused(false);
        setEmailFocused(false);
        setUsernameFocused(false);
        setPasswordFocused(false);
        setPhoneNumberFocused(false);
    };

    const auth = getAuth();
    const db = getFirestore();
    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return setDoc(doc(db, 'User', user.uid), {
                    username: username,
                    user_full_name: name,
                    user_phone_number: phoneNumber,
                });
            })
            .then(() => {
                console.log('Created new user successfully');
                // You can handle any post-signup logic here, such as navigating to another screen
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Encountered error during signup: " + errorMessage);
                setErrorMsg(errorMessage);
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

    const mapErrorMessage = (errorMsg: string) => {
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
        <View
            style={styles.loginPageContainer}>
            {currentView !== 'initial' && (
                <Button
                    borderRadius="$full"
                    size="lg"
                    bg="#D3D3D3"
                    onPress={handleBackPress}
                    style={styles.backButton}
                >
                    <ButtonIcon color={'#004225'} as={ArrowLeftFromLine} />
                </Button>

            )}
            {currentView === 'initial' && (
                <View style={styles.initialContainer}>
                    <Button bg={'#FFEDDF'} size="md" onPress={handleSignInPress} w="50%" mt="$2">
                        <ButtonText color={'#004225'} style={styles.centeredButtonText}>Sign In</ButtonText>
                    </Button>
                    <Button bg={'#9B1D20'} size="md" onPress={handleSignUpPress} w="50%" mt="$2">
                        <ButtonText style={styles.centeredButtonText}>Sign Up</ButtonText>
                    </Button>
                </View>
            )}
            {currentView === 'signIn' && (

                <KeyboardAvoidingView
                    behavior={'padding'}
                    style={styles.keyboardAvoidingView}>
                    <Input
                        variant="underlined"
                        w="75%" size="md"
                        isDisabled={false} isInvalid={false} isReadOnly={false}>
                        <InputField
                            placeholder='Email'
                            value={email}
                            onChangeText={setEmail}
                            color={'#FFEDDF'}
                            style={[emailFocused && styles.inputFocused]}
                            onFocus={() => setEmailFocused(true)}
                            onBlur={() => setEmailFocused(false)}


                        />
                    </Input>

                    <Input mt={"$3"} variant="underlined" w="75%" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                        <InputField
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChangeText={setPassword}
                            color={'#FFEDDF'}
                            style={[passwordFocused && styles.inputFocused]}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                        />
                    </Input>
                    <Button bg={'#FFEDDF'} onPress={signIn} w="30%" mt="$4">
                        <ButtonText color={'#004225'} style={styles.centeredButtonText}>Log in</ButtonText>
                    </Button>
                    {errorMsg !== "" && (
                        <Alert mx="$2.5" action="error" variant="outline" mt="$2">
                            <AlertIcon as={InfoIcon} mr="$3" />
                            <AlertText>{mapErrorMessage(errorMsg)}</AlertText>
                        </Alert>
                    )}
                </KeyboardAvoidingView>
            )}
            {currentView === 'signUp' && (
                <KeyboardAvoidingView
                    behavior={'padding'}
                    style={styles.keyboardAvoidingView}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <Input
                            variant="underlined"
                            w="75%" size="md"
                            isDisabled={false} isInvalid={false} isReadOnly={false}>
                            <InputField
                                placeholder='Name'
                                value={name}
                                onChangeText={setName}
                                color={'#FFEDDF'}
                                style={[nameFocused && styles.inputFocused]}
                                onFocus={() => setNameFocused(true)}
                                onBlur={() => setNameFocused(false)}
                            />
                        </Input>
                        <Input
                            mt={"$3"}
                            variant="underlined"
                            w="75%" size="md"
                            isDisabled={false} isInvalid={false} isReadOnly={false}>
                            <InputField
                                placeholder='Username'
                                value={username}
                                onChangeText={setUsername}
                                color={'#FFEDDF'}
                                style={[usernameFocused && styles.inputFocused]}
                                onFocus={() => setUsernameFocused(true)}
                                onBlur={() => setUsernameFocused(false)}
                            />
                        </Input>
                        <Input
                            mt={"$3"}
                            variant="underlined"
                            w="75%" size="md"
                            isDisabled={false} isInvalid={false} isReadOnly={false}>
                            <InputField
                                placeholder='Phone Number'
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                color={'#FFEDDF'}
                                style={[phoneNumberFocused && styles.inputFocused]}
                                onFocus={() => setPhoneNumberFocused(true)}
                                onBlur={() => setPhoneNumberFocused(false)}
                            />
                        </Input>
                        <Input
                            mt={"$3"}
                            variant="underlined"
                            w="75%" size="md"
                            isDisabled={false} isInvalid={false} isReadOnly={false}>
                            <InputField
                                placeholder='Email'
                                value={email}
                                onChangeText={setEmail}
                                color={'#FFEDDF'}
                                style={[emailFocused && styles.inputFocused]}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                            />
                        </Input>

                        <Input mt={"$3"} variant="underlined" w="75%" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
                            <InputField
                                type="password"
                                placeholder='Password'
                                value={password}
                                onChangeText={setPassword}
                                color={'#FFEDDF'}
                                style={[passwordFocused && styles.inputFocused]}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                            />
                        </Input>
                        <Button bg={'#FFEDDF'} onPress={signUp} w="30%" mt="$4">
                            <ButtonText color={'#004225'} style={styles.centeredButtonText}>Sign Up</ButtonText>
                        </Button>
                        {errorMsg !== "" && (
                            <Alert mx="$2.5" action="error" variant="outline" mt="$2">
                                <AlertIcon as={InfoIcon} mr="$3" />
                                <AlertText>{mapErrorMessage(errorMsg)}</AlertText>
                            </Alert>
                        )}
                    </ScrollView>

                </KeyboardAvoidingView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    loginPageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20,
    },
    initialContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    signUpContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    centeredButtonText: {
        textAlign: 'center',
        width: '100%',
    },
    inputFocused: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    signUpBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signUpText: {
        marginRight: 8,
    },
});

