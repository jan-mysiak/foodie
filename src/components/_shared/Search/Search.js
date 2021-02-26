import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../Inputs/TextInput';
import FlexRow from '../Layout/FlexRow';
import { FaSearch } from 'react-icons/fa';
import InlineIcon from '../Layout/InlineIcon';

export default function Search(props) {
    return (
        <FlexRow>
            <InlineIcon icon={FaSearch} isActive={props.value} />
            <TextInput {...props} />
        </FlexRow>
    )
}

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
}


