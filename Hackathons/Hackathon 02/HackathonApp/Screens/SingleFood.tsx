/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import useSRStyles from '../Styles/SRStyles';
import SRQuantityButton from '../Components/SRQuantityButton';
import axios from 'axios';
import rncStyles from 'rncstyles';
import { getData, storeData } from '../Styles/Config/AsyncStorageMethods';
import { SRToast } from '../Components/SRToast';

function SingleFood() {
    const SRStyles = useSRStyles();
    const [data, setData] = useState<any>(false);
    const [quantity, setQuantity] = useState(1);
    const [loader, setLoader] = useState(false);

    const handleAddToBasket = async () => {
        try {
            const basket = await getData('userOrder');

            const basketArray = Array.isArray(basket) ? basket : [];

            const existingItem = basketArray.find(item => item.id === data.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                basketArray.push({ ...data, quantity: quantity });
            }

            await storeData('userOrder', basketArray);
            console.log('SUCCESS', basket);
            SRToast('Success', 'Successfully added food to basket');
            setLoader(false);
        } catch (error) {
            console.log('Failed to add to basket', error);
            SRToast('Failed', 'Failed to add the food to basket','error');
            setLoader(false);
        }
    };

    useEffect(() => {
        axios.get('https://hackathon-backend-two.vercel.app/foods/672ef9f1dda29de00d261f15').then((res: any) => {
            setData(res.data.data);
        });
    }, []);

    return (
        <ScrollView contentContainerStyle={SRStyles.flex1}>
            <ImageBackground style={[SRStyles.flex1]} source={require('../assets/background.png')}>
                {data ? (
                    <View>
                        {data.image ? (
                            <Image source={{ uri: data.image }} style={{ height: 300 }} />
                        ) : (
                            <ActivityIndicator color={'white'} />
                        )}
                        <View style={[SRStyles.SingleTextContainer, rncStyles.mt1]}>
                            <Text style={[rncStyles.textWhite, rncStyles.fs4]}>{data.title}</Text>
                            <Text style={[rncStyles.textWhite, rncStyles.fs4, rncStyles.textBold, rncStyles.my1]}>$ {data.price}</Text>
                            <Text style={[rncStyles.textWhite, rncStyles.mb2]}>{data.description}</Text>
                            <SRQuantityButton quantity={quantity} setQuantity={setQuantity} />
                        </View>
                        <TouchableOpacity disabled={loader} onPress={handleAddToBasket} style={[SRStyles.loginButton, rncStyles.w90, SRStyles.alignSelfCenter, rncStyles.mt2]}>
                            {loader && <ActivityIndicator color={'white'} />}
                            <Text style={SRStyles.loginButtonText}>Add to Basket</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={[rncStyles.flex1, rncStyles.flexCenter]}>
                        <ActivityIndicator color={'white'} size={60} />
                    </View>
                )}
            </ImageBackground>
        </ScrollView >
    );
}

export default SingleFood;
