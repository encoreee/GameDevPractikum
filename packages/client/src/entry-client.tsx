import ReactDOM from 'react-dom/client';
import App from './App';
import { audioBootstrap } from './features/Audio';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './app/apiSlice';
import forum from './app/forum/forumSlice';
import theme from './app/themeSlice';
import leaderboard from './app/leaderboardSlice/leaderboardSlice';
import createEmotionCache from './createEmotionCache';
import { CacheProvider } from '@emotion/react';

export const store = configureStore({
  reducer: {
    forum,
    theme,
    leaderboard,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: window.__PRELOADED_STATE__,
});

delete window.__PRELOADED_STATE__;

const cache = createEmotionCache();

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <CacheProvider value={cache}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CacheProvider>
  </Provider>
);

audioBootstrap();
