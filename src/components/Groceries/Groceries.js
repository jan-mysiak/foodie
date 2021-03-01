import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification, deleteGroceryAsync } from '../../store/actions';
import { DELETE_FAILED } from '../../store/statusTypes';
import ActionsContainer from '../_shared/Layout/ActionsContainer';
import usePageLayout from '../_shared/Layout/hooks/usePageLayout';
import useSearch from '../_shared/Search/hooks/useSearch';
import Search from '../_shared/Search/Search';
import SwipeableList from '../_shared/SwipeableList/SwipeableList';
import SwipeableListItem from '../_shared/SwipeableList/SwipeableListItem';
import GroceryForm from './GroceryForm';

export default function Groceries() {
    const { searchActive, formActive, actionsHeight } = usePageLayout(7, 10);
    const { groceries, groceriesStatus } = useSelector(s => s.groceries);
    const { userId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    const search = useSearch(groceries);

    useEffect(() => {
        if (groceriesStatus === DELETE_FAILED) {
            dispatch(createNotification("Det gick inte att ta bort varan"));
        }
    }, [groceriesStatus, dispatch])

    return (
        <main>
            <ActionsContainer height={actionsHeight}>
                {searchActive && <Search {...search.input} placeholder="Sök i inköpslistan.." />}
                {formActive && <GroceryForm />}
            </ActionsContainer>

            <SwipeableList>
                {search.results.map(item => {
                    return (
                        <SwipeableListItem
                            key={item.id}
                            item={item}
                            onLeftSwipe={() => dispatch(deleteGroceryAsync(userId, item.id))}
                        />
                    )
                })}
            </SwipeableList>
        </main>
    )
}