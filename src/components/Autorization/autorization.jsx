import React from "react";
import s from './style.module.scss'
import { ReactComponent as Icon } from '../../assets/image/dog_face.svg'

export const Autorization = ({ setOpenModal }) => {
    const openModal = () => {
        setOpenModal(true)
    }

    return (
        <div className={s.autorization} onClick={openModal}>

            <Icon className={s.autorization} />
            <p className={s.text}>Вход</p>

        </div>
    )
}