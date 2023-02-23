import { Card } from "../Card/Card"
import s from './style.module.scss'


export const CardList = ({ cards, handleProductLike }) => {

    return (
        <div className={s.cards} >
            {cards?.map(card => (<Card handleProductLike={handleProductLike} key={card._id} {...card} />))}
        </div>
    )
}