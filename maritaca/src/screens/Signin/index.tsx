import React from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Button,
} from 'react-native';

import signinImg from '../../assets/signin.png';
import { styles } from './styles';
import { themeStyles } from '../../global/styles/theme';
import Header from '../../components/Header';
import ButtonCustom from '../../components/ButtonCustom';
// import * as GoogleSignIn from 'expo-google-sign-in';

export function Signin() {

    const onClickSignin = () => {
        // GoogleSignIn.signInAsync()
    }

    return (
        <View style={styles.container}>
            <Header />
            <Image source={signinImg} style={themeStyles.fullBleed} />
            <Text style={styles.title}>
                Your fresh dev news, {`\n`}
                every day!
            </Text>
            <TouchableOpacity onPress={onClickSignin}>
                <ButtonCustom label='SIGN IN WITH GOOGLE' />
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={ themeStyles.centered }>Continue without login</Text>
            </TouchableOpacity>
            <StatusBar />
        </View>
    )
}