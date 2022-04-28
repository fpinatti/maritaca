import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import Card from '../../components/Card';

import { styles } from './styles'

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

    return (
        <View style={styles.container}>
            <Text>Olá,</Text>
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