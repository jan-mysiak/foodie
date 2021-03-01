import { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import useTextInput from '../_shared/Inputs/hooks/useTextInput';
import FlexRow from '../_shared/Layout/FlexRow';
import { FaShoppingBag, FaTag, FaPlus } from 'react-icons/fa';
import { InlineIcon, InlineButton } from '../_shared/Layout/';
import SuggestionInput from '../_shared/Inputs/SuggestionInput';
import TextInput from '../_shared/Inputs/TextInput';
import CategoryForm from '../Categories/CategoryForm';
import ActionsHeader from '../_shared/Layout/ActionsHeader';
import { createNotification, setActionsHeight } from '../../store/actions/uiActions';
import { ADD_COMPLETE, ADD_FAILED, ADD_START, IDLE } from '../../store/statusTypes';
import { addProductAsync, setProductsStatus } from '../../store/actions/productsActions';

export default function ProductForm({ callback, initialProductName = "" }) {
    const { products, productsStatus } = useSelector(s => s.products);
    const { categories } = useSelector(s => s.categories);
    const { userId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    const [formStep, setFormStep] = useState(0);
    const productName = useTextInput(initialProductName, 1);
    const categoryName = useTextInput("", 1);

    // On submit
    useEffect(() => {
        const setIdle = () => {
            dispatch(setProductsStatus(IDLE))
        }

        if (productsStatus === ADD_FAILED) {
            dispatch(createNotification("Det gick inte att lägga till produkten"))
            setIdle()
        }
        else if (productsStatus === ADD_COMPLETE) {
            productName.reset();
            categoryName.reset();
            setIdle()
        }
    }, [productsStatus, productName, categoryName, dispatch])

    // Resize actions when changing forms to account for header
    useEffect(() => {
        if (formStep === 0) {
            dispatch(setActionsHeight(11));
        }
        else if (formStep === 1) {
            dispatch(setActionsHeight(15));
        }
    }, [formStep, dispatch])

    const onSubmit = () => {
        const productError = productName.onChange(productName.value);
        const categoryError = categoryName.onChange(categoryName.value);

        if (productError || categoryError) {
            return;
        }

        const categoryFound = categories.find(c => c.name.toUpperCase() === categoryName.value.toUpperCase());
        const productExists = products.find(p => p.name.toUpperCase() === productName.value.toUpperCase());

        if (!categoryFound) {
            setFormStep(1);
            return;
        }
        else if (productExists) {
            dispatch(createNotification("Produkten finns redan"));
            return;
        }

        const addProduct = {
            name: productName.value,
            category: {
                id: categoryFound.id,
                name: categoryFound.name,
                color: {
                    id: categoryFound.colorId,
                    hex: categoryFound.colorHex
                }
            }
        }

        dispatch(addProductAsync(userId, addProduct));
    }

    const saving = productsStatus === ADD_START;

    return (
        <Fragment>
            {formStep === 0 &&
                <Fragment>
                    <FlexRow>
                        <InlineIcon
                            icon={FaShoppingBag}
                            isActive={!!productName.value}
                        />
                        <TextInput
                            {...productName}
                            placeholder="Vad heter produkten?"
                        />
                        <InlineButton
                            icon={FaPlus}
                            onClick={onSubmit}
                            disabled={saving}
                        />
                    </FlexRow>

                    <FlexRow>
                        <InlineIcon icon={FaTag} isActive={!!categoryName.value} />
                        <SuggestionInput
                            {...categoryName}
                            placeholder="Välj kategori.."
                            options={categories.map(c => c.name)}
                        />
                    </FlexRow>
                </Fragment>
            }
            {formStep === 1 &&
                <Fragment>
                    <ActionsHeader
                        content={<p>Lägg till <b>{categoryName.value}</b></p>}
                        onBack={() => setFormStep(0)}
                    />
                    <CategoryForm
                        initialCategoryName={categoryName.value}
                        callback={() => setFormStep(0)}
                    />
                </Fragment>
            }
        </Fragment>
    )
}

ProductForm.propTypes = {
    callback: PropTypes.func,
    initialProductName: PropTypes.string
}

