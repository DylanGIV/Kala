import { DarkTheme, Colors, configureFonts, DefaultTheme } from 'react-native-paper';
import { fonts } from './fonts';

const dark = {
    ...DarkTheme,
    fonts: configureFonts(fonts),
    colors: {
        ...DarkTheme.colors,
        primary: Colors.blue700,
        accent: Colors.green700,
        surface: Colors.grey900,
    }
}

const light = {
    ...DefaultTheme,
    fonts: configureFonts(fonts),
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.lightBlue200,
        accent: Colors.green700,
        surface: Colors.grey200,
    }
}

const darkTheme = {
    ...dark
}
const lightTheme = {
    ...light
}

export { darkTheme, lightTheme };