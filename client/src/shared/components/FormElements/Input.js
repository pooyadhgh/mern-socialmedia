import { useReducer, useEffect } from 'react';
import { validate } from '../../util/validators';
import classes from './Input.module.css';

const initialState = { value: '', isValid: false, isBlured: false };

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators),
      };

    case 'BLUR':
      return {
        ...state,
        isBlured: true,
      };

    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      payload: event.target.value,
      validators: props.validators,
    });
  };

  const blurHandler = () => {
    dispatch({ type: 'BLUR' });
  };

  const element =
    props.element === 'input' ? (
      <input
        type={props.type}
        id={props.id}
        value={inputState.value}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={blurHandler}
        className={classes.input}
      />
    ) : (
      <textarea
        id={props.id}
        value={inputState.value}
        placeholder={props.placeholder}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={blurHandler}
        className={classes.textarea}
      />
    );

  return (
    <div className={props.className}>
      {element}
      {!inputState.isValid && inputState.isBlured && (
        <p className={classes['error-text']}>{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
