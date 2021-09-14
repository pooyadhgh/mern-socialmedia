import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import { useFrom } from '../../shared/hooks/form-hook';
import { validatorRequire } from '../../shared/util/validators';

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
    <div>
      <h2>New Post</h2>
      <form onSubmit={submitHandler}>
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
        <Button type="submit" disabled={!formState.isValid}>
          Add Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
