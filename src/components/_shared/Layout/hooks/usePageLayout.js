import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActionsHeight } from '../../../../store/actions/';

export default function usePageLayout(searchHeight, formHeight) {
    const { searchActive, formActive, actionsHeight } = useSelector(s => s.ui);
    const dispatch = useDispatch();

    useEffect(() => {
        const updateHeight = (newHeight = 0) => {
            dispatch(setActionsHeight(newHeight));
        };

        if (searchActive) {
            updateHeight(searchHeight);
        }
        else if (formActive) {
            updateHeight(formHeight);
        }
        else {
            updateHeight(0);
        }
    }, [searchActive, formActive, formHeight, searchHeight, dispatch]);

    return {
        searchActive,
        formActive,
        actionsHeight,
    };
}
