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
import { doDeleteImageProduct, doDeleteProduct } from "../../../redux/slice/productSlice";
import { useSelector, useDispatch } from "react-redux";

const EnhancedTableToolbar = (props) => {
    const { numSelected, onDeleteSelected, onDelete, onSelectThumbnail } = props;
    return (
      <>
        {numSelected > 0 ?
          <Toolbar
            style={{marginTop: '1rem', minHeight: 40}}
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
                {numSelected} Selected
              </Typography>
            ) : ""}
            
            {numSelected > 0 ? (
              <button className="btn btn-login btn-manager ml-2" onClick={onDeleteSelected}> <p className="text-btn-login font-size-0-85-rem-max500"> Cancel </p></button>
            ) : ""}
            {numSelected > 0 ? (
              <button className="btn btn-login btn-delete-item btn-manager ml-2" onClick={onDelete}> <p className="text-btn-login font-size-0-85-rem-max500"> Delete </p></button>
            ) : ""}
            
            {numSelected === 1 ? (
              <button className="btn btn-login btn-manager ml-2 pl-0 pr-0" onClick={onSelectThumbnail}> <p className="text-btn-login font-size-0-85-rem-max500"> Thumbnail </p></button>
            ) : ""}
          </Toolbar>
        : <Toolbar 
        style={{marginTop: '1rem', minHeight: 20}}></Toolbar>}
        
      </>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

const ImageInput = ({mode, formRef, oldForm, setIdxThumbnail}) => {
    const form = formRef;
    const [images, setImages] = useState(oldForm?.product?.images && mode === "EDIT" ? [...oldForm?.product?.images] : []);
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();

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
                sx={{ width: 'auto', maxHeight: 400 }}
            >
                {images.map((url, index) => {
                    const isItemSelected = isSelected(url);
                    return <ImageListItem key={index}>
                        <div className="image-container" style={{ height: 164}}>
                            <img

                                src={url}
                                alt={index}
                                loading="lazy"
                            />
                            
                            <div className={`overlay ${isItemSelected ? "overlay-select" : ""}`}></div>
                            <Checkbox
                                className={`checkbox-image ${isItemSelected ? "checkbox-image-selected" : ""}`}
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
      selected.forEach((image) => {
        if (!(image.startsWith('blob:'))) {
          const listPromise = [];   
          listPromise.push(
              new Promise(() => {
                  dispatch(doDeleteImageProduct({
                      data: {
                          url: image
                      }
                  }))
              }))
          };
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
    const handleSelectThumbnail = () => {
      const selectedIndex = form.current.product.images.indexOf(selected[0]);
      setIdxThumbnail(selectedIndex);
      setSelected([]);
    }
    return (
        <>
            <div className="row">
              <div className="col-11" style={{display: 'inline-flex'}}>
                
                  <InputLabel name='title' className="text-header p-1 font-weight-bold" style={{margin: 0}}>Media</InputLabel>
                  <InputLabel name='title' className="p-1 pt-2" style={{margin: 0, fontSize: 12}}> {`(You can choose one image to select thumbnail)`}</InputLabel>

              </div>
              <div className="col-1">
                <i className="fa fa-plus-circle icon-color-black media-select-button float-right  btn btn-form-product p-1 pt-2" onClick={() => browseclick()}></i>
                <input type="file" multiple accept="image/*" id="browse" name="fileupload" style={{display: "none"}} onChange={() => handleMultipleImages()}/>
              </div>
            </div>
            

  
            <EnhancedTableToolbar numSelected={selected.length} onSelectThumbnail={handleSelectThumbnail} onDeleteSelected={onDeleteSelected} onDelete={handleDelete}/>
            {ImagesGallery(images)}
        </>
    );
}

export default ImageInput;