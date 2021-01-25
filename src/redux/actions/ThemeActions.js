import { THEME_SWITCH } from './types';

export const themeSwitch = (theme) => {
    return (dispatch) => {
        dispatch({
            type: THEME_SWITCH,
            payload: theme
        })
    }
}