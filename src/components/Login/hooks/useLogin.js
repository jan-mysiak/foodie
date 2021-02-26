import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, signInUserAsync } from '../../../store/actions/';
import { FETCH_COMPLETE, FETCH_FAILED } from '../../../store/statusTypes';
import useTextInput from '../../_shared/Inputs/hooks/useTextInput';

export default function useLogin(history) {
    const { userStatus, userId } = useSelector(s => s.user);
    const dispatch = useDispatch();
    const userName = useTextInput(1);
    const [userFound, setUserFound] = useState(false);

    useEffect(() => {
        if (userStatus === FETCH_COMPLETE) {
            if (userId) {
                setUserFound(true);
                history.push("/groceries");
            }
            else {
                // "Användaren hittades inte"
                setUserFound(false);
            }
        }
        else if (userStatus === FETCH_FAILED) {
            dispatch(createNotification("Något gick fel när du skulle loggas in"));
        }
    }, [userStatus, history, userId, dispatch])

    const onLogin = (e) => {
        e.preventDefault();

        const hasErrors = userName.validate();

        if (!hasErrors) {
            dispatch(signInUserAsync(userName.value));
        }
    }

    return {
        onLogin,
        userName,
        userFound,
    }
}
