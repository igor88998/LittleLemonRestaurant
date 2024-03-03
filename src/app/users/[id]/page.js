'use client'
import { useProfile } from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {

    const [redirectToUsers, setRedirectToUsers] = useState(false)
    const {data, loading} = useProfile()
    const [user, setUser] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        fetch('/api/profile?_id='+id).then(response => {
            response.json().then(user => {
                setUser(user)
            })
        })
    }, [id])

    async function handleSaveButtonClick(ev, data) {
        ev.preventDefault()
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({...data, _id:id})
            })
            if (response.ok) {
                resolve()
            } else {
                reject()
            }
        })
        await toast.promise(promise, {
            loading: 'Saving user...',
            success: 'User saved',
            error: 'Error'
        })

        setRedirectToUsers(true)
    }

    if (redirectToUsers) {
        return redirect('/users')
    }

    if (loading) {
        return 'Loading user info...'
    }

    if (!data.admin) {
        return 'Not an admin'
    }

    return (
        <section style={{ backgroundImage: 'url("/back.png")' }} className="pt-7">
            <UserTabs isAdmin={true}/>
            <div>
                <UserForm user={user} onSave={handleSaveButtonClick}/>
            </div>
        </section>
    )
}