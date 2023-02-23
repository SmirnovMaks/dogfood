import React, { useContext, useState } from "react"
import { Avatar } from "@mui/material"
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { UserContext } from "../../context/userContext"
import { CustomButton } from '../Button/CustomButton';
import s from './style.module.scss'
import { NavLink } from "react-router-dom";


export const User = ({ logout }) => {
    const user = useContext(UserContext)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div >
            <div className={s.dFlex} onClick={handleClick} >
                <Typography variant="h6">{user.user.name}</Typography>
                <Avatar className={s.avatar} alt="Remy Sharp" src={user.user.avatar} />
            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2, display: 'grid', gap: '10px' }}>

                    <CustomButton className={s.button} variant="contained" ><NavLink onClick={handleClose} to={`/user/${user.user._id}`} className={s.link}>Профиль</NavLink></CustomButton>
                    <CustomButton className={s.button} variant="contained" onClick={logout} >Выйти</CustomButton>

                </Typography>
            </Popover>
        </div>
    )
}


