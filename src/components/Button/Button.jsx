import css from './Button.module.css';
const Button = ({ clickLoadMore, children }) => {
  return (
    <button type="button" onClick={clickLoadMore} className={css.Button}>
      {children}
    </button>
  );
};

export default Button;
