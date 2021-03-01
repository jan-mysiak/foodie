import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductAsync } from '../../store/actions';
import ActionsContainer from '../_shared/Layout/ActionsContainer';
import usePageLayout from '../_shared/Layout/hooks/usePageLayout';
import useSearch from '../_shared/Search/hooks/useSearch';
import Search from '../_shared/Search/Search';
import { SwipeableList, SwipeableListItem } from '../_shared/SwipeableList';
import ProductForm from './ProductForm';

export default function Products() {
    const { products, productsStatus } = useSelector(s => s.products);
    const { userId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    const { searchActive, formActive } = usePageLayout(7, 11);
    const search = useSearch(products);

    return (
        <main>
            <ActionsContainer>
                {searchActive && <Search {...search.input} placeholder="Sök bland produkter..." />}
                {formActive && <ProductForm />}
            </ActionsContainer>

            <SwipeableList>
                {search.results.map((item, key) => {
                    return (
                        <SwipeableListItem
                            key={item.id}
                            item={item}
                            onLeftSwipe={() => dispatch(deleteProductAsync(userId, item.id))}
                        />
                    )
                })}
            </SwipeableList>
        </main>
    )
}
