import React, {useState, useEffect, useCallback, useRef } from "react";
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Paper, TextField, InputLabel, Box,Chip ,Select, MenuItem, Input, FormGroup, FormControlLabel,Popper, Checkbox, InputAdornment, FormHelperText} from '@material-ui/core';
import {EditorState} from 'draft-js'
import { Editor } from "react-draft-wysiwyg";
import Divider from '@mui/material/Divider';
import './index.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from "react-router-dom";
import Variant from "../Variant";
import { debounce } from "lodash";
import ImageInput from "../ImageInput"


const FormProduct = ({mode, oldForm})=> { // mode add or update
    const [editorState, setEditorState] = useState(()=> EditorState.createEmpty());
    const [trackQuantity, setTrackQuantity] = useState(false);

    //const [variant, setVariant] = useState([]);
    let form = useRef({});
    const [imageInput, setImageInput] = useState([]);
    const [imageBase64, setImageBase64] = useState([]);
    const params = useParams();
    const debounceChange = useCallback(debounce((callbackFunction) => callbackFunction, 1000))

    const onChangeTrackQuantity = () => {
        setTrackQuantity(!trackQuantity);
    }
    
    const columns = [
        { id: 'title', label: 'Title', minWidth: 170,align: 'right' },
        { id: 'price', label: 'Price', minWidth: 100, maxWidth: 200,align: 'right' },
        {
          id: 'quantity',
          label: 'Quantity',
          minWidth: 170,
          maxWidth: 200,
          align: 'right',
        },
        {
          label: '',
          minWidth: 170,
          maxWidth: 200,
          align: 'right'
        },
    ];
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
        const { target: { value }} = event;
        typeof value === 'string' ? form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                collection: value.split(',')
            }
        } : form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                collection: value
            }
        }
    };
    const handleChangeProductName = (event) => {
        form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                title: event.target.value
            }
        }
    }
    const handleChangeProductPrice = (event) => {
        form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                price: event
            }
        }
    }
    const handleChangeProductCostPerItem = (event) => {
        form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                cost: event
            }
        }
    }
    const handleOnChangeStatus = (event) => {
        form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                status: event
            }
        }
    }
    const handleOnChangeType = (event) => {
        form.current = {
            ...form?.current,
            product: {
                ...form?.current?.product,
                type: event
            }
        }
    }
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
    useEffect(() => {
        const NewImageBase64 = [];
        new Promise((resolve) => {
            imageInput.forEach((image) => getBase64(image,(result) => NewImageBase64.push(result)));
            resolve();
        }).then(() => {
            setImageBase64(NewImageBase64)
        })
    }, [imageInput])
    useEffect(() => {
        document.getElementById("title-product").value = "a";
        console.log(document.getElementById("title-product"));
    },[])
    // useEffect (() => {
    //     const newForm = {
    //         product: {
    //             store_id: params.storeId,
    //             // title: productName,
    //             // price: productPrice,
    //             // cost: productCostPerItem,
    //             is_variant: showOpt,
    //             // status: status,
    //             //collection: collection,
    //             //type: type,
    //             image: imageBase64
    //         },
    //         option: optionValue,
    //         variant: variant
    //     }
    // }, [variant,imageBase64, showOpt, optionValue, params.storeId])
    
    console.log(form);
    return (
        <>
        <FormGroup>
            <div className="row  text-black">  
                <div className="offset-1 col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">   
                    <Paper elevation={5} style={{padding: '1rem 2rem'}}>
                        <InputLabel name='title' className="text-medium  " style={{margin: 0}}>Title</InputLabel>
                        <TextField className="text-field-input" id="title-product" name='title' onChange={handleChangeProductName} placeholder='Enter Title' fullWidth required />
                        <InputLabel style={{margin: 0, marginBottom: '0.75rem'}} className="text-medium  ">Description</InputLabel>
                        <div style={{ border: "1px solid black", padding: '2px', minHeight: '200px' }}>
                            <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            />
                        </div>
                    </Paper> 
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <ImageInput setImagesInput={setImageInput}></ImageInput>
                    </Paper> 
                    
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <InputLabel name='title' className="text-medium  " style={{margin: 0, marginBottom: '1rem'}}>Pricing</InputLabel>
                        <div className="row">
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={10}
                                >
                                <InputLabel name='title' className="text-normal" style={{margin: 0, marginRight: '1rem'}}>Price</InputLabel>
                                <TextField className="text-field-input"
                                    style={{width: 'auto'}}
                                    placeholder="0.00"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" style={{paddingLeft: '0.25rem'}}>$</InputAdornment>,
                                    }}
                                    name='title'
                                    fullWidth
                                    required
                                    onChange={(e) => handleChangeProductPrice(e.target.value)}  />
                            </Stack>
                        </div>
                        <FormControlLabel control={<Checkbox onChange={onChangeTrackQuantity}/>} className='font-weight-normal' label="Charge tax on this product" />
                        <Divider className="divider-custom"/>
                        
                        <InputLabel name='title' style={{margin: 0}}>Cost per item</InputLabel>
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={10}
                            >
                            
                            <TextField className="text-field-input"
                                placeholder="0.00"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" style={{paddingLeft: '0.25rem'}}>$</InputAdornment>,
                                }}
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                name='title'
                                fullWidth
                                required
                                onChange={(e) => handleChangeProductCostPerItem(e.target.value)}  />
                            {form?.product?.cost && form?.product?.price ? 
                            <>
                                <div>
                                    <p style={{margin: 0}}>Margin</p>
                                    <p style={{margin: 0}}>{(form?.product?.price - form?.product?.cost)/form?.product?.price * 100} %</p>
                                </div>
                                <div>
                                    <p style={{margin: 0}}>Profit</p>
                                    <p style={{margin: 0}}>${form?.product?.price - form?.product?.cost}</p>
                                </div>
                            </>: ""}
                        </Stack>
                        <FormHelperText id="filled-weight-helper-text">Customers won’t see this</FormHelperText>
                    </Paper>
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <InputLabel name='title' className="text-medium  " style={{margin: 0, marginBottom: '1rem'}}>Inventory</InputLabel>
                        <div className="row">
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <InputLabel name='title' style={{margin: 0}}>SKU (Stock Keeping Unit)</InputLabel>
                                <TextField className="text-field-input" name='title' fullWidth required onChange={() => console.log()}  />
                            </div>
                        </div>
                        <div>
                            <FormControlLabel className='font-weight-normal' control={<Checkbox onChange={onChangeTrackQuantity}/>} label="Track quantity" />
                        </div>
                        <div>
                            <FormControlLabel className='font-weight-normal' hidden={!trackQuantity} control={<Checkbox onChange={(event) => onChangeIsContinueSelling(event)}/>} label="Continue selling when out of stock" />
                        </div>
                        <Divider className="divider-custom"/>
                        <div className="row">

                            <InputLabel name='title' style={{marginLeft: '0.75rem', marginBottom: '2rem'}}>Quantity</InputLabel>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                                >
                                    <p style={{marginBottom: 0}}>
                                        Location name
                                    </p>
                                    <p>
                                        Available
                                    </p>
                            </Stack>
                            <Divider/>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                                >
                                    <p>
                                        Location name
                                    </p>
                                    {!trackQuantity ? 
                                        <p>
                                            Available
                                        </p>
                                    :
                                        <TextField type="number" style={{maxWidth: 75}}   InputProps={{ inputProps: { min: 0, value: 0 } }} className="text-field-input" name='title' fullWidth required onChange={() => console.log()()}  />
                                    }
                                    
                            </Stack>
                        </div>
                    </Paper> 
                    <Variant columnsOfData={columns} formRef={form}
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
                <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">                      
                    <Paper elevation={5}  style={{padding: '1rem 2rem'}}>
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Product Status</InputLabel>
                        <Select fullWidth
                        className="poper-item"
                        onChange={(e) => handleOnChangeStatus(e.target.value)}
                        >
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                        </Select>
                        <FormHelperText id="filled-weight-helper-text">This product will be hidden from all sales channels.</FormHelperText>
                        <Divider className="divider-custom"/>
                        
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Sales channels and apps</InputLabel>
                        <FormControlLabel fullWidth className="w-100" control={<Checkbox checked={false}/>} label="Online Store" />
                        <FormControlLabel fullWidth className="w-100" control={<Checkbox checked={false}/>}  label="Google" />
                        <FormControlLabel fullWidth className="w-100" control={<Checkbox checked={false}/>} label="Facebook" />
                        <FormControlLabel fullWidth className="w-100" control={<Checkbox checked={false}/>}  label="Microsoft" />
                    </Paper> 
                    <Paper elevation={5}  style={{padding: '1rem 2rem', marginTop: "2rem"}}>
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Product organization</InputLabel>
                        
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Type</InputLabel>
                        <Select fullWidth 
                        className="poper-item"
                        onChange={(e) => handleOnChangeType(e.target.value)}>
                            <MenuItem value="Clothes">Clothes</MenuItem>
                            <MenuItem value="Book">Book</MenuItem>
                            <MenuItem value="Bike">Bike</MenuItem>
                        </Select>
                        <InputLabel style={{marginBottom: '1rem', marginTop: "1rem"}} className="text-medium  " name='title'>Collection</InputLabel>
                        <Select fullWidth multiple
                        className="poper-item"
                        value={form?.product?.collection || []}
                        onChange={handleChangeCollection}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}>
                            <MenuItem value="collec1">Collec1</MenuItem>
                            <MenuItem value="collec2">Collect2</MenuItem>
                        </Select>
                    </Paper> 
                </div>    
            </div>  
        </FormGroup> 
        </>
    );
}

export default FormProduct;