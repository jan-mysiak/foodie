import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import "firebase/auth";
import { firebaseConfig } from '../config';
import { useSelector } from 'react-redux';
import useListener from './useListener';
import { ACTION_TYPES } from '../actionTypes';
import { productConverter, groceryConverter, colorConverter, categoryConverter } from '../converters';

export default function useInitializer() {
    const { userId } = useSelector(s => s.user);
    const [authError, setAuthError] = useState("");

    // Listeners
    const categoryListener = useListener("categories");
    const productListener = useListener("products");
    const colorListener = useListener("colors");
    const groceryListener = useListener("groceries");

    useEffect(() => {
        const cancelListeners = () => {
            colorListener.cancel();
            productListener.cancel();
            groceryListener.cancel();
            categoryListener.cancel();
        }

        // Initialize app
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // Sign in anonymously
        if (!firebase.auth().currentUser) {
            firebase.auth()
                .signInAnonymously()
                .then(() => {
                    setAuthError("");
                })
                .catch(err => {
                    console.error(err);
                    setAuthError(err);
                })
        }

        // User disconnects
        if (!userId) {
            cancelListeners();
            return;
        }

        // Listen for changes
        if (!categoryListener.isActive) {
            categoryListener.listen(categoryConverter, ACTION_TYPES.categories, ["name", "desc"]);
        }
        if (!colorListener.isActive) {
            colorListener.listen(colorConverter, ACTION_TYPES.colors)
        }
        if (!productListener.isActive) {
            productListener.listen(productConverter, ACTION_TYPES.products, ["name", "desc"]);
        }
        if (!groceryListener.isActive) {
            groceryListener.listen(groceryConverter, ACTION_TYPES.groceries, ["product.name", "desc"]);
        }

        // Cleanup
        return () => cancelListeners();
    }, [userId, productListener, groceryListener, categoryListener, colorListener]);

    return authError;
}
