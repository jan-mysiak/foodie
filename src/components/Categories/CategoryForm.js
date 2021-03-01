import { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTag, FaPalette, FaPlus } from 'react-icons/fa';
import { ADD_START, ADD_FAILED, ADD_COMPLETE, IDLE, } from '../../store/statusTypes';
import FlexRow from '../_shared/Layout/FlexRow';
import useTextInput from '../_shared/Inputs/hooks/useTextInput';
import InlineButton from '../_shared/Layout/InlineButton';
import InlineIcon from '../_shared/Layout/InlineIcon';
import TextInput from '../_shared/Inputs/TextInput';
import ColorPicker from '../_shared/Inputs/ColorPicker';
import ColorItem from '../_shared/Inputs/ColorItem';
import { createNotification } from '../../store/actions/uiActions';
import { addCategoryAsync, setCategoriesStatus } from '../../store/actions/categoriesActions';
import PropTypes from 'prop-types';

export default function CategoryForm({ callback, initialCategoryName = "" }) {
    const { categoriesStatus, categories } = useSelector(s => s.categories);
    const { colors } = useSelector(s => s.colors);
    const { userId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    // Form fields
    const categoryName = useTextInput(initialCategoryName, 1);
    const [colorId, setColorId] = useState("");
    const [colorError, setColorError] = useState(false);

    const [availableColors, setAvailableColors] = useState([]);

    // Update colors when item added
    useEffect(() => {
        setAvailableColors(colors.filter(c => c.available));
    }, [colors])

    // On submit
    useEffect(() => {
        const setIdle = () => {
            dispatch(setCategoriesStatus(IDLE));
        }

        if (categoriesStatus === ADD_COMPLETE) {
            callback && callback();

            categoryName.reset();
            setColorError(false);
            setColorId("");
            setIdle();
        }
        else if (categoriesStatus === ADD_FAILED) {
            dispatch(createNotification("Det gick inte att lägga till kategorin"))
            setIdle();
        }
    }, [categoriesStatus, categoryName, callback, dispatch])

    const onSubmit = () => {
        const nameError = categoryName.onChange(categoryName.value);

        if (nameError) {
            return;
        }
        else if (!colorId) {
            setColorError(true);
            return;
        }

        const availableColor = availableColors.find(c => c.id === colorId);
        const categoryNameExists = categories.find(c =>
            c.name.toUpperCase() === categoryName.value.toUpperCase()
        );

        if (!availableColor) {
            // notify user
            dispatch(createNotification("Färgen är inte tillgänglig"))
            return;
        }
        else if (categoryNameExists) {
            // notify user
            dispatch(createNotification("Kategorin finns redan"))
            return;
        }

        const addCategory = {
            name: categoryName.value,
            productCount: 0,
            colorId: availableColor.id,
            colorHex: availableColor.hex,
        }

        // const addCategory = {
        //     name: categoryName.value,
        //     productCount: 0,
        //     color: {
        //         id: availableColor.id,
        //         hex: availableColor.hex
        //     }
        // }

        dispatch(addCategoryAsync(userId, addCategory));
    }

    const loading = categoriesStatus === ADD_START;

    return (
        <Fragment>
            {/* CATEGORY NAME */}
            <FlexRow>
                <InlineIcon
                    icon={FaTag}
                    isActive={!!categoryName.value}
                    hasError={!!categoryName.error}
                />
                <TextInput {...categoryName} placeholder="Vad heter kategorin?" />
                <InlineButton
                    onClick={onSubmit}
                    icon={FaPlus}
                    disabled={loading}
                />
            </FlexRow>

            {/* COLOR PICKER */}
            <FlexRow>
                <InlineIcon
                    hasError={colorError}
                    icon={FaPalette}
                />
                <ColorPicker>
                    {availableColors.map(c => {
                        return (
                            <ColorItem
                                id={c.id}
                                key={c.id}
                                hex={c.hex}
                                onClick={() => setColorId(c.id)}
                                isActive={c.id === colorId}
                            />
                        )
                    })}
                </ColorPicker>
            </FlexRow>
        </Fragment>
    )
}

CategoryForm.propTypes = {
    callback: PropTypes.func,
    initialCategoryName: PropTypes.string
}