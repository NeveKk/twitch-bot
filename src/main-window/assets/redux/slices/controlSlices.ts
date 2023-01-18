/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ControlState } from '../../../../global-assets/types';

const initialState: ControlState = {
    userIsConnected: false
};

export const controlSlice = createSlice({
    name: 'control',
    initialState,
    reducers: {
        userConnected: (state) => {
            state.userIsConnected = true;
        },
        userDisconnected: (state) => {
            state.userIsConnected = false;
        }
    }
});

export const { userConnected, userDisconnected } = controlSlice.actions;

export default controlSlice.reducer;
