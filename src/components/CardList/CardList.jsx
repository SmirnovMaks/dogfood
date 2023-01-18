import { Card } from "../Card/Card"
import s from './style.module.scss'


export const CardList = ({ cards }) => {
    return (
        <div className={s.cards} >
            {cards?.map(card => (<Card key={card.id} {...card} />))}
        </div>
    )
}