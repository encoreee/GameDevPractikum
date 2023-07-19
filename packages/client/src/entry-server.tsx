import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './app/apiSlice';
import forum from './app/forum/forumSlice';
import { ForumState } from './app/forum/types';
import theme, { ThemeState } from './app/themeSlice';
import leaderboard, {
  getLeaderboard,
} from './app/leaderboardSlice/leaderboardSlice';
import { ApiFetchInstance } from './infrastructure/apiFetch';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './createEmotionCache';

export interface PreloadedState {
  forum: ForumState;
  theme: ThemeState;
}

export async function render(url: string | Partial<Location>, cookie: string) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  ApiFetchInstance.useCookie(cookie);

  const store = configureStore({
    reducer: {
      forum,
      theme,
      leaderboard,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });

  await store.dispatch(apiSlice.endpoints.getUserInfo.initiate());

  await store.dispatch(getLeaderboard(0));

  const appHTML = renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <CacheProvider value={cache}>
          <App />
        </CacheProvider>
      </Provider>
    </StaticRouter>
  );

  const preloadedState = store.getState();

  // Grab the CSS from emotion
  const emotionChunks = extractCriticalToChunks(appHTML);

  const emotionCss = constructStyleTagsFromChunks(emotionChunks);

  return [appHTML, preloadedState, emotionCss];
}
