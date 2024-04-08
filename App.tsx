import React from 'react';
import {Provider} from 'react-redux';

import store from './src/store';
import Main from './src/Main';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

// XMLHttpRequest = GLOBAL.originalXMLHttpRequest
//   ? GLOBAL.originalXMLHttpRequest
//   : GLOBAL.XMLHttpRequest;

export default App;
