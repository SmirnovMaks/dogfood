import React from "react";
import { NavLink } from "react-router-dom";
import { CardList } from "../../components/CardList/CardList";
import s from './style.module.scss'


export const FavouriteProducts = ({ cards, handleProductLike }) => {

    return (
        <div className={s.container}>
            <h2>Избранные товары</h2>
            <NavLink className={s.link} to='/catalog'>{'<'} В каталог</NavLink>
            {cards.length > 0 ? (< CardList handleProductLike={handleProductLike} cards={cards} />) : <h3>Нет избранных товаров</h3>}
        </div>

    )
}