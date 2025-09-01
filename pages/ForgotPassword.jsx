import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [errorm, setErrorm] = useState(null)
    const [loading, setLoading] = useState(true)
    const [successMsg, setSuccessMsg] = useState(null)

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await api.post('/auth/forgot-password', { email })

            if (res?.data?.success) {
                setLoading(false)
                toast.success(res?.data?.message)
                setSuccessMsg(res?.data?.message)
            }

            console.log(res.data)


        } catch (error) {
            setLoading(false)
            setErrorm(error.response?.data?.message)
        }
    }

    // if (loading ) {
    //     return (
    //         <div>loadingssdss....</div>
    //     )
    // }

    if (successMsg) {
        return (
            <div>
                {successMsg}
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Enter a valid Email
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    Enter your email below
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition"
                    >
                        send Email
                    </button>
                </form>

                <button onClick={() => navigate(-1)}>Back to login</button>

            </div>
        </div>
    );
}

export default ForgotPassword