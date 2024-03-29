import { Link, useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/FormElements/Input';
import { useFrom } from '../../shared/hooks/form-hook';
import { useHttpclient } from '../../shared/hooks/http-hook';
import { validatorRequire } from '../../shared/util/validators';
import classes from './ResetPassword.module.css';

const ResetPassword = () => {
  const { token } = useParams();
  const history = useHistory();
  const { sendRequest } = useHttpclient();

  const [formState, inputHandler] = useFrom(
    {
      email: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    false
  );

  const submitHandler = async event => {
    event.preventDefault();
    if (token) {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/api/users/reset-password/${token}`,
          'POST',
          JSON.stringify({
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );
        history.push('/auth');
        toast.success('Your password has been changed');
      } catch (err) {
        toast.error(`Something went wrong: ${err.message}`);
      }
    } else {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/api/users/reset-password`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
          }),
          { 'Content-Type': 'application/json' }
        );
        toast.success('Please check your email');
      } catch (err) {
        toast.error(`Something went wrong: ${err.message}`);
      }
    }
  };

  return (
    <Card className={classes.card}>
      <h1>Reset Password</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        {!token ? (
          <Input
            element="input"
            type="email"
            id="email"
            placeholder="Enter Your Email"
            errorText="Please enter a valid email."
            validators={[validatorRequire()]}
            onInput={inputHandler}
          />
        ) : (
          <Input
            element="input"
            type="password"
            id="password"
            placeholder="Enter New Password"
            errorText="Please enter a password."
            validators={[validatorRequire()]}
            onInput={inputHandler}
          />
        )}

        <Button className={classes.button} type="submit">
          Submit
        </Button>
      </form>
      <Link to="/auth">
        <u>Back to login?</u>
      </Link>
    </Card>
  );
};

export default ResetPassword;
