import { combineReducers } from "redux";
import InstitutionReducer from "./InstitutionReducer";
import AuthReducer from './AuthReducer';
import TransactionsReducer from "./TransactionsReducer";
import ThemeReducer from "./ThemeReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
    auth: AuthReducer,
    institutions: InstitutionReducer,
    transactions: TransactionsReducer,
    theme: ThemeReducer,
    user: UserReducer
})