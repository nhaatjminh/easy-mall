import React, {useEffect, useState} from "react";
import { Paper, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import {Checkbox, IconButton,Tooltip, Table , TableBody , TableCell, TableContainer , TableHead , TableRow,TablePagination, TableSortLabel, Box, Toolbar, TextField   } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import {  InputLabel,Chip ,Link, MenuItem, Input, FormGroup, FormControlLabel,Popper, InputAdornment, FormHelperText} from '@material-ui/core';

import Divider from '@mui/material/Divider';
import TableVariant from "./TableVariant";


const Variant = ({columnsOfData, formRef}) => {
    const form = formRef;
    const columns = columnsOfData;
    const rows = formRef?.current?.variant || [];
    const [optionTag, setOptionTag] = useState([]); // state to check length and render option
    const [optionValue, setOptionValue] = useState([]);
    const [showOpt, setShowOpt] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
        
    };
    
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
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
    
    const addAnotherOption = (index) => {
      if (optionTag.length === 3) return;
      for (const optionValueChild of optionValue) {
          if (!optionValueChild.name || !optionValueChild.value.length) {
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
          name: "",
          value: []
          }];
      setOptionValue(newOptionValue);
      createVariantUI();
    }
    
    function combineArrays( array_of_arrays ){
        if( ! array_of_arrays ){
            return [];
        }
    
        if( ! Array.isArray( array_of_arrays ) ){
            return [];
        }
    
        if( array_of_arrays.length == 0 ){
            return [];
        }
    
        for( let i = 0 ; i < array_of_arrays.length; i++ ){
            if( ! Array.isArray(array_of_arrays[i]) || array_of_arrays[i].length == 0 ){
                return [];
            }
        }
        let odometer = new Array( array_of_arrays.length );
        odometer.fill( 0 ); 
    
        let output = [];
    
        let newCombination = formCombination( odometer, array_of_arrays );
        output.push( newCombination.substr(1) );
    
        while ( odometer_increment( odometer, array_of_arrays ) ){
            newCombination = formCombination( odometer, array_of_arrays );
            output.push( newCombination.substr(1) );
        }
    
        return output;
    }
    
    function formCombination( odometer, array_of_arrays ){
        return odometer.reduce(
          function(accumulator, odometer_value, odometer_index){
            return "" + accumulator +"/" +array_of_arrays[odometer_index][odometer_value];
          },
          ""
        );
    }
    
    function odometer_increment( odometer, array_of_arrays ){
        for( let i_odometer_digit = odometer.length-1; i_odometer_digit >=0; i_odometer_digit-- ){ 
            let maxee = array_of_arrays[i_odometer_digit].length - 1;         
            if( odometer[i_odometer_digit] + 1 <= maxee ){
                odometer[i_odometer_digit]++;
                return true;
            }
            else{
                if( i_odometer_digit - 1 < 0 ){
                    return false;
                }
                else{
                    odometer[i_odometer_digit]=0;
                    continue;
                }
            }
        }
    
    }
    
    const handleOnChangeShowOpt = (e) => {
      if (!showOpt) {
          addAnotherOption();
      }
      setShowOpt(!showOpt)
          
      form.current = {
          ...form?.current,
          product: {
              ...form?.current?.product,
              is_variant: e.target.checked
          }
      }
  }
    const createVariantUI = () => {
      const idxOption = [];
      const idxValue = [];
      new Promise((resolve, reject) => {
          optionValue.forEach((optionName) => {
              idxOption.push(optionName.name);
              idxValue.push(optionName.value);
          })
          resolve();
      }).then(() => {
          let listVariant = combineArrays(idxValue);
          
          const allNewVariant = []
      
          listVariant.forEach((variant) => {
              let listOptionOfVariant = variant.split("/");
              let newVariant = {};
              listOptionOfVariant.forEach((opt, idxOpt) => {
                  let newOpt = {
                      name: idxOption[idxOpt],
                      value: opt
                  }
                  if (!newVariant?.option)
                      newVariant = {
                          name: variant,
                          option: [newOpt]
                      }
                  else newVariant.option.push(newOpt);
              })

              allNewVariant.push(newVariant);
          })
          if (allNewVariant) {
              //setVariant(allNewVariant);
              form.current = {
                  ...form?.current,
                  variant: allNewVariant
              }
          }
      })
    }
    const handleChangeValueOption = (e, index) => {
        const newTargetValue = e.target.value ? e.target.value : "";
        const tempCheckIncludes = optionValue.some((element) => element.name === newTargetValue);
        if(tempCheckIncludes) {
            console.log(optionValue);
            //error
        } else {
            const newObj = [...optionValue];
            let oldValue = newObj[index]?.value.length ? [...optionValue[index].value] : [] 
            newObj[index] = {
                name: newTargetValue,
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
    
    const handleChangePriceVariant = (index, valuePrice) => {
        let newVariant = [...form?.current?.variant];
        newVariant[index] = {
            ...form?.current?.variant[index],
            price: valuePrice
        }
        form.current = {
            ...form?.current,
            variant: newVariant
        }
        //setVariant(newVariant);

    }
    const handleChangeQuantity = (index, valueQuantity) => {
        let newVariant = [...form?.current?.variant];
        newVariant[index] = {
            ...form?.current?.variant[index],
            quantity: valueQuantity
        }
        form.current = {
            ...form?.current,
            variant: newVariant
        }
    }
    useEffect(() => {
        createVariantUI();
    },[optionValue])
    return (
      <>
        <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
            <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Options</InputLabel>
            <FormControlLabel control={<Checkbox checked={showOpt} onChange={(e) => handleOnChangeShowOpt(e)}/>} label="This product has options, like size or color" />
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
                                            value={optionValue[index]?.name || ""}
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
                                    <h5>{optionValue[index].name}</h5>
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
          form?.current?.variant?.length
          ?   <>
              <TableVariant data={rows} columnsOfData={columns} handlePrice={handleChangePriceVariant} handleQuantity={handleChangeQuantity}>
              </TableVariant>
          </>
          : <></>
        }
      </>
    );
}

export default Variant;