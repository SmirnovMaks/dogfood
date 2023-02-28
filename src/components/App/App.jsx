import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import { api } from '../../utils/api';
import { UserContext } from '../../context/userContext';
import Logo from '../Logo/Logo';
import { LoadingContext } from '../../context/loadingContext';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../utils/themeMUI';
import { Profile } from '../../pages/Prifile/Profile';
import TransitionModal from '../Modal/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FavouriteProducts } from '../../pages/FavouriteProducts/FavouriteProducts';
import { ProductPage } from '../../pages/Product/ProductPage';




function App() {
    const [cards, setCards] = useState([])
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [totalFavourite, setTotalFavourite] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [currentSort, setCurrentSort] = useState('default');
    const [sortedCards, setSortedCards] = useState([]);

    const navigate = useNavigate()
    const location = useLocation()

    const onChangeSort = useCallback(
        (newSort) => {
            setCurrentSort(newSort);
            if (newSort === 'cheap') {
                setSortedCards([...cards].sort((a, b) => a.price - b.price));
            }
            if (newSort === 'low') {
                setSortedCards([...cards].sort((a, b) => b.price - a.price));
            }
            if (newSort === 'sale') {
                setSortedCards([...cards].sort((a, b) => b.discount - a.discount));
            }
            if (newSort === 'default') {
                setSortedCards(cards);
            }
        },
        [cards]
    );



    const onChangeLoading = useCallback((isLoading) => {
        setIsLoading(isLoading);
    }, []);

    const favouriteCards = useCallback((data) => {
        console.log(2222);
        setTotalFavourite([])
        const checkLike = id => id === user._id
        data.forEach(item => {
            if (item.likes.some(checkLike)) setTotalFavourite(prev => [...prev, item])

        })
    }, [user._id, cards])


    const handleRequestSignup = data => {
        signup(data)
            .then(data => {
                toast.success('Регистрация успешна')

            })
            .catch(err => {
                if (err === 'Error: 409') toast.error('Такой пользователь уже существует')
            })
    }

    const handleRequestLogin = async data => {
        await signin(data)
            .then(data => {
                if (!data.err) {
                    setUser(data.data)
                    setItem('token', data.token)
                    setLoggedIn(true)
                    setOpenModal(false)
                    navigate('/catalog')
                }
            })
            .catch((err) => {
                toast.error('Неправильные почта или пароль')
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
        setIsLoading(true)
        if (loggedIn) {
            api.search(searchQuery)
                .then((data) => {
                    setCards(data);
                }).finally(() => setIsLoading(false))
        }

    }, [searchQuery, loggedIn]);

    useEffect(() => {
        handleRequestCheckToken()
    }, [])

    useEffect(() => {
        if (cards) favouriteCards(cards)

    }, [cards, favouriteCards])

    const getProducts = useCallback(() => {
        if (loggedIn) {
            setIsLoading(true)
            api.getAllProducts()
                .then(data => {
                    if (!data.err) {
                        setCards(data.products)
                        console.log(data.products);

                    }
                })
                .finally(() => setIsLoading(false))
        }
    }, [loggedIn])

    useEffect(() => {
        if (loggedIn) getProducts()
    }, [loggedIn, getProducts])


    const handleProductLike = useCallback((productId, isLike) => {

        api.changeLikeStatus(productId, isLike)
            .then((updateProduct) => {
                if (!updateProduct.err) {
                    setCards(prev => prev.map(item => item._id === updateProduct._id ? updateProduct : item))

                }
            })
    }, [])

    return (

        <div className={s.container}>
            < LoadingContext.Provider value={{ isLoading, onChangeLoading }}>
                <UserContext.Provider value={{ user, loggedIn, totalFavourite }}>
                    <ThemeProvider theme={theme}>
                        <Header logout={logout} setOpenModal={setOpenModal}  >
                            <Logo onClick={() => navigate('/')} />
                            {location.pathname === '/catalog' ? <Search setSearchQuery={setSearchQuery} /> : ''}
                        </Header>
                        <div className={s.height}>
                            <Routes>
                                <Route path='/' element={<HomePage />} />
                                <Route path='/catalog' element={loggedIn && <Catalog sortedCards={sortedCards} currentSort={currentSort} onChangeSort={onChangeSort} setTotalFavourite={setTotalFavourite} handleProductLike={handleProductLike} loggedIn={loggedIn} searchQuery={searchQuery} products={cards} />} />
                                <Route path='/favourite' element={<FavouriteProducts handleProductLike={handleProductLike} cards={totalFavourite} />} />
                                <Route path='/login' element={<MainForm handleRequestSignup={handleRequestSignup} handleRequestLogin={handleRequestLogin} />} />
                                <Route path='/user/:userId' element={<Profile />} />
                                <Route path='/product/:productId' element={<ProductPage handleProductLike={handleProductLike} />} />
                                <Route path='*' element={<NotFound />} />
                            </Routes>
                        </div>
                        <Footer />
                        <TransitionModal openModal={openModal} setOpenModal={setOpenModal} handleRequestLogin={handleRequestLogin} />
                        <ToastContainer
                            position="top-right"
                            autoClose={1500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </ThemeProvider>
                </UserContext.Provider>
            </LoadingContext.Provider >
        </div>
    )
}

export default App;