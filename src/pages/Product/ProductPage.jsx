import React, { useCallback } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../components/Product/Product";
import { SceletonsProduct } from "../../components/Sceleton/SceletonProduct";
import { useApi } from "../../hooks/useApi";
import { api } from "../../utils/api";
import s from './style.module.scss'


export const ProductPage = ({ handleProductLike }) => {

    const navigate = useNavigate()

    const { productId } = useParams()
    console.log('pd');

    const getProductInfo = useCallback(() => api.getProductInfo(productId), [productId]);
    const { data: product, loading, error } = useApi(getProductInfo);

    console.log(product);

    return (
        <div className={s.container}>
            {loading ? <SceletonsProduct /> : error ? navigate('/catalog') : <Product {...product} handleProductLike={handleProductLike}></Product>}
        </div>
    )
}