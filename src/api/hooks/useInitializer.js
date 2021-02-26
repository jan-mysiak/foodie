import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import { firebaseConfig } from '../config';
import { useSelector } from 'react-redux';

export default function useInitializer() {
    const { userId } = useSelector(s => s.user);
    const [authError, setAuthError] = useState("");

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        if (!firebase.auth().currentUser) {
            firebase.auth()
                .signInAnonymously()
                .then(() => {
                    console.log("Signed in anonymously")
                    setAuthError("");
                })
                .catch(err => {
                    console.error(err);
                    setAuthError(err);
                })
        }
    }, [userId])

    return authError;
}
