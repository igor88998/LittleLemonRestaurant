'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import MenuItem from "../../components/menu/MenuItem"

export default function MenuPage() {

    const [categories, setCategories] = useState([])
    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })
    }, [])

    return (
        <>
            <div className="relative w-full">
                <Image width={1440} height={100} src={'/LittleLemonPicture.png'} alt={''}/>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow">
                    <p className="text-8xl">Little Lemon</p>
                </div>
            </div>
            <section className="max-w-5xl mx-auto">
                {categories?.length > 0 && categories.map(c => (
                    <div key={c}>
                        <div className="my-8 text-4xl font-semibold">
                            {c.name}
                        </div>
                        <div className="grid grid-cols-3 gap-24">
                            {menuItems.filter(item => item.category === c._id).map(item => (
                                <div key={item}>
                                    <MenuItem {...item}/>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}