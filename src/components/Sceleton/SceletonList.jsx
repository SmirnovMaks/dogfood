import React from "react";
import { Sceletons } from "./Sceleton";
import s from './style.module.scss'

export const SceletonList = () => {
    return (
        <div className={s.sceletons}>
            <Sceletons />
            <Sceletons />
            <Sceletons />
            <Sceletons />
            <Sceletons />
            <Sceletons />
            <Sceletons />
            <Sceletons />
            <Sceletons />
            <Sceletons />
            <Sceletons />
            <Sceletons />
        </div>
    )
}