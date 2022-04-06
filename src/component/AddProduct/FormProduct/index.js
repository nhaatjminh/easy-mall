import React, {useState, useEffect} from "react";
import Stack from '@mui/material/Stack';
import { Paper, TextField, InputLabel, MenuItem, Select, Input, FormGroup, FormControlLabel, Checkbox, InputAdornment, FormHelperText} from '@material-ui/core';
import {EditorState} from 'draft-js'
import { Editor } from "react-draft-wysiwyg";
import Divider from '@mui/material/Divider';
import './index.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from "react-router-dom";
const FormProduct = ( {returnTable })=> {
    const [editorState, setEditorState] = useState(()=> EditorState.createEmpty());
    const [trackQuantity, setTrackQuantity] = useState(false);
    const onChangeTrackQuantity = () => {
        setTrackQuantity(!trackQuantity);
    }
    return (
        <>
        <FormGroup>
            <div className="row  text-black">  
                <div className="offset-1 col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">   
                    <Paper elevation={10} style={{padding: '1rem 2rem'}}>
                        <InputLabel name='title' className="text-medium  " style={{margin: 0}}>Title</InputLabel>
                        <TextField className="text-field-input" name='title' placeholder='  Enter Title' fullWidth required onChange={() => console.log()()}  />
                        <InputLabel style={{margin: 0, marginBottom: '0.75rem'}} className="text-medium  ">Description</InputLabel>
                        <div style={{ border: "1px solid black", padding: '2px', minHeight: '200px' }}>
                            <Editor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            />
                        </div>
                    </Paper> 
                    <Paper elevation={10} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <InputLabel name='title' className="text-medium  " style={{margin: 0}}>Media</InputLabel>
                        <Input accept="image/*" id="contained-button-file" className="media-select" multiple type="file" />
                    </Paper> 
                    
                    <Paper elevation={10} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <InputLabel name='title' className="text-medium  " style={{margin: 0, marginBottom: '1rem'}}>Pricing</InputLabel>
                        <div className="row">

                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <InputLabel name='title' className="text-normal" style={{margin: 0}}>Price</InputLabel>
                                <TextField className="text-field-input"
                                    placeholder="0.00"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" style={{paddingLeft: '0.25rem'}}>$</InputAdornment>,
                                    }}
                                    name='title'
                                    fullWidth
                                    required
                                    onChange={() => console.log()()}  />
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <InputLabel name='title' style={{margin: 0}}>Compare at price</InputLabel>
                                <TextField className="text-field-input"
                                    placeholder="0.00"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" style={{paddingLeft: '0.25rem'}}>$</InputAdornment>,
                                    }}
                                    name='title'
                                    fullWidth
                                    required
                                    onChange={() => console.log()()}  />
                            </div>
                            
                        </div>
                        <FormControlLabel control={<Checkbox onChange={onChangeTrackQuantity}/>} className='font-weight-normal' label="Charge tax on this product" />
                        <Divider className="divider-custom"/>
                        
                        <InputLabel name='title' style={{margin: 0}}>Cost per item</InputLabel>
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
                                    onChange={() => console.log()()}  />
                        <FormHelperText id="filled-weight-helper-text">Customers won’t see this</FormHelperText>
                    </Paper>
                    <Paper elevation={10} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <InputLabel name='title' className="text-medium  " style={{margin: 0, marginBottom: '1rem'}}>Inventory</InputLabel>
                        <div className="row">

                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <InputLabel name='title' style={{margin: 0}}>SKU (Stock Keeping Unit)</InputLabel>
                                <TextField className="text-field-input" name='title' fullWidth required onChange={() => console.log()()}  />
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <InputLabel name='title' style={{margin: 0}}>Barcode (ISBN, UPC, GTIN, etc.)</InputLabel>
                                <TextField className="text-field-input" name='title' fullWidth required onChange={() => console.log()()}  />
                            </div>
                        </div>
                        <div>
                            <FormControlLabel className='font-weight-normal' control={<Checkbox onChange={onChangeTrackQuantity}/>} label="Track quantity" />
                        </div>
                        <div>
                            <FormControlLabel className='font-weight-normal' disabled={!trackQuantity} control={<Checkbox />} label="Continue selling when out of stock" />
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
                    <Paper elevation={10} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Options</InputLabel>
                        <FormControlLabel control={<Checkbox onChange={onChangeTrackQuantity}/>} label="This product has options, like size or color" />
                    </Paper> 
                    <Paper elevation={10} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
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
                    <Paper elevation={10}>
                    </Paper> 
                </div>    
            </div>  
        </FormGroup> 
        </>
    );
}

export default FormProduct;