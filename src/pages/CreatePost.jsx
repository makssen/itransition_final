import { Button, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '../components/Autocomplete';
import { DefaultLayout } from '../components/DefaultLayout';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { UploadFile } from '../components/UploadFile';
import { useFileReader } from '../hooks/useFileReader';
import { useSelector } from 'react-redux';
import { useInput } from '../hooks/useInput';
import PostService from '../services/PostService';

export const CreatePost = () => {

    const navigate = useNavigate();

    const [isSubmit, setIsSubmit] = useState(false);
    const [selectTags, setSelectTags] = useState([]);
    const [selectTagsError, setSelectTagsError] = useState('');

    const title = useInput('');
    const type = useInput('');
    const text = useInput('');
    const grade = useInput('');

    const { setFiles, previews } = useFileReader();
    const { tags } = useSelector(state => state.posts);
    const { user } = useSelector(state => state.user);

    const deleteTag = (index) => {
        setSelectTags(selectTags.filter((_, i) => i !== index));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.value) {
            title.setError('Введите заголовок');
        } else {
            title.setError('');
        }

        if (!type.value) {
            type.setError('Тип обзора не может быть пустым');
        } else {
            type.setError('');
        }

        if (!selectTags.length) {
            setSelectTagsError('Добавьте хотя бы один тег');
        } else {
            setSelectTagsError('');
        }

        if (!text.value) {
            text.setError('Введите текст обзора');
        } else if (text.value.length < 30) {
            text.setError('Текст обзора должен состоять минимум из 30 символов');
        } else {
            text.setError('');
        }

        if (!grade.value) {
            grade.setError('Поставьте оценку обзора');
        } else {
            grade.setError('');
        }

        setIsSubmit(true);
    }

    useEffect(() => {
        if (isSubmit) {
            if (title.error || type.error || selectTagsError || grade.error || text.error) {
                setIsSubmit(false);
            } else {
                PostService.create({
                    title: title.value,
                    type: type.value,
                    tags: selectTags,
                    text: text.value,
                    grade: grade.value,
                    images: previews,
                    dateTime: new Date(),
                    user_id: user.id
                })
                    .then(navigate('/'))
                    .catch(e => console.log(e))
            }
        }
    }, [title.error, type.error, selectTagsError, grade.error, text.error, isSubmit]);


    return (
        <DefaultLayout>
            <h2 className="title">Создать обзор</h2>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} sx={{ pr: '24px' }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={(e) => title.onChange(e)}
                            value={title.value}
                            error={title.error ? true : false}
                            helperText={title.error}
                            variant="outlined"
                            label="Заголовок"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="filled" error={type.error ? true : false} fullWidth>
                            <InputLabel id="demo-simple-select-error-label">Тип обзора</InputLabel>
                            <Select
                                labelId="demo-simple-select-error-label"
                                id="demo-simple-select-error"
                                value={type.value}
                                onChange={(e) => type.onChange(e)}
                            >
                                <MenuItem value="Игра">Игра</MenuItem>
                                <MenuItem value="Книга">Книга</MenuItem>
                                <MenuItem value="Кино">Кино</MenuItem>
                            </Select>
                            {type.error && <FormHelperText>Выберите тип</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete data={tags} setData={setSelectTags} error={selectTagsError} />
                        {selectTags.map((item, i) =>
                            <Grid
                                key={i}
                                item
                            >
                                <span>{item}</span>
                                <IconButton onClick={() => deleteTag(i)}><HighlightOffIcon /></IconButton>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={(e) => text.onChange(e)}
                            value={text.value}
                            error={text.error ? true : false}
                            helperText={text.error}
                            variant="outlined"
                            label="Текст"
                            multiline
                            rows={6}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" mb={1}>Добавьте не более 3 изображений</Typography>
                        <UploadFile setFiles={setFiles} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            {previews.map((item, i) =>
                                <Grid key={i} item
                                    sx={{
                                        height: { xs: 100, md: 200 },
                                        backgroundImage: `url(${item})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: { xs: 'contain', md: 'cover' },
                                        backgroundPosition: 'center',
                                        border: '1px solid gray',
                                        mr: '20px'
                                    }}
                                    xs={3}
                                >
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} mb={2}>
                        <TextField
                            onChange={(e) => grade.onChange(e)}
                            value={grade.value}
                            error={grade.error ? true : false}
                            helperText={grade.error}
                            type="number"
                            variant="outlined"
                            label="Оценка от 1 до 10"
                            fullWidth
                        />

                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" size="large" color="primary">Создать</Button>
            </form>
        </DefaultLayout>
    );
}
