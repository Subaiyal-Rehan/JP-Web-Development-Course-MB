import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import useSRStyles from '../Styles/SRStyles';
import { getData } from '../Styles/Config/AsyncStorageMethods';
import rncStyles from 'rncstyles';

function Orders({ navigation }: any) {
    const SRStyles = useSRStyles();
    const [data, setData] = useState<any>(false);
    useEffect(() => {
        // Function to retrieve orders from AsyncStorage
        const getOrders = async () => {
            try {
                const order = await getData('userCheckOut');  // Fetch data
                const orderArray = Array.isArray(order) ? order : [];  // Ensure it's an array
                console.log(orderArray);
                setData(orderArray);  // Set data state
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const unsubscribe = navigation.addListener('focus', getOrders);

        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView contentContainerStyle={SRStyles.flex1}>
            <ImageBackground style={[SRStyles.flex1]} source={require('../assets/background.png')}>
                <View>
                    {data && data.length > 0 ? (
                        data.map((item: any, index: any) => {
                            return (
                                <View style={[SRStyles.orderContainer, rncStyles.my2]} key={index + 1}>
                                    <Text style={[rncStyles.textCenter, rncStyles.textWhite, rncStyles.fs5]}>Index: {index}</Text>
                                    <Text style={[rncStyles.textCenter, rncStyles.textWhite, rncStyles.fs5]}>Title: {item.title || 'No Title'}</Text>
                                    <Text style={[rncStyles.textCenter, rncStyles.textWhite, rncStyles.fs5]}>Quantity: {item.quantity}</Text>
                                    <Text style={[rncStyles.textCenter, rncStyles.textWhite, rncStyles.fs5]}>Price: {item.price}</Text>
                                </View>
                            );
                        })
                    ) : (
                        <View>
                            <Text style={[rncStyles.textCenter, rncStyles.textWhite, rncStyles.fs4, rncStyles.mt3]}>No Orders has been placed yet!</Text>
                        </View>
                    )}
                </View>
            </ImageBackground>
        </ScrollView>
    );
}

export default Orders;

