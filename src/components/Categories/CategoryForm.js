import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTag, FaPalette, FaPlus } from 'react-icons/fa';

import InlineIcon from '../_shared/Layout/InlineIcon';
import InlineButton from '../_shared/Layout/InlineButton';
import TextInput from '../_shared/Inputs/TextInput';
import useTextInput from '../_shared/Inputs/hooks/useTextInput';
import { ColorPicker } from '../_shared/Inputs';

import { ADD_START, ADD_FAILED, ADD_COMPLETE, DELETE_COMPLETE, FETCH_START } from '../../store/statusTypes';
import { addCategoryAsync } from '../../store/actions/categoriesActions';
import { FlexRow } from '../_shared/Layout';
import Form from '../_shared/Layout/Form';

export default function CategoryForm({ callback, initialCategoryName }) {
    const { categoryStatus, categories } = useSelector(s => s.categories);
    const { availableColors: colors } = useSelector(s => s.colors);
    const { currentUserId } = useSelector(s => s.user);
    const dispatch = useDispatch();

    const [availableColors, setAvailableColors] = useState(colors);

    const categoryName = useTextInput(1, 30, initialCategoryName);
    const [categoryColor, setCategoryColor] = useState("");

    useEffect(() => {
        if (categoryStatus === ADD_COMPLETE) {
            if (callback) {
                callback(categoryName.value);
                return;
            }

            // To ensure both inputs update simultaneously
            // There's probably a better way to handle this
            setAvailableColors(colors);
            categoryName.reset();
            categoryColor.reset();

        }
        else if (categoryStatus === ADD_FAILED) {
            // notify user
            console.log("Det gick inte att lägga till " + categoryName.name)
        }
        else if (categoryStatus === DELETE_COMPLETE) {
            setAvailableColors(colors);
        }
    }, [
        categoryStatus,
        colors,
        callback,
        categoryColor,
        categoryName
    ]);

    const onSubmit = (e) => {
        e.preventDefault();

        const nameError = categoryName.onChange(categoryName.value);
        const colorError = categoryColor.onChange(categoryColor.value);
        if (nameError || colorError) {
            return;
        }

        const availableColor = availableColors.find(c => c.id === categoryColor.value);
        const categoryNameExists = categories.find(c =>
            c.name.toUpperCase() === categoryName.value.toUpperCase()
        );

        if (!availableColor) {
            // notify user
            console.log("Färgen är inte tillgänglig");
            return;
        }
        else if (categoryNameExists) {
            // notify user
            console.log("Namnet används redan");
            return;
        }

        const addCategory = {
            name: categoryName.value,
            productCount: 0,
            color: {
                id: availableColor.id,
                hex: availableColor.hex
            }
        }

        dispatch(addCategoryAsync(addCategory, currentUserId));
    }

    const loading = categoryStatus === ADD_START || categoryStatus === FETCH_START;

    return (
        <Form onSubmit={onSubmit} isDisabled={loading}>
            <FlexRow>
                <InlineIcon hasErrors={categoryName.error} icon={FaTag} />
                <TextInput
                    {...categoryName}
                    placeholder="Vad heter kategorin?"
                />
                <InlineButton icon={FaPlus} />
            </FlexRow>
            <FlexRow>
                <InlineIcon hasErrors={categoryColor.error || !availableColors.length} icon={FaPalette} />
                <ColorPicker
                    // shouldUpdate={categoryStatus === ADD_COMPLETE || categoryStatus === DELETE_COMPLETE}
                    onSelect={(id) => setCategoryColor(id)}
                    selectedId={categoryColor.value}
                    items={availableColors}
                />
            </FlexRow>
        </Form>
    )
}