import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
    test: /\.css$/,
    use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    // eslint-disable-next-line import/no-extraneous-dependencies, global-require
                    plugins: [require('tailwindcss'), require('autoprefixer')]
                }
            }
        }
    ]
});

// eslint-disable-next-line import/prefer-default-export
export const rendererConfig: Configuration = {
    module: {
        rules
    },
    plugins,
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
    }
};
