import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const TagsCloud = ({ tags }) => {
    return (
        <Grid container mb={2}>
            {tags.map((item, i) => <Link key={i} className="tags" to="#" children={item.text} />)}
        </Grid>
    );
}
