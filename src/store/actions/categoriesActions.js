import firebase from 'firebase/app';
import "firebase/firestore";
import {
    ADD_START, ADD_FAILED, ADD_COMPLETE,
    DELETE_START, DELETE_COMPLETE, DELETE_FAILED
} from '../statusTypes';


export const setCategories = (payload) => ({ type: "SET_CATEGORIES", payload });
export const addCategory = (payload) => ({ type: "ADD_CATEGORY", payload });
export const updateCategory = (payload) => ({ type: "UPDATE_CATEGORY", payload });
export const deleteCategory = (payload) => ({ type: "DELETE_CATEGORY", payload });
export const setCategoryStatus = (payload) => ({ type: "SET_CATEGORY_STATUS", payload });

// Async actions
export const addCategoryAsync = (userId, category) => async dispatch => {
    const batch = firebase.firestore().batch();
    const userRef = firebase.firestore().collection("users").doc(userId);

    const categoriesRef = userRef.collection("categories").doc();
    batch.set(categoriesRef, category);

    const colorsRef = userRef.collection("colors").doc(category.color.id);
    batch.update(colorsRef, { available: false });

    dispatch(setCategoryStatus(ADD_START));

    batch.commit()
        .then(() => dispatch(setCategoryStatus(ADD_COMPLETE)))
        .catch((err) => {
            dispatch(setCategoryStatus(ADD_FAILED));
            console.error(err)
        })
}

export const deleteCategoryAsync = (userId, category) => async dispatch => {
    if (!category || !userId) return;

    const batch = firebase.firestore().batch();
    const userRef = firebase.firestore().collection("users").doc(userId);

    const categoriesRef = userRef.collection("categories").doc(category.id);
    batch.delete(categoriesRef);

    const colorsRef = userRef.collection("colors").doc(category.colorId);
    batch.update(colorsRef, { available: true });

    dispatch(setCategoryStatus(DELETE_START));

    batch.commit()
        .then(() => dispatch(setCategoryStatus(DELETE_COMPLETE)))
        .catch((err) => {
            dispatch(setCategoryStatus(DELETE_FAILED))
            console.error(err);
            return "Det gick inte att lägga till kategorin"
        })
}