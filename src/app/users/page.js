'use client'
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";

export default function UsersPage() {

    const [users, setUsers] = useState([])
    const {data, loading} = useProfile()

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users)
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
                {users?.length > 0 && users.map(user =>(
                    <div key={user._id} className="bg-light-gray flex gap-4 items-center px-3 rounded-xl mb-2">
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 grow" >
                            <div>
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className="italic">No name</span>)}
                                
                            </div>
                            {/* <div>
                                {admin && (<span className="text-red-600">Admin</span>)}
                                {!admin && (<span>Not an Admin</span>)}
                            </div> */}
                            <span className="text-dark-gray">{user.email}</span>
                        </div>
                        <div className="py-2">
                            <Link 
                                className="bg-primary text-white px-3 py-1  rounded-xl"
                                href={'/users/'+user._id}>
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}