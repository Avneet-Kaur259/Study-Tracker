import { useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuthStore } from '../store/useAuthStore'
import { useUserStore } from '../store/useUserStore'
import { Link } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'

const ProfilePage = () => {
    const { authUser } = useAuthStore()
    const [name, setName] = useState(authUser.name || "")
    const [image, setImage] = useState(authUser.image || null)

    const fileInputRef = useRef()

    const { loading, updateProfile } = useUserStore()

    const handleSubmit = (e) => {
        e.preventDefault()
        updateProfile({ name, image })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result)
            }

            reader.readAsDataURL(file)
        }
    }

    console.log(image);


    return (
        <div className='min-h-screen bg-base-200 flex flex-col'>
            <Navbar />

            <div className="flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <Link to={"/"} className="btn btn-ghost mb-6">
                        <ArrowLeftIcon className="size-5" />
                        Back to Notes
                    </Link>
                    <div className="bg-base-100 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-base-200">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            <h2 className="mb-6 text-center text-3xl font-extrabold">Your Profile</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='form-control mb-4'>
                                <label htmlFor='name' className="label">
                                    Name
                                </label>
                                <input
                                    id='name'
                                    name='name'
                                    type='text'
                                    required
                                    placeholder='Type Your Name Here'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='input input-bordered'
                                />
                            </div>

                            <div className='form-control mb-4'>
                                <label htmlFor='name' className="label">
                                    Cover Image
                                </label>
                                <button
                                    type='button'
                                    onClick={() => fileInputRef.current.click()}
                                    className='btn btn-primary w-1/2'
                                >
                                    Upload Image
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageChange}
                                    className='hidden'
                                />
                            </div>

                            {image && (
                                <div className="mt-4 mb-4">
                                    <img src={image} alt="User Image" className='w-48 h-full object-cover rounded-md' />
                                </div>
                            )}

                            <button type="submit"
                                className="btn btn-primary w-full"
                                disabled={loading}>
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage