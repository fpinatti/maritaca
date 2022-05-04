import React from 'react';
import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Button,
} from 'react-native';

import landingImg from '../../assets/landing.png';
import { styles } from './styles';
import { themeStyles } from '../../global/styles/theme';
import Header from '../../components/Header';
import ButtonCustom from '../../components/ButtonCustom';
import { useNavigation } from '@react-navigation/native';
// import * as GoogleSignIn from 'expo-google-sign-in';

export function Signin() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Header />
            <Image 
                source={landingImg}
                resizeMode='contain'
                style={[themeStyles.fullBleed, styles.img]}
            />
            <Text style={styles.title}>
                Your fresh dev news,
            </Text>
            <Text style={styles.subtitle}>
                every day!
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate('Feeds' as never)}
            }>
                <ButtonCustom label='SIGN IN WITH GOOGLE' />
            </TouchableOpacity>
            {/* <TouchableOpacity>
                <Text style={ themeStyles.centered }>Continue without login</Text>
            </TouchableOpacity> */}
            <StatusBar />
        </View>
    )
}