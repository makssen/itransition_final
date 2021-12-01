import PersonIcon from '@mui/icons-material/Person';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { CreatePost } from './pages/CreatePost';
import { Profile } from './pages/Profile';

export const publicRoutes = [
    {
        label: 'Обзоры',
        path: '/',
        icon: <RateReviewIcon />,
        component: < Home />
    },
    {
        label: 'Войти',
        path: '/login',
        icon: <PersonIcon />,
        component: <Login />
    }
];

export const privateRoutes = [
    {
        label: 'Профиль',
        path: '/profile',
        icon: <AccountCircleIcon />,
        component: <Profile />
    },
    {
        label: 'Обзоры',
        path: '/',
        icon: <RateReviewIcon />,
        component: <Home />
    },
    {
        label: 'Создать обзор',
        path: '/create_overview',
        icon: <CreateIcon />,
        component: <CreatePost />
    }
];
