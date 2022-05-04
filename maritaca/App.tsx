import { Main } from './src/Main';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';

export default function() {

  let [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    SourceSansPro_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Main />
  );
}
