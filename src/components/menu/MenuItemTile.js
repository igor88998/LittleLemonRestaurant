import Image from 'next/image';


export default function MenuItemTile({onAddToCart, ...item}) {

    const {image, description, name, basePrice} = item

    return (
        <div onClick={onAddToCart} className=" bg-secondary hover:bg-white hover:shadow-md transition-all">
            <Image className='max-h-[200px] min-h-[200px]' src={image} width={400} height={400} alt={name} />
            <div className="px-5 py-3">
                <div className="flex justify-between items-center select-none my-3">
                    <h2 className="text-2xl font-medium">{name}</h2>
                    <p className="text-2xl text-orange">${basePrice}.99</p>
                </div>
                <p className="text-lg text-dark-gray font-light select-none line-clamp-3">
                    {description}
                </p>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={onAddToCart}
                        className='text-xl my-5 p-0 hover:text-gray transition-all'>
                        Order a delivery
                    </button>
                    <Image src={'/delivery.png'} width={20} height={20} alt='' />
                </div>
            </div>
        </div>
    )
}