'use client'
import { useProfile } from "@/components/UseProfile";
import { useState } from "react";
import { redirect } from "next/navigation";
import UserTabs from "@/components/layout/UserTabs";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItemPage() {

    const [redirectToItems, setRedirectToItems] = useState(false)
    const { loading, data } = useProfile()

    async function handleFormSubmit(ev, data) {
        ev.preventDefault()
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
            if (response.ok) {
                resolve()
            } else {
                reject()
            }
        })
        await toast.promise(savingPromise, {
            loading: 'Saving item...',
            success: 'Item saved',
            error: 'Error'
        })

        setRedirectToItems(true)
    }

    if (redirectToItems) {
        return redirect('/menu-items')
    }

    if (loading) {
        return 'Loading user info...'
    }

    if (!data.admin) {
        return 'Not an admin'
    }

    return (
        <section className="max-w-lg mx-auto mt-7">
            <UserTabs isAdmin={true} />
            <div className="mb-7">
                <Link href={'/menu-items'} className="bg-primary text-white text-xl items-center px-3 py-2 rounded-full flex justify-center gap-2 hover:opacity-80">
                    <Left />
                    <span>Show all the menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
        </section>
    )
}