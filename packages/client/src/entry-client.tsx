import ReactDOM from 'react-dom/client';
import App from './App';
import { audioBootstrap } from './features/Audio';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './app/apiSlice';
import forum from './app/forum/forumSlice';
import leaderboard from './app/leaderboardSlice/leaderboardSlice';

export const store = configureStore({
  reducer: {
    forum,
    leaderboard,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: window.__PRELOADED_STATE__,
});

delete window.__PRELOADED_STATE__;

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

audioBootstrap();
