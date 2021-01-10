import { DarkTheme, Colors } from 'react-native-paper';

const dark = {
    ...DarkTheme,

    colors: {
        ...DarkTheme.colors,
        primary: Colors.lightBlue500,
        accent: Colors.green700
    }
}

const theme = {
    ...dark
};

export { theme };