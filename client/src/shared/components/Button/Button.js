import classes from './Button.module.css';
import { Link } from 'react-router-dom';

const Button = props => {
  if (props.href) {
    return (
      <a href={props.href} className={`${classes.button} ${props.className}`}>
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link to={props.to} className={`${classes.button} ${props.className}`}>
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${classes.button} ${props.className}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
