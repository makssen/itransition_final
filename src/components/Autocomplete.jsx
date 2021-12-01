import { Button, Grid, Paper, TextField } from '@mui/material';
import React, { useMemo, useState } from 'react';

export const Autocomplete = ({ data, setData, error }) => {

    const [value, setValue] = useState('');
    const [active, setActive] = useState(false);

    const handleChange = (e) => {
        setValue(e.target.value);
        setActive(true);
    }

    const handleClick = (item) => {
        setValue(item);
        setActive(false);
    }

    const handleBlur = () => {
        setActive(false);
    }

    const addTag = () => {
        if (value) {
            setData(prev => {
                const tags = prev.filter(item => item.toLowerCase() !== value.toLowerCase());
                return [...tags, value];
            });
            setValue('');
        }
    }

    const searchTags = useMemo(() => {
        return data.filter(item => item.text.toLowerCase().includes(value.toLowerCase()));
    }, [value, data]);

    return (
        <Grid container>
            <Grid item xs={12} sm={3} sx={{ position: 'relative' }}>
                <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={value}
                    error={error ? true : false}
                    helperText={error}
                    variant="outlined"
                    label="Теги"
                    fullWidth
                />
                <Paper sx={{ position: 'absolute', left: 0, right: 0, zIndex: 3 }}>
                    <ul className={`autocomplete-tags ${active ? 'active' : ''}`}>
                        {searchTags && searchTags.map((item, i) =>
                            <li
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleClick(item.text)}
                                key={i}
                                className="autocomplete-tags__item"
                            >
                                {item.text}
                            </li>
                        )}
                    </ul>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={2} >
                <Button
                    onClick={addTag}
                    size="large"
                    variant="contained"
                    color="primary"
                    sx={{ ml: { xs: 0, sm: 1 } }}
                    fullWidth
                >
                    Добавить
                </Button>
            </Grid>
        </Grid>
    );
}
