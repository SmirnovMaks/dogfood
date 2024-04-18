import { Icon, IconButton, Rating } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { CustomButton } from "../Button/CustomButton";
import s from './style.module.scss'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from "../../context/userContext";

export const Product = ({ handleProductLike, _id, name, description, price, discount, pictures, reviews, stock, likes }) => {
    const user = useContext(UserContext)


    const discountPrice = Math.round(price - (price * discount) / 100);

    const [count, setCount] = useState(0)
    const [isLiked, setIsLiked] = useState(false)

    const productIsLiked = useCallback(() => {
        console.log(user.user._id);
        likes.forEach(el => el === user.user._id ? setIsLiked(true) : setIsLiked(false))

    }, [likes, user.user._id])

    const countState = (num) => {
        if (num < 0 && count === 0) {
            setCount(0)
        } else if (count === stock && num > 0) {
            setCount(stock)
        } else {
            setCount(prev => prev + num)
        }

    }

    const [rate, setRate] = useState(0)
    const getRate = useCallback(() => {
        let count = 0
        reviews.forEach(el => {
            count += el.rating
        })
        return Math.round(count / reviews.length)
    }, [reviews])

    useEffect(() => {
        setRate(getRate)
        productIsLiked()
    }, [getRate, productIsLiked])

    const onClick = () => {
        setIsLiked(!isLiked)
        handleProductLike(_id, isLiked)
    }
    console.log({ reviews })

    return (
        <div className={s.container}>
            <NavLink className={s.link} to='/catalog'>{'< '}Назад</NavLink>
            <div className={s.dFlex}>
                <div className={s.content}>
                    <h1>{name}</h1>
                    <Rating
                        readOnly
                        name="simple-controlled"
                        value={rate}
                        onChange={(event, newValue) => {
                            setRate(newValue);
                        }}
                    />
                    <div className={s.img}><img src={pictures} alt="product" /></div>
                </div>
                <div className={s.prices}>
                    <span className={discount ? s.discount : ''}>{price + ' ₽'}</span>
                    {discount ? (<span className={s.red}>{discountPrice + ' ₽' || ''}</span>) : ''}
                    <div className={s.count}>
                        <Icon onClick={() => countState(-1)} baseClassName="fas" className={`fa-minus-circle ` + s.icon} color="primary" />
                        <span>{count}</span>
                        <Icon onClick={() => countState(1)} baseClassName="fas" className={`fa-plus-circle ` + s.icon} color="primary" />
                    </div>
                    <IconButton className={s.button} onClick={onClick} aria-label="add to favorites">
                        <FavoriteIcon color={isLiked ? 'red' : ''} />
                    </IconButton>
                    <CustomButton className={s.button} variant="contained" color="primary">В корзину</CustomButton>
                    <div className={s.descr}>{description}</div>
                </div>
            </div>
            <div className={s.rewiews}>

            </div>
        </div>
    )
}