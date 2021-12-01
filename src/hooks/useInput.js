import { useState } from 'react';

export const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    }

    return { value, onChange, error, setError };
}