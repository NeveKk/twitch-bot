/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { UserInfoState } from '../../../../global-assets/types';

const initialState: UserInfoState = {
    username: '',
    email: '',
    isVerified: false,
    subscribed: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, actions) => {
            state.email = (actions.payload as UserInfoState).email;
        },
        setIsVerified: (state, actions) => {
            state.isVerified = (actions.payload as UserInfoState).isVerified;
        },
        setSubscribed: (state, actions) => {
            state.subscribed = (actions.payload as UserInfoState).subscribed;
        },
        setUserInfos: (state, actions) => {
            state.username = (actions.payload as UserInfoState).username;
            state.email = (actions.payload as UserInfoState).email;
            state.isVerified = (actions.payload as UserInfoState).isVerified;
            state.subscribed = (actions.payload as UserInfoState).subscribed;
        }
    }
});

export const { setEmail, setIsVerified, setUserInfos } = userSlice.actions;

export default userSlice.reducer;
