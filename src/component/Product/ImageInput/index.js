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
    const { numSelected, onDeleteSelected, onDelete } = props;
    return (
      <>
        {numSelected > 0 ?
          <Toolbar
            style={{marginTop: '1rem'}}
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...(numSelected > 0 && {
                bgcolor: (theme) =>
                  alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
              }),
            }}
            className="selected-image"
          >
            {numSelected > 0 ? (
              <Typography
                sx={{ flex: '1 1 80%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
                className=""
              >
                {numSelected} Đã chọn
                
                {numSelected > 0 ? (
                  <Tooltip title="Delete" >
                    <IconButton >
                      <DeleteIcon onClick={onDeleteSelected}/>
                    </IconButton>
                  </Tooltip>
                ) : ""}
              </Typography>
            ) : ""}
            {numSelected > 0 ? (
                <Button className="btn btn-delete-all" onClick={onDelete}><p className="p-0 m-0">Delete</p></Button>
            ) : ""}
          </Toolbar>
        :""}
        
      </>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

const ImageInput = ({mode, formRef, oldForm}) => {
    const form = formRef;
    const [images, setImages] = useState(oldForm?.product?.images && mode === "EDIT" ? [...oldForm?.product?.images] : []);
    const [selected, setSelected] = useState([]);
    
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
    const handleClick = (event, url) => {
        const selectedIndex = selected.indexOf(url);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, url);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
    };
    
    const isSelected = (url) => selected.indexOf(url) !== -1;
    const onDeleteSelected = () => {
      setSelected([]);
    }
    const ImagesGallery = (images) => {
        return (
            <ImageList
                cols={3}
                rowHeight={164}
                sx={{ width: 'auto', maxHeight: 400 }}
            >
                {images.map((url, index) => {
                    const isItemSelected = isSelected(url);
                    return <ImageListItem key={index}>
                        <div className="image-container">
                            <img
                                src={url}
                                alt={index}
                                loading="lazy"
                            />
                            
                            <div className="overlay"></div>
                            <Checkbox
                                className="checkbox-image"
                                checked={isItemSelected}
                                onClick={(event) => handleClick(event, url)}
                                ></Checkbox>
                        </div>
                    </ImageListItem>
                    
                })}
            </ImageList>
        )
    }
    const handleMultipleImages =()=>{
        const fileinput = document.getElementById("browse");
        const selectedFIles = [...images];
        const imageToBase64 = form?.current?.product?.images && mode === "EDIT" ? [...form?.current?.product?.images] : [];
        const targetFiles = fileinput.files;
        const targetFilesObject= [...targetFiles]
        targetFilesObject.map((file) => {
            getBase64(file, (result) => imageToBase64.push(result))
            selectedFIles.push(URL.createObjectURL(file))
        })
        form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                images: imageToBase64
            }
        }
        setImages(selectedFIles);
    }
    const browseclick = () => {
      var fileinput = document.getElementById("browse");  // use input file id here
      fileinput.click(); 
    }
    const handleDelete = () => {
      const newList = images.filter((image) => !selected.includes(image))
      const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
      selected.forEach((image) => {
        if (!base64regex.test(image)) {
          // if not base 64. this is image in database. delete it.
        }
      })
      setImages(newList);
      setSelected([]);
      form.current = {
        ...form?.current,
        product: {
            ...form?.current?.product,
            images: newList
          }
      }
    }
    return (
        <>
            <div className="row">
              <div className="col-3">
                
                <InputLabel name='title' className="text-medium p-1 font-weight-bold" style={{margin: 0}}>Media</InputLabel>
              </div>
              <div className="col-9">
                <i className="fa fa-plus-circle icon-color-black media-select-button float-right  btn btn-form-product p-1" onClick={() => browseclick()}></i>
                <input type="file" multiple accept="image/*" id="browse" name="fileupload" style={{display: "none"}} onChange={() => handleMultipleImages()}/>
              </div>
            </div>
            

  
            <EnhancedTableToolbar numSelected={selected.length} onDeleteSelected={onDeleteSelected} onDelete={handleDelete}/>
            {ImagesGallery(images)}
        </>
    );
}

export default ImageInput;