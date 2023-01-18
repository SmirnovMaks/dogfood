import cn from 'classnames';

import s from './style.module.scss';

function Button({ type, onClick, color, children }) {
  return (
    <button type={type} onClick={onClick} className={cn(s.button, { [s.secondary]: color === 'secondary', [s.primary]: color === 'primary' })}>
      {children}
    </button>
  );
}

export default Button;




