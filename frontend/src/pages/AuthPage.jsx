import { useState } from "react"
import LoginForm from "../components/LoginForm"
import SignUpForm from "../components/SignUpForm"

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="w-full max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-white mb-8">
                    {isLogin ? "Sign in to your account" : "Create a new account"}
                </h2>

                <div className="bg-base-100 shadow-xl rounded-lg p-8">
                    {isLogin ? <LoginForm /> : <SignUpForm />}

                    <div className="text-center mt-8">
                        <p className="text-sm text-base-content/70">
                            {isLogin ? "New user?" : "Already have an account?"}
                        </p>

                        <button
                            onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
                            className="mt-2 text-primary hover:text-primary/70 font-medium transition-colors duration-300"
                        >
                            {isLogin ? "Create a new account" : "Sign in to your account"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage