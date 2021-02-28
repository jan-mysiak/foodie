import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGroceryAsync } from '../../store/actions';
import ActionsContainer from '../_shared/Layout/ActionsContainer';
import usePageLayout from '../_shared/Layout/hooks/usePageLayout';
import useSearch from '../_shared/Search/hooks/useSearch';
import Search from '../_shared/Search/Search';
import SwipeableList from '../_shared/SwipeableList/SwipeableList';
import SwipeableListItem from '../_shared/SwipeableList/SwipeableListItem';

export default function Groceries() {
    const { searchActive, formActive, actionsHeight } = usePageLayout(7, 10);
    const { groceries, groceriesStatus } = useSelector(s => s.groceries);
    const { userId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    const search = useSearch(groceries);

    return (
        <main>
            <ActionsContainer height={actionsHeight}>
                {searchActive && <Search {...search.input} placeholder="Sök i inköpslistan.." />}
                {formActive && <AddGroceryForm />}
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

function AddGroceryForm() {
    return (
        <div>
            Add Grocery Form
        </div>
    )
}