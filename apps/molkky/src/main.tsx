import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';

import App from './app/app';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { GAME_FEATURE_KEY, gameReducer } from './app/store/game.slice';
import gameMiddleware from './app/pages/game/gameMiddleware';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({
  reducer: { [GAME_FEATURE_KEY]: gameReducer },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameMiddleware),
  devTools: process.env['NODE_ENV'] !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
