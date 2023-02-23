import React, { useContext } from "react"
import { Autorization } from "../Autorization/Autorization"
import { User } from "../User/User"
import s from './style.module.scss'
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import { Badge } from "@mui/material";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";


export const Header = ({ children, logout, setOpenModal }) => {

    const { loggedIn, totalFavourite } = useContext(UserContext)


    return (
        <header className={s.header}>
            {children}

            {loggedIn ? <div className={s.dFlex}>
                <Link to='/favourite'>
                    <Badge color="red" badgeContent={!totalFavourite ? 0 : totalFavourite.length} >
                        <FavoriteBorderSharpIcon />
                    </Badge>
                </Link>
                <User logout={logout} />
            </div> : <Autorization setOpenModal={setOpenModal} />}

        </header>
    )
}