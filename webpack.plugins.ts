import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const copyPlugins = new CopyWebpackPlugin({
    patterns: [
        {
            from: path.resolve(__dirname, 'src/global-assets/images'),
            to: path.resolve(__dirname, '.webpack/renderer/global-assets/images')
        }
    ]
});

// eslint-disable-next-line import/prefer-default-export
export const plugins = [
    new ForkTsCheckerWebpackPlugin({
        logger: 'webpack-infrastructure'
    }),
    copyPlugins
];
