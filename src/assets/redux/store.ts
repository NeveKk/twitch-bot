import { configureStore, combineReducers } from '@reduxjs/toolkit';

const reducers = combineReducers({});

const store = configureStore({
    reducer: reducers
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
