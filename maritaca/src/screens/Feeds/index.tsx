import React, { useEffect, useState, useRef } from 'react';
import { Animated, View, Text, ScrollView, Image } from 'react-native';
import Card from '../../components/Card';
import { fonts } from '../../global/styles/theme';
import { styles } from './styles'
import preloaderIcon from '../../assets/preloader.png';

export function Feeds() {

    const [cards, setCards] = useState([])

    const getFeed = () => {
        return fetch('https://resourcery.vercel.app/feed-fe.json')
            .then((response) => response.json())
            .then((json) => {
                setCards(json)
                return json
            })
            .catch((error) => {
                console.error(error)
            });
    };

    useEffect(() => {
        getFeed()
    })

    const preloaderAnim = useRef(new Animated.Value(0)).current;

    const rotate = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(preloaderAnim, {
            toValue: 360,
            duration: 5000,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Text style={fonts.heading}>Olá,</Text>
            {/* <Text style={fonts.text}>As experiencias mais legais no Maritaca Labs</Text> */}
            <Text style={fonts.text}>Os artigos mais legais sobre front-end no Maritaca News!</Text>
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
                            description={ item.description }
                            uri={ item.link }
                        />
                    )
                }) }
            </ScrollView>
        </View>
    );
}