import { RootState } from './store';

export const selectControls = (state: RootState) => state.controls;
export const selectUserInfos = (state: RootState) => state.userInfos;
