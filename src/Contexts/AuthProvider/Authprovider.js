import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import toast from 'react-hot-toast';

export const AuthContext = createContext();
const auth = getAuth(app);

const Authprovider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const providerLogin = (provider) =>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile=(profile)=>{
        return updateProfile(auth.currentUser, profile);
    }

    const verifyEmail = ()=>{
        return sendEmailVerification(auth.currentUser);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            if(currentUser === null || currentUser.emailVerified){
                setUser(currentUser);
            }
            
            setLoading(false);
        });
        return ()=> unsubscribe();
    },[])

    const authInfo = { user, loading, verifyEmail ,providerLogin, updateUserProfile ,createUser, signIn ,logOut, setLoading };
    return (
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
    );
};

export default Authprovider;