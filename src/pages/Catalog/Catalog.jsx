import React, { useCallback, useContext } from 'react'
import { CardList } from "../../components/CardList/CardList";
import { SceletonList } from "../../components/Sceleton/SceletonList";

import { LoadingContext } from '../../context/loadingContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import s from './style.module.scss'
import Sort from '../../components/Sort/Sort';

export const Catalog = ({ products, searchQuery, handleProductLike, onChangeSort, currentSort, sortedCards }) => {

    const { isLoading } = useContext(LoadingContext);
    const { loggedIn } = useContext(UserContext)
    const navigate = useNavigate()


    const tabs = [
        {
            id: 'cheap',
            title: 'Сначала дешевые',
        },
        {
            id: 'low',
            title: 'Сначала дорогие',
        },
        {
            id: 'sale',
            title: 'По скидке',
        },
        {
            id: 'default',
            title: 'Без сортировки',
        },
    ];


    const checkAuth = useCallback(() => {
        console.log(loggedIn);
        if (!loggedIn) navigate('/')
    }, [loggedIn, navigate])

    const resultSearch = () => {
        if (products.length === 0) {
            return (
                <h2>По данному запросу ничего не найдено</h2>
            )
        } else if (searchQuery) {
            return (
                <h2>По запросу {searchQuery} найдено {products.length} товаров</h2>
            )
        }
    }




    if (isLoading) {
        return <SceletonList />
    }

    return (
        <>
            {checkAuth()}
            <div className={s.container}>
                {resultSearch()}
                (<><Sort currentSort={currentSort} onChangeSort={onChangeSort} tabs={tabs}></Sort>
                    < CardList handleProductLike={handleProductLike} cards={currentSort === 'default' ? products : sortedCards} />
                </>)
            </div>
        </>
    )
}