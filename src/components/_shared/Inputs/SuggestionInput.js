import { Fragment } from 'react'
import PropTypes from 'prop-types';
import styles from './Inputs.module.css';

export default function SuggestionInput({ placeholder, onChange, value, options }) {
    return (
        <Fragment>
            <input
                type="text"
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                value={value}
                className={styles.textInput}
                list="suggestions"
            />
            <datalist id="suggestions">
                {options.map(i => {
                    return (
                        <option key={i} value={i} />
                    )
                })}
            </datalist>
        </Fragment>
    )
}

SuggestionInput.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    options: PropTypes.array.isRequired
}


