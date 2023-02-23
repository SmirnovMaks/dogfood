import React from 'react';
import s from './style.module.scss';
import cn from 'classnames';

const Sort = ({ currentSort, tabs, onChangeSort }) => {
    return (
        <div className={s.container}>
            <h3>Сортировка:</h3>
            <div className={s.sortType}>
                {tabs.map((tab) => (
                    <div onClick={() => onChangeSort(tab.id)} key={tab.id} className={cn(s.tab, { [s.active]: currentSort === tab.id })}>
                        {tab.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sort;
