import React, { useEffect, useState } from 'react';

import { View, Image, StyleSheet, Text } from 'react-native';
import logo from '../assets/logo.png';
import { getUserInfo } from '../utils/auth';

type Props = {
    collapseLogo?: Boolean;
    profile?: Boolean;
}

export default function Header({ collapseLogo, profile=true }:Props) {

    // const [userimg, setUserimg] = useState('https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80')
    // useEffect(() => {
    //     if (getUserInfo()?.picture) {
    //         setUserimg(getUserInfo().picture)
    //     }
    // })
    return (
        <View style={styles.container}>
            <Image 
                source={logo}
                style={[styles.logo]}
                resizeMode='contain'
            />
            {/* {profile &&
                <Image
                    style={[styles.profile_thumb]}
                    source={{ uri: userimg } }
                />
            } */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#f1f000',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        // width: '100%',
        // maxWidth: 100,
        height: 100,
        marginTop: -30,
        flexGrow: 2,
        // height: 100,
    },
    // profile_thumb: {
    //     width: 60,
    //     height: 60,
    //     marginTop: 10,
    //     borderRadius: 100,
    // }
})

