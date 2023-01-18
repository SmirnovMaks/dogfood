import { NavLink } from "react-router-dom"

import s from './style.module.scss'

export const NotFound = () => {

    return (
        <>
            <h1>Ошибка 404</h1>
            <h3>Такой страницы не существует</h3>
            <NavLink className={s.link} to='/'><i className="fa-solid fa-angle-left"></i> На главную</NavLink>
        </>
    )
}