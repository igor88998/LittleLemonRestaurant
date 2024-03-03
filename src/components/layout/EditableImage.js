import Image from "next/image"
import toast from "react-hot-toast"

export default function EditableImage({ link, setLink }) {

    async function handleFileChange(ev) {
        const files = ev.target.files
        if (files?.length === 1) {
            const data = new FormData
            data.set('file', files[0])

            const uploadPromise = fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then(response => {
                if (response.ok) {
                    return response.json().then(link => {
                        setLink(link)
                    })
                }
                throw new Error('Something went wrong')
            })

            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Uploading complete',
                error: 'Error!'
            })
        }
    }

    return (
        <div>
            {link && (
                <Image className="rounded-xl mb-1" src={link} width={400} height={400} alt={'avatar'} />
            )}
            {!link && (
                <div className="bg-light-gray p-4 whitespace-nowrap text-center mb-1 rounded-lg">
                    No image
                </div>
            )}
            <label>
                <input type="file" className="hidden" onChange={handleFileChange}/>
                <span className="block border border-light-gray p-1 text-center rounded-lg cursor-pointer hover:border-black hover:text-black">Edit</span>
            </label>
        </div>
    )
}