import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import "firebase/firestore";
import { FETCH_START, FETCH_COMPLETE, FETCH_FAILED } from '../../store/statusTypes';

export default function useListener(collection) {
    const { userId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    const cancelCallback = React.useRef(null);

    const listen = (converter, actionTypes, orderBy, predicate) => {
        if (!userId || !collection || cancelCallback.current) {
            return;
        }

        const db = firebase.firestore();
        let collectionRef = db.collection("users").doc(userId).collection(collection);

        if (orderBy) {
            collectionRef = collectionRef.orderBy(orderBy[0], orderBy[1]);
        }
        if (predicate) {
            collectionRef = collectionRef.where(predicate[0], predicate[1], predicate[2]);
        }

        dispatch({ type: actionTypes.SET, payload: [] });
        dispatch({ type: actionTypes.SET_STATUS, payload: FETCH_START });

        console.log("Listening to", collection);

        cancelCallback.current = collectionRef
            .withConverter(converter)
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === "added") {
                        dispatch({ type: actionTypes.ADD, payload: change.doc.data() });
                    }
                    else if (change.type === "modified") {
                        dispatch({ type: actionTypes.UPDATE, payload: change.doc.data() });
                    }
                    else if (change.type === "removed") {
                        dispatch({ type: actionTypes.DELETE, payload: change.doc.id });
                    }
                });
                dispatch({ type: actionTypes.SET_STATUS, payload: FETCH_COMPLETE })
            }, error => {
                dispatch({ type: actionTypes.SET_STATUS, payload: FETCH_FAILED });
                console.error(error);
                cancel();
            });
    }

    const cancel = () => {
        cancelCallback.current && cancelCallback.current();
        cancelCallback.current = null;
    }

    return {
        listen,
        cancel,
        isActive: cancelCallback.current
    }
}