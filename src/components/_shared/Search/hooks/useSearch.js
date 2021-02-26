import { useState, useEffect } from 'react'
import useTextInput from '../../Inputs/hooks/useTextInput'

export default function useSearch(items) {
    const [results, setResults] = useState(items);
    const input = useTextInput();

    useEffect(() => {
        setResults(input.value
            ? items.filter(i => i.name.toUpperCase().startsWith(input.value.toUpperCase()))
            : items
        );
    }, [items, input.value])

    return {
        results,
        input
    }
}
