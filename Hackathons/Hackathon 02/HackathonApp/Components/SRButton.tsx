import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

type ButtonType = {
    btnValue: string,
    onPress?: any,
    bgColor?: string,
    color?: string
}

function SRButton({ btnValue, onPress, bgColor, color }: ButtonType) {

    return (
        <TouchableOpacity onPress={onPress} style={{
            backgroundColor: bgColor || '#530596',
            paddingHorizontal: 25,
            alignSelf: 'flex-start',
            paddingVertical: 10,
            borderRadius: 3,
        }}>
            <Text style={{ color: color || 'white' }}>{btnValue}</Text>
        </TouchableOpacity>
    )
}

export default SRButton
