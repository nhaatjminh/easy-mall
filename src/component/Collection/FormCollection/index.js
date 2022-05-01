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
    CircularProgress
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
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { v4 as uuid } from 'uuid';

const FormCollection = ({mode, oldForm, returnAfterAdd})=> { // mode add or update
    const dispatch = useDispatch();
    let form = useRef({});
    const params = useParams();
    const [errorTitle, setErrorTitle] = useState(null);
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

    useEffect(() => {
        form.current = {
            ...form?.current,
            store_id: params.storeId
        }
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
                        <ImageInput formRef={form}></ImageInput>
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
                    {/* <Paper elevation={5}  style={{padding: '1rem 2rem', marginTop: "2rem"}}>
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium">Online Store</InputLabel>

                        <p style={{marginBottom: '1rem'}}> Theme template</p>
                        <div key={form?.current?.product?.type ?? "SelectType"}>
                            <Select fullWidth 
                            className="poper-item"
                            defaultValue={form?.current?.product?.type ?? ""}
                            onChange={(e) => handleOnChangeType(e)}>
                                <MenuItem value="Clothes">Clothes</MenuItem>
                                <MenuItem value="Book">Book</MenuItem>
                                <MenuItem value="Bike">Bike</MenuItem>
                            </Select>
                        </div>
                        <p> Assign a template from your current theme to define how the collection is displayed.</p>
                    </Paper>  */}
                    
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