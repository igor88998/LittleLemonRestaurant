export default function ChangeCount({ increaseNumberOfItems, decreaseNumberOfItems, selectedPrice }) {

    return (
        <div className="flex justify-between items-center text-3xl my-3">
            <div className="">
                ${selectedPrice}
            </div>
            <div className="flex gap-4 items-center">
                <span
                    className="hover:text-yellow cursor-pointer"
                    onClick={() => decreaseCartQuantity(_id)}>-</span>
                <div className="cursor-default">{quantity}</div>
                <span
                    className="hover:text-yellow cursor-pointer"
                    onClick={() => increaseCartQuantity(_id)}>+</span>
            </div>
        </div>
    )
}