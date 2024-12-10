import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import rncStyles from 'rncstyles';
import useSRStyles from '../Styles/SRStyles';
import SRIcon from '../Components/SRIcon';
import { getData } from '../Styles/Config/AsyncStorageMethods';

function Account({ navigation }: any) {
    const SRStyles = useSRStyles();
    const [data, setData] = useState<any>(false);
    useEffect(() => {
        const getUser = async () => {
            const userData = await getData('userData');
            setData(userData);
        };
        getUser();
    }, [navigation]);

    return (
        <View style={[rncStyles.positionRelative, SRStyles.flex1]}>
            <ScrollView contentContainerStyle={SRStyles.flex1} style={[rncStyles.positionRelative]}>
                <ImageBackground
                    style={[SRStyles.flex1, rncStyles.flexCenter, rncStyles.justifyContentStart]}
                    source={require('../assets/background.png')}
                    resizeMode="cover"
                />
                <View style={[SRStyles.accountContainer, rncStyles.p2]}>
                    {data ? (
                        <View>
                            <Text style={[rncStyles.textWhite, rncStyles.fs5, rncStyles.my1]}>Full Name: {data.fullName}</Text>
                            <Text style={[rncStyles.textWhite, rncStyles.fs5]}>Email Address: {data.email}</Text>
                            <Text style={[rncStyles.textWhite, rncStyles.fs5, rncStyles.my1]}>Password (Unfetched): {data.password}</Text>
                        </View>
                    ) : (
                        <View>
                            <ActivityIndicator color="white" />
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={SRStyles.bottomNavbar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={SRStyles.navbarButton}>
                    <SRIcon color="grey" name={'home'} />
                    <Text style={[SRStyles.navbarText]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Restaurants')} style={SRStyles.navbarButton}>
                    <SRIcon color="grey" name={'search'} />
                    <Text style={[SRStyles.navbarText]}>Browse</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={SRStyles.navbarButton}>
                    <SRIcon color="grey" name={'shopping-cart'} />
                    <Text style={[SRStyles.navbarText]}>Cart</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Orders')} style={SRStyles.navbarButton}>
                    <SRIcon color="grey" name={'list-alt'} />
                    <Text style={[SRStyles.navbarText]}>Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Account')} style={SRStyles.navbarButton}>
                    <SRIcon color="white" name={'person'} />
                    <Text style={[rncStyles.textWhite]}>Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Account;
