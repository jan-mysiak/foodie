import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_START, ADD_COMPLETE, ADD_FAILED, IDLE } from '../../store/statusTypes';
import ProductForm from '../Products/ProductForm';
import useTextInput from '../_shared/Inputs/hooks/useTextInput';
import SuggestionInput from '../_shared/Inputs/SuggestionInput';
import { FlexRow, InlineButton, InlineIcon } from '../_shared/Layout';
import ActionsHeader from '../_shared/Layout/ActionsHeader';
import { FaShoppingBag, FaComment, FaPlus } from 'react-icons/fa';
import { createNotification, setActionsHeight } from '../../store/actions/uiActions';
import { addGroceryAsync, setGroceriesStatus } from '../../store/actions/groceriesActions';
import TextInput from '../_shared/Inputs/TextInput';

export default function GroceryForm() {
    const { groceries, groceriesStatus } = useSelector(s => s.groceries);
    const { products } = useSelector(s => s.products);
    const { userId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    const productName = useTextInput("", 1);
    const description = useTextInput();

    const [formStep, setFormStep] = useState(0);
    // Don't do this
    const [headerVisible, toggleHeader] = useState(false);

    useEffect(() => {
        if (formStep === 0) {
            dispatch(setActionsHeight(11))
        }
        else if (formStep === 1) {
            dispatch(setActionsHeight(15))
        }
    }, [formStep, dispatch])

    // After submit
    useEffect(() => {
        const setIdle = () => dispatch(setGroceriesStatus(IDLE));

        if (groceriesStatus === ADD_COMPLETE) {
            productName.reset();
            description.reset();
            setIdle();
        }
        else if (groceriesStatus === ADD_FAILED) {
            dispatch(createNotification("Det gick inte att lägga till varan i inköpslistan"));
            setIdle();
        }
    }, [groceriesStatus, productName, description, dispatch])

    // Submit
    const onSubmit = () => {
        const productError = productName.onChange(productName.value);

        if (productError) {
            return;
        }

        const productFound = products.find(p => p.name.toUpperCase() === productName.value.toUpperCase());
        const groceryExists = groceries.find(g => g.name.toUpperCase() === productName.value.toUpperCase());

        if (!productFound) {
            setFormStep(1);
            return;
        }
        else if (groceryExists) {
            dispatch(createNotification("Varan finns redan i inköpslistan"))
            return;
        }

        const addGrocery = {
            description: description.value,
            product: {
                id: productFound.id,
                name: productFound.name,
                category: {
                    id: productFound.categoryId,
                    color: {
                        id: productFound.colorId,
                        hex: productFound.colorHex
                    }
                }
            }
        }

        dispatch(addGroceryAsync(userId, addGrocery));
    }

    return (
        <Fragment>
            {formStep === 0 &&
                // GROCERY FORM
                <Fragment>
                    <FlexRow>
                        <InlineIcon
                            icon={FaShoppingBag}
                            isActive={!!productName.value}
                            hasError={!!productName.error}
                        />
                        <SuggestionInput
                            {...productName}
                            placeholder="Välj produkt.."
                            options={products.map(p => p.name)}
                        />
                        <InlineButton
                            disabled={groceriesStatus === ADD_START}
                            onClick={onSubmit}
                            icon={FaPlus}
                        />
                    </FlexRow>

                    <FlexRow>
                        <InlineIcon
                            icon={FaComment}
                            isActive={!!description.value}
                        />
                        <TextInput
                            {...description}
                            placeholder="Kommentar (t.ex glutenfritt..)"
                        />
                    </FlexRow>
                </Fragment>
            }
            {formStep === 1 &&
                // PRODUCT FORM
                <Fragment>
                    {headerVisible &&
                        <ActionsHeader
                            content={<p>Lägg till <b>{productName.value}</b></p>}
                            onBack={() => setFormStep(0)}
                        />
                    }
                    <ProductForm
                        initialProductName={productName.value}
                        callback={() => setFormStep(0)}
                        toggleHeader={toggleHeader}
                    />
                </Fragment>
            }
        </Fragment>
    )
}

