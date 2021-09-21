import { useContext, useState } from 'react';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/FormElements/Input';
import AuthContext from '../../shared/context/auth-context';
import { useFrom } from '../../shared/hooks/form-hook';
import { validatorRequire } from '../../shared/util/validators';
import classes from './Auth.module.css';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const authCtx = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useFrom(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: '', isValid: false },
        },
        false
      );
    }

    setIsLoginMode(prevMode => !prevMode);
  };

  const submitHandler = event => {
    event.preventDefault();
    // commiunicating with server...
    authCtx.login('dummyToken');
    console.log(formState.inputs);
  };
  return (
    <Card className={classes.card}>
      <h1>Login</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        {!isLoginMode && (
          <Input
            element="input"
            type="name"
            id="name"
            placeholder="Enter Your Name"
            errorText="Please enter a valid name."
            validators={[validatorRequire()]}
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          type="email"
          id="email"
          placeholder="Enter Your Email"
          errorText="Please enter a valid email."
          validators={[validatorRequire()]}
          onInput={inputHandler}
        />

        <Input
          element="input"
          type="password"
          id="password"
          placeholder="Enter Your Password"
          errorText="Entered Password is wrong."
          validators={[validatorRequire()]}
          onInput={inputHandler}
        />

        <Button
          className={classes.button}
          type="submit"
          disabled={!formState.isValid}
        >
          {isLoginMode ? 'Login' : 'Signup'}
        </Button>
      </form>

      {isLoginMode ? (
        <p>
          Not already a member?
          <u>
            <strong onClick={switchModeHandler}> Click to Register now </strong>
          </u>
        </p>
      ) : (
        <p>
          Already have an account?
          <u>
            <strong onClick={switchModeHandler}> Click to Login </strong>
          </u>
        </p>
      )}
    </Card>
  );
};

export default Auth;
