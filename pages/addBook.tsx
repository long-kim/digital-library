import React from 'react';
import {
  makeStyles,
  createStyles,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Chip,
  Typography,
  FormControl,
  Checkbox,
  ListItemText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import { firebaseConfig } from '../firebase/config';
import Navbar from '../components/navbar/Navbar';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import Router from 'next/router';

const PUBLIC_URL = 'http://localhost:4000/api/add-book';

interface IImage {
  type: string,
  url: string
}

const categories = [
  'Tiểu thuyết',
  'Trinh thám',
  'Chính trị',
  'Self-help',
  'Truyện ngắn',
  'Công nghệ',
  'Môi trường',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      backgroundColor: '#fff',
      width: '100%',
      color: '#707070',
      padding: '23px 104px',

      fontFamily: 'Lato',
      minHeight: '100vh'
    },
    container__upper: {
      display: 'flex',
      flexDirection: 'column',
    },
    container__bottom: {},
    title: {
      fontSize: '36px',
    },
    title__description: {
      fontSize: '13px',
    },
    form: {
      width: '100%',
      padding: '23px 40px',
    },
    form_control: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',

      marginTop: '29px',
      width: '100%',
    },
    form_label: {
      width: '120px',
    },
    input: {
      width: 'calc(100% - 120px)',
      '& fieldset': {
        borderRadius: '12px',
      },
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },

    button: {
      backgroundColor: '#dedede',
      borderRadius: '12px'
    },
    button_center: {
      width: '200px'
    },
    submit_container: {
      display: 'flex',
      justifyContent: 'center'
    },
    image: {
      width: '188px',
      height: '287px',
      marginRight: '23px'
    },
    image_container: {
      display: 'flex',
      flexDirection: 'row'
    }
  }),
);

const AddBook: React.FC = () => {
  const classes = useStyles();
  const [user, _, handleLogout] = useFirebaseAuth(firebaseConfig);

  const [bookName, setBookName] = React.useState<string>('');
  const [author, setAuthor] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [categorySelect, setCategory] = React.useState<string[]>([]);
  const [images, setImage] = React.useState<File[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string[]);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event.target.files)) {
      // const extension = event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf('.') + 1);
      // setImage(images.concat({
      //   type: extension,
      //   url: URL.createObjectURL(event.target.files[0])
      // }));

      setImage(images.concat(event.target.files[0]));
    }
    // console.log(images);
  }

  const handleSubmit = async () => {
    if (!isValidated) {
      // let formData = new FormData();

      // formData.append('user', user ? user.uid : '');
      // formData.append('name', bookName);
      // formData.append('author', author);
      // formData.append('overview', description);
      // formData.append('cate', JSON.stringify(categorySelect));
      // images.forEach((image, index) => {
      //   formData.append(`${index}`, image)
      // });


      // const response = await fetch(PUBLIC_URL, {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //   },
      //   body: formData
      // });

      // const res = await response.json();
      // console.log(res);



        // Initialize DB and Storage
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    
        const db = firebase.firestore();
        const storageRef = firebase.storage().ref();
    
        // Get books collection ref
        const bookRef = db.collection('books-test').doc();
    
        // Generate a random ID
        const id = bookRef.id;

        images.forEach((image, index) => {
          const extension = image.name.substring(image.name.lastIndexOf('.') + 1);

          // bookId/0.ext
          const pathRef = storageRef.child(`${id}`);
          const imageRef = pathRef.child(`${index}.${extension}`);
          let uploadTask = imageRef.put(image);
  
          console.log(`Uploaded ${id}/${index}.${extension}`);
        })
    
        let img: string[] = [];
        images.forEach((image, index) => {
          const extension = image.name.substring(image.name.lastIndexOf('.') + 1);
          img.push(`${id}/${index}.${extension}`);
        })

        let data = {
            author: author,
            name: bookName,
            overview: description,
            cate: categorySelect,
            img: img,
            status: 'pending',
            user: user ? user.uid : ''
        }
        console.log(data);
        // Add to new document to books collections
        let newDoc = await db.collection('books-test').doc(id).set(data);

        alert('Uploaded');
        Router.push('/');

    
    }
  }

  const isValidated = !bookName     ||
                      !author       ||
                      !description  ||
                      categorySelect.length === 0 ||
                      images.length === 0;


  const renderImage = images.map(image => {
    return <img src={URL.createObjectURL(image)} className={classes.image}/>
  })

  

  return (
    <React.Fragment>
      <Box>
        <Navbar page={'/'} user={user} handleLogout={handleLogout} />
        <Box className={classes.container}>
          <Box className={classes.container__upper}>
            <Typography className={classes.title} variant="h5">
              Thêm sách mới
            </Typography>
            <Typography className={classes.title__description}>
              Vui lòng điền đầy đủ những thông tin về cuốn sách
            </Typography>
          </Box>
          <Box className={classes.container__bottom}>
            <form className={classes.form}>
              <FormControl className={classes.form_control}>
                <Typography className={classes.form_label}>
                  Tên cuốn sách:{' '}
                </Typography>
                <TextField
                  id="book-name"
                  variant="outlined"
                  className={classes.input}
                  value={bookName}
                  onChange={(event) => {setBookName(event.target.value)}}
                  inputProps={{maxLength: 150}}

                />
              </FormControl>
              <FormControl className={classes.form_control}>
                <Typography className={classes.form_label}>
                  Tác giả:{' '}
                </Typography>
                <TextField
                  id="author"
                  variant="outlined"
                  className={classes.input}
                  value={author}
                  onChange={(event) => {setAuthor(event.target.value)}}
                  required
                  inputProps={{maxLength: 100}}

                />
              </FormControl>
              <FormControl className={classes.form_control}>
                <Typography className={classes.form_label}>Mô tả: </Typography>
                <TextField
                  id="description"
                  variant="outlined"
                  multiline
                  rows="6"
                  className={classes.input}
                  value={description}
                  onChange={(event) => {setDescription(event.target.value)}}
                  required
                  inputProps={{maxLength: 750}}
                />
              </FormControl>
              <FormControl className={classes.form_control}>
                <Typography className={classes.form_label}>
                  Thể loại:{' '}
                </Typography>
                <Select
                  className={classes.input}
                  variant="outlined"
                  multiple
                  value={categorySelect}
                  onChange={handleChange}
                  id="category-multiple"
                  required
                  // input={<Input id='category-multiple' />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {(selected as string[]).map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>
                      <Checkbox
                        checked={categorySelect.indexOf(category) > -1}
                      />
                      <ListItemText primary={category} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.form_control}>
                <Typography className={classes.form_label}>
                  Hình minh họa:{' '}
                </Typography>
                <Box className={classes.image_container}>{renderImage}</Box>
                {images.length < 3 ? 
                  <Button className={classes.button} variant="contained" component="label">
                    <AddIcon />
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
                  </Button>
                  :
                  null
                }
                
              </FormControl>
            </form>
            <Box className={classes.submit_container}>
              <Button disabled={isValidated} className={`${classes.button} ${classes.button_center}`} variant="contained" component="span" onClick={handleSubmit}>
                Tải lên
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default AddBook;
