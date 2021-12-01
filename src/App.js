import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { PostPage } from './pages/PostPage';
import { SignUp } from './pages/SignUp';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initAuthAction } from './store/actions/userActions';
import { Loader } from './components/Loader';
import { SearchPage } from './pages/SearchPage';


function App() {

  const dispatch = useDispatch();

  const { isLoaded, isAuth } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(initAuthAction());
  }, [])

  return (
    <>
      {isLoaded ? <Loader /> :
        <BrowserRouter>
          <Routes>
            {isAuth ?
              privateRoutes.map((item, i) => <Route key={i} path={item.path} element={item.component} />)
              :
              (<>
                {publicRoutes.map((item, i) => <Route key={i} path={item.path} element={item.component} />)}
                <Route path="/registration" element={<SignUp />} />
              </>
              )
            }
            <Route path="/overview/:id" element={<PostPage />} />
            <Route path="/search/:query" element={<SearchPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </BrowserRouter>}
    </>
  );
}

export default App;
