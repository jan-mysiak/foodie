import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, setUserId, setUserStatus, signInUserAsync } from '../../../store/actions/';
import { FETCH_COMPLETE, FETCH_FAILED, IDLE } from '../../../store/statusTypes';
import useTextInput from '../../_shared/Inputs/hooks/useTextInput';

export default function useLogin(history) {
    const { userStatus, userId } = useSelector(s => s.user);
    const dispatch = useDispatch();
    const userName = useTextInput(1);
    const [nameError, setNameError] = useState("");

    console.log(userName.error);

    useEffect(() => {
        dispatch(setUserId(""));
    }, [])

    useEffect(() => {
        console.log(userId);
        if (userStatus === FETCH_COMPLETE) {
            if (userId) {
                setNameError("");
                history.push("/groceries");
                dispatch(setUserStatus(IDLE));

            }
            else {
                setNameError("Användaren hittades inte");
                setTimeout(() => setNameError(""), 300);
            }
        }
        else if (userStatus === FETCH_FAILED) {
            dispatch(createNotification("Något gick fel när du skulle loggas in"));
        }
    }, [userStatus, history, userId, dispatch])

    const onLogin = (e) => {
        e.preventDefault();

        const hasErrors = userName.onChange(userName.value);

        if (!hasErrors) {
            signIn(userName.value);
        }
    }

    const onAnonymousLogin = () => {
        signIn("anonymous")
    }

    const signIn = (userName) => {
        dispatch(signInUserAsync(userName));
    }

    return {
        onLogin,
        onAnonymousLogin,
        userName,
        nameError,
    }
}
