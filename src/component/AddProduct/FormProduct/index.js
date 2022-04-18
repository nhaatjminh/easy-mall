import React, {useState, useEffect} from "react";
import Stack from '@mui/material/Stack';
import { Paper, TextField, InputLabel, Box,Chip ,Select, MenuItem, Input, FormGroup, FormControlLabel,Popper, Checkbox, InputAdornment, FormHelperText} from '@material-ui/core';
import {EditorState} from 'draft-js'
import { Editor } from "react-draft-wysiwyg";
import Divider from '@mui/material/Divider';
import './index.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from "react-router-dom";
import TableVariant from "../TableVariant";
const FormProduct = ()=> {
    const [editorState, setEditorState] = useState(()=> EditorState.createEmpty());
    const [showOpt, setShowOpt] = useState(false);
    const [trackQuantity, setTrackQuantity] = useState(false);
    const [costPerItem, setCostPerItem] = useState(null);
    const [price, setPrice] = useState(null);
    const [optionTag, setOptionTag] = useState([]); // state to check length and render option
    const [optionValue, setOptionValue] = useState([]);
    const [personName, setPersonName] = useState([]);
    const [variant, setVariant] = useState([]);
    const [form, setForm] = useState([])


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
        
    };
    
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    
    const onChangeTrackQuantity = () => {
        setTrackQuantity(!trackQuantity);
    }
    const addAnotherOption = (index) => {
        if (optionTag.length === 3) return;
        for (const optionValueChild of optionValue) {
            if (!optionValueChild.option || !optionValueChild.value.length) {
                console.log("Dmm dien vo cai nay di da");
                return;
            }
        }
        const temp = [...optionTag];
        temp.push(true);
        setOptionTag(temp);
        const newOptionValue =[ 
            ...optionValue,
            {
            option: "",
            value: []
            }];
        setOptionValue(newOptionValue);
        
    }
    const changeOptionValue = (e, index, idxValue) => {
        const valueChange = e.target.value ? e.target.value : "";
        const newObj = [...optionValue];
        if (!newObj[index].value.includes(valueChange)) {
            if (idxValue !== undefined) {
                newObj[index].value[idxValue] = valueChange; 
            }else {
                newObj[index].value.push(valueChange);
            }
            setOptionValue(newObj);
        }
        else {
            console.log('error chua lam');
        }
    }
    const handleDeleteOptionValue = (index, idxValue) => {
        const newObj = [...optionValue];
        newObj[index].value = newObj[index]?.value.filter((value, idx) => idx !== idxValue);
        
        setOptionValue(newObj);
    }
    const doneOrEditOption = (index) => {
        let tempEdit = optionTag;
        tempEdit[index] = !tempEdit[index];
        setOptionTag([...tempEdit]);
    }
    const checkExistsVariantOption = (newOpt, type) => { // type to compare, option (optionName) or value
        let allVariant = [...variant];
        return allVariant.some((variant) => {
            return variant.option.some((option) => {
                return option.type === newOpt.type
            });
        })
    }
    function shallowObjectEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
          return false;
        }
      
        for (let key of keys1) {
            if (Array.isArray(object1[key]) && Array.isArray(object2[key])) {
                if (object1[key].length !== object2[key].length) return false;
            }
            else if (object1[key] !== object2[key]) {
                return false;
            }
        }
      
        return true;
      }
    const checkExistsVariant = (newAllVariant, newVariant) => { // type to compare, option (optionName) or value
        return newAllVariant.some((variant) => {
            return variant.option.length !== newVariant.option.length
                || variant.option.every((value, index) => shallowObjectEqual(value,newVariant.option[index]))
        })
    }
    const changeVariantOptionValue = (variantOpt, newOpt, idxOptionName) => {
        let newVariant = [];
        variantOpt.map((element, idx) => {
            let newElement = {...element};
            if (element.option === newOpt.option || idx === idxOptionName)
                newVariant.push(newOpt);
            else newVariant.push(newElement);
        })
        return newVariant;
    }
    // function combineArrays( array_of_arrays ){
    //     if( ! array_of_arrays ){
    //         return [];
    //     }
    
    //     if( ! Array.isArray( array_of_arrays ) ){
    //         return [];
    //     }
    
    //     if( array_of_arrays.length == 0 ){
    //         return [];
    //     }
    
    //     for( let i = 0 ; i < array_of_arrays.length; i++ ){
    //         if( ! Array.isArray(array_of_arrays[i]) || array_of_arrays[i].length == 0 ){
    //             return [];
    //         }
    //     }
    //     let odometer = new Array( array_of_arrays.length );
    //     odometer.fill( 0 ); 
    
    //     let output = [];
    
    //     let newCombination = formCombination( odometer, array_of_arrays );
    //     output.push( newCombination.substr(1) );
    
    //     while ( odometer_increment( odometer, array_of_arrays ) ){
    //         newCombination = formCombination( odometer, array_of_arrays );
    //         output.push( newCombination.substr(1) );
    //     }
    
    //     return output;
    // }
    
    // function formCombination( odometer, array_of_arrays ){
    //     return odometer.reduce(
    //       function(accumulator, odometer_value, odometer_index){
    //         return "" + accumulator +";" +array_of_arrays[odometer_index][odometer_value];
    //       },
    //       ""
    //     );
    // }
    
    // function odometer_increment( odometer, array_of_arrays ){
    //     for( let i_odometer_digit = odometer.length-1; i_odometer_digit >=0; i_odometer_digit-- ){ 
    //         let maxee = array_of_arrays[i_odometer_digit].length - 1;         
    //         if( odometer[i_odometer_digit] + 1 <= maxee ){
    //             odometer[i_odometer_digit]++;
    //             return true;
    //         }
    //         else{
    //             if( i_odometer_digit - 1 < 0 ){
    //                 return false;
    //             }
    //             else{
    //                 odometer[i_odometer_digit]=0;
    //                 continue;
    //             }
    //         }
    //     }
    
    // }
    
    // console.log(combineArrays([ ["A","B"],
    //                 ["1", "2","3"],["C1","C2","C3"],
    //                 ] ))
    const createVariantUI = () => {
        let allVariant = [...variant];
        const idxOption = [];
        const idxValue = [];
        // const combine = new Promise((resolve, reject) => {
        //     optionValue.forEach((optionName) => {
        //         idxOption.push(optionName.option);
        //         idxValue.push(optionName.value);
        //     })
        //     resolve();
        // }).then(() => {
        //     console.log(idxValue);
        //     let a = combineArrays(idxValue);
        //     console.log(a);
        // })
        //handle delete optionField
        allVariant.map((variant) => {
            if (variant.option.length > optionValue.length) {
                // xoa 1 phan tu bat ki de length no bang nhau lai
                variant.option.pop();

            }
        });
        //create new Variant
        optionValue.map((optionName,idxOptionName) => {

            if (optionName?.value.length)
                if (!allVariant.length) {
                    optionName.value?.map((value,idxValue) => {
                        const newOpt = {
                            option: optionName.option,
                            value: value
                        }
                        if (!checkExistsVariantOption(newOpt, "value")) {
                            const newVariant = {
                                option: [newOpt]
                            }
                            allVariant.push(newVariant);
                        }
                    })
                } else {
                    let newAllVariant = [];
                    allVariant.map((variant) => {
                        optionName.value?.map((value,idxValue) => {
                            const newOpt = {
                                option: optionName.option,
                                value: value
                            }
                            let newVariant = {};
                            let flag = false;
                            if (!checkExistsVariantOption(newOpt, "option")) {
                                newVariant = {
                                    option: [
                                        ...variant.option,
                                        newOpt
                                    ]
                                }
                                flag = true;
                            } else {
                                newVariant = {
                                    option: changeVariantOptionValue(variant.option, newOpt, idxOptionName)
                                }
                                if (!checkExistsVariant(newAllVariant, newVariant)) {    
                                    flag = true;
                                }
                                
                            }
                            if(flag) newAllVariant.push(newVariant);
                        })
                    })
                    allVariant = newAllVariant;
            } else {
                const newOpt = {
                    option: optionName.option,
                    value: []
                }
                allVariant.map((variant) => {
                    if (variant.option?.length < optionValue.length && optionName.option) {
                        variant.option.push(newOpt)
                    } else if (variant.option[idxOptionName]) {
                        variant.option[idxOptionName].option = optionName.option; 
                        variant.option[idxOptionName].value = []; 
                    }
                })
            }
        })
        setVariant(allVariant);
    }
    const handleChangeValueOption = (e, index) => {
        const newTargetValue = e.target.value ? e.target.value : "";
        const tempCheckIncludes = optionValue.some((element) => element.option === newTargetValue);
        if(tempCheckIncludes) {
            console.log(optionValue);
            //error
        } else {
            const newObj = [...optionValue];
            let oldValue = newObj[index]?.value.length ? [...optionValue[index].value] : [] 
            newObj[index] = {
                option: newTargetValue,
                value: oldValue
            };
            setOptionValue(newObj);
        }
    }
    const handleDeleteOption = (index) => {
        let newOptionValue = optionValue.filter((value, idx) => idx !== index);
        setOptionValue(newOptionValue);
        let newOptionTag = optionTag.filter((value, idx) => idx !== index);
        setOptionTag(newOptionTag);
        if (newOptionTag.length <= 0) setShowOpt(false);
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
    const handleChange = (event) => {
    const {
        target: { value },
    } = event;
    setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
    );
    };
    useEffect(() => {
        createVariantUI();

    }, [optionValue])
    return (
        <>
        <FormGroup>
            <div className="row  text-black">  
                <div className="offset-1 col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">   
                    <Paper elevation={5} style={{padding: '1rem 2rem'}}>
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
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <InputLabel name='title' className="text-medium  " style={{margin: 0}}>Media</InputLabel>
                        <Input accept="image/*" id="contained-button-file" className="media-select" multiple type="file" />
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
                                    onChange={(e) => setPrice(e.target.value)}  />
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
                                onChange={(e) => setCostPerItem(e.target.value)}  />
                            {costPerItem && price ? 
                            <>
                                <div>
                                    <p style={{margin: 0}}>Margin</p>
                                    <p style={{margin: 0}}>{(price - costPerItem)/price * 100} %</p>
                                </div>
                                <div>
                                    <p style={{margin: 0}}>Profit</p>
                                    <p style={{margin: 0}}>${price - costPerItem}</p>
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
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Options</InputLabel>
                        <FormControlLabel control={<Checkbox checked={showOpt} onChange={() => {
                            if (!showOpt) {
                                addAnotherOption();
                            }
                            setShowOpt(!showOpt)
                            
                        }}/>} label="This product has options, like size or color" />
                        {showOpt ?
                            <>  
                                <Divider className="divider-custom"/>
                                {optionTag.map((element,index) => {
                                    let popoverId = open ? 'pop-over-' + index : undefined;
                                    return element ?
                                    (
                                        <>  
                                            <InputLabel className="text-normal " name='title'>Option Name</InputLabel>
                                            <div className="row">
                                                <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                                                    <TextField
                                                        aria-describedby={popoverId} 
                                                        className="text-field-input"
                                                        name='title'
                                                        fullWidth
                                                        required
                                                        value={optionValue[index]?.option || ""}
                                                        onClick={handlePopoverOpen}
                                                        onBlur={handlePopoverClose}
                                                        onChange={(e) => handleChangeValueOption(e, index)}
                                                    />
                                                </div>
                                                <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                                    
                                                    <i className="fa-trash fa-icon icon-trash" onClick={(e) => handleDeleteOption(index)} ></i>
                                                </div>
                                            </div>
                                            <Popper id={popoverId} open={open} anchorEl={anchorEl}
                                                onClose={handlePopoverClose}
                                                placement='bottom-start'
                                                >
                                                    <Box className="box-poper">
                                                        Example: Size, Color, Material, ...
                                                    </Box>
                                            </Popper>
                                            
                                            <InputLabel className="text-normal " name='title'>Option Value</InputLabel>
                                            {
                                                optionValue[index]?.value.map((value, idxValue) => {
                                                    return (
                                                        <div className="row">
                                                            <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                                                                
                                                            <TextField
                                                                    className="text-field-input"
                                                                    name='title'
                                                                    fullWidth
                                                                    required
                                                                    value={value}
                                                                    autoFocus={true}
                                                                    onChange={(e) => changeOptionValue(e, index, idxValue)}
                                                                    />
                                                            </div>
                                                            <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                                                
                                                                <i className="fa-trash fa-icon icon-trash" onClick={(e) => handleDeleteOptionValue(index, idxValue)}></i>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className="row">
                                                <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                                                                
                                                    <TextField
                                                        className="text-field-input"
                                                        name='title'
                                                        fullWidth
                                                        required
                                                        value=''
                                                        onChange={(e) => changeOptionValue(e, index)}
                                                    />
                                                </div>
                                                <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                                    <i className="fa-trash fa-icon icon-trash" ></i>
                                                </div>
                                            </div>
                                            
                                            <button className="btn-option" onClick={() => doneOrEditOption(index)}>
                                                Done
                                            </button>
                                            {index !== 2 ?    
                                                <Divider className="divider-custom"/>
                                            : ""
                                            }
                                        </>
                                    ) : (
                                        <div className="row">
                                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                                <h5>{optionValue[index].option}</h5>
                                                <div className="row">
                                                    {optionValue[index]?.value?.map((element) => {
                                                        return <Chip className="chip-width-auto" label={element}/>
                                                    })}
                                                </div>
                                            </div>
                                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                                <button className="btn-option" type='button' variant='contained' onClick={() => doneOrEditOption(index)}>Edit</button>
                                            </div>
                                            {index !== 2 ?    
                                                <Divider className="divider-custom"/>
                                            : ""
                                            }
                                        </div>
                                    )
                                })}
                                {optionTag.length <= 2 ?
                                    <div>
                                        <i className="fa-plus fa-icon icon-plus-before-text" ></i>
                                        <Link to="#" className="text-decoration-none" style={{color: 'black'}} onClick={addAnotherOption}>Add another option</Link>
                                    </div>
                                : ""
                                }
                            </>
                            : ""
                        }

                    </Paper> 
                    {
                        variant.length
                        ?   <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                            {console.log(variant)}
                                <TableVariant data={variant} columnsOfData={columns}></TableVariant>
                            </Paper>
                        : <></>
                    }
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
                        className="poper-item">
                            <MenuItem>Draft</MenuItem>
                            <MenuItem>Active</MenuItem>
                        </Select>
                        <FormHelperText id="filled-weight-helper-text">This product will be hidden from all sales channels.</FormHelperText>
                        <Divider className="divider-custom"/>
                        
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Sales channels and apps</InputLabel>
                        <FormControlLabel fullWidth className="w-100" control={<Checkbox checked={showOpt}/>} label="Online Store" />
                        <FormControlLabel fullWidth className="w-100" control={<Checkbox checked={showOpt}/>}  label="Google" />
                        <FormControlLabel fullWidth className="w-100" control={<Checkbox checked={showOpt}/>} label="Facebook" />
                        <FormControlLabel fullWidth className="w-100" control={<Checkbox checked={showOpt}/>}  label="Microsoft" />
                    </Paper> 
                    <Paper elevation={5}  style={{padding: '1rem 2rem', marginTop: "2rem"}}>
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Product organization</InputLabel>
                        
                        <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Type</InputLabel>
                        <Select fullWidth 
                        className="poper-item">
                            <MenuItem>Draft</MenuItem>
                            <MenuItem>Active</MenuItem>
                        </Select>
                        <InputLabel style={{marginBottom: '1rem', marginTop: "1rem"}} className="text-medium  " name='title'>Collection</InputLabel>
                        <Select fullWidth multiple
                        
                        className="poper-item"
                        value={personName}
                        onChange={handleChange}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}>
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                        </Select>
                        <Divider className="divider-custom"/>
                        <InputLabel style={{marginBottom: '1rem', marginTop: "1rem"}} className="text-medium  " name='title'>Tags</InputLabel>
                        <Select fullWidth multiple
                        className="poper-item"
                        value={personName}
                        onChange={handleChange}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}>
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                        </Select>
                    </Paper> 
                </div>    
            </div>  
        </FormGroup> 
        </>
    );
}

export default FormProduct;