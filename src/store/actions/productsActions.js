import firebase from 'firebase/app';
import "firebase/firestore";
import { ADD_COMPLETE, ADD_FAILED, ADD_START, DELETE_COMPLETE, DELETE_FAILED, DELETE_START } from '../statusTypes';

export const setProducts = (payload) => ({ type: "SET_PRODUCTS", payload });
export const addProduct = (payload) => ({ type: "ADD_PRODUCT", payload });
export const deleteProduct = (payload) => ({ type: "DELETE_PRODUCT", payload });
export const setProductsStatus = (payload) => ({ type: "SET_PRODUCTS_STATUS", payload });

export const addProductAsync = (userId, product) => async dispatch => {
    dispatch(setProductsStatus(ADD_START));

    firebase.firestore().collection("users").doc(userId).collection("products")
        .add(product)
        .then(() => {
            dispatch(setProductsStatus(ADD_COMPLETE));
        })
        .catch(err => {
            console.error(err);
            dispatch(setProductsStatus(ADD_FAILED));
        })
}

export const deleteProductAsync = (userId, productId) => async dispatch => {
    dispatch(setProductsStatus(DELETE_START));

    firebase.firestore().collection("users").doc(userId).collection("products").doc(productId)
        .delete()
        .then(() => {
            dispatch(setProductsStatus(DELETE_COMPLETE));
        })
        .catch(err => {
            dispatch(setProductsStatus(DELETE_FAILED));
        })
}