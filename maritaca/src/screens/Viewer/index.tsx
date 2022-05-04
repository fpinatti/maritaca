import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

export function Viewer({route}) {
    const { uri } = route.params
    console.warn(uri[0])
    return (
        <WebView 
            source={{ uri: uri[0] }}
        />
    )
}