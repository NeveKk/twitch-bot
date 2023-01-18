import Electron, { BrowserWindow, app, session, ipcMain } from 'electron';
import Store from 'electron-store';
import axios from 'axios';
import path from 'path';
import IsDev from 'electron-is-dev';
import { LogInProps, SignUpProps, UserInfoState, UserSettingsProps, WindowToOpen } from './global-assets/types';
import getPayloadFromToken from './main-window/assets/utils/getPayloadFromToken';
import createMainWindow from './windows-creation/createMainWindow';
import createLoginWindow from './windows-creation/createLoginWindow';

interface Windows {
    main: BrowserWindow | null;
    login: BrowserWindow | null;
}

const storeConfig = { name: 'settings', fileExtension: 'db' };
const settings = new Store(storeConfig);

const windows: Windows = {
    main: null,
    login: null
};

let windowToOpen: WindowToOpen | null = null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
declare const LOGIN_WINDOW_WEBPACK_ENTRY: string;
declare const LOGIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
    app.quit();
}

if (process.defaultApp) {
    if (process.argv.length >= 2) {
        if (!app.isDefaultProtocolClient('ultimatebot', process.execPath, [path.resolve(process.argv[1])]))
            app.setAsDefaultProtocolClient('ultimatebot', process.execPath, [path.resolve(process.argv[1])]);
    }
} else if (!app.isDefaultProtocolClient('ultimatebot')) app.setAsDefaultProtocolClient('ultimatebot');

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (_event, argv) => {
        // Someone tried to run a second instance, we should focus our window.
        const request = argv[argv.length - 1].split('//');
        verifyRequest(request[1]);
    });
}

app.on('ready', async () => {
    session.defaultSession.protocol.registerFileProtocol('static', (request, callback) => {
        const fileUrl = request.url.replace('static://', '');
        const filePath = path.join(app.getAppPath(), '.webpack/renderer', fileUrl);
        callback(filePath);
    });

    const { token, refreshToken } = settings.get('user') as UserSettingsProps;
    if (token && refreshToken) {
        try {
            const validated = await verifyToken(token, refreshToken);
            if (validated) {
                windows.main = createMainWindow(MAIN_WINDOW_WEBPACK_ENTRY, MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY, settings);
            } else {
                windows.login = createLoginWindow(
                    LOGIN_WINDOW_WEBPACK_ENTRY,
                    LOGIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
                    settings
                );
            }
        } catch (e) {
            settings.set('user', { token: '', refreshToken: '' });
            windows.login = createLoginWindow(LOGIN_WINDOW_WEBPACK_ENTRY, LOGIN_WINDOW_PRELOAD_WEBPACK_ENTRY, settings);
        }
    } else {
        windows.login = createLoginWindow(LOGIN_WINDOW_WEBPACK_ENTRY, LOGIN_WINDOW_PRELOAD_WEBPACK_ENTRY, settings);
    }
});

app.on('browser-window-created', (_event, window) => {
    window.once('close', () => {
        switch (windowToOpen) {
            case 'login':
                if (!windows.login)
                    windows.login = createLoginWindow(
                        LOGIN_WINDOW_WEBPACK_ENTRY,
                        LOGIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
                        settings
                    );
                windows.login.focus();
                break;
            case 'main':
                if (!windows.main)
                    windows.main = createMainWindow(
                        MAIN_WINDOW_WEBPACK_ENTRY,
                        MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
                        settings
                    );
                windows.main.focus();
                break;
            default:
                app.quit();
                break;
        }
        windowToOpen = null;
    });
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        windows.login = createLoginWindow(LOGIN_WINDOW_WEBPACK_ENTRY, LOGIN_WINDOW_PRELOAD_WEBPACK_ENTRY, settings);
    }
});

// Login window ipcMain calls

ipcMain.on('window:login:minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    windows.login.isMinimized() ? windows.login.restore() : windows.login.minimize();
});

ipcMain.on('window:login:close', () => {
    app.quit();
});

ipcMain.on('user:login', async (event, data: LogInProps) => {
    if (validateSender(event.senderFrame)) {
        try {
            const response = await axios.post('http://localhost:8080/oauth/login', data);

            const { token, refreshToken } = response.data as UserSettingsProps;
            settings.set('user', { token, refreshToken });
            windowToOpen = 'main';
            windows.login.close();
            windows.login = null;
        } catch (e) {
            settings.set('user', { token: '', refreshToken: '' });
            windows.login.webContents.send('user:login', { message: 'Failed' });
        }
    }
});

ipcMain.on('user:signup', async (event, data: SignUpProps) => {
    if (validateSender(event.senderFrame)) {
        try {
            const response = await axios.post('http://localhost:8080/oauth/signup', data);

            const { token, refreshToken } = response.data as { token: string; refreshToken: string };
            settings.set('user', { token, refreshToken });
            windowToOpen = 'main';
            windows.login.close();
            windows.login = null;
        } catch (e) {
            settings.set('user', { token: '', refreshToken: '' });
            event.sender.send('user:signup', { message: 'Failed' });
        }
    }
});

// Main window ipcMain calls

ipcMain.on('window:main:minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    windows.main.isMinimized() ? windows.main.restore() : windows.main.minimize();
});
ipcMain.on('window:main:maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    windows.main.isMaximized() ? windows.main.restore() : windows.main.maximize();
});

ipcMain.on('window:main:close', () => {
    app.quit();
});

ipcMain.on('user:logout', async () => {
    settings.set('user', { token: '', refreshToken: '' });
    windowToOpen = 'login';
    windows.main.close();
    windows.main = null;
});

// Any window ipcMain calls

ipcMain.on('user:verify-token', async (event) => {
    if (validateSender(event.senderFrame)) {
        const { token, refreshToken } = settings.get('user') as UserSettingsProps;
        try {
            const validated = await verifyToken(token, refreshToken);
            if (!validated) {
                if (windows.main) {
                    windowToOpen = 'login';
                    windows.main.close();
                    windows.main = null;
                } else {
                    event.sender.send('user:verify-token', { message: 'Failed' });
                }
            } else if (validated) {
                if (windows.login) {
                    windowToOpen = 'main';
                    windows.login.close();
                    windows.login = null;
                } else {
                    event.sender.send('user:verify-token', { message: 'Success' });
                }
            }
        } catch (e) {
            settings.set('user', { token: '', refreshToken: '' });
            event.sender.send('user:verify-token', { message: 'Failed' });
        }
    }
});

const validateSender = (frame: Electron.WebFrameMain) => {
    if ((IsDev && new URL(frame.url).host === 'localhost:3000') || (!IsDev && new URL(frame.url).host === ''))
        return true;
    return false;
};

const verifyToken = async (token: string, refreshToken: string) => {
    const response = await axios.post(
        'http://localhost:8080/oauth/verify-token',
        {},
        { headers: { authorization: `Bearer ${token}`, refreshToken } }
    );

    const { validated, newToken, newRefreshToken } = response.data as {
        validated: boolean;
        newToken: string;
        newRefreshToken: string;
    };
    settings.set('user', { token: newToken, refreshToken: newRefreshToken });
    return validated;
};

const verifyRequest = async (url: string) => {
    const request = url.split('/');

    switch (request[0]) {
        case 'verify-email':
            try {
                const userTokens = settings.get('user') as UserSettingsProps;
                const response = await axios.post('http://localhost:8080/oauth/verify-email', {
                    verificationString: request[1],
                    token: userTokens.token,
                    refreshToken: userTokens.refreshToken
                });

                const { result, token, refreshToken } = response.data as {
                    result: string;
                    token: string;
                    refreshToken: string;
                };

                if (result === 'Success') {
                    settings.set('user', { token, refreshToken });

                    if (windows.login) {
                        windowToOpen = 'main';
                        windows.login.close();
                        windows.login = null;
                    } else if (windows.main) {
                        windows.main.webContents.send('user:verify-email', {
                            message: 'Success',
                            userInfos: getPayloadFromToken(token) as UserInfoState
                        });
                    }
                }
            } catch (e) {
                windows.main.webContents.send('user:verify-email', { message: 'Failed' });
            }
            break;
        default:
            break;
    }
};
