import firebase from 'firebase/app';
import "firebase/firestore";
import { ADD_COMPLETE, ADD_FAILED, ADD_START, DELETE_COMPLETE, DELETE_FAILED, DELETE_START } from '../statusTypes';

export const setGroceries = (payload) => ({ type: "SET_GROCERIES", payload });
export const addGrocery = (payload) => ({ type: "ADD_GROCERY", payload });
export const deleteGrocery = (payload) => ({ type: "DELETE_GROCERY", payload });
export const setGroceriesStatus = (payload) => ({ type: "SET_GROCERIES_STATUS", payload });

export const addGroceryAsync = (userId, grocery) => async dispatch => {
    dispatch(setGroceriesStatus(ADD_START));
     
    groceriesRef(userId)
        // .withConverter
        .set(grocery)
        .then(() => {
            dispatch(setGroceriesStatus(ADD_COMPLETE));
        })
        .catch(err => {
            console.error(err);
            dispatch(setGroceriesStatus(ADD_FAILED));
        })
}

export const deleteGroceryAsync = (userId, groceryId) => async dispatch => {
    dispatch(setGroceriesStatus(DELETE_START));

    groceriesRef(userId, groceryId)
        .delete()
        .then(() => {
            dispatch(setGroceriesStatus(DELETE_COMPLETE));
        })
        .catch(err => {
            dispatch(setGroceriesStatus(DELETE_FAILED));
        })
}

function groceriesRef(userId, docId = "") {
    return firebase.firestore().collection("users").doc(userId).collection("groceries").doc(docId);
}
