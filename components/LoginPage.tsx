import '../firebaseConfig'
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import React from "react";
import {View, StyleSheet} from "react-native";
import {ArrowLeftFromLine} from "lucide-react-native";
import {
    Alert,
    AlertIcon,
    AlertText,
    ArrowLeftIcon,
    Box,
    Button, ButtonIcon, ButtonText, Heading, Icon,
    InfoIcon,
    Input,
    InputField,
    Text
} from "@gluestack-ui/themed";


export default function LoginPage() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("")
    const [currentView, setCurrentView] = React.useState('initial');
    const [emailFocused, setEmailFocused] = React.useState(false);
    const [passwordFocused, setPasswordFocused] = React.useState(false);

    const handleSignInPress = () => {
        setCurrentView('signIn');
    };
    const handleSignUpPress = () => {

    };

    const handleBackPress = () => {
        setCurrentView('initial');
    };

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
        <View style={styles.loginPageContainer}>
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

                <View style={styles.formContainer}>
                    <Heading
                        size={'3xl'}
                        color={'#FFEDDF'}
                        mb={'$20'}
                    > Welcome Back</Heading>
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
                </View>
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
        zIndex: 1
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

    signUpBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signUpText: {
        marginRight: 8,
    },
});

