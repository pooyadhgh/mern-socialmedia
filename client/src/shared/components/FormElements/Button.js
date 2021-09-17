import './Button.module.css';
import { Link } from 'react-router-dom';

const Button = props => {
  if (props.href) {
    return (
      <a href={props.href} className={`button ${props.class}`}>
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link to={props.to} className={`button ${props.class}`}>
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button ${props.class}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
