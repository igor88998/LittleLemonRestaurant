import { useState } from "react"

export default function Switch({...item}) {

    const {size} = item
    const [isSelected, setIsSelected] = useState(false)

    return (
        <label>
            <input type="checkbox" className="flex bg-light-gray rounded-full ">
                <span className="">
                    {size}
                </span>
            </input>
        </label>
    )
}