import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/FormElements/Input';
import AuthContext from '../../shared/context/auth-context';
import { useFrom } from '../../shared/hooks/form-hook';
import { useHttpclient } from '../../shared/hooks/http-hook';
import { validatorRequire } from '../../shared/util/validators';
import classes from './Auth.module.css';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const authCtx = useContext(AuthContext);
  const { sendRequest } = useHttpclient();
  const history = useHistory();

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

  const submitHandler = async event => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:8080/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );
        authCtx.login(responseData.user._id);
        history.push('/');
      } catch (err) {
        throw err;
      }
    } else {
      try {
        const responseData = await sendRequest(
          'http://localhost:8080/api/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );

        authCtx.login(responseData.user._id);
        history.push('/');
      } catch (err) {
        throw err;
      }
    }
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
