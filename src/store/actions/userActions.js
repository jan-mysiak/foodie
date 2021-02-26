import firebase from 'firebase/app';
import "firebase/firestore";
import { FETCH_COMPLETE, FETCH_FAILED, FETCH_START } from '../statusTypes';

export const setUserId = (payload) => ({ type: "SET_USER_ID", payload });
export const setUserStatus = (payload) => ({ type: "SET_USER_STATUS", payload });

export const signInUserAsync = (userName) => async dispatch => {
    dispatch(setUserStatus(FETCH_START));

    firebase.firestore()
        .collection("users")
        .where("name", "==", userName.toLowerCase())
        .get()
        .then(res => {
            const user = res.docs[0];

            if (user) {
                dispatch(setUserId(user.id));
            }

            dispatch(setUserStatus(FETCH_COMPLETE));
        })
        .catch(err => {
            console.error(err);
            dispatch(setUserStatus(FETCH_FAILED));
        })
}