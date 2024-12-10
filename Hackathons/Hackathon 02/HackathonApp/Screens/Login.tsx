/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useSRStyles from '../Styles/SRStyles';
import rncStyles from 'rncstyles';
import axios from 'axios';
import { SRToast } from '../Components/SRToast';
import { getData, storeData } from '../Styles/Config/AsyncStorageMethods';

function Login({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const handleLogin = async () => {
        setLoader(true);

        try {
            const response = await axios.post('http://hackathon-backend-two.vercel.app/users/login', {
                email: email,
                password: password,
            });

            if (response.data.isSuccessful) {
                console.log(response);
                const { data } = response.data;
                await storeData('userData', data);
                SRToast('Login Successful', 'Welcome back!');
                navigation.navigate('Home');
            } else {
                SRToast('Login Failed', response.data.message || 'An error occurred.', 'error');
            }
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response?.data?.message || 'Failed to log in. Please try again.';
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
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'white', textAlign: 'center' }}>Login</Text>

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

                        <TouchableOpacity disabled={loader} style={SRStyles.loginButton} onPress={handleLogin}>
                            {loader && <ActivityIndicator color="#fff" />}
                            <Text style={SRStyles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={{ color: 'white', marginTop: 20, fontSize: 16, textAlign: 'center' }}>Don't have an account? Signup here</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    );
}

export default Login;
