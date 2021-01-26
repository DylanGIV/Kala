import { USER_FETCH } from '../actions/types'

const INITIAL_STATE = {
  user: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_FETCH:
            return {...state, user: action.payload }
        default:
            return state
    }
};