import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryAsync, deleteCategory, updateCategory, createNotification } from '../../store/actions';
import { DELETE_FAILED } from '../../store/statusTypes';
import ActionsContainer from '../_shared/Layout/ActionsContainer';
import usePageLayout from '../_shared/Layout/hooks/usePageLayout';
import useSearch from '../_shared/Search/hooks/useSearch';
import Search from '../_shared/Search/Search';
import { SwipeableList, SwipeableListItem } from '../_shared/SwipeableList/';
import CategoryForm from './CategoryForm';

export default function Categories() {
    const { categories, categoriesStatus } = useSelector(s => s.categories);

    const { userId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    const { searchActive, formActive } = usePageLayout(7, 11);
    const search = useSearch(categories);

    React.useEffect(() => {
        if (categoriesStatus === DELETE_FAILED) {
            dispatch(createNotification("Det gick inte att ta bort kategorin"));
        }
    }, [categoriesStatus, dispatch])

    return (
        <main>
            <ActionsContainer>
                {searchActive && <Search {...search.input} placeholder="Sök bland kategorier.." />}
                {formActive && <CategoryForm />}
            </ActionsContainer>

            <SwipeableList>
                {search.results.map((item, key) => {
                    return (
                        <SwipeableListItem
                            key={item.id}
                            item={item}
                            onLeftSwipe={() => dispatch(deleteCategoryAsync(userId, item))}
                        />
                    )
                })}
            </SwipeableList>
        </main>
    )
}