import Cancel from "@/components/icons/Cancel"
import Image from "next/image"
import { cartProductPrice } from "@/components/AppContext"

export default function CartProduct({ product, onRemove, decreaseCount, increaseCount }) {
    return (
        <div key={product.id} className="max-w-4xl mx-auto">
            <div style={{ gridTemplateColumns: '.4fr .9fr' }} className="grid grid-cols-2 items-center border-b border-gray py-2 text-white">
                <div>
                    <Image src={product.image} alt={product.name} width={300} height={300} />
                </div>
                <div>
                    <div className="grid grid-cols-4 items-center text-3xl justify-center pl-5">
                        <div>
                            {product.name}

                            {product.size && (
                                <div className=" text-2xl text-light-gray">
                                    Size: <span>{product.size.name}</span>
                                </div>
                            )}
                            {product.extras?.length > 0 && (
                                <div className="text-lg text-secondary">
                                    {product.extras.map(extra => (
                                        <div key={extra}>{extra.name} ${extra.price}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4 justify-center items-center">
                            <button
                                type="button"
                                className="hover:text-yellow cursor-pointer"
                                onClick={() => decreaseCount(index)}>-</button>
                            <div className="cursor-default">{product.count}</div>
                            <button
                                type="button"
                                className="hover:text-yellow cursor-pointer"
                                onClick={() => increaseCount(index)}>+</button>
                        </div>
                        <div className="flex justify-center">
                            ${cartProductPrice(product)}
                        </div>
                        <button
                            onClick={() => onRemove(index)}
                            type="button"
                            className="flex justify-center"><Cancel /></button>
                    </div>
                </div>
            </div>
        </div>
    )

}