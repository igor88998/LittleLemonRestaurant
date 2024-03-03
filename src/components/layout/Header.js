'use client'
import Link from 'next/link'
import Image from 'next/image'
import Cart from '@/components/icons/Cart'
import { signOut, useSession } from 'next-auth/react'
import { useContext } from 'react'
import { CartContext } from '../AppContext'

export default function Header() {
    const session = useSession()
    const status = session?.status
    const userData = session.data?.user
    let userName = userData?.name || userData?.email
    const { cartProducts } = useContext(CartContext)
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0]
    }
    return (
        <header className='flex items-center justify-between h-36 max-w-5xl mx-auto'>
            <Link href={"/"}><Image src={'/Logo.png'} priority={true} width={215} height={60} alt={'Logo'} style={{ width: 215, height: 60 }} /></Link>
            <nav className='flex items-center gap-6 font-medium text-xl mt-1.5'>
                <Link href={'/'} className='hover:text-primary transition-all'>HOME</Link>
                <Link href={'/menu'} className='hover:text-primary transition-all'>MENU</Link>
                <Link href={'/reservation'} className='hover:text-primary transition-all'>RESERVATION</Link>
                <Link href={'/#about'} className='hover:text-primary transition-all'>ABOUT</Link>
                <Link href={'/#contact'} className='hover:text-primary transition-all'>CONTACT</Link>
            </nav>

            <nav className='flex items-center gap-4 mt-1.5 text-lg font-medium'>
                {status === 'authenticated' && (
                    <>
                        <Link href={'/profile'} className="whitespace-nowrap cursor-pointer hover:text-primary transition-all">Hello, {userName}</Link>

                        <button
                            onClick={() => signOut()}
                            className='bg-primary rounded-full text-white px-8 py-2 hover:opacity-80 transition-all'>
                            LOGOUT
                        </button>
                    </>
                )}
                {status === 'unauthenticated' && (
                    <>
                        <Link href={'/login'} className='hover:text-primary transition-all'>LOGIN</Link>
                        <Link href={'/register'} className='bg-primary rounded-full text-white px-8 py-2 hover:opacity-80 transition-all'>REGISTER</Link>
                    </>
                )}
                <Link href={'/cart'} className="relative">
                    <Cart />
                    {cartProducts?.length > 0 && (
                        <span className="absolute bg-primary bottom-3 left-3 rounded-full items-center px-1.5 leading-4 text-xs text-white">
                            {cartProducts.length}
                        </span>
                    )}
                </Link>
            </nav>
        </header>
    )
}