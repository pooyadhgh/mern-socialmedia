import { useContext } from 'react';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/FormElements/Input';
import { useFrom } from '../../shared/hooks/form-hook';
import { useHttpclient } from '../../shared/hooks/http-hook';
import { validatorRequire } from '../../shared/util/validators';
import AuthContext from '../../shared/context/auth-context';
import classes from './NewPost.module.css';
import { useHistory } from 'react-router';

const NewPost = () => {
  const [formState, inputHandler] = useFrom(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  );

  const { sendRequest } = useHttpclient();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:8080/api/posts',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          creator: authCtx.token,
        }),
        { 'Content-Type': 'application/json' }
      );

      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={classes.card}>
      <h1>New Post</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <Input
          id="title"
          element="input"
          placeholder="Title"
          type="text"
          errorText="Please enter a valid title."
          validators={[validatorRequire()]}
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          placeholder="Description"
          type="text"
          errorText="Please enter a valid description."
          validators={[validatorRequire()]}
          onInput={inputHandler}
        />
        <Button
          className={classes.button}
          type="submit"
          disabled={!formState.isValid}
        >
          Add Post
        </Button>
      </form>
    </Card>
  );
};

export default NewPost;
