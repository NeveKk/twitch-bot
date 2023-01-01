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
        icon: `./assets/image/TELUS-logo-white`
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
                        html: './src/index.html',
                        js: './src/renderer.ts',
                        name: 'main_window',
                        preload: {
                            js: './src/preload.ts'
                        }
                    }
                ]
            }
        })
    ]
};

export default config;
