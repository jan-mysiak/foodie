import { useState } from 'react';

export default function useTextInput(initialValue = "", min, max, pattern) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState("");

    const onChange = (newValue) => {
        const error = validate(newValue);
        setError(error);
        setValue(newValue);

        return error;
    }

    const validate = (newValue) => {
        if (min && newValue.length < min) {
            return `Fältet måste innehålla minst ${min} tecken`;
        }
        else if (max && newValue.length > max) {
            return `Fältet får inte innehålla mer än ${max} tecken`;
        }
        else if (pattern && !pattern.test(newValue)) {
            return `Fältet innehåller felaktiga uppgifter`;
        }
        else {
            return "";
        }
    }

    const reset = () => {
        setValue("");
        setError("");
    }

    return {
        value,
        error,
        onChange,
        validate,
        reset
    }
}
