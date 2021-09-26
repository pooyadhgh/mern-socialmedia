import classes from './ImageUpload.module.css';
import Button from '../Button/Button';
import { useEffect, useRef, useState } from 'react';

const ImageUpload = props => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickImgHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid(false);
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  return (
    <div>
      <input
        ref={filePickerRef}
        type="file"
        id={props.id}
        style={{ display: 'none' }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={classes['image-container']}>
        <div className={classes['image-preview']}>
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p>Please choose a file</p>}
        </div>
        <Button
          type="button"
          className={classes.button}
          onClick={pickImgHandler}
        >
          Choose Picture
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
