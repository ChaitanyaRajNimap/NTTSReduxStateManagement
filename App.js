import React from 'react';
import RootNavigator from './src/Navigation/RootNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/app/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
