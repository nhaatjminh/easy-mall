import React, {useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
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
    OutlinedInput
} from '@mui/material';
import Divider from '@mui/material/Divider';
import './index.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
import ImageInput from "../ImageInput"
import ReactQuill from 'react-quill'
import { useSelector, useDispatch } from "react-redux";
import { doUploadImageCollection, doCreateCollection } from "../../../redux/slice/collectionSlice";
import { doGetListCollectionOfStores } from "../../../redux/slice/productSlice";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { v4 as uuid } from 'uuid';
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
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
const FormCollection = ({mode, oldForm, returnAfterAdd})=> { // mode add or update
    const dispatch = useDispatch();
    let form = useRef({});
      
    const params = useParams();
    const [errorTitle, setErrorTitle] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [listProducts, setListProducts] = useState([]);
    const [listProductOfCollection, setListProductOfCollection] = useState([]);
    const handleChangeCollectionName = (event) => {
        if (errorTitle) {
            setErrorTitle(null);
        }
        form.current = {
            ...form?.current,
            name: event.target.value
        }
    }
    const saveCollection = () => {
        if (form?.current?.name) {   
            Swal.showLoading();
            new Promise((resolve) => { 
                const data = form?.current?.thumbnail;
                    dispatch(doUploadImageCollection({
                        data: {
                            data: [{
                                name: uuid(),
                                base64Image: data
                            }]
                        }
                    })).then((result) => {
                        if (result?.payload && result?.payload.length > 0) {
                            // payload is array data response from server, first item to link, so get payload[0] in here
                            form.current = {
                                ...form?.current,
                                thumbnail: Object.values(result.payload)[0],
                            }
                            resolve();
                        }
                    })
            }).then(() => {
                const createObj = {
                    storeId: params.storeId,
                    collectionObj: form.current
                }
                dispatch(doCreateCollection(createObj))
                .then((res) => {
                    Swal.close();
                    Swal.fire(
                        'Success!',
                        'Create successful products!',
                        'success'
                    ).then((result) => {
                        returnAfterAdd();
                    })
                });
            })
        } else {
                setErrorTitle('You need to enter a value for this field');
                window.scrollTo(0, 0);
        }
    }
    const handleOpen = () => setModalShow(true);
    const handleClose = () => setModalShow(false);
    
    const handleChangeProductForCollection = (event) => {
        const {target: { value }} = event;
        setListProductOfCollection(typeof value === 'string' ? value.split(',') : value,);
    };
    useEffect(() => {
        form.current = {
            ...form?.current,
            store_id: params.storeId
        }
        dispatch(doGetListCollectionOfStores(params.storeId)).then((result) => setListProducts(result.payload)); 
    },[])
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
                            onChange={handleChangeCollectionName}
                            fullWidth
                            required
                            error={errorTitle ? true : false}
                            helperText={errorTitle}
                            FormHelperTextProps={{
                                className: 'error-text'
                            }}
                        />
                        <InputLabel style={{margin: 0, marginBottom: '0.75rem'}} className="text-medium  ">Description</InputLabel>
                        <ReactQuill value={''}
                            onChange={() => {}} />
                    </Paper>
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <div className="row">
                            <div className="col-3">
                                
                                <InputLabel name='title' className="text-medium p-1" style={{margin: 0}}>Products</InputLabel>
                            </div>
                            <div className="col-9">        
                                <button
                                    className="media-select-button float-right  btn btn-success btn-form-product p-1"
                                    onClick={handleOpen}
                                >
                                    Add Product
                                </button>
                                <Modal
                                    open={modalShow}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={styleModal}>
                                        
                                    <InputLabel name='title' className="text-medium" style={{margin: 0, marginBottom: 20}} >Product</InputLabel>
                                    <FormControl sx={{ m: 1, width: 300 }}>
                                        <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={listProductOfCollection}
                                        renderValue={() => (
                                            <></>
                                        )}
                                        onChange={handleChangeProductForCollection}
                                        input={<OutlinedInput label="Tag" />}
                                        MenuProps={MenuProps}
                                        >
                                            {listProducts.map((product) => (
                                                <MenuItem key={product.id} value={product.id}>
                                                <Checkbox checked={listProductOfCollection.indexOf(product.id) > -1} />
                                                <ListItemText primary={product.title} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    </Paper> 
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                                >    
                                    <InputLabel name='title' className="text-medium" style={{margin: 0}}>Search engine listing preview</InputLabel>
                                    <Link to='#' className="text-decoration-none">
                                        Edit Website SEO
                                    </Link>
                        </Stack>
                        <InputLabel name='title' className="text-small" style={{margin: 0, marginTop: '1rem'}}>Add a title and description to see how this product might appear in a search engine listing</InputLabel>
                    </Paper> 
                </div>   
                <div className="offset-1 offset-sm-1 offset-md-0 offset-lg-0 offset-xl-0 col-11 col-sm-11 col-md-4 col-lg-4 col-xl-4">                      
                    <Paper elevation={5}  style={{padding: '1rem 2rem'}}>
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Collection availability</InputLabel>
                        
                        <FormHelperText id="filled-weight-helper-text">Will be available to {} sales channels.</FormHelperText>
                        <Divider className="divider-custom"/>
                        <FormControlLabel  className="w-100" control={<Checkbox checked={false}/>} label="Online Store" />
                        <FormControlLabel  className="w-100" control={<Checkbox checked={false}/>}  label="Google" />
                        <FormControlLabel  className="w-100" control={<Checkbox checked={false}/>} label="Facebook" />
                        <FormControlLabel  className="w-100" control={<Checkbox checked={false}/>}  label="Microsoft" />
                    </Paper> 
                    
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <ImageInput formRef={form}></ImageInput>
                    </Paper> 
                </div>    
            </div>
            <Divider className="custom-devider" style={{marginTop: 15}} />
            <div className="mt-4 mb-4 row">
                <div className="col-12">
                    <button onClick={saveCollection} style={{width: 'auto'}} className="float-right btn btn-success btn-form-product">Save</button>
            
                </div>
            </div>  
        </FormGroup> 
        </>
    );
}

export default FormCollection;