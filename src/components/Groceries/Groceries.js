import React from 'react';
import { useSelector } from 'react-redux';
import { deleteGroceryAsync } from '../../store/actions';
import ActionsContainer from '../_shared/Layout/ActionsContainer';
import usePageLayout from '../_shared/Layout/hooks/usePageLayout';
import List from '../_shared/List/List';
import useSearch from '../_shared/Search/hooks/useSearch';
import Search from '../_shared/Search/Search';

export default function Groceries() {
    const { groceries, groceriesStatus } = useSelector(s => s.groceries);
    const { searchActive, formActive, actionsHeight } = usePageLayout(7, 10);

    const search = useSearch(groceries);

    return (
        <main>
            <ActionsContainer height={actionsHeight}>
                {searchActive && <Search {...search.input} placeholder="Sök i inköpslistan.." />}
                {formActive && <AddGroceryForm />}
            </ActionsContainer>

            <List
                items={search.results}
                onDelete={deleteGroceryAsync}
                status={groceriesStatus}
            />
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