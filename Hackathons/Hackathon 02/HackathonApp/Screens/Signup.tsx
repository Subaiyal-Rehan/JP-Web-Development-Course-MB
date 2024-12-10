/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useSRStyles from '../Styles/SRStyles';
import rncStyles from 'rncstyles';
import axios from 'axios';
import { SRToast } from '../Components/SRToast';
import { getData, storeData } from '../Styles/Config/AsyncStorageMethods';

function Signup({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loader, setLoader] = useState(false);
    const SRStyles = useSRStyles();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const checkUser = async () => {
                const isUser:any = await getData('userData');
                if (isUser.email) {
                    navigation.navigate('Home');
                    SRToast('Already Logged in.', 'Enjoy Foodie!');
                }
            };
            checkUser();
        });
        return unsubscribe;
    }, [navigation]);

    const handleSignup = async () => {
        setLoader(true);

        try {
            const response = await axios.post('http://hackathon-backend-two.vercel.app/users/signup', {
                fullName: fullName,
                email: email,
                password: password,
            });

            if (response.data.isSuccessful) {
                const { data } = response.data;
                await storeData('userData', data);
                SRToast('Account Created Successfully', 'Welcome to the Foodie!');
                navigation.navigate('Home');
            } else {
                SRToast('Signup Failed', response.data.message || 'An error occurred.', 'error');
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to sign up. Please try again.';
            SRToast('Error', errorMessage, 'error');
        } finally {
            setLoader(false);
        }
    };


    return (
        <View style={SRStyles.flex1}>
            <ScrollView contentContainerStyle={SRStyles.flex1}>
                <ImageBackground
                    style={[SRStyles.flex1, rncStyles.flexCenter]}
                    source={require('../assets/background.png')}
                    resizeMode="cover"
                >
                    <Image source={require('../assets/logo.png')} />
                    <Text style={[rncStyles.textWhite, rncStyles.fs2, rncStyles.textBold]}>Deliver Favourite Food</Text>
                    <View style={[SRStyles.authBackground, rncStyles.w90, rncStyles.mt2, { padding: 20 }]}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'white', textAlign: 'center' }}>Signup</Text>

                        <TextInput
                            style={SRStyles.input}
                            placeholder="Full Name"
                            value={fullName}
                            onChangeText={setFullName}
                            placeholderTextColor="white"
                            autoCorrect={false}
                        />

                        <TextInput
                            style={SRStyles.input}
                            placeholder="example@gmail.com"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="white"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <TextInput
                            style={SRStyles.input}
                            placeholder="Password"
                            value={password}
                            placeholderTextColor="white"
                            onChangeText={setPassword}
                            secureTextEntry
                        />

                        <TouchableOpacity disabled={loader} style={SRStyles.loginButton} onPress={handleSignup}>
                            {loader && <ActivityIndicator color="#fff" />}
                            <Text style={SRStyles.loginButtonText}>Signup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: 'white', marginTop: 20, fontSize: 16, textAlign: 'center' }}>Already have an account? Login here</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    );
}

export default Signup;
