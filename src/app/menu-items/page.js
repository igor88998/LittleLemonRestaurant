'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import Right from "@/components/icons/Right"
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {


    const [menuItems, setMenuItems] = useState([])
    const { loading, data } = useProfile()

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })
    }, [])

    if (loading) {
        return 'Loading user info...'
    }

    if (!data.admin) {
        return 'Not an admin'
    }

    return (
        <section className="max-w-lg mx-auto mt-7">
            <UserTabs isAdmin={true}/>
            <div>
                <Link
                    className="bg-primary text-white px-3 py-2 text-xl rounded-full w-full flex justify-center items-center gap-2 cursor-pointer hover:opacity-80"
                    href={'/menu-items/new'}>
                    Create new menu item
                    <Right/>
                </Link>
            </div>
            <div>
                <h2 className="mt-7 text-gray">Edit menu item:</h2>
                <div className="grid grid-cols-3 gap-5">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link 
                            href={'/menu-items/edit/'+item._id} 
                            className="bg-secondary text-lg hover:bg-white hover:shadow-md transition-all" 
                            key={item.name}>
                            <div className="flex justify-center ">
                                <Image className="max-h-[160px] min-h-[160px] object-cover" src={item.image} alt={''} width={400} height={400} />
                            </div>
                            <div className="text-center">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}