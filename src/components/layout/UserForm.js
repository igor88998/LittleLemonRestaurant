'use client'
import EditableImage from "@/components/layout/EditableImage"
import { useState } from "react"
import { useProfile } from "../UseProfile"
import AddressInputs from "./AddressInputs"

export default function UserForm({user, onSave}) {

    const [userName, setUserName] = useState(user?.name || '')
    const [image, setImage] = useState(user?.image || '')
    const [phone, setPhone] = useState(user?.phone || '')
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '')
    const [zipCode, setZipCode] = useState(user?.zipCode || '')
    const [city, setCity] = useState(user?.city || '')
    const [country, setCountry] = useState(user?.country || '')
    const [admin, setAdmin] = useState(user?.admin || false)
    const {data: loggedInUserData} = useProfile()

    function  handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value)
        if (propName === 'streetAddress') setStreetAddress(value)
        if (propName === 'zipCode') setZipCode(value)
        if (propName === 'city') setCity(value)
        if (propName === 'country') setCountry(value)
    }

    return (
        <div className="max-w-lg mx-auto text-lg px-12 py-5 shadow-2xl drop-shadow-xl rounded-3xl bg-white">
        <div className="flex justify-center">
            <div className="max-w-[96px] max-h-[96px]">
                <EditableImage link={image} setLink={setImage}/>
            </div>
        </div>
        
        <div className="my-5 border-b-2 border-primary mt-10">
            <h3 className="text-2xl">My account</h3>
        </div>
        <form onSubmit={ev => onSave(ev, {name: userName, image, phone, streetAddress, zipCode, city, admin })}>

            <label>First and last name</label>
            <input type="text" placeholder="First and last name"
                value={userName} onChange={ev => setUserName(ev.target.value)} />

            <label>Email</label>
            <input type="email" disabled value={user?.email} placeholder="Email" />

            <AddressInputs 
                addressProps={{phone, streetAddress, zipCode, city, country}}
                setAddressProps={handleAddressChange}
            />

            {loggedInUserData.admin && (
                <div className="flex items-center gap-2 mb-4 ml-2">
                <input 
                    id="adminCb" 
                    type="checkbox" 
                    value={'1'}
                    checked={admin}
                    onClick={ev => setAdmin(ev.target.checked)}
                />
                <label htmlFor="adminCb" className="mt-0.5">Admin</label>
            </div>
            )}
            <div className="flex justify-center">
                <button className="w-36 flex justify-center hover:opacity-80 transition-all" type="submit">Save</button>
            </div>
        </form>
    </div>
    )
}