import React from 'react'
import { useSelector } from 'react-redux'
import { deleteCategoryAsync } from '../../store/actions';
import ActionsContainer from '../_shared/Layout/ActionsContainer';
import usePageLayout from '../_shared/Layout/hooks/usePageLayout';
import useSearch from '../_shared/Search/hooks/useSearch';
import Search from '../_shared/Search/Search';
import { SwipeableList, SwipeableListItem } from '../_shared/SwipeableList/';
import CategoryForm from './CategoryForm';

export default function Categories() {
    const { categories, categoriesStatus } = useSelector(s => s.categories);
    const { searchActive, formActive, actionsHeight } = usePageLayout(7, 10);
    const search = useSearch(categories);

    return (
        <main>
            <ActionsContainer height={actionsHeight}>
                {searchActive && <Search {...search.input} />}
                {formActive && <CategoryForm />}
            </ActionsContainer>

            <SwipeableList>
                {search.results.map(item => {
                    return (
                        <SwipeableListItem
                            key={item.id}
                            item={item}
                            onLeftSwipe={() => console.log("Delete reached")}
                        />
                    )
                })}
            </SwipeableList>
        </main>
    )
}
