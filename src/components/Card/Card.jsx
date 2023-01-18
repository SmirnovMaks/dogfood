import * as React from 'react';
import { ThemeProvider, styled } from '@mui/material/styles';
import Cards from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { theme } from '../../utils/themeMUI'
import s from './style.module.scss'
import { CustomButton } from '../Button/CustomButton';

export const Card = ({ style, _id, likes, name, pictures, wight, price, discount, description, tags }) => {


    return (
        <Cards sx={{ maxWidth: 345 }} className={s.font} key={_id}>
            <CardHeader
                className={s.font}
                action={
                    <IconButton aria-label="add to favorites"
                    >
                        <FavoriteIcon color='error' />
                    </IconButton>
                }
                title={name}
                subheader={price}
            />
            <CardMedia
                component="img"
                height='50%'
                image={pictures}
                alt="Product"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {wight}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ThemeProvider theme={theme}>
                    <CustomButton variant="contained" status='danger' className={s.color}>В корзину</CustomButton>
                </ThemeProvider>

            </CardActions>
        </Cards>
    );
}