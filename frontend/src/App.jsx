import { Navigate, Route, Routes } from "react-router"

import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import ProfilePage from "./pages/ProfilePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { LoaderIcon } from "lucide-react"

const App = () => {
    const { checkAuth, authUser, checkingAuth } = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="size-10 animate-spin" />
            </div>
        )
    }

    return (
        <div className="relative h-full w-fll">
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00DDFF40_100%)]" />
            <Routes>
                <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/auth"} />} />
                <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to={"/"} />} />
                <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/auth"} />} />
                <Route path="/create" element={authUser ? <CreatePage /> : <Navigate to={"/auth"} />} />
                <Route path="/note/:id" element={authUser ? <NoteDetailPage /> : <Navigate to={"/auth"} />} />
            </Routes>
        </div>
    )
}

export default App