import { configureStore, combineReducers } from '@reduxjs/toolkit';
import controlSlices from './slices/controlSlices';
import userSlices from './slices/userInfoSlices';

const reducers = combineReducers({ controls: controlSlices, userInfos: userSlices });

const store = configureStore({
    reducer: reducers
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
