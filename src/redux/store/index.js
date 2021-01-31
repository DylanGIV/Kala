import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

let middleware = [ReduxThunk];

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'theme']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    persistedReducer,
    {},
    composeEnhancers(applyMiddleware(...middleware))
);

export default () => {
    let persistor = persistStore(store)
    return { store, persistor }
}  