import Trash from "@/components/icons/Trash"
import Plus from "@/components/icons/Plus"
import Open from "@/components/icons/Open"
import Close from "@/components/icons/Close"
import { useState } from "react"

export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {

    const [isOpen, setIsOpen] = useState(false)

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: 0 }]
        })
    }

    function editProp(ev, index, prop) {
        const newValue = ev.target.value
        setProps(prevSizes => {
            const newSizes = [...prevSizes]
            newSizes[index][prop] = newValue
            return newSizes
        })
    }

    function removeProp(indexToRemove) {
        setProps(prev => prev.filter((v, index) => index !== indexToRemove))
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                type="button"
                className="flex items-center gap-2 cursor-pointer bg-light-gray w-full rounded-xl mb-4 text-gray">
                {isOpen && (
                    <>
                        <Open />
                        <span className="text-black">{name}</span>
                    </>
                )}
                {!isOpen && (
                    <>
                        <Close />
                        <span>{name}</span>
                        <span>({props?.length})</span>
                    </>
                )}
            </button>
            <div>

            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} bg-light-gray p-2 mb-4 rounded-xl gap-5`}>

                {props?.length > 0 && props.map((size, index) => (
                    <div key={size} className="flex gap-5 items-end">
                        <div>
                            <label>Name</label>
                            <input
                                className="border"
                                type="text"
                                placeholder="Size name"
                                value={size.name}
                                onChange={ev => editProp(ev, index, 'name')}
                            />
                        </div>
                        <div>
                            <label>Extra price</label>
                            <input sx
                                className="border"
                                type="text"
                                placeholder="Extra price"
                                value={size.price}
                                onChange={ev => editProp(ev, index, 'price')}
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => removeProp(index)}
                                className="text-red-600 bg-white rounded-xl mb-4 border py-3 px-4">
                                <Trash />
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addProp}
                    className="bg-white rounded-lg w-full hover:opacity-80 items-center flex justify-center gap-4">
                    <Plus />
                    <span className="mt-0.5">{addLabel}</span>
                </button>
            </div>
        </>
    )
}