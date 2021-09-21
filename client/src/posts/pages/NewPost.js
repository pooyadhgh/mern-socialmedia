import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/FormElements/Input';
import { useFrom } from '../../shared/hooks/form-hook';
import { validatorRequire } from '../../shared/util/validators';
import classes from './NewPost.module.css';

const NewPost = () => {
  const [formState, inputHandler] = useFrom(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  );

  const submitHandler = event => {
    event.preventDefault();
    // commiunicating with server...
    console.log(formState.inputs);
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
