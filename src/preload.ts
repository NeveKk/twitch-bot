// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge } from 'electron';

declare global {
    interface Window {
        Main: typeof api;
        ipcRenderer: typeof ipcRenderer;
    }
}

const api = {
    /**
     * Here you can expose functions to the renderer process
     * so they can interact with the main (electron) side
     * without security problems.
     */
    /**
    Here function for AppBar
    */
    Minimize: () => {
        ipcRenderer.send('minimize');
    },
    Maximize: () => {
        ipcRenderer.send('maximize');
    },
    Close: () => {
        ipcRenderer.send('close');
    },
    /**
     * Provide an easier way to listen to events
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on: (channel: string, callback: (data: any) => void) => {
        ipcRenderer.on(channel, (_, data) => callback(data));
    }
};
contextBridge.exposeInMainWorld('Main', api);
