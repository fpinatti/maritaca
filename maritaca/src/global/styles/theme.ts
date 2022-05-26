import { StyleSheet } from 'react-native';
// import { useFonts } from 'expo-font';
// import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';

export const themeStyles = StyleSheet.create({
    fullBleed: {
        width: '100%',
    },
    centered: {
        alignSelf: 'center'
    },
})

export const themeColors = StyleSheet.create({
    primary: {
        color: '#DB1F48'
    },
    secondary: {
        color: '#004369'
    },
    tertiary: {
        color: '#01949A'
    },
    neutral: {
        color: '#E5DDC8'
    },
    dark: {
        color: '#1A1A1A'
    },
    light: {
        color: '#ffffff'
    }
})

export const fonts = StyleSheet.create({
    heading: {
        fontFamily: 'BioRhyme_700Bold',
        fontSize: 18,
        lineHeight: 24,
        marginBottom: 6,
    },
    cardHeading: {
        fontFamily: 'BioRhyme_700Bold',
        fontSize: 18,
        lineHeight: 24,
    },
    text: {
        fontFamily: 'SourceSansPro_400Regular',
        fontSize: 13,
        lineHeight: 24,
        marginBottom: 6,
    }
})
// export const theme = {
    
// }