import React from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import rncStyles from 'rncstyles';
import useSRStyles from '../Styles/SRStyles';
import SRIcon from '../Components/SRIcon';

function Browse({ navigation }: any) {
    const SRStyles = useSRStyles();
    return (
        <View style={[rncStyles.positionRelative, SRStyles.flex1]}>
        <ScrollView contentContainerStyle={SRStyles.flex1} style={[rncStyles.positionRelative]}>
            <ImageBackground
                style={[SRStyles.flex1]}
                source={require('../assets/background.png')}
                resizeMode="cover"
            />

            <View style={[rncStyles.positionAbsolute]}>
                <View>
                    <Image source={require('../assets/restaurant.png')} />
                    <View style={[SRStyles.BrowseResName, rncStyles.p3]}>
                        <Text style={[rncStyles.textWhite, rncStyles.fs2]}>Kinka Izakaya</Text>
                        <Text style={[rncStyles.textWhite, rncStyles.fs5]}>2972 Westheimer Rd. Santa Ana</Text>
                    </View>
                </View>
                <View style={[SRStyles.BrowserResCard, rncStyles.borderBottom1, rncStyles.borderTop1, rncStyles.borderWhite]}>
                <TouchableOpacity onPress={()=>navigation.navigate('Single Food')} style={[SRStyles.ResCard, rncStyles.ps2]}>
                        <View style={[rncStyles.justifyContentCenter]}>
                            <Text style={[rncStyles.textWhite, rncStyles.fs5]}>Udon Misa</Text>
                            <Text style={[rncStyles.textWhite, rncStyles.fs7]}>Our Udon Miso is a comforting bowl of thick, handmade...</Text>
                            <Text style={[rncStyles.textBold, rncStyles.textWhite, rncStyles.fs4]}>16</Text>
                        </View>
                            <Image source={require('../assets/restaurantCardImg.png')} />
                </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

        <View style={SRStyles.bottomNavbar}>
            <TouchableOpacity style={SRStyles.navbarButton} onPress={() => navigation.navigate('Home')}>
                <SRIcon color="grey" name={'home'} />
                <Text style={[SRStyles.navbarText]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Restaurants')} style={SRStyles.navbarButton}>
                <SRIcon color="white" name={'search'} />
                <Text style={[rncStyles.textWhite]}>Browse</Text>
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
                <SRIcon color="grey" name={'person'} />
                <Text style={[SRStyles.navbarText]}>Account</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
}

export default Browse;
