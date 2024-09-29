import { useState } from "react";
import { ImageContainer, ProductContainer, ProductDetail } from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head'
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import Image from 'next/image';
import axios from 'axios'

interface ProductProps {
    product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string,
    }
}
// Rota Interna 
// const router = useRouter()
// router.push('/nome da pasta da rota')

// Rota Externa
// axios.post('caminho/da/rota´{ params: parametro })

// Não precisa haver um arquivo com uma base url para direcionar ao axios, pois a nessa camada server side o servidor está rodando 
// na mesma base de endereço url da web localhost/3000 desta forma simplesmente direciona o path do arquivo da rota
// a resposta será passada me window.location.href = response.data

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    async function handleBuyProduct() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl

        } catch (error) {
            // Uma boa pratica é conectar com uma ferramenta de observabilidade

            setIsCreatingCheckoutSession(false)
            const errorMessage = error
            alert(`${errorMessage}: 'Falha ao redirecionar ao checkout`)
        }
    }
    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>

            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </ImageContainer>

                <ProductDetail>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>
                    <p>{product.description}</p>


                    <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}>
                        Comprar Agora
                    </button>
                </ProductDetail>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [
            { params: { id: 'prod_QtpJM8kkAPznsC' } }
        ],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params?.id ?? ''

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount ? price.unit_amount / 100 : 0),
                description: product.description,
                defaultPriceId: price.id,
            }

        },
        revalidate: 60 * 60 * 1
    }
}