import { useContext } from 'react';
import Button from '../../shared/components/Button/Button';
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { useFrom } from '../../shared/hooks/form-hook';
import { useHttpclient } from '../../shared/hooks/http-hook';
import { validatorRequire } from '../../shared/util/validators';
import AuthContext from '../../shared/context/auth-context';
import classes from './NewPost.module.css';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

const NewPost = () => {
  const [formState, inputHandler] = useFrom(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
      image: { value: null, isValid: false },
    },
    false
  );

  const { sendRequest } = useHttpclient();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('image', formState.inputs.image.value);
      formData.append('creator', authCtx.userId);

      await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/api/posts`,
        'POST',
        formData,
        {
          Authorization: 'Bearer ' + authCtx.token,
        }
      );

      toast.success('New post added succesfully');
      history.push('/');
    } catch (err) {
      toast.error('Something went wrong, Please try again');
    }
  };

  return (
    <Card className={classes.card}>
      <h1>New Post</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please choose an image"
        />
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
