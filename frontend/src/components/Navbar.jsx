import { LogOut, Menu, PlusIcon, User } from "lucide-react"
import { Link } from "react-router"
import { useAuthStore } from "../store/useAuthStore"
import { useEffect, useRef, useState } from "react"

const Navbar = () => {
    const { authUser, logout } = useAuthStore()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">StudyTracker</h1>
                    <div className="flex items-center gap-4">
                        <Link to={"/create"} className="btn btn-primary">
                            <PlusIcon className="size-5" />
                            <span>New Note</span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-4">
                            {authUser ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center space-x-2 focus:outline-none"
                                    >
                                        <img
                                            src={authUser.image || "/avatar.png"}
                                            className="h-10 w-10 object-cover rounded-full border-2 border-primary"
                                            alt="User image"
                                        />
                                        <span className="text-primary font-extrabold text-2xl">
                                            {authUser.name}
                                        </span>
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-md shadow-lg py-1 z-10">
                                            <Link
                                                to={"/profile"}
                                                onClick={() => setDropdownOpen(false)}
                                                className="px-4 py-2 text-sm text-primary hover:text-primary-content hover:bg-primary flex items-center"
                                            >
                                                <User className="mr-2" size={16} />
                                                Profile
                                            </Link>
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2 text-sm text-primary hover:text-primary-content hover:bg-primary flex items-center"
                                            >
                                                <LogOut className="mr-2" size={16} />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link
                                        to={"/auth"}
                                        className="text-white hover:text-primary transition duration-150 ease-in-out"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to={"/auth"}
                                        className="bg-white text-primary hover:text-primary/70 transition duration-150 ease-in-out px-4 py-2 rounded-full font-medium"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="focus:outline-none text-primary"
                            >
                                <Menu className="size-6" />
                            </button>
                        </div>

                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden bg-base-100">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {authUser ? (
                                <>
                                    <Link
                                        to='/profile'
                                        className='block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary-content hover:bg-primary'
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary-content hover:bg-primary'
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to='/auth'
                                        className='block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary-content hover:bg-primary'
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to='/auth'
                                        className='block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary-content hover:bg-primary'
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar