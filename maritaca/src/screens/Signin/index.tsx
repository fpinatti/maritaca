import React, { useState } from 'react';
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
import { getDatabase, ref, onValue, set, update } from 'firebase/database';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { retrieveToken, storeToken } from '../../utils/auth';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { GoogleAuthProvider } from "firebase/auth";
// import * as GoogleSignIn from 'expo-google-sign-in';
WebBrowser.maybeCompleteAuthSession();

export function Signin() {

    const [ui, setUi] = useState<string>('')

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '608932196934-855irecbrgvhnbc54nsaqh2hb32dd4gt.apps.googleusercontent.com',
        // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: '608932196934-codd6n4nqt8pfme95925amqhkdsmvb63.apps.googleusercontent.com',
        webClientId: '608932196934-855irecbrgvhnbc54nsaqh2hb32dd4gt.apps.googleusercontent.com',
    });

    const fetchUserInfo = async (token: string | undefined) => {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        return await response?.json()
    }

    const saveUser = (user: { email: string; picture: string; sub: string; }) => {
        const { email, picture, sub } = user
        const db = getDatabase()
        const reference = ref(db, `users/${sub}`)
        update(reference, {
            email,
            picture,
        })
    }

    const getUserInfo = async (token: string) => {
        const userInfo = await fetchUserInfo(token)
        setUi(`${userInfo.error} ** ${userInfo.email}`)
        if (userInfo.error) {
            return
        }
        await storeToken(token)
        saveUser(userInfo)
        navigateToFeed()
    }

    const getToken = async () => {
        const storedToken = await retrieveToken()
        if (storedToken) {
            getUserInfo(storedToken)
        }
    }

    React.useEffect(() => {
        getToken()
        if (response?.type === 'success') {
            const { authentication } = response
            // console.log(authentication?.accessToken)
            getUserInfo(authentication?.accessToken)
            // console.log(userInfo)
        }
    }, [response]);
    
    const navigation = useNavigation()
    const clickSignin = async () => {
        await promptAsync();
    }
    
    const navigateToFeed = () => {
        navigation.navigate('Feeds' as never)
    }

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
            <View style={styles.bottomArea}>
                <Text>user { ui }</Text>
                <TouchableOpacity style={styles.button} onPress={clickSignin} >
                    <ButtonCustom label='JOIN WITH GOOGLE' />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToFeed}>
                    <Text style={ themeStyles.centered }>Continue without login</Text>
                </TouchableOpacity>
            </View>
            <StatusBar />
        </View>
    )
}