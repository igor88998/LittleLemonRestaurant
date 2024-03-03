'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext"
import AddressInputs from "@/components/layout/AddressInputs"
import Image from "next/image"
import Left from "@/components/icons/Left"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function OrderPage() {

    const { clearCart } = useContext(CartContext)
    const [order, setOrder] = useState()
    const [loadingOrder, setLoadingOrder] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart()
            }
        }
        if (id) {
            setLoadingOrder(true)
            fetch('/api/orders?_id=' + id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData)
                    setLoadingOrder(false)
                })
            })
        }
    }, [])

    let total = 0;
    if (order?.cartProducts) {
        for (const product of order?.cartProducts) {
            total += cartProductPrice(product);
        }
    }

    return (
        <section>
            <Link className="flex justify-center items-center border-b border-secondary text-primary text-xl gap-1 py-2 hover:underline" href={'/menu'}>
                <Left />
                <span className="pt-0.5">Back to menu</span>
            </Link>
            <div className="max-w-4xl mx-auto mt-10">
                <div className="text-center">
                    <div className="text-6xl text-primary">Your order</div>
                    <div className="text-2xl my-5">
                        <p>Thanks for your order</p>
                        <p>We will call you when your order will be on the way</p>
                    </div>
                </div>
                {loadingOrder && (
                    <div>Loading order...</div>
                )}
                {order && (
                    <div>
                        <div className="my-10">
                            {order.cartProducts.map(product => (
                                <div key={product.id} className="max-w-2xl mx-auto">
                                    <div style={{ gridTemplateColumns: '.4fr .9fr' }} className="grid grid-cols-2 items-center border-b border-secondary py-2">
                                        <div>
                                            <Image src={product.image} alt={product.name} width={300} height={300} />
                                        </div>
                                        <div>
                                            <div className="grid grid-cols-3 items-center text-3xl justify-center pl-5">
                                                <div>
                                                    {product.name}

                                                    {product.size && (
                                                        <div className=" text-2xl">
                                                            Size: <span>{product.size.name}</span>
                                                        </div>
                                                    )}
                                                    {product.extras?.length > 0 && (
                                                        <div className="text-lg text-secondary">
                                                            {product.extras.map(extra => (
                                                                <div key={extra}>{extra.name} ${extra.price}</div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="cursor-default flex justify-center items-center">x{product.count}</div>
                                                <div className="flex justify-center">
                                                    ${cartProductPrice(product)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="px-20 pt-4 text-2xl max-w-xl mx-auto flex justify-between">
                                <div>
                                    Delivery
                                </div>
                                <div className="text-2xl">
                                    $5
                                </div>
                            </div>
                            <div className="px-20 py-5 text-2xl max-w-xl mx-auto flex justify-between">
                                <div>
                                    Total
                                </div>
                                <div className="text-yellow text-3xl">
                                    ${total + 5}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="max-w-md mx-auto">
                                <AddressInputs disabled={true} addressProps={order} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}