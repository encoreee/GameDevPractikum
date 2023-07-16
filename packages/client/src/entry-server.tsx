import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './app/apiSlice';
import forum from './app/forum/forumSlice';

import { ForumState } from './app/forum/types';
import theme, { ThemeState, ThemeMode } from './app/themeSlice';
import { fetchAsync } from './fetchProfile';
import { User } from './infrastructure/api/auth/contracts';
import leaderboard from './app/leaderboardSlice/leaderboardSlice';

export interface PreloadedState {
  forum: ForumState;
  theme: ThemeState;
}

export function render(url: string | Partial<Location>, cookie: string) {
  return fetchAsync((res) => {
    let profile: User | undefined;

    try {
      profile = res as User;
    } catch (error) {
      console.log(error);
    }

    const preloadedState = {
      forum: {
        status: { threadList: null, createThread: null, threadMessages: null },
        threadMessages: [],
      },
      theme: {
        mode: ThemeMode.DARK,
      },
    };

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
      preloadedState,
    });

    store.dispatch(apiSlice.endpoints.getUserInfo.initiate());

    (async () => {
      await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));
    })();

    store.dispatch(apiSlice.endpoints.getUserInfo.initiate());

    (async () => {
      await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));
    })();

    const appHTML = renderToString(
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    );
    return [appHTML, preloadedState];
  }, cookie);
}
