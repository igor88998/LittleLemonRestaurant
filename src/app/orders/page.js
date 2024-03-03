'use client'
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/UserTabs"
import { dbTime } from "@/libs/datetime"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function OrdersPage() {

    const [orders, setOrders] = useState([])
    const [loadingOrders, setLoadingOrders] = useState(true)
    const { loading, data: profile } = useProfile()

    useEffect(() => {
        fetchOrders()
    }, [])

    function fetchOrders() {
        setLoadingOrders(true)
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse())
                setLoadingOrders(false)
            })
        })
    }

    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={profile.admin} />
            <div className="mt-7">
                {loadingOrders && (
                    <div>Loading orders...</div>
                )}
                {orders?.length > 0 && orders.map(order => (
                    <div
                        key={order._id}
                        className="bg-light-gray mb-2 p-4 rounded-xl flex flex-col md:flex-row items-center gap-6">
                        <div className="grow flex flex-col md:flex-row items-center gap-6">
                            <div>
                                <div className={
                                    (order.paid ? 'bg-green-500' : 'bg-red-400')
                                    + ' p-2 rounded-full text-white w-24 text-center'
                                }>
                                    {order.paid ? 'Paid' : 'Not paid'}
                                </div>
                            </div>
                            <div className="grow">
                                <div className="flex gap-2 items-center mb-1">
                                    <div className="grow">{order.userEmail}</div>
                                    <div className="text-gray text-sm">{dbTime(order.createdAt)}</div>
                                </div>
                                <div className="text-gray text-sm">
                                    {order.cartProducts.map(p => p.name).join(', ')}
                                </div>
                            </div>
                        </div>
                        <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                            <Link href={"/orders/" + order._id} className="bg-primary p-2 text-white rounded-full">
                                Show order
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}