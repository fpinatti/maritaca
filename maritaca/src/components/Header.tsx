import React from 'react';

import { View, Image, StyleSheet } from 'react-native';
import logo from '../assets/logo.png';

type Props = {
    collapseLogo?: Boolean;
}

export default function Header({ collapseLogo }:Props) {

    return (
        <View style={styles.container}>
            <Image 
                source={logo}
                style={[styles.logo]}
                resizeMode='contain'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#f1f000',
        alignItems: 'center',
    },
    logo: {
        // width: '100%',
        // maxWidth: 100,
        height: 100,
        marginTop: -30,
        // height: 100,
    }
})

