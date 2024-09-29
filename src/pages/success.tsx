import { stripe } from "@/lib/stripe"
import { SuccessContainer, ImageContainer } from "@/styles/pages/success"
import { GetServerSideProps } from "next"
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import Stripe from "stripe"

interface SuccessProps {
    customerName: string,
    product: {
        name: string,
        imgUrl: string,
    }
}

export default function Success({ customerName, product }: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | FaberShop</title>

                <meta name="robots" content="noindex" />
            </Head>

            <SuccessContainer>
                <h1>Compra efetuada</h1>
                <ImageContainer>
                    <Image src={product.imgUrl} width={120} height={110} alt="" />
                </ImageContainer>
                <p>
                    Prabéns <strong>{customerName}</strong>!! Você acaba de dar um passo em rumo a evolução da sua carreira com o curso
                    <strong>{product.name}</strong>. Agora é consumir os conteúdos e construir o seu futuro
                </p>

                <Link href="/">
                    Voltar ao catalogo
                </Link>
            </SuccessContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
    if (!query.session_id) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details?.name

    // const product = session.line_items?.data[0].price?.product
    const product = session.line_items?.data[0].price?.product as Stripe.Product
    return {
        props: {
            customerName,
            product: {
                name: product.name,
                imgUrl: product.images[0]
            }
        }
    }
}