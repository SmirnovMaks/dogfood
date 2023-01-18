import React, { useContext, useState } from "react"
import { Avatar, Button } from "@mui/material"
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { ThemeProvider, styled } from '@mui/material/styles';
import { UserContext } from "../../context/userContext"
import { CustomButton } from '../Button/CustomButton';
import s from './style.module.scss'
import { theme } from "../../utils/themeMUI";
import { Link, NavLink } from "react-router-dom";


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
        <>
            <Avatar className={s.avatar} alt="Remy Sharp" src={user.user.avatar} onClick={handleClick} />
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
                    <ThemeProvider theme={theme}>
                        <CustomButton className={s.button} variant="contained" ><NavLink className={s.link}>Профиль</NavLink></CustomButton>
                        <CustomButton className={s.button} variant="contained" onClick={logout} >Выйти</CustomButton>
                    </ThemeProvider>
                </Typography>
            </Popover>
        </>
    )
}


