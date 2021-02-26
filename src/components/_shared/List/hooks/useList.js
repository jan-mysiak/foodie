import React, { createElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import simpleReducer from '../../../../assets/simpleReducer';
import { DELETE_FAILED } from '../../../../store/statusTypes';

export default function useList(items, status = "") {
    const { userId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    const [state, setState] = React.useReducer(simpleReducer, {
        listItems: items,
        removeId: ""
    });

    React.useEffect(() => {
        if (status === DELETE_FAILED) {
            dispatch(createElement("Kunde inte ta bort"));
        }
        // never used
        else if (status === "CONFIRM_FAILED") {
            dispatch(createElement("Kunde inte bekräfta"));
        }
    }, [status, dispatch])

    React.useEffect(() => {
        if (!state.removeId) {
            setState({ listItems: items })
        }
        // Wait for transitions (reset + remove) to complete
        else {
            setTimeout(() => {
                setState({
                    removeId: "",
                    listItems: items
                });
            }, 590)
        }
    }, [items, state.removeId])

    const handleRemove = (item, callback) => {
        setState({ removeId: item.id });
        dispatch(callback(userId, item));
    }

    return {
        ...state,
        handleRemove
    }
}