import React, {useState} from 'react'
import {Link, Navigate} from "react-router-dom";
import {useAuth} from "../../contexts/authContext";
import {doCreateUserWithEmailAndPassword} from "../../firebase/auth";


const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)



    const { userLoggedIn } = useAuth()


    const onSubmit = async (e) => {
        e.preventDefault()

        if (!isLoading) {
            setIsLoading(true)
            await doCreateUserWithEmailAndPassword(email, password)
        }
    }

    return (
        <>
            {
                userLoggedIn && (<Navigate to={'/home'} replace={true} />)
            }

            <main className="h-screen place-content-center place-items-center">
                <div className="bg-white shadow-xl w-96 text-center px-8 py-10 rounded-lg">
                    <div>
                        <p className={`font-bold text-3xl text-gray-600 pb-8`}>Create Account</p>
                    </div>


                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className={`w-full text-left`}>
                            <label className="font-bold text-gray-600">Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                placeholder="Email Address"
                                required
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                className="w-full border border-gray-300 rounded-lg outline-0 px-4 py-2 mt-2 transition duration-300 ease-in-out focus:border-indigo-600"
                            />
                        </div>


                        <div className={`w-full text-left`}>
                            <label className="font-bold text-gray-600">Password</label>
                            <input
                                disabled={isLoading}
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                className="w-full border border-gray-300 rounded-lg outline-0 px-4 py-2 mt-2 transition duration-300 ease-in-out focus:border-indigo-600"
                            />
                        </div>


                        <div className={`w-full text-left`}>
                            <label className="font-bold text-gray-600">Confirm Password</label>
                            <input
                                disabled={isLoading}
                                type="password"
                                placeholder="Confirm Password"
                                required
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }}
                                className="w-full border border-gray-300 rounded-lg outline-0 px-4 py-2 mt-2 transition duration-300 ease-in-out focus:border-indigo-600"
                            />
                        </div>


                        <div className={`pt-4`}>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-indigo-600 text-white py-2 rounded-lg ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 transition duration-300 hover:shadow-xl'}`}
                            >
                                {isLoading ? "Signing in..." : "Sign Up"}
                            </button>
                        </div>


                        <div>
                            Already have an account? {' '}
                            <Link to={'/login'}>Login</Link>
                        </div>
                    </form>
                </div>
            </main>

        </>
    )
}
export default Register
