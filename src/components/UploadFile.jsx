import { Grid, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';

export const UploadFile = ({ setFiles }) => {

    const [drag, setDrag] = useState(false);

    const dragHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setDrag(false);
    }

    const validFile = (file) => {
        const validExtension = [
            'image/jpg',
            'image/jpeg',
            'image/png'
        ];
        if (validExtension.includes(file.type)) {
            return file;
        }
    }

    const dropHandler = (e) => {
        e.preventDefault();
        let newFiles = Array.from(e.dataTransfer.files).map(validFile).filter(Boolean).slice(0, 3);
        setFiles(newFiles);
        setDrag(false);
    }

    return (
        <Paper elevation={3} sx={{ height: 200, p: 2 }}>
            {drag ?
                <Grid
                    onDragStart={(e) => dragHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragOver={(e) => dragHandler(e)}
                    onDrop={e => dropHandler(e)}
                    className="drop-area active"
                    container
                >
                    <Typography variant="h6">Отпустите изображения</Typography>
                </Grid>
                :
                <Grid
                    onDragStart={(e) => dragHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragOver={(e) => dragHandler(e)}
                    className="drop-area"
                    container
                >
                    <Typography variant="h6">Перетащите изображения</Typography>
                </Grid>
            }
        </Paper>
    );
}
