import React, { useContext, useEffect, useState } from 'react';
import Cards from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import s from './style.module.scss'

import { CustomButton } from '../Button/CustomButton';
import { Badge, Tooltip } from '@mui/material';
import { UserContext } from "../../context/userContext"
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';




export const Card = ({ _id, likes, name, pictures, wight, price, discount, description, tags, handleProductLike }) => {

    const { user } = useContext(UserContext)
    const [isLiked, setIsLiked] = useState(false)
    const navigate = useNavigate()

    const discountedPrice = Math.round(price - (price * (discount / 100)))

    const like = useCallback(() => {
        likes.forEach((item) => {
            if (item === user._id) {
                setIsLiked(true)
            }
        })
    }, [likes, user._id])

    useEffect(() => {
        like()
    }, [like])

    const onClick = () => {
        setIsLiked(!isLiked)
        handleProductLike(_id, isLiked)
    }

    const shortName = (name.length > 40) ? name.substr(0, 40) + '...' : name

    return (
        <Badge anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
            color="primary" badgeContent={discount ? 'sale' : 0}>
            <Cards sx={{ maxWidth: 200, maxHeight: 400 }} className={s.card} key={_id}>

                <CardMedia sx={{ maxWidth: 200 }}
                    component="img"
                    height='50%'
                    image={pictures}
                    alt="Product"
                    onClick={() => navigate(`/product/${_id}`)}
                />

                <Tooltip className={s.pointer} title={name} onClick={() => navigate(`/product/${_id}`)}>
                    <Typography color="text.danger" variant="p">{shortName}</Typography>
                </Tooltip>

                <CardContent>
                    <div className={s.dFlex}>
                        <div>
                            {discount ? (<Typography className={s.lineThrough} variant="body2" color="danger">{price + ' ₽'}</Typography>) : ''}
                            <Typography variant="body2" className={discount && s.red}>
                                {discountedPrice + ' ₽'}
                            </Typography>
                        </div>

                        <IconButton onClick={onClick} aria-label="add to favorites">
                            <FavoriteIcon color={isLiked ? 'red' : ''} />
                        </IconButton>

                    </div>
                </CardContent>

                <CardActions disableSpacing onClick={() => console.log(1)}>
                    <CustomButton variant="contained" color="primary" >В корзину</CustomButton>
                </CardActions>
            </Cards>
        </Badge >

    );
}