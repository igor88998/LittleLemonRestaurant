export default function AddressInputs({addressProps, setAddressProps, disabled=false}) {

    const {phone, streetAddress, zipCode, city, country} = addressProps

    return (
        <>
            <label>Phone number</label>
            <input
                disabled={disabled}
                type="tel" placeholder="Phone number"
                value={phone} onChange={ev => setAddressProps('phone', ev.target.value)} />

            <label>Street address</label>
            <input
                disabled={disabled}
                type="text" placeholder="Street address"
                value={streetAddress} onChange={ev => setAddressProps('streetAddress', ev.target.value)} />
            <div className="flex justify-between gap-2">

                <div className="w-full">
                    <label>ZIP code</label>
                    <input
                        disabled={disabled}
                        type="text" placeholder="ZIP code"
                        value={zipCode} onChange={ev => setAddressProps('zipCode', ev.target.value)} />
                </div>

                <div className="w-full">
                    <label>City</label>
                    <input
                        disabled={disabled}
                        type="text" placeholder="City"
                        value={city} onChange={ev => setAddressProps('city', ev.target.value)} />
                </div>

            </div>

            <label>Country</label>
            <input
                disabled={disabled}
                type="text" placeholder="Country"
                value={country} onChange={ev => setAddressProps('country', ev.target.value)} />
        </>
    )
}