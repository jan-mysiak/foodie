import React from 'react';
import ActionsContainer from '../_shared/Layout/ActionsContainer';
import usePageLayout from '../_shared/Layout/hooks/usePageLayout';
import List from '../_shared/List/List';

export default function Groceries() {
    const { searchActive, formActive, actionsHeight } = usePageLayout(6, 10);

    const items = new Array(40).fill(0);

    return (
        <main>
            <ActionsContainer height={actionsHeight}>
                {searchActive && <SearchForm />}
                {formActive && <AddGroceryForm />}
            </ActionsContainer>

            <List items={items} />
        </main>
    )
}

function SearchForm() {
    return (
        <div>
            Search
        </div>
    )
}

function AddGroceryForm() {
    return (
        <div>
            Add Grocery Form
        </div>
    )
}

function useSearch(items) {

}