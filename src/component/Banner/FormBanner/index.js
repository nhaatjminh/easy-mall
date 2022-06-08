import React, {useState, useEffect, useCallback, useRef, Fragment } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import ModalAddBanner from '../ModalAddBanner'
import {
    Paper,
    TextField,
    InputLabel,
    Box,
    Chip,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Select,
    Checkbox,
    FormHelperText,
    CircularProgress,
    Modal,
    FormControl,
    ListItemText,
    IconButton,
    ListItemAvatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import ImageInput from "../ImageInput"
import ReactQuill from 'react-quill'
import { useSelector, useDispatch } from "react-redux";
import { doUploadImageBanner, doCreateCollectionBanner, doDeleteCollectionBanner, doUpdateCollectionBanner } from "../../../redux/slice/bannerSlice";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};
const FormBanner = ({mode, oldForm, returnAfterAdd})=> { // mode add or update
    const dispatch = useDispatch();
    let form = useRef({});
    const params = useParams();
    const [errorTitle, setErrorTitle] = useState(null);
    const [listBanner, setListBanner] = useState([]);
    const handleChangeCollectionBannerName = (event) => {
        if (errorTitle) {
            setErrorTitle(null);
        }
        form.current = {
            ...form?.current,
            collection: {
                ...form?.current?.collection,
                name: event.target.value
            }
        }
    }
    const handleChangeRichtext = (event) => {
        form.current = {
            ...form?.current,
            collection: {
                ...form?.current?.collection,
                description: event
            }
        }
    }
    const isBase64 = (str) => {
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        }
    }
    const saveCollection = () => {
        if (form?.current?.collection?.name) {   
            Swal.showLoading();
            new Promise((resolve) => { 
                const data = form?.current?.collection?.thumbnail;
                if (data) {
                    const base64result = data.substr(data.indexOf(',') + 1);
                    if (!isBase64(base64result)) {
                        resolve();
                    } else {
                        //need delete image if u change image
                        dispatch(doUploadImageBanner({
                            data: {
                                data: [data]
                            }
                        })).then((result) => {
                            if (result?.payload && result?.payload.length > 0) {
                                // payload is array data response from server, first item to link, so get payload[0] in here                  
                                form.current = {
                                    ...form?.current,
                                    collection: {
                                        ...form?.current?.collection,
                                        thumbnail: Object.values(result.payload)[0],
                                    }
                                }
                                resolve();
                            }
                        })
                    }
                } else {
                    resolve();
                }
            }).then(async () => {
                if (mode !== "EDIT") {
                    const createObj = {
                        storeId: params.storeId,
                        collectionObj: form.current
                    }
                    dispatch(doCreateCollectionBanner(createObj))
                    .then((res) => {
                        Swal.close();
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Create successful collection!',
                        }).then((result) => {
                            returnAfterAdd();
                        })
                    });
                }
                else {
                    const listProductUpdate = []
                    await form.current?.products?.forEach(product => {
                        if (product.update){
                            listProductUpdate.push(product)
                        }
                    })
                    form.current.products = listProductUpdate;
                    const updateObj = {
                        newCollection: form.current
                    }
                    dispatch(doUpdateCollectionBanner(updateObj))
                    .then((res) => {
                        Swal.close();
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Edit collection successful !',
                        }).then((result) => {
                            returnAfterAdd();
                        })
                    });
                }
            })
        } else {
                setErrorTitle('You need to enter a value for this field');
                window.scrollTo(0, 0);
        }
    }
    const handleDeleteCollection = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Please Wait !',
                    html: 'Deleting Collection',// add html attribute if you want or remove
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                    },
                });
                dispatch(doDeleteCollectionBanner({
                    id: form.current.collection.id
                })).then((result) => {
                    Swal.close();
                    returnAfterAdd();
                })
            }
        })
        
    }
    useEffect(() => {
        if (mode === "ADD") {
            form.current = {}
        }
        form.current = {
            ...form?.current,
            collection: {
                ...form?.current?.collection,
                store_id: params.storeId
            }
        }
    },[])
    useEffect(() => {
        if (mode) {
            if (oldForm && mode === 'EDIT') {
                form.current = oldForm;
                setListBanner(form.current.banners);
            }
            else {
                form.current = {
                    ...form?.current,
                    collection: {
                        ...form?.current?.collection,
                        store_id: params.storeId
                    }
                }
            }
        }
    }, [oldForm, mode, params.storeId])
    return (
        <>
        <FormGroup>
            <div className="row  text-black">  
                <div className="offset-1 offset-sm-1 col-11 col-sm-11 col-md-7 col-lg-7 col-xl-7">   
                    <Paper elevation={5} style={{padding: '1rem 2rem'}}>
                        <InputLabel name='title' className="text-medium  " style={{margin: 0}}>Title</InputLabel>
                        <TextField
                            className="text-field-input"
                            id="title-product"
                            name='title'
                            key={`collection-name`}
                            onChange={handleChangeCollectionBannerName}
                            fullWidth
                            required
                            error={errorTitle ? true : false}
                            helperText={errorTitle}
                            defaultValue={mode === "EDIT" && oldForm?.collection?.name ? oldForm.collection.name : ""}
                            FormHelperTextProps={{
                                className: 'error-text'
                            }}
                        />
                        <InputLabel style={{margin: 0, marginBottom: '0.75rem'}} className="text-medium  ">Description</InputLabel>
                        <ReactQuill
                            defaultValue={mode === "EDIT" && oldForm?.collection?.description ? oldForm?.collection?.description : ""}
                            onChange={(event) => handleChangeRichtext(event)}
                        />
                    </Paper>
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <div className="row">
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <InputLabel name='title' className="text-medium p-1" style={{margin: 0}}>List Banner</InputLabel>
                                
                                <ModalAddBanner></ModalAddBanner>
                            </div>
                            <Box style={{overflow: "auto", maxHeight: 400}}>
                                {listBanner.length ? listBanner.map((banner, index) => {
                                    return (
                                        <div key={banner.id + "item-select"}>
                                            <MenuItem key={`${banner.id}-selected`} value={banner.id}>
                                                <p className="pr-2 m-0">{index}.</p>
                                                {
                                                banner.thumbnail ?
                                                    <Box key={`${banner.id} - box`} style={{width: 35, height: 'auto', marginRight: 30}}>
                                                        <ListItemAvatar key={`${banner.id} - avatar`}>
                                                            <img alt="thumbnail" src={banner.thumbnail}/>
                                                        </ListItemAvatar>
                                                    </Box>
                                                :  <Box key={`${banner.id} - box`} style={{width: 35, height: 'auto', marginRight: 30}}>
                                                        <ListItemAvatar key={`${banner.id} - avatar`}>
                                                            <img alt="thumbnail" src='/img/default-image-620x600.jpg'/>
                                                        </ListItemAvatar>
                                                    </Box>
                                                }
                                                <div style={{ display: `flex`, flexDirection: 'column', width: '100%'}}>

                                                    <ListItemText key={`${banner.id} title`} primary={banner.caption}/>
                                                    <ListItemText key={`${banner.id} title`} primary={banner.link}/>
                                                </div>
                                                <IconButton className="float-right text-extra-large" onClick={() => console.log(index)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </MenuItem>
                                            {index !== listBanner.length - 1 && <Divider className="divider-custom" />}
                                            
                                        </div>
                                )}) : <></>}
                            </Box>
                        </div>
                    </Paper> 
                </div>   
                <div className="offset-1 offset-sm-1 offset-md-0 offset-lg-0 offset-xl-0 col-11 col-sm-11 col-md-4 col-lg-4 col-xl-4">                       
                    <Paper elevation={5} style={{padding: '1rem 2rem'}}>
                        <ImageInput formRef={form} oldForm={oldForm} mode={mode}></ImageInput>
                    </Paper> 
                </div>    
            </div>
            <Divider className="custom-devider" style={{marginTop: 15}} />
            <div className="mt-4 mb-4 row form-group-button">
                <div className="col-6">
                    {
                        mode === "EDIT" ?
                        <button onClick={handleDeleteCollection} style={{width: 'auto'}} className="float-left btn btn-collection btn-light btn-form-product btn-delete-product">Delete</button>
                        : ""
                    }
                </div>
                <div className="col-6">
                    <button onClick={saveCollection} style={{width: 'auto'}} className="float-right btn btn-collection btn-success btn-form-product">Save</button>
            
                </div>
            </div>  
        </FormGroup> 
        </>
    );
}

export default FormBanner;