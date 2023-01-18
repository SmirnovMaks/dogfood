import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import s from './style.module.scss';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';
import HomePage from '../../pages/HomePage/HomePage';
import { Catalog } from '../../pages/Catalog/Catalog';
import { MainForm } from '../Form/MainForm';
import { getItem, setItem, removeItem } from '../../utils/storage';
import { signin, checkToken, signup } from '../../utils/auth'
import { Search } from '../Search/Search';
import { NotFound } from '../../pages/NotFound/NotFound';
import { Card } from '../Card/Card';
import { api } from '../../utils/api';
import { UserContext } from '../../context/userContext';
import Logo from '../Logo/Logo';
import { LoadingContext } from '../../context/loadingContext';



function App() {
    const [cards, setCards] = useState([])
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true)


    const onChangeLoading = useCallback((isLoading) => {
        setIsLoading(isLoading);
    }, []);

    const navigate = useNavigate();

    const handleRequest = useCallback((searchQuery) => {
        setIsLoading(true)
        api
            .search(searchQuery)
            .then((data) => {
                setCards(data);
            }).finally(() => setIsLoading(false))
    }, []);

    const handleRequestSignup = data => {
        signup(data)
            .then(data => {
                if (!data.err) {
                    navigate('/login');
                }
            })
    }


    const handleRequestLogin = data => {
        signin(data)
            .then(data => {
                if (!data.err) {
                    setUser(data.data)
                    setItem('token', data.token)
                }
            }).finally(() => {
                setLoggedIn(true)
                navigate('/')
            })
    }

    const logout = () => {
        setLoggedIn(false);
        removeItem('token');
        navigate('/login');
    };

    const handleRequestCheckToken = () => {
        const token = getItem('token')
        if (token) {
            checkToken(token).then((data) => {
                if (data) {
                    setLoggedIn(true);
                    setUser(data)
                }
            })
        } else if (!token) {
            setLoggedIn(false);

        }
    }

    useEffect(() => {
        handleRequestCheckToken()
    }, [])

    useEffect(() => {
        if (loggedIn) {
            api.getAllProducts()
                .then(data => {
                    if (!data.err) {
                        setCards(data.products)
                    }
                })
                .finally(() => setIsLoading(false))
        }
    }, [loggedIn])

    return (
        //handleProductLike, favourites: favouriteCards.length,
        < LoadingContext.Provider value={{ isLoading, onChangeLoading }
        }>
            <UserContext.Provider value={{ user, loggedIn }}>
                <Header loggedIn={loggedIn} logout={logout}>
                    <Logo onClick={() => navigate('/')} />
                    <Search searchQuery={handleRequest} />
                </Header>

                <Routes>
                    <Route path='/' element={<HomePage loggedIn={loggedIn} />} />
                    <Route path='/card' element={<Card />} />
                    <Route path='/catalog' element={loggedIn && <Catalog products={cards} />} />
                    <Route path='/login' element={<MainForm handleRequestSignup={handleRequestSignup} handleRequestLogin={handleRequestLogin} />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <Footer />
            </UserContext.Provider>
        </LoadingContext.Provider >

    )
}

export default App;