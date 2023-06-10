import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './app/apiSlice';
import forum, { threadMessagesAdapter } from './app/forum/forumSlice';
import { EntityAdapterInitalState } from './app/forum/types';
import { ThreadMessage } from './infrastructure/api/forum/types';
import { ForumState } from './app/forum/types';
import { fetchAsync } from './fetchAsync';

export interface PreloadedState {
  forum: ForumState;
}

const preloadedState = {
  forum: {
    status: { threadList: null, createThread: null },
    threadMessages: threadMessagesAdapter.getInitialState({
      status: null,
      error: '',
    }) as EntityAdapterInitalState<ThreadMessage[]>,
  },
};

export const store = configureStore({
  reducer: {
    forum,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

export function render(url: string | Partial<Location>, cookie: string) {
  return fetchAsync((res) => {
    console.log(res, 'response');
    return renderToString(
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    );
  }, cookie);
}

// export function render(url: string | Partial<Location>) {
//   return renderToString(
//     <Provider store={store}>
//       <StaticRouter location={url}>
//         <App />
//       </StaticRouter>
//     </Provider>
//   );
// }

export function getPreloadedState(): PreloadedState {
  return preloadedState;
}
