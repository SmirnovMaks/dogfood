import React, { useState } from "react";
import { ReactComponent as IconSearch } from '../../assets/image/ic-search.svg';
import { ReactComponent as IconClose } from '../../assets/image/ic-close-input.svg';
import s from './style.module.scss';

export const Search = ({ searchQuery }) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        searchQuery(text)
    };

    return (
        <form onSubmit={onSubmit} className={s.search}>
            <input onChange={(e) => {
                setText(e.target.value);
            }}
                className={s.input}
                placeholder="Поиск"
                value={text}
            />
            <IconSearch className={s.icon} onClick={() => searchQuery(text)} />
            <IconClose
                className={s.iconCross}
                onClick={() => {
                    setText('');
                    searchQuery('')
                }}
            />
        </form>
    );
}