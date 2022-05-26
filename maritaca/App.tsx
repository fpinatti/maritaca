import { Main } from './src/Main';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
// import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { 
  // BioRhyme_200ExtraLight,
  // BioRhyme_300Light,
  // BioRhyme_400Regular,
  BioRhyme_700Bold,
  // BioRhyme_800ExtraBold 
} from '@expo-google-fonts/biorhyme'
import { SourceSansPro_400Regular } from '@expo-google-fonts/source-sans-pro';

export default function() {

  let [fontsLoaded] = useFonts({
    BioRhyme_700Bold,
    SourceSansPro_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Main />
  );
}
