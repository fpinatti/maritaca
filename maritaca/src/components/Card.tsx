import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonCustom from './ButtonCustom';
import RenderHtml from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../global/styles/theme';

type Props = {
    title: String;
    provider: String;
    description: String;
    uri: String;
}

export default function({ title, provider, description, uri }: Props) {
    const navigation = useNavigation();
    
    const source = {
        html: `${description}`
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={[fonts.heading, styles.title]}>{ title }</Text>
                <Text style={styles.tag}>{ provider }</Text>
            </View>
            <RenderHtml
                contentWidth={ 100 }
                source={ source }
                // renderers={ renderers }
                ignoredDomTags={ ['img', 'svg', 'iframe', 'progress'] }
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Viewer' as never, {
                    uri: uri
                } as never)}
            >
                <ButtonCustom label='READ ARTICLE'></ButtonCustom>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 10,
        borderBottomColor: '#444444',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    titleWrapper: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    tag: {
        backgroundColor: '#121212',
        color: '#ffffff',
        padding: 3,
        borderRadius: 6,
        alignSelf: 'flex-start'
    },
    title: {
        width: '60%',
    },
})

