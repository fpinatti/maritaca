import React, { useEffect, useState, useRef } from 'react';
import { Animated, View, Text, ScrollView, Image } from 'react-native';
import Card from '../../components/Card';
import { fonts } from '../../global/styles/theme';
import Header from '../../components/Header';
import { styles } from './styles'
import preloaderIcon from '../../assets/preloader.png';
// import { getFavorites } from '../../utils/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Feeds() {

    const [cards, setCards] = useState([])
    const [favorites, setFavorites] = useState([])

    const getFeed = () => {
        return fetch('https://maritaca-fpinatti.vercel.app/feed-fe.json')
            .then((response) => response.json())
            .then((json) => {
                setCards(json)
                return json
            })
            .catch((error) => {
                console.error(error)
            });
    };

    const getFavorites = async () => {
        // console.log('get favorites')
        try {
            const jsonValue = await AsyncStorage.getItem('@favorites')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // saving error
        }
    }

    const init = async () => {
        const fav = await getFavorites()
        setFavorites(fav)
        getFeed()
    }

    useEffect(() => {
        init()
    }, [])

    // await getFavorites()

    const preloaderAnim = useRef(new Animated.Value(0)).current;

    const rotate = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(preloaderAnim, {
            toValue: 360,
            duration: 5000,
            useNativeDriver: false,
        }).start();
    };

    const storeData = async (favoritesListToSave: never[]) => {
        let favoritesSanitizedList = favoritesListToSave.map((arraySingleFavorite) => {
            if (Array.isArray(arraySingleFavorite)) {
                return arraySingleFavorite[0]
            }
            return arraySingleFavorite;
        })
        // console.log('unsanitized', favoritesListToSave)
        favoritesSanitizedList = [...new Set(favoritesSanitizedList)];
        // console.log('sanitized', favoritesSanitizedList)
        try {
            await AsyncStorage.setItem('@favorites', JSON.stringify(favoritesSanitizedList))
        } catch (e) {
            // saving error
            console.log('error saving storage')
        }
    }

    // const getData = async (value) => {
    //     try {
    //       await AsyncStorage.setItem(`@${value}`, value)
    //     } catch (e) {
    //       // saving error
    //     }
    // }

    const onFavorite = async (uri: never) => {
        let tmpArray = favorites
        const isFavorited = favorites.indexOf(uri)
        if (isFavorited >= 0) {
            tmpArray = favorites.splice(isFavorited, 1)
        }
        setFavorites(tmpArray => [...tmpArray, uri])
        // console.log(favorites)
        await storeData(favorites)
        // console.log('favorite card', uri.toString());
    }

    return (
        <View style={styles.container}>
            <Header collapseLogo={ true } />
            <Text style={fonts.heading}>Kwaaak! Hi,</Text>
            {/* <Text style={fonts.text}>As experiencias mais legais no Maritaca Labs</Text> */}
            <Text style={fonts.text}>The coolest frontend articles and news you read here in Maritaca!</Text>
            {/* <Animated.View style={[
                {
                    // Bind opacity to animated value
                    // transform: ,
                },
                ]}>
            </Animated.View> */}
            { cards.length === 0 &&
                <Image source={ preloaderIcon } style={styles.preloader} />
            }
            <ScrollView>
                {/* { cards } */}
                { cards.map((item, index) => {
                    return (
                        <Card 
                            key={ index }
                            title={ item.title }
                            provider={ item.providerTitle }
                            description={ item.plainDescription }
                            uri={ item.link }
                            favorites={favorites}
                            onFavorite={onFavorite}
                        />
                    )
                }) }
            </ScrollView>
        </View>
    );
}