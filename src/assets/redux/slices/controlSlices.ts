/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppProps, LinkProps } from '../../types';

interface ModalState {
    isOpen: boolean;
    action: 'modify' | 'add' | 'delete';
    target: 'app' | 'link';
    data?: LinkProps | AppProps;
}

export interface ControlState {
    modal: ModalState;
    applications: boolean;
    links: boolean;
}

const initialState: ControlState = {
    modal: {
        isOpen: false,
        action: 'add',
        target: 'app'
    },
    applications: false,
    links: false
};

export const controlSlice = createSlice({
    name: 'control',
    initialState,
    reducers: {
        showModal: (
            state,
            action: PayloadAction<{
                target: 'app' | 'link';
                action: 'modify' | 'add' | 'delete';
                data?: LinkProps | AppProps;
            }>
        ) => {
            state.modal.isOpen = true;
            state.modal.target = action.payload.target;
            state.modal.action = action.payload.action;
            state.modal.data = action.payload.data;
        },
        hideModal: (state) => {
            state.modal.isOpen = false;
        },
        showApps: (state) => {
            state.applications = true;
        },
        hideApps: (state) => {
            state.applications = false;
        },
        showLinks: (state) => {
            state.links = true;
        },
        hideLinks: (state) => {
            state.links = false;
        }
    }
});

export const { showModal, showApps, showLinks, hideModal, hideApps, hideLinks } = controlSlice.actions;

export default controlSlice.reducer;
