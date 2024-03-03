import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../AppContext';
import MenuItemTile from '@/components/menu/MenuItemTile'
import toast from 'react-hot-toast';
import Image from 'next/image';
import Cancel from '@/components/icons/Cancel'

export default function MenuItem(menuItem) {
    const { _id, image, name, description, basePrice, sizes, extraIngredientPrices } = menuItem
    const { addToCart, getProductCount, setProductCount} = useContext(CartContext)
    const [showPopup, setShowPopup] = useState(false)
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
    const [selectedExtras, setSelectedExtras] = useState([])
    const [count, setCount] = useState(1)

    useEffect(() => {
        setCount(getProductCount(_id) || 1);
    }, [_id, getProductCount]);

    function handleAddToCartButtonClick() {
        if (!showPopup) {
            setShowPopup(true)
            return
        }
        addToCart(menuItem, selectedSize, selectedExtras, count);
        setShowPopup(false)
        toast.success('Added to cart')
    }

    function handleExtrasClick(ev, extras) {
        const checked = ev.target.checked
        if (checked) {
            setSelectedExtras(prev => [...prev, extras])
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extras.name)
            })
        }
    }

    let selectedPrice = basePrice
    if (selectedSize) {
        selectedPrice += selectedSize.price
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price
        }
    }
    
    selectedPrice *= count

    return (
        <>
            {showPopup && (
                <div
                    onClick={() => setShowPopup(false)}
                    className="fixed inset-0 bg-black/80 flex justify-center items-center">
                    <div>
                        <button className="relative top-3 left-[98%]" onClick={() => setShowPopup(false)}>
                            <Cancel />
                        </button>
                        <div
                            onClick={ev => ev.stopPropagation()}
                            className="bg-white p-1 rounded-2xl flex max-w-5xl max-h-screen overflow-scroll">
                            <div>
                                <Image className="rounded-l-xl h-full min-w-[600px]" src={image} alt={name} width={400} height={400} />
                            </div>
                            <div className="px-6 py-2">
                                <h1 className="text-3xl font-semibold">{name}</h1>
                                <p className="my-3 text-xl">{description}</p>
                                {sizes?.length > 0 && (
                                    <div className="mb-5">
                                        <div className="flex justify-center">
                                            <div className="flex bg-light-gray py-1 px-1 rounded-full">
                                                {sizes.map(size => (
                                                    <label key={size} className={`flex items-center text-xl text-black rounded-full px-4 py-1 transition-all duration-500 cursor-pointer hover:text-yellow ${selectedSize?.name === size.name ? 'bg-white' : ''}`}>
                                                        <input
                                                            onClick={() => setSelectedSize(size)}
                                                            checked={selectedSize?.name === size.name}
                                                            type="radio"
                                                            name="size"
                                                            className="sr-only" />
                                                        {size.name}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {extraIngredientPrices?.length > 0 && (
                                    <div className="mb-3">
                                        <h3 className="text-center">Pick your extras</h3>
                                        <div>
                                            {extraIngredientPrices?.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {extraIngredientPrices.map((extras, index) => (
                                                        <div key={index} className="mb-1 flex">
                                                            <input
                                                                onClick={ev => handleExtrasClick(ev, extras)}
                                                                type="checkbox"
                                                                name={extras.name}
                                                                className="peer hidden"
                                                                id={`react-option-${index}`} // Ensure each ID is unique
                                                            />
                                                            <label htmlFor={`react-option-${index}`} className={`py-1 px-3 border-2 border-light-gray rounded-full cursor-pointer hover:bg-light-gray text-black text-lg  ${extras.name ? "peer-checked:border-yellow" : ''}`}>
                                                                <div className="flex justify-between gap-1">
                                                                    <div>{extras.name}</div>
                                                                    <div>+${extras.price}</div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-3xl my-3">
                                    <div className="">
                                        ${selectedPrice}
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <button
                                            type="button"
                                            className="hover:text-yellow cursor-pointer"
                                            onClick={() => {
                                                setCount(prevCount => Math.max(prevCount - 1, 1));
                                                setProductCount(_id, count - 1);
                                            }}>-</button>
                                        <div className="cursor-default">{count}</div>
                                        <button
                                            type="button"
                                            className="hover:text-yellow cursor-pointer"
                                            onClick={() => {
                                                setCount(prevCount => prevCount + 1);
                                                setProductCount(_id, count + 1);
                                            }}>+</button>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        onClick={handleAddToCartButtonClick}
                                        className="text-xl bg-yellow">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
        </>
    );
}
