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
import Variant from "../Variant";
import ImageInput from "../ImageInput"
import PricingComponent from "../PricingComponent"
import ReactQuill from 'react-quill'
import { useSelector, useDispatch } from "react-redux";
import { doGetListCollectionOfStores } from "../../../redux/slice/collectionSlice";
import { doCreateProduct, doUploadImageProduct } from "../../../redux/slice/productSlice";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { v4 as uuid } from 'uuid';

const FormProduct = ({mode, oldForm, returnAfterAdd})=> { // mode add or update
    const dispatch = useDispatch();
    const collectionList = useSelector((state) => state.collectionSlice.listCollection);
    let form = useRef({});
    const params = useParams();
    const [isVariant, setIsVariant] = useState(false);
    const [errorTitle, setErrorTitle] = useState(null);
    const [collectionSelected, setCollectionSelected] = useState([]);
    const onChangeIsContinueSelling = (event) => {
        form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                continue_sell: event.target.checked
            }
        }
    };
    const handleChangeCollection = (event) => {
        let selectedCol = [];
        let value = event.target.value;
        if (typeof value !== 'string') {
            value = value.map((collectionId) => {
                const curColl = collectionList.find((collection) => collection.id === collectionId)
                let newSelectedCol = {
                    name: curColl.name,
                    id: curColl.id
                }
                selectedCol.push(newSelectedCol);
                return curColl.id
            })
        }
        typeof value === 'string' ? form.current = {
            ...form?.current,   
            collection: value.split(',')
        } : form.current = {
            ...form?.current,
            collection: value
        }
        setCollectionSelected(selectedCol);
    };
    const handleChangeDeleteCollection = (id) => {
        const newCollSelected = collectionSelected.filter((value) => value.id !== id);
        const newCollForForm = form.current?.collection?.filter((CollId) => CollId !== id)
        form.current = {
            ...form?.current,
            collection: newCollForForm
        }
        setCollectionSelected(newCollSelected);
    }
    const handleChangeProductName = (event) => {
        if (errorTitle) {
            setErrorTitle(null);
        }
        form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                title: event.target.value
            }
        }
    }
    const handleOnChangeSKU = (event) => {
        form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                sku: event.target.value
            }
        }
    }
    const handleOnChangeStatus = (event) => {
        form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                status: event.target.value
            }
        }
    }
    const handleOnChangeType = (event) => {
        form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                type: event.target.value
            }
        }
    }
    const handleOnChangeInventory = (event) => {
        if (isVariant)
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    inventory: 0
                }
            }
        else {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    inventory: event.target.value
                }
            }
        }
    }
    const saveProduct = () => {
        if (form?.current?.product?.title) {   
            Swal.showLoading();
            new Promise((resolve) => { 
                const data = form?.current?.product?.images;
                const listPromise = [];
                for (let item of data) {
                    listPromise.push(
                        new Promise((resolveForUpload) => {
                            dispatch(doUploadImageProduct({
                                data: {
                                    data: [{
                                        name: uuid(),
                                        base64Image: item
                                    }]
                                }
                            })).then((result) => {
                                resolveForUpload(result);
                            })
                        })
                    )
                };
                Promise.all(listPromise).then((result) => {
                    if (result && result.length > 0) {
                        // payload is array data response from server, first item to link, so get payload[0] in here
                        result = result.map(data => data.payload[0]); 
                        form.current = {
                            ...form?.current,
                            product: {
                                ...form?.current?.product,
                                thumbnail: Object.values(result)[0],
                                images: Object.values(result)
                            }
                        }
                        resolve();
                    }
                })
            }).then(() => {
                const createObj = {
                    storeId: params.storeId,
                    productObj: form.current
                }
                dispatch(doCreateProduct(createObj))
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
            product: {
                ...form?.current?.product,
                store_id: params.storeId
            }
        }
        dispatch(doGetListCollectionOfStores(params.storeId));
        
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
                            onChange={handleChangeProductName}
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
                    
                   <PricingComponent key="PricingComponent" formRef={form} isVariant={isVariant}></PricingComponent>
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <InputLabel name='title' className="text-medium  " style={{margin: 0, marginBottom: '1rem'}}>Inventory</InputLabel>
                        <div className="row">
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">

                                <InputLabel name='title' style={{margin: 0}}>SKU (Stock Keeping Unit)</InputLabel>
                                <TextField style={{width: 'auto'}} className="text-field-input" name='title' fullWidth required onChange={(e) => handleOnChangeSKU(e)}  />
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">  
                                <InputLabel name='title' style={{margin: 0}}>Quantity</InputLabel>
                                <TextField style={{width: 'auto'}} disabled={isVariant} className="text-field-input" name='title' fullWidth required onChange={(e) => handleOnChangeInventory(e)}  />
                            </div>
                        </div>
                        <div>
                            <FormControlLabel className='font-weight-normal' control={<Checkbox onChange={(event) => onChangeIsContinueSelling(event)}/>} label="Continue selling when out of stock" />
                        </div>
                    </Paper> 
                    <Variant key="Variant"  formRef={form} setIsVariant={setIsVariant}
                    ></Variant>
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
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Status</InputLabel>
                        <div key={form?.current?.product?.status || "SelectStatus"}>
                            <Select fullWidth
                            className="poper-item"
                            
                            defaultValue={form?.current?.product?.status || "draft"}
                            onChange={(e) => handleOnChangeStatus(e)}
                            >
                                <MenuItem value="draft">Draft</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                            </Select>
                        </div>
                        
                        <FormHelperText id="filled-weight-helper-text">This product will be hidden from all sales channels.</FormHelperText>
                        <Divider className="divider-custom"/>
                        
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>SALES CHANNELS AND APPS</InputLabel>
                        <FormControlLabel  className="w-100" control={<Checkbox checked={false}/>} label="Online Store" />
                        <FormControlLabel  className="w-100" control={<Checkbox checked={false}/>}  label="Google" />
                        <FormControlLabel  className="w-100" control={<Checkbox checked={false}/>} label="Facebook" />
                        <FormControlLabel  className="w-100" control={<Checkbox checked={false}/>}  label="Microsoft" />
                    </Paper> 
                    <Paper elevation={5}  style={{padding: '1rem 2rem', marginTop: "2rem"}}>
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium">Product organization</InputLabel>

                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium">Type</InputLabel>
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
                        
                        <InputLabel style={{marginBottom: '1rem', marginTop: "1rem"}} className="text-medium" name='title'>Collection</InputLabel>
                        <div key={form?.current?.product?.collection ?? "SelectCollection"}>
                            <Select
                                fullWidth multiple
                                className="poper-item"
                                defaultValue={[]}
                                value={collectionSelected.map((value) => value.id)}
                                onChange={(e) => handleChangeCollection(e)}
                                renderValue={() => (
                                    <></>
                                )}
                            >
                                {collectionList.map((collection, index) => {
                                    return <MenuItem value={collection.id} key={index}>{collection.name}</MenuItem>      
                                })}
                            </Select>
                        </div>
                        {collectionSelected.length > 0 ?
                            collectionSelected.map((collection, index) => {
                                return <Chip className="collection-chip" key={index} label={collection.name} onDelete={() => handleChangeDeleteCollection(collection.id)}/>
                            })
                        : ""}
                    </Paper> 
                </div>    
            </div>
            
            <Divider className="custom-devider" style={{marginTop: 15}} />
            <div className="mt-4 mb-4 row">
                <div className="col-12">
                    <button onClick={saveProduct} style={{width: 'auto'}} className="float-right btn btn-success btn-form-product">Save</button>
            
                </div>
            </div> 
        </FormGroup> 
        </>
    );
}

export default FormProduct;