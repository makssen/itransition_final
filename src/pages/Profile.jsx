import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DefaultLayout } from '../components/DefaultLayout';
import AuthService from '../services/AuthService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Skeleton } from '@mui/material';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link, useNavigate } from 'react-router-dom';
import PostService from '../services/PostService';

export const Profile = () => {

    const { user } = useSelector(state => state.user);
    const [data, setData] = useState({});
    const [isLoaded, setIsLoaded] = useState(true);

    const navigate = useNavigate();

    const deletePost = (id) => {
        setIsLoaded(true);
        PostService.delete(id)
            .then(resp => {
                setData(prev => ({ ...prev, overviews: data.overviews.filter(item => item.id !== id) }));
                setIsLoaded(false);
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        setIsLoaded(true);
        AuthService.getUser(user.id)
            .then(resp => {
                setData(resp);
                setIsLoaded(false);
            })
            .catch(e => console.log(e))
    }, []);

    return (
        <DefaultLayout>
            {
                isLoaded ?
                    <Skeleton variant="rectangular" width="100%" height={220} />
                    :
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell align="left">Название</TableCell>
                                    <TableCell align="left">Дата</TableCell>
                                    <TableCell align="center">Редактировать</TableCell>
                                    <TableCell align="center">Удалить</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.overviews.map((item, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.id}
                                        </TableCell>
                                        <TableCell align="left"><Link to={`/overview/${item.id}`}>{item.title}</Link></TableCell>
                                        <TableCell align="left">{new Date(item.dateTime).toLocaleDateString()}</TableCell>
                                        <TableCell align="center">
                                            <Link to={`/edit/${item.id}`}><IconButton color="primary"><ModeEditIcon /></IconButton></Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => deletePost(item.id)} color="error"><RestoreFromTrashIcon /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </DefaultLayout>
    );
}
