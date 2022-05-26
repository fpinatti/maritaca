import React from 'react';

import arrowIcon from '../assets/arrow-right.png'
import { View, Text, StyleSheet, Image } from 'react-native';
import { themeColors } from '../global/styles/theme';

type Props = {
    label: String;
}

export default function ButtonCustom({ label }: Props) {

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.label}>{ label }</Text>
                <Image source={arrowIcon} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // height: 30,
        flexDirection: 'row',
        backgroundColor: themeColors.primary.color,
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: 30,
        padding: 10,
    },
    label: {
        fontFamily: 'BioRhyme_700Bold',
        fontSize: 16,
        lineHeight: 24,
        marginRight: 6,
        color: themeColors.light.color,
    },
})

