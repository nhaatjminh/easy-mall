import React, {useEffect, useState} from "react";
import {
    InputLabel,
    ImageList,
    ImageListItem, 
    IconButton,
}
from '@mui/material';
import './index.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { doDeleteImageCollectionBanner } from "../../../redux/slice/bannerSlice";
import { useDispatch } from "react-redux";

const ImageInput = ({boldTitle = true, formRef, oldForm, mode, modal, valueToAdd = {}, setValueToAdd = () => {}}) => {
    const form = formRef;
    const dispatch = useDispatch();
    const [images, setImages] = useState();
    useEffect(() => {
      if (!modal) setImages(oldForm?.collection?.thumbnail && mode === "EDIT" ? oldForm?.collection?.thumbnail : null)
      else setImages(valueToAdd.image ? valueToAdd.image : null)
    }, [modal])
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
                sx={{ width: 'auto', maxHeight: 360 }}
                style={{overflowX: 'hidden', paddingRight: 5}}
            >
              {
                images ?
                  <ImageListItem key={`thumbnail-0`}>
                    <div className="image-container" style={{ padding: 0, margin: 0}}>
                        <img
                          src={images}
                          style={{maxWidth: 340, maxHeight: 340, width: 'auto', height: 'auto'}}
                          alt="image"
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
        var fileinput = document.getElementById(`${!modal ? 'browse' : 'browseModal'}`);
        let selectedFIles;
        const targetFiles = fileinput.files;
        const targetFilesObject= [...targetFiles]
        targetFilesObject.map((file) => {
            getBase64(file, (result) => {
              if (!modal) {
                form.current = {
                  ...form?.current,
                  collection: {
                    ...form?.current?.collection,
                    thumbnail: result
                  }
                }
              } else {
                valueToAdd.image = result;
                setValueToAdd(valueToAdd);
              }
            });
            selectedFIles = URL.createObjectURL(file);
        })
        setImages(selectedFIles);
    }
    const browseclick = () => {
      var fileinput = document.getElementById(`${!modal ? 'browse' : 'browseModal'}`);  // use input file id here
      fileinput.click(); 
    }
    const handleDelete = () => {
      if (!(images.startsWith('blob:'))) {
        new Promise(() => {
          dispatch(doDeleteImageCollectionBanner({
              data: {
                  url: images
              }
          }))
        })
      }
      setImages(null);
      if (!modal) {
        form.current = {
          ...form?.current,
          collection: {
            ...form?.current?.collection,
            thumbnail: null
          }
        }
      } else {
        valueToAdd.image = null;
        setValueToAdd(valueToAdd);
      }
    }
    return (
        <>
            <div className="row">
              <div className="col-8">
                <InputLabel name='title'  className={`${boldTitle ? 'text-header' : 'text-label'} p-1`} style={{margin: 0}}>Media</InputLabel>
              </div>
              <div className="col-4 p-0">
              <IconButton className="icon-color-black float-right btn-form-product p-1" onClick={() => handleDelete()}>
                <DeleteIcon/>
              </IconButton>
                <i className="fa fa-plus-circle icon-color-black float-right  btn btn-form-product p-1 pt-2" onClick={() => browseclick()}></i>
                <input type="file" accept="image/*" id={`${!modal ? 'browse' : 'browseModal'}`} name="fileupload" style={{display: "none"}} onChange={() => handleMultipleImages()}/>
                
              </div>
            </div>
            {ImagesGallery(images)}
        </>
    );
}

export default ImageInput;