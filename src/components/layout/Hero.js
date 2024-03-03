import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
    return (
        <section>
            <div className='bg-primary'>
                <div className="hero max-w-5xl mx-auto py-8 h-96">
                    <div className="text-white">
                        <div>
                            <h1 className="text-yellow font-semibold text-7xl">Little Lemon</h1>
                            <h2 className="text-4xl">Chicago</h2>
                            <p className="text-2xl font-medium w-80 my-7">
                                We are a family owned Mediterranean restaurant, focused on
                                traditional recipes served with a modern twist.
                            </p>
                            <div className="bg-yellow text-black px-9 py-3 rounded-full text-xl font-medium hover:opacity-80 w-[160px] whitespace-nowrap flex justify-center">
                                <Link href={'/reservation'} >Reserve a Table</Link>
                            </div>
                        </div>

                    </div>

                    <div>
                        <Image src={'/Picture.png'} priority width={380} height={430} alt={''} />
                    </div>
                </div>
            </div>

        </section>
    )
}