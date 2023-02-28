import React from "react"
import { UserInfo } from "../../components/UserInfo/UserInfo"
import s from './style.module.scss'


export const Profile = () => {
    return (
        <div className={s.container}>
            <h1>Ваш профиль</h1>
            <UserInfo />
        </div>
    )
}