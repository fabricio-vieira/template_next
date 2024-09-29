import { createStitches } from '@stitches/react'


export const {
    config,
    styled,
    globalCss,
    css,
    keyframes,
    getCssText,
    theme,
    createTheme,

} = createStitches({
    theme: {
        colors: {
            white: '#fff',

            gray900: '#121214',
            gray800: '#202024',
            gray300: '#c4c4cc',
            gray100: '#e1e1e6',

            green500: '#00875f',
            green300: '#00b37e',
            green100: '#20ec08',

            orange500: '#fc7031',
            orange300: '#ff8f0a',
            orange100: '#ff8f6c',
        },

        fontSizes: {
            md: '1.125rem',
            lg: '1.25rem',
            xl: '1.5rem',
            '2xl': '2rem',
        }
    }
})