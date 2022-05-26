import React, {useState} from "react";
import {
    InputLabel,
    ImageList,
    ImageListItem, 
    IconButton,
}
from '@mui/material';
import './index.css';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageInput = ({formRef, oldForm, mode}) => {
    const form = formRef;
    const [images, setImages] = useState(oldForm?.collection?.thumbnail && mode === "EDIT" ? oldForm?.collection?.thumbnail : null);
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
    const ImagesGallery = (images) => {
        return (
            <ImageList
                cols={1}
                rowHeight={"auto"}
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
    const isBase64 = (str) => {
      try {
          return btoa(atob(str)) == str;
      } catch (err) {
          return false;
      }
  }
  const handleDelete = () => {
    if (!isBase64(images)) {
      // if not base 64. this is image in database. delete it.
    }
    setImages(null);
    form.current = {
      ...form?.current,
      collection: {
        ...form?.current?.collection,
        thumbnail: ""
      }
    }
  }
    return (
        <>
            <div className="row">
              <div className="col-8">
                <InputLabel name='title' className="text-medium p-1" style={{margin: 0}}>Media</InputLabel>
              </div>
              <div className="col-4 p-0">
                
              <i className="fa fa-trash icon-color-black media-select-button float-right  btn btn-form-product p-1" onClick={() => handleDelete()}></i>
                <i className="fa fa-plus-circle icon-color-black media-select-button float-right  btn btn-form-product p-1" onClick={() => browseclick()}></i>
                <input type="file" accept="image/*" id="browse" name="fileupload" style={{display: "none"}} onChange={() => handleMultipleImages()}/>
                
              </div>
            </div>
            {ImagesGallery(images)}
        </>
    );
}

export default ImageInput;