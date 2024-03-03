'use client';
import Image from "next/image"
import Link from 'next/link';
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false)

    async function handleFormSubmit(ev) {
        ev.preventDefault()
        setLoginInProgress(true)

        await signIn('credentials', {email, password, callbackUrl: '/'})

        setLoginInProgress(false)
    }
    return (
        <section>
            <h1 className="text-center text-primary text-5xl font-semibold">
                Login
            </h1>
            <form className="max-w-xs mx-auto text-lg" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" value={email}
                    disabled={loginInProgress}
                    onChange={ev => setEmail(ev.target.value)} />
                <input type="password" name="password" placeholder="password" value={password}
                    disabled={loginInProgress}
                    onChange={ev => setPassword(ev.target.value)} />
                <button disabled={loginInProgress} type="submit" className="hover:opacity-90 w-full mb-2">
                    Login
                </button>

                <button type="button" onClick={() => signIn('google', {callbackUrl: '/'})}
                     className="flex justify-center items-center gap-4 border hover:bg-primary hover:text-white transition-all w-full">
                    <Image src={'/google.png'} alt="" width={24} height={24} />
                    Login with google
                </button>
                <div className="text-center">
                    Don&apos;t have an account? {''}
                    <Link className="underline hover:opacity-60 transition-all" href={'/register'}>Register here &raquo;</Link>
                </div>
            </form>
        </section>
    )
}