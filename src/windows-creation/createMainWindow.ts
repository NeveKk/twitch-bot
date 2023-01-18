import { app, BrowserWindow, screen } from 'electron';
import IsDev from 'electron-is-dev';
import Store from 'electron-store';
import path from 'path';
import { WindowSettingsProps } from '../global-assets/types';

const initialWindowSettings: WindowSettingsProps = {
    x: 0,
    y: 0,
    width: 800,
    height: 600
};

const createMainWindow: (
    webpackMainEntry: string,
    webpackMainPreloadEntry: string,
    settings: Store<Record<string, unknown>>
) => BrowserWindow = (webpackMainEntry, webpackMainPreloadEntry, settings) => {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    initialWindowSettings.x = screenSize.width / 2 - 400;
    initialWindowSettings.y = screenSize.height / 2 - 300;

    if (!settings.has('window')) {
        settings.set('window', initialWindowSettings);
    }

    const StartingWindowSettings = settings.get('window') as WindowSettingsProps;

    const mainWindow = new BrowserWindow({
        ...StartingWindowSettings,
        title: 'Main',
        frame: false,
        show: true,
        resizable: true,
        fullscreenable: true,
        icon: path.join(app.getAppPath(), '.webpack/renderer/assets/images/icon-for-now.png'),
        webPreferences: {
            preload: webpackMainPreloadEntry
        }
    });

    mainWindow.loadURL(webpackMainEntry);

    mainWindow.on('moved', () => {
        const bounds = mainWindow.getBounds();
        settings.set('window', {
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height
        });
    });

    // Open the DevTools.
    if (IsDev) mainWindow.webContents.openDevTools();

    return mainWindow;
};

export default createMainWindow;
