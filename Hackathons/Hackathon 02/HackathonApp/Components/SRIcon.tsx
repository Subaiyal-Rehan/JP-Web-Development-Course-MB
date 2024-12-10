import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

type iconProps =  {
    name: string,
    size?: number,
    color?: string,
}

function SRIcon({name, color, size}:iconProps) {

    return (
        <Icon name={name} size={size || 30} color={color || 'black'} />
    )
}

export default SRIcon
