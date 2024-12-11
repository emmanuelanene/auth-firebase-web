import { auth } from './firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,

    sendEmailVerification,
    updatePassword,
    sendPasswordResetEmail,
} from "firebase/auth";


export const doCreateUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = async (email, password) => {
    const xyz = await signInWithEmailAndPassword(auth, email, password)
    return xyz
}

export const doSignOut = async () => {
    return await auth.signOut()
}

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
    return result.user
}


export const doPasswordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email);
}

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password)
}

export const doSendEmailVerificationEmail = () => {
    return sendEmailVerification(
        auth.currentUser,
        {
            url: `${window.location.origin}/home`
        }
    )
}
