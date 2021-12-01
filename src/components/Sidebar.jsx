import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { privateRoutes, publicRoutes } from '../routes';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Sidebar = () => {

    const navigate = useNavigate();

    const { isAuth } = useSelector(state => state.user);

    return (
        <List sx={{ position: 'fixed', display: { xs: 'none', md: 'block' } }}>
            {
                isAuth ? privateRoutes.map((item, i) => (
                    <ListItem onClick={() => navigate(item.path)} button key={i}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
                )) :
                    publicRoutes.map((item, i) => (
                        <ListItem onClick={() => navigate(item.path)} button key={i}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
        </List>
    )
}
