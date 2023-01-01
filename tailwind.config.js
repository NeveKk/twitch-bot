module.exports = {
    content: ['./src/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                // primary: '#2B8000',
                // secondary: '#4B286D'
            }
        }
    },
    variants: {
        extend: {},
        fontFamily: {
            sans: ['Inter', 'ui-sans-serif', 'system-ui']
        }
    },
    plugins: []
};
