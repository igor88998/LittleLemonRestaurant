'use client'
import { useEffect, useState } from "react"
import MenuItem from "../menu/MenuItem"
import Link from "next/link"

export default function HomeMenu() {

    const [thisWeekSpecials, setThisWeekSpecials] = useState([])

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setThisWeekSpecials(menuItems.slice(0, 3))
            })
        })
    }, [])

    return (
        <section className="max-w-5xl mx-auto">
            <div className="flex justify-between mt-32 mb-11 items-center">
                <h1 className="text-6xl font-semibold">This week specials!</h1>
                <Link href={'/menu'} className="bg-yellow px-9 py-3 rounded-full text-xl font-medium hover:opacity-80">Online Menu</Link>
            </div>

            <div className="grid grid-cols-3 gap-24">
                {thisWeekSpecials?.length > 0 && thisWeekSpecials.map(item =>(
                    <MenuItem {...item } key={item}/>
                ))}
            </div>
        </section>
    )
}