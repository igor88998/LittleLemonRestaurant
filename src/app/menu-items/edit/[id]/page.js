'use client'
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import UserTabs from "@/components/layout/UserTabs";
import DeleteButton from "@/components/DeleteButton";
import MenuItemForm from "@/components/layout/MenuItemForm"
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/components/icons/Left";

export default function EditMenuItemPage() {

    const {id} = useParams()
    
    const [menuItem, setMenuItem] = useState(null)
    const [redirectToItems, setRedirectToItems] = useState(false)
    const { loading, data } = useProfile()

    useEffect(() => {

        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id)
                setMenuItem(item)
            })
        })
    }, [id])

    async function handleFormSubmit(ev, data) {
        ev.preventDefault()
        data = { ...data, _id:id }
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items?_id='+id, {
                method: 'DELETE'
            })
            if (response.ok) {
                resolve()
            } else {
                reject()
            }
        })
        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Item deleted',
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
            <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
            <div className="max-w-xl mx-auto mt-4">
                <div className="max-w-sm ml-auto pl-10">
                    <DeleteButton 
                        label={'Delete this item'} 
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>
        </section>
    )
}