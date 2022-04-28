import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

type Props = {
    label: String;
}

export default function ButtonCustom({ label }: Props) {

    return (
        <View style={styles.container}>
            <Text>{ label }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#acf0f6',
        alignItems: 'center',
        // marginHorizontal: 30,
        padding: 10,
        borderRadius: 10,
    }
})

