import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import s from './style.module.scss'
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Portal } from "@mui/material";

const HomePage = ({ loggedIn }) => {
    const navigate = useNavigate()



    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const toCatalog = () => {
        loggedIn ? navigate('/catalog') : setOpen((prev) => !prev);
    }

    return (
        <div className={s.content}>
            <div className={s.container}>
                <div className={s.header}>
                    <h1 className={s.title}>Крафтовые лакомства для собак</h1>
                    <p className={s.text}>Всегда свежие лакомства ручной работы с доставкой по России и Миру</p>
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <Box sx={{ position: 'relative' }}>
                            <button className={s.link_catalog} type="button" onClick={toCatalog}>
                                Каталог <i className="fa-solid fa-angle-right"></i>
                            </button>
                            {open ? (
                                <Portal>
                                    <Box className={s.portal}>
                                        Нужно авторизоваться
                                    </Box>
                                </Portal>
                            ) : null}
                        </Box>
                    </ClickAwayListener>
                </div>
            </div>
        </div>
    )
}

export default HomePage