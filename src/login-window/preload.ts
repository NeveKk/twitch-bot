import { ipcRenderer, contextBridge } from 'electron';
import { LogInProps, SignUpProps } from '../global-assets/types';

declare global {
    interface Window {
        Login: typeof loginApi;
    }
}

const loginApi = {
    Minimize: () => {
        ipcRenderer.send('window:login:minimize');
    },
    Close: () => {
        ipcRenderer.send('window:login:close');
    },
    UserLogIn: (data: LogInProps) => {
        ipcRenderer.send('user:login', data);
    },
    UserSignUp: (data: SignUpProps) => {
        ipcRenderer.send('user:signup', data);
    },
    on: (channel: string, callback: (data: unknown) => void) => {
        ipcRenderer.on(channel, (_, data) => callback(data));
    }
};
contextBridge.exposeInMainWorld('Login', loginApi);
