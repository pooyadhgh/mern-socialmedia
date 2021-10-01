import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
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
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: '', isValid: false },
          image: { value: null, isValid: false },
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
          `${process.env.REACT_APP_BASE_URL}/api/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );

        authCtx.login(responseData.userId, responseData.token);
        history.push('/');
        toast.success('Welcome Back!');
      } catch (err) {
        toast.error(`Something went wrong: ${err.message}`);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('name', formState.inputs.name.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);

        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/api/users/signup`,
          'POST',
          formData
        );

        authCtx.login(responseData.userId, responseData.token);

        history.push('/');
        toast.success('Welcome to MERN-SocialMedia');
      } catch (err) {
        toast.error(`Something went wrong: ${err.message}`);
      }
    }
  };
  return (
    <Card className={classes.card}>
      <h1>Login</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        {!isLoginMode && <ImageUpload id="image" onInput={inputHandler} />}

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

      <Link to="/reset-password">
        <u>Forgot your password?</u>
      </Link>
    </Card>
  );
};

export default Auth;
