/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import useSRStyles from '../Styles/SRStyles';
import { getData, storeData } from '../Styles/Config/AsyncStorageMethods';
import rncStyles from 'rncstyles';
import SRIcon from '../Components/SRIcon';
import { SRToast } from '../Components/SRToast';

function Cart({ navigation }: any) {
    const SRStyles = useSRStyles();
    const [data, setData] = useState<any>(false);
    const [total, setTotal] = useState(0);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getOrders = async () => {
                const basket = await getData('userOrder');
                const basketArray = Array.isArray(basket) ? basket : [];
                console.log(basketArray);
                setData(basketArray);
            };
            getOrders();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (data) {
            const totalPrice = data.reduce((sum: any, item: any) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
            setTotal(totalPrice);
        }
    }, [data]);

    const handleDelete = async (id: any) => {
        try {
            const updatedBasket = data.filter((item: any) => item.id !== id);

            await storeData('userOrder', updatedBasket);
            setData(updatedBasket);

            SRToast('Success', 'Item deleted successfully!');
        } catch (error) {
            SRToast('Failed', 'Failed to delete item.', 'error');
            console.log('Error deleting item from basket:', error);
        }
    };

    const handleCheckOut = async () => {
        setLoader(true);

        try {
            const existingBasket = await getData('userCheckOut');

            const basketArray = Array.isArray(existingBasket) ? existingBasket : [];

            const updatedBasket = [...basketArray, ...data];

            await storeData('userCheckOut', updatedBasket);
            await storeData('userOrder', []);
            setData([]);
            SRToast('Success', 'Checkout successful!');
        } catch (error) {
            SRToast('Failed', 'Failed to checkout. Please try again.', 'error');

        } finally {
            setLoader(false);
        }
    };


    return (
        <ScrollView contentContainerStyle={SRStyles.flex1}>
            <ImageBackground style={[SRStyles.flex1]} source={require('../assets/background.png')}>
                {data && data.length > 0 ? (
                    <View>
                        {data.map((item: any, index: any) => {
                            return (
                                <View key={index} style={[rncStyles.flexRow, rncStyles.my2, rncStyles.px1]}>
                                    {item.image ? (
                                        <Image source={{ uri: item.image }}
                                            style={{ height: 150, width: 150, borderRadius: 25, marginEnd: 10 }}
                                            resizeMode="cover" />
                                    ) : (
                                        <ActivityIndicator color={'white'} />
                                    )}
                                    <View style={[rncStyles.justifyContentCenter, rncStyles.w50]}>
                                        <Text style={[rncStyles.textWhite, rncStyles.textBold, rncStyles.fs4]}>$ {item.price}</Text>
                                        <Text style={[rncStyles.textWhite, rncStyles.fs4]}>{item.title}</Text>
                                        <View style={[rncStyles.flexRow, rncStyles.justifyContentBetween]}>
                                            <Text style={[rncStyles.textWhite, rncStyles.fs4]}>{item.quantity}</Text>
                                            <TouchableOpacity onPress={() => handleDelete(item.id)} style={[SRStyles.cartDel]}>
                                                <Text><SRIcon color="white" name="delete" /></Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                        <View style={[SRStyles.cartTotal]}>
                            <View style={[rncStyles.flexRow, rncStyles.justifyContentBetween, rncStyles.px2, rncStyles.py2]}>
                                <Text style={[rncStyles.textWhite, rncStyles.fs4]}>Total:</Text>
                                <Text style={[rncStyles.textWhite, rncStyles.fs4]}>{total} $</Text>
                            </View>
                            <TouchableOpacity disabled={loader} onPress={handleCheckOut} style={[SRStyles.loginButton, rncStyles.w90, SRStyles.alignSelfCenter, rncStyles.mt2]}>
                                {loader && <ActivityIndicator color={'white'} />}
                                <Text style={SRStyles.loginButtonText}>Check out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text style={[rncStyles.textCenter, rncStyles.textWhite, rncStyles.fs4, rncStyles.mt3]}>No Food in the basket yet!</Text>
                    </View>
                )}
            </ImageBackground>
        </ScrollView >
    );
}

export default Cart;
