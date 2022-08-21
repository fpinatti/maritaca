import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ButtonCustom from './ButtonCustom';
// import RenderHtml from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import { fonts, themeColors, themeStyles } from '../global/styles/theme';
import heartIcon from '../../assets/heart.png';
// import { getUserInfo } from '../utils/auth';
// import { getDatabase, ref, onValue, set, push, update } from 'firebase/database';

type Props = {
    title: String;
    provider: String;
    description: String;
    uri: String;
    favorites: Array<any>;
    onFavorite: Function;
}

export default function({ title, provider, description, uri, onFavorite, favorites }: Props) {
    const navigation = useNavigation();
    
    // const source = {
    //     html: `${description}`
    // };

    // const mixedStyles = {
    //     color: themeColors.light.color,
    // }

    // const tagsStyles = {
    //     a: {
    //         color: themeColors.primary.color,
    //     }
    // };

    const doFavorite = () => {
        // console.log(favorites.includes(uri[0]))
        onFavorite(uri[0])
        // const db = getDatabase()
        // const postListRef = ref(db, `favorites/${getUserInfo().sub}`);
        // const newPostRef = push(postListRef);
        // set(newPostRef, {
        //     title,
        //     uri,
        // });

        // const reference = ref(db, `favorites/${getUserInfo().sub}`)
        // update(reference, {
        //     // title,
        //     uri,
        // })
        // console.log('favorite', title, uri, getUserInfo().sub)
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={[fonts.heading, styles.title]}>{ title }</Text>
                <Text style={styles.tag}>{ provider }</Text>
            </View>
            <Text style={styles.description}> { description } </Text>
            {/* <RenderHtml
                contentWidth={ 100 }
                source={ source }
                // renderers={ renderers }
                baseStyle={ mixedStyles }
                tagsStyles = { tagsStyles }
                ignoredDomTags={ ['img', 'svg', 'iframe', 'progress'] }
            /> */}
            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Viewer' as never, {
                        uri
                    } as never)}
                >
                    <ButtonCustom 
                        label='READ ARTICLE'
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={ doFavorite as never }>
                    <Image style={favorites.includes(uri[0]) && styles.favoriteFilled} source={ heartIcon }></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        backgroundColor: '#1A1A1A',
        color: '#ffffff',
        // marginHorizontal: 5,
        padding: 12,
        paddingBottom: 20,
        paddingTop: 20,
        // borderRadius: 10,
        borderBottomColor: '#444444',
        borderBottomWidth: 1,
        marginBottom: 2,
        // marginLeft: -10
    },
    titleWrapper: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    tag: {
        backgroundColor: themeColors.tertiary.color,
        color: '#ffffff',
        padding: 3,
        borderRadius: 6,
        alignSelf: 'flex-start'
    },
    title: {
        width: '60%',
        color: '#ffffff'
    },
    description: {
        color: '#ffffff',
        marginBottom: 20,
    },
    buttonWrapper: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    favoriteFilled: {
        backgroundColor: '#00ffff',
    }
})

