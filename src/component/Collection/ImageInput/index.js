import React, {useState, useEffect} from "react";
import {
    InputLabel,
    ImageList,
    ImageListItem,
    Toolbar,
    Checkbox,
    IconButton,
    Typography,
    Tooltip,
    Button
}
from '@mui/material';
import './index.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';

const EnhancedTableToolbar = (props) => {
    const { numSelected, onDeleteSelected } = props;
    return (
      <>
        {numSelected ?
          <Toolbar
            style={{marginTop: '1rem'}}
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 }
            }}
            className='collection-image'
          >
              <Typography
                sx={{ flex: '1 1 80%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                Đã chọn
                <Tooltip title="Delete" >
                  <IconButton >
                    <DeleteIcon onClick={onDeleteSelected}/>
                  </IconButton>
                </Tooltip>
              </Typography>
              
              <Button className="btn btn-delete-all"><p className="p-0 m-0">Delete</p></Button>
          </Toolbar>
        :""}
        
      </>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.bool.isRequired,
  };

const ImageInput = ({formRef, oldForm, mode}) => {
    const form = formRef;
    const [images, setImages] = useState(oldForm?.collection?.thumbnail && mode === "EDIT" ? oldForm?.collection?.thumbnail : null);
    const [selected, setSelected] = useState(false);
    
    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const handleClick = () => {
        setSelected(!selected);
    };
    const onDeleteSelected = () => {
      setSelected(false);
    }
    const ImagesGallery = (images) => {
        return (
            <ImageList
                cols={3}
                rowHeight={164}
                sx={{ width: 'auto', maxHeight: 400 }}
            >
              {
                images ?
                  <ImageListItem key={`thumbnail-0`}>
                    <div className="image-container">
                        <img
                          src={images}
                          alt="thumbnail"
                          loading="lazy"
                        />
                        
                        <div className="overlay"></div>
                        <Checkbox
                            className="checkbox-image"
                            checked={selected}
                            onClick={(event) => handleClick()}
                            ></Checkbox>
                      </div>
                  </ImageListItem>
                : ""
              }
              
            </ImageList>
        )
    }
    const handleMultipleImages =()=>{
        var fileinput = document.getElementById("browse");
        let selectedFIles;
        const targetFiles = fileinput.files;
        const targetFilesObject= [...targetFiles]
        targetFilesObject.map((file) => {
            getBase64(file, (result) => { 
                form.current = {
                  ...form?.current,
                  collection: {
                    ...form?.current?.collection,
                    thumbnail: result
                  }
                }
            });
            selectedFIles = URL.createObjectURL(file);
        })
        setImages(selectedFIles);
    }
    const browseclick = () => {
      var fileinput = document.getElementById("browse");  // use input file id here
      fileinput.click(); 
    }
    return (
        <>
            <div className="row">
              <div className="col-8">
                
                <InputLabel name='title' className="text-medium p-1" style={{margin: 0}}>Media</InputLabel>
              </div>
              <div className="col-4 p-0">
                <i className="fa fa-plus-circle icon-color-black media-select-button float-right  btn btn-form-product p-1" onClick={() => browseclick()}></i>
                <input type="file" accept="image/*" id="browse" name="fileupload" style={{display: "none"}} onChange={() => handleMultipleImages()}/>
              </div>
            </div>
            

  
            <EnhancedTableToolbar numSelected={selected} onDeleteSelected={onDeleteSelected} />
            {ImagesGallery(images)}
        </>
    );
}

export default ImageInput;