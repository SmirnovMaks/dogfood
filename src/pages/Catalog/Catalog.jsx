import React, { useContext } from 'react'
import { CardList } from "../../components/CardList/CardList";
import { SceletonList } from "../../components/Sceleton/SceletonList";
import s from './style.module.scss'
import { LoadingContext } from '../../context/loadingContext';

export const Catalog = ({ products }) => {

    const { isLoading } = useContext(LoadingContext);


    return (
        <>  {isLoading ? (
            <SceletonList />
        ) : (
            <CardList cards={products} />)}
        </>
    )
}