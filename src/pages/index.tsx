import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HomeContainer, Product } from '@/styles/pages/home'
import Head from 'next/head'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

interface HomeProps {
    products: {
        id: string,
        name: string,
        imageUrl: string,
        price: number,
    }[]
}

export default function Home({ products }: HomeProps) {

    const [sliderRef] = useKeenSlider({
        slides: {
            perView: 3,
            spacing: 48,
        },
        defaultAnimation: {
            duration: 2,
        },


    })
    return (
        <>
            <Head>
                <title>Home | FaberShop</title>
            </Head>

            <HomeContainer ref={sliderRef} className="keen-slider">
                {products.map(product => {
                    return (
                        <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                            <Product className="keen-slider__slide">
                                <Image src={product.imageUrl} width={520} height={480} alt="" placeholder='empty' />
                                <footer>
                                    <strong>{product.name}</strong>
                                    <span>{product.price}</span>
                                </footer>
                            </Product>
                        </Link>
                    )
                })
                }
            </HomeContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await stripe.products.list({
        expand: ['data.default_price']
    })

    const products = response.data.map(product => {
        const price = product.default_price as Stripe.Price

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(price.unit_amount ? price.unit_amount / 100 : 0),

        }
    })

    return { props: { products } }
}