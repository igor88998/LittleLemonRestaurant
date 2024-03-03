'use client'
import { CartContext } from "@/components/AppContext"
import { cartProductPrice } from "@/components/AppContext"
import Cancel from "@/components/icons/Cancel"
import Image from "next/image"
import Left from "@/components/icons/Left"
import Link from "next/link"
import AddressInputs from "@/components/layout/AddressInputs"
import { useContext, useEffect, useState } from "react"
import { useProfile } from "@/components/UseProfile"
import toast from "react-hot-toast"

export default function CartPage() {

    const { cartProducts, removeCartProducts, increaseCount, decreaseCount } = useContext(CartContext)
    const [address, setAddress] = useState({})
    const { data: profileData } = useProfile()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Payment failed')
            }
        }
    }, [])

    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress, zipCode, city, country } = profileData
            const addressFromProfile = { phone, streetAddress, zipCode, city, country }
            setAddress(addressFromProfile)
        }
    }, [profileData])

    let total = 0
    for (const product of cartProducts) {
        total += cartProductPrice(product)
    }

    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }))
    }

    async function proceedToCheckout(ev) {
        ev.preventDefault()

        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address,
                    cartProducts: cartProducts.map(product => ({ ...product, count: product.count }))
                })
            }).then(async (response) => {
                if (response.ok) {
                    resolve()
                    window.location = await response.json()
                } else {
                    reject()
                }

            })
        })

        await toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: 'Error'
        })
    }

    return (
        <section className="bg-primary">
            <Link className="flex justify-center items-center border-b-2 border-gray text-yellow text-xl gap-1 py-2 hover:underline" href={'/menu'}>
                <Left />
                <span className="pt-0.5">Back to menu</span>
            </Link>
            <div>
                {cartProducts?.length === 0 ? (
                    <div className="text-4xl text-white text-center py-24">No products in your cart, <br /> go to the menu and select products</div>
                ) : (
                    <div >
                        <h1 className="max-w-4xl mx-auto py-10 text-white text-6xl border-b border-gray">Cart</h1>
                        {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                            <div key={product.id} className="max-w-4xl mx-auto">
                                <div style={{ gridTemplateColumns: '.4fr .9fr' }} className="grid grid-cols-2 items-center border-b border-gray py-2 text-white">
                                    <div>
                                        <Image src={product.image} alt={product.name} width={300} height={300} />
                                    </div>
                                    <div>
                                        <div className="grid grid-cols-4 items-center text-3xl justify-center pl-5">
                                            <div>
                                                {product.name}

                                                {product.size && (
                                                    <div className=" text-2xl text-light-gray">
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
                                            <div className="flex gap-4 justify-center items-center">
                                                <button
                                                    type="button"
                                                    className="hover:text-yellow cursor-pointer"
                                                    onClick={() => decreaseCount(index)}>-</button>
                                                <div className="cursor-default">{product.count}</div>
                                                <button
                                                    type="button"
                                                    className="hover:text-yellow cursor-pointer"
                                                    onClick={() => increaseCount(index)}>+</button>
                                            </div>
                                            <div className="flex justify-center">
                                                ${cartProductPrice(product)}
                                            </div>
                                            <button
                                                onClick={() => removeCartProducts(index)}
                                                type="button"
                                                className="flex justify-center"><Cancel /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="px-20 pt-4 text-2xl max-w-3xl mx-auto flex justify-between">
                            <div className="text-secondary">
                                Delivery
                            </div>
                            <div className="text-white text-3xl">
                                $5
                            </div>
                        </div>
                        <div className="px-20 py-5 text-4xl max-w-3xl mx-auto flex justify-between">
                            <div className="text-white">
                                Total
                            </div>
                            <div className="text-yellow text-5xl">
                                ${total + 5}
                            </div>
                        </div>
                        <div className="bg-white pt-10">
                            <div className="max-w-lg mx-auto">
                                <h2>Checkout</h2>
                                <form onSubmit={proceedToCheckout}>
                                    <AddressInputs
                                        addressProps={address}
                                        setAddressProps={handleAddressChange}
                                    />
                                    <button className="w-full" type="submit">Pay ${total + 5}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}