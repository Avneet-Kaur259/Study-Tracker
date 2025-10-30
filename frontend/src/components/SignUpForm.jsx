import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const SignUpForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signup, loading } = useAuthStore()

    return (
        <form className='space-y-6'
            onSubmit={(e) => {
                e.preventDefault();
                signup({ name, email, password });
            }}
        >
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
                <label htmlFor='email' className="label">
                    Email Address
                </label>
                <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    placeholder='Type Email Address Here'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='input input-bordered'
                />
            </div>

            <div className='form-control mb-4'>
                <label htmlFor='password' className="label">
                    Password
                </label>
                <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    placeholder='Type Password Here'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='input input-bordered'
                />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? "Signing up..." : "Sign up"}
            </button>
        </form>
    )
}

export default SignUpForm