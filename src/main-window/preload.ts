import { ipcRenderer, contextBridge } from 'electron';

declare global {
    interface Window {
        Main: typeof mainApi;
    }
}

const mainApi = {
    Minimize: () => {
        ipcRenderer.send('window:main:minimize');
    },
    Maximize: () => {
        ipcRenderer.send('window:main:maximize');
    },
    Close: () => {
        ipcRenderer.send('window:main:close');
    },
    VerifyToken: () => {
        ipcRenderer.send('user:verify-token');
    },
    UserLogOut: () => {
        ipcRenderer.send('user:logout');
    },
    ConnectBot: () => {
        ipcRenderer.send('bot:connect');
    },
    DisconnectBot: () => {
        ipcRenderer.send('bot:disconnect');
    },
    on: (channel: string, callback: (data: unknown) => void) => {
        ipcRenderer.on(channel, (_, data) => callback(data));
    }
};
contextBridge.exposeInMainWorld('Main', mainApi);
