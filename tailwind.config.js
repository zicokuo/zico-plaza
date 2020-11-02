const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    plugins: [],
    important: true,
    purge: {
        mode: "all",
        content: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
        options: {
            whitelist: [""],
        },
    },
    theme: {
        screens: {
            'mobile': {
                raw: '(orientation: portrait)',
                max: '639px',
            },
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
        expend: {
            colors: {
                "gold-100": "#fbab83",
                "gold-500": "#FA884F",
                "gold-900": "#EC7C48",
            },
            fontFamily: {
                arvo: ["Arvo", ...defaultTheme.fontFamily.sans],
                cabin: ["Cabin", ...defaultTheme.fontFamily.sans],
            },
            maxHeight: {
                '0': '0',
                '25': '25%',
                '50': '50%',
                '75': '75%',
                'full': '100%',
            },
            height: {
                '128': ''
            }
        },

    },
    variants: {},
    future: {
        removeDeprecatedGapUtilities: true,
    },
    experimental: {
        applyComplexClasses: true,
        uniformColorPalette: true,
        extendedSpacingScale: true,
        defaultLineHeights: true,
        extendedFontSizeScale: true,
    },
}