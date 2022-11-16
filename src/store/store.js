import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { messegeReducer } from "./slices/messege/messegeSlice";
import { postsReducer } from "./slices/posts/postsSlice";
import { searchReducer } from "./slices/search/searchSlice";
import { usersReducer } from "./slices/users/usersSlice";
import storage from 'redux-persist/lib/storage'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

  const persistConfig = {
    key: 'rootInstaWitBot',
    storage,
  }
  const rootReducer = combineReducers({
        posts: postsReducer,
        search: searchReducer,
        users: usersReducer,
        messege: messegeReducer
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export default store