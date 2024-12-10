import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuantityButton = ({ quantity, setQuantity }:any) => {
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleDecrease} style={styles.button}>
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrease} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 110,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: 'blue',
        borderWidth: 2,
    },
    button: {
        // borderColor: 'blue',
        // borderWidth: 2,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default QuantityButton;
