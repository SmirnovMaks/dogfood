import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";
import s from './style.module.scss'



const HomePage = () => {
    const navigate = useNavigate()
    const { loggedIn } = useContext(UserContext)

    const toCatalog = () => {
        loggedIn ? navigate('/catalog') : toast.warn("Сначала нужно авторизоваться");
    }

    return (
        <div className={s.content}>
            <div className={s.container}>
                <div className={s.header}>
                    <h1 className={s.title}>Крафтовые лакомства для собак</h1>
                    <p className={s.text}>Всегда свежие лакомства ручной работы с доставкой по России и Миру</p>
                    {/* <ClickAwayListener onClickAway={handleClickAway}>
                        <Box sx={{ position: 'relative' }}>
                            
                            {open ? (
                                <Portal>
                                    <Box className={s.portal}>
                                        Нужно авторизоваться
                                    </Box>
                                </Portal>
                            ) : null}
                        </Box>
                    </ClickAwayListener> */}
                    <button className={s.link_catalog} type="button" onClick={toCatalog}>
                        Каталог <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage