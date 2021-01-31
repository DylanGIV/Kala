import { lightTheme } from '../../global'
import { THEME_SWITCH } from '../actions/types'

const INITIAL_STATE = {
  theme: lightTheme
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case THEME_SWITCH:
            return {...state, theme: action.payload}
        default:
            return state
    }
};