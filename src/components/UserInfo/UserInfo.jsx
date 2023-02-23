
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import s from './style.module.scss'

export const UserInfo = () => {
    const user = useContext(UserContext)
    console.log(user);

    return (
        <div className={s.container}>
            <img className={s.avatar} src={user.user.avatar} alt='avatar' />
            <div className={s.info}>
                <span className={s.name}>{user.user.name}</span>
                <span className={s.about}>{user.user.about}</span>
                <span className={s.email}>{user.user.email}</span>
            </div>
        </div>
    )
}