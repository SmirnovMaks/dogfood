import React from "react";
import s from './style.module.scss'
import { ReactComponent as Icon } from '../../assets/image/dog_face.svg'
import { Link } from "react-router-dom";
import TransitionsModal from "../Modal/Modal";

export const Autorization = () => {
    return (
        <>
            <Link to='/login'>
                <Icon className={s.autorization} />
            </Link>

        </>
    )
}