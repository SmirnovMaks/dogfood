import React, { useState } from "react";
import s from './style.module.scss';
import { Divider, IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export const Search = ({ setSearchQuery }) => {
    const [text, setText] = useState('')



    const onSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(text)
    };

    const onButtonClearInput = () => {
        if (text) {
            return (<> <IconButton onClick={() => {
                setSearchQuery('')
                setText('')
            }} className={s.iconCross} type="button" sx={{ p: '10px' }} >
                <CloseIcon />
            </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            </>)
        }
    }

    return (
        <form className={s.search} onSubmit={onSubmit} >
            <TextField
                className={s.black}
                sx={{ ml: 1, flex: 1, }}
                label="Search"
                variant="standard"
                value={text}
                color='secondary'
                onChange={(e) => {
                    setText(e.target.value);
                }}

            />

            {onButtonClearInput()}

            <IconButton className={s.icon} onClick={() => setSearchQuery(text)} type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>

        </form >
    );
}