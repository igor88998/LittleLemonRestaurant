"use client";
import Image from "next/image"
import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from 'next/link';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false)
    const [userCreated, setUserCreated] = useState(false)
    const [error, setError] = useState(false)

    async function handleFormSubmit(ev) {
        ev.preventDefault()
        setCreatingUser(true)
        setError(false)
        setUserCreated(false)

        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            setUserCreated(true)
        }
        else {
            setError(true)
        }
        
        setCreatingUser(false)
    }
    return (
        <section>
            <h1 className="text-center text-primary text-5xl font-semibold">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created. Now you can {''}
                    <Link className="underline cursor-pointer hover:opacity-60 transition-all" href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    Error. Please try again later
                </div>
            )}
            <form className="block max-w-xs mx-auto text-lg" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email}
                    disabled={creatingUser}
                    onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder="password" value={password}
                    disabled={creatingUser}
                    onChange={ev => setPassword(ev.target.value)} />
                <button
                type="submit" disabled={creatingUser}
                className="hover:opacity-90 transition-all w-full mb-2">
                    Register
                </button>

                <button
                    onClick={() => signIn('google', {callbackUrl: '/'})}
                    className="flex justify-center items-center gap-4 border hover:bg-primary hover:text-white transition-all w-full">
                    <Image src={'/google.png'} alt="" width={24} height={24} />
                    Register with google
                </button>
                <div className="text-center">
                    Existing account? {''}
                    <Link className="underline hover:opacity-60 transition-all" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>

    )
}