import { app, BrowserWindow, screen } from 'electron';
import IsDev from 'electron-is-dev';
import Store from 'electron-store';
import path from 'path';
import { argv } from 'process';
import { UserSettingsProps, WindowSettingsProps } from '../global-assets/types';

const initialWindowSettings: WindowSettingsProps = {
    x: 0,
    y: 0,
    width: 300,
    height: 400
};

const initialUserSettings: UserSettingsProps = {
    token: '',
    refreshToken: ''
};

let request: string[] = [];

const createLoginWindow: (
    webpackLoginEntry: string,
    webpackLoginPreloadEntry: string,
    settings: Store<Record<string, unknown>>
) => BrowserWindow = (webpackLoginEntry, webpackLoginPreloadEntry, settings) => {
    if (!settings.has('user')) {
        settings.set('user', initialUserSettings);
    }
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    initialWindowSettings.x = screenSize.width / 2 - 150;
    initialWindowSettings.y = screenSize.height / 2 - 200;

    const loginWindow = new BrowserWindow({
        ...initialWindowSettings,
        title: 'Login',
        frame: false,
        show: true,
        resizable: false,
        fullscreenable: false,
        icon: path.join(app.getAppPath(), '.webpack/renderer/assets/images/icon-for-now.png'),
        webPreferences: {
            preload: webpackLoginPreloadEntry
        }
    });

    request = argv[argv.length - 1].split('//');

    loginWindow.loadURL(webpackLoginEntry);

    loginWindow.once('ready-to-show', () => {
        if (request[0] === 'ultimatebot') {
            if (request[1].split('/')[0] === 'verify-email') {
                loginWindow.webContents.send('user:verify-email', {
                    message: 'Failed'
                });
            }
        }
    });

    // Open the DevTools.
    if (IsDev) loginWindow.webContents.openDevTools();

    return loginWindow;
};

export default createLoginWindow;
