import React, {useEffect, useState} from 'react'
import {useContext} from "react";
import { onAuthStateChanged } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import {auth} from "../../firebase/firebase";
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [isEmailUser, setIsEmailUser] = useState(false)
    const [isGoogleUser, setIsGoogleUser] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser)
        return unsubscribe
    }, [])

    const initializeUser = (user) => {
        if (user) {
            setUserLoggedIn(true)

            setCurrentUser({...user});

            const isEmail = user.providerData.some(
                (provider) => provider.providerId === "password"
            )
            setIsEmailUser(isEmail);


            const isGoogle = user.providerData.some(
                (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
            )
            setIsGoogleUser(isGoogle);
        }

        else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }


        setLoading(false)
    }

    const values = {
        currentUser,
        userLoggedIn,
        isEmailUser,
        isGoogleUser,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={values}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
export default AuthProvider
