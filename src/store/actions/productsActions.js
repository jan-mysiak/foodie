import firebase from 'firebase/app';
import "firebase/firestore";
import { ADD_COMPLETE, ADD_FAILED, ADD_START, DELETE_COMPLETE, DELETE_FAILED, DELETE_START } from '../statusTypes';

export const setProducts = (payload) => ({ type: "SET_PRODUCTS", payload });
export const addProduct = (payload) => ({ type: "ADD_PRODUCT", payload });
export const deleteProduct = (payload) => ({ type: "DELETE_PRODUCT", payload });
export const setProductsStatus = (payload) => ({ type: "SET_PRODUCTS_STATUS", payload });

export const addProductAsync = (userId, product) => async dispatch => {
    const batch = firebase.firestore().batch();
    const userRef = firebase.firestore().collection("users").doc(userId);

    const productRef = userRef.collection("products").doc();
    productRef.set(product);

    const categoryRef = userRef.collection("categories").doc(product.category.id);
    categoryRef.update({ productCount: firebase.firestore.FieldValue.increment(1) });

    dispatch(setProductsStatus(ADD_START))

    batch.commit()
        .then(() => dispatch(setProductsStatus(ADD_COMPLETE)))
        .catch(err => {
            dispatch(setProductsStatus(ADD_FAILED));
            console.error(err);
        });
}

export const deleteProductAsync = (userId, product) => async dispatch => {
    const batch = firebase.firestore().batch();
    const userRef = firebase.firestore().collection("users").doc(userId);

    const productRef = userRef.collection("products").doc(product.id);
    productRef.delete();

    const categoryRef = userRef.collection("categories").doc(product.categoryId);
    categoryRef.update({ productCount: firebase.firestore.FieldValue.increment(-1) });

    dispatch(setProductsStatus(DELETE_START))

    batch.commit()
        .then(() => dispatch(setProductsStatus(DELETE_COMPLETE)))
        .catch(err => {
            dispatch(setProductsStatus(DELETE_FAILED));
            console.error(err);
        });
}