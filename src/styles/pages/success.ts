import { styled } from "..";

export const SuccessContainer = styled('main', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1: {
        fontSize: '$2xl',
        color: '$gray100',
    },

    p: {
        fontSize: '$xl',
        color: '$gray300',
        maxWidth: 560,
        textAlign: 'center',
        marginTop: '2rem',
        lineHeight: 1.2,
    },

    a: {
        display: 'block',
        marginTop: '5rem',
        fontSize: '$lg',
        color: '$orange500',
        textDecoration: 'none',
        fontWeight: 'bold',

        '&:hover': {
            color: '$orange300'
        }
    },
})

export const ImageContainer = styled('div', {
    width: '100%',
    maxWidth: 130,
    height: 145,
    background: 'linear-gradient(180deg, #20ec08 0%, #ff8f0a 100%)',
    borderRadius: 8,
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: '2rem',

    img: {
        objectFit: 'cover'
    }

})