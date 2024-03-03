import { useState } from "react"

export default function DeleteButton({ label, onDelete }) {

    const [showConfirm, setShowConfirm] = useState(false)

    if (showConfirm) {
        return (
            <div className="flex gap-3 whitespace-nowrap text-sm">
                <button 
                    onClick={() => setShowConfirm(false)}
                    className="w-full border text-gray py-1.5" 
                    type="button">
                    Cancel
                </button>
                <button 
                    onClick={onDelete}
                    className="w-full text-white bg-red-600 py-1.5" 
                    type="button">
                    Yes, delete!
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            type="button"
            className="border w-full text-red-600 bg-white">
            {label}
        </button>
    )
}