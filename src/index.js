import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';

import CardStore from './Stores/CardStore';

const initialState = [
    'card one',
    'another card',
    'and again \\o/',
];

const cardStore = new CardStore;
initialState.forEach(label => cardStore.addCard(label));

console.log(cardStore.toJS());

ReactDOM.render(
  <Provider store={ cardStore }>
    <App />
  </Provider>
  , document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    var NewApp = require('./App').default;
    ReactDOM.render(
      <Provider store={ cardStore }>
        <NewApp />
      </Provider>,
      document.getElementById('root')
    );
  });
}
