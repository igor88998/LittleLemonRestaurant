'use client'
import UserTabs from "@/components/layout/UserTabs";
import DeleteButton from "@/components/DeleteButton"
import { useEffect, useState } from "react";
import { useProfile } from "../../components/UseProfile";
import toast from "react-hot-toast";
import Trash from "@/components/icons/Trash"

export default function CategoriesPage() {

    const [categoryName, setCategoryName] = useState('')
    const [categories, setCategories] = useState([])
    const { loading: profileLoading, data: profileData } = useProfile()
    const [editedCategory, setEditedCategory] = useState(null)

    useEffect(() => {
        fetchCategories()
    }, [])

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }

    async function handleCategorySubmit(ev) {
        ev.preventDefault()
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName }
            if (editedCategory) {
                data._id = editedCategory._id
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            setCategoryName('')
            fetchCategories();
            setEditedCategory(null)
            if (response.ok) {
                resolve()
            } else {
                reject()
            }
        })
        await toast.promise(creationPromise, {
            loading: editedCategory 
                ? 'Updating category...' 
                : 'Creating your new category...',
            success: editedCategory 
                ? 'Category updated' 
                : 'Category created',
            error: 'Error'
        })
    }

    async function handleDeleteClick(_id) {
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id='+_id, {
                method: 'DELETE'
            })
            if (response.ok) {
                resolve()
            } else {
                reject()
            }
        })

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Category deleted',
            error: 'Error'
        })

        fetchCategories()
    }

    if (profileLoading) {
        return 'Loading user info...'
    }

    if (!profileData.admin) {
        return 'Not an admin'
    }

    return (

        <section className="max-w-lg mx-auto mt-7">
            <UserTabs isAdmin={true} />
            <form onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-center">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category' : 'New category name'}
                            {editedCategory &&  (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input
                            className="text-lg"
                            type="text"
                            value={categoryName}
                            onChange={ev => setCategoryName(ev.target.value)}
                        />
                    </div>

                    <div className="pt-2 flex gap-2">
                        <button type="submit" className="text-lg">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEditedCategory(null)
                                setCategoryName('')
                            }}
                            className="border text-gray">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-gray">Existing categories</h2>
                {categories?.length > 0 && categories.map(c => (
                    <div 
                        
                        key={c} 
                        className="bg-light-gray px-3 py-2 flex w-full rounded-xl mb-1 text-lg justify-between items-center">
                        <span className="cursor-pointer hover:text-gray">{c.name}</span>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => {
                                    setEditedCategory(c)
                                    setCategoryName(c.name)
                                }}
                                className="bg-primary text-white text-xs " 
                                type="button">
                                Edit
                            </button>
                            <DeleteButton label={<Trash />} onDelete={() => handleDeleteClick(c._id)}/>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    )
}