import React, { useState } from 'react';
import { Provider } from 'react-redux';
import AppContent from './src';
import configureStore from './src/redux/store'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const { store, persistor } = configureStore()

export default function App() {
  const[isLoadingComplete, setIsLoadingComplete] = useState(false)
  

  const loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        'nanum-regular': require('./assets/fonts/NanumGothic-Regular.ttf'),
        'nanum-bold': require('./assets/fonts/NanumGothic-Bold.ttf'),
        'nanum-extra-bold': require('./assets/fonts/NanumGothic-ExtraBold.ttf')
      })
    ])
  }

  const handleLoadingError = error => {
    console.warn(error);
  };

  const handleFinishLoading = () => {
    setIsLoadingComplete(true);
  };


  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  } else {
      return (
        <Provider store={store}>
          <AppContent/>
        </Provider>
      );
  }
}
