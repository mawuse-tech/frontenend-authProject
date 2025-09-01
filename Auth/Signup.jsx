import React from 'react'
import toast from 'react-hot-toast';
import { data, NavLink, useNavigate } from 'react-router-dom';
import api from '../config/axios';

const Signup = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const { firstName, lastName, email, password, confirmPassword } = formData
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return toast.error('all field required')
        }

        if(password !== confirmPassword){
            return toast.error('password and confirmpassword should match')
        }//handle it on the front end to prevent unessarilly hitting the server. 

        try {
            const response = await api.post('/auth', {
                firstName,
                lastName,
                email,
                password,
                confirmPassword

            });

            if (response.data)
            window.localStorage.setItem("token",(response.data.token))

            toast.success('user created and logged in successfully')

            navigate('/home', {replace: true})

            console.log(response)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }

    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Create an Account
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-4">
                    Already have an account?{" "}
                    <NavLink to="/" className="text-purple-600 hover:underline">login</NavLink>
                </p>
            </div>
        </div>
    );
}

export default Signup