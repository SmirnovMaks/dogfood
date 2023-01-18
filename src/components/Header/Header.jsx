import React from "react"
import { Autorization } from "../Autorization/autorization"
import { User } from "../User/User"
import s from './style.module.scss'

export const Header = ({ children, loggedIn, logout }) => {

    return (
        <header className={s.header}>
            {children}
            {loggedIn ? <User logout={logout} /> : <Autorization />}
        </header>
    )
}