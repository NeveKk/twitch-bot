/* eslint-disable import/no-extraneous-dependencies */
import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
    packagerConfig: {
        icon: `./global-assets/image/icon-for-now.png`
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({}),
        new MakerZIP({}, ['darwin']),
        new MakerRpm({}),
        new MakerDeb({}),
        {
            name: '@electron-forge/maker-wix',
            config: {
                language: 1036,
                ui: { chooseDirectory: true }
            }
        }
    ],
    plugins: [
        new WebpackPlugin({
            mainConfig,
            devContentSecurityPolicy: "default-src 'self' 'unsafe-eval' 'unsafe-inline' static: http: https: ws:",
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: './src/main-window/index.html',
                        js: './src/main-window/renderer.ts',
                        name: 'main_window',
                        preload: {
                            js: './src/main-window/preload.ts'
                        }
                    },
                    {
                        html: './src/login-window/index.html',
                        js: './src/login-window/renderer.ts',
                        name: 'login_window',
                        preload: {
                            js: './src/login-window/preload.ts'
                        }
                    }
                ]
            }
        })
    ]
};

export default config;
