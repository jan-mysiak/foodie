import firebase from 'firebase/app';
import "firebase/firestore";
import { categoryConverter } from '../../api/converters/category';
import {
    ADD_START, ADD_FAILED, ADD_COMPLETE,
    DELETE_START, DELETE_COMPLETE, DELETE_FAILED
} from '../statusTypes';

export const setCategories = (payload) => ({ type: "SET_CATEGORIES", payload });
export const addCategory = (payload) => ({ type: "ADD_CATEGORY", payload });
export const updateCategory = (payload) => ({ type: "UPDATE_CATEGORY", payload });
export const deleteCategory = (payload) => ({ type: "DELETE_CATEGORY", payload });
export const setCategoriesStatus = (payload) => ({ type: "SET_CATEGORIES_STATUS", payload });

// Async actions
export const addCategoryAsync = (userId, category) => async dispatch => {
    const batch = firebase.firestore().batch();
    const userRef = firebase.firestore().collection("users").doc(userId);

    const categoriesRef = userRef.collection("categories").withConverter(categoryConverter).doc();
    batch.set(categoriesRef, category);

    const colorsRef = userRef.collection("colors").doc(category.colorId);
    batch.update(colorsRef, { available: false });

    dispatch(setCategoriesStatus(ADD_START));

    batch.commit()
        .then(() => dispatch(setCategoriesStatus(ADD_COMPLETE)))
        .catch((err) => {
            dispatch(setCategoriesStatus(ADD_FAILED));
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

    dispatch(setCategoriesStatus(DELETE_START));

    batch.commit()
        .then(() => dispatch(setCategoriesStatus(DELETE_COMPLETE)))
        .catch((err) => {
            dispatch(setCategoriesStatus(DELETE_FAILED))
            console.error(err);
        })
}