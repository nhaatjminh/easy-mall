import React, {useState} from "react";
import { Paper } from '@material-ui/core';

import {Checkbox, Box, TextField } from '@mui/material';
import { InputLabel,Chip ,Link, FormControlLabel,Popper} from '@material-ui/core';

import Divider from '@mui/material/Divider';
import TableVariant from "./TableVariant";
import './index.css'
import Swal from "sweetalert2";

const Variant = ({ mode, formRef, setIsVariant, oldForm }) => {
    const initOldFormOptionValue = () => {
        const resultForm = JSON.parse(JSON.stringify(oldForm));
        if (resultForm?.option) {
            resultForm.option.map(option => {
                option.value = option.value.map(value => value.value);
            })
        }
        return resultForm.option;
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
    const form = formRef;
    const [optionTag, setOptionTag] = useState(oldForm?.option?.length && mode === "EDIT" ? Array.from({length: oldForm?.option?.length}, (v, i) => true) : []); // state to check length and render option
    const [optionValue, setOptionValue] = useState(oldForm?.option && mode === "EDIT" ? initOldFormOptionValue() : []);
    const [showOpt, setShowOpt] = useState((oldForm?.product?.is_variant && mode === "EDIT") || false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [errorIdxOption, setErrorIdxOption] = useState(-1);
    const [errorValue, setErrorValue] = useState(-1);
    const [errorOption, setErrorOption] = useState(-1);
    const open = Boolean(anchorEl);
    
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
        
    };
    
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const checkErrorValue = (newObj) => {
        if (newObj){
            for (const [index,option_value] of newObj?.entries()) {     
                let checkArray = [];
                for (const [idxValue,value] of  option_value.value?.entries()) {
                    if (checkArray.includes(value) || !value || value.includes("/")) {
                        setErrorValue(idxValue);
                        setErrorIdxOption(index);
                        return;
                    }
                    checkArray.push(value);
                }
                if (index === newObj.length - 1) {
                    setErrorValue(-1);
                    setErrorIdxOption(-1);
                }
            }
        }
        
    };
    const checkErrorOption = (newObj) => {
        let checkArray = [];
        if (newObj){
            for (const [index,option] of newObj?.entries()) {
                if (checkArray.includes(option.name) || !option.name) {
                    setErrorOption(index)
                    return;
                }
                checkArray.push(option.name);
                if (index === newObj.length - 1) {
                    setErrorOption(-1)
                }
            }
        }
    }
    const changeOptionValue = (e, index, idxValue) => {
        const valueChange = e.target.value ? e.target.value : "";
        const newObj = [...optionValue];
        if (!newObj[index].value.includes(valueChange)) {
            if (errorValue === idxValue && errorIdxOption === index) {
                setErrorValue(-1);
                setErrorIdxOption(-1);
            }
        }
        else {
            if (idxValue !== undefined) {
                setErrorValue(idxValue);
                setErrorIdxOption(index);
            }
            else {
                setErrorValue(newObj[index].value?.length);
                setErrorIdxOption(index);
            }
        }
        if (idxValue !== undefined) {
            newObj[index].value[idxValue] = valueChange; 
        } else {
            newObj[index].value.push(valueChange);
        }
        checkErrorValue(newObj);
        setOptionValue(newObj);

        form.current = {
            ...form?.current,
            option: newObj
        }
    }
    
    const addAnotherOption = (index) => {
        if (optionTag.length === 3) return;
        for (const optionValueChild of optionValue) {
            if (!optionValueChild.name || !optionValueChild.value.length) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Option name and option value can not blank',
                })
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
        form.current = {
            ...form?.current,
            option: newOptionValue
        }
    }
     
    const handleOnChangeShowOpt = (e) => {
      if (!showOpt) {
          addAnotherOption();
      }
      setIsVariant(!showOpt);
      setShowOpt(!showOpt)
      form.current = {
          ...form?.current,
          product: {
              ...form?.current?.product,
              is_variant: e.target.checked
          }
      }
    }
    const handleChangeOption = (e, index) => {    
        const newTargetValue = e.target.value ? e.target.value : "";
        const newObj = [...optionValue];
        let oldValue = newObj[index]?.value.length ? [...optionValue[index].value] : [] 
        newObj[index] = {
            name: newTargetValue,
            value: oldValue
        };
        setOptionValue(newObj);
        checkErrorOption(newObj);
    }

    const handleDeleteOption = (index) => {
        let newOptionValue = optionValue.filter((value, idx) => idx !== index);
        setOptionValue(newOptionValue);
        let newOptionTag = optionTag.filter((value, idx) => idx !== index);
        setOptionTag(newOptionTag);
        if (newOptionTag.length <= 0) setShowOpt(false);
        form.current = {
            ...form?.current,
            option: newOptionValue
        }
        checkErrorOption(newOptionValue);
        checkErrorValue(newOptionValue);
    }
    const handleDeleteOptionValue = (index, idxValue) => {
        const newObj = [...optionValue];
        newObj[index].value = newObj[index]?.value.filter((value, idx) => idx !== idxValue);
        
        setOptionValue(newObj);
        
        checkErrorOption(newObj);
        checkErrorValue(newObj);
        form.current = {
            ...form?.current,
            option: newObj
        }
    }
    const doneOrEditOption = (index) => {
        const lengthOfValue = optionValue[index].value.length;
        
        const lengthOfOption = optionValue[index].name;
        if (!lengthOfValue) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'You need add value for this option',
            })
        } else if (!lengthOfOption) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'You need add name for this option',
            })
        } else if (errorOption === -1 && errorIdxOption === -1) {
            let tempEdit = optionTag;
            tempEdit[index] = !tempEdit[index];
            setOptionTag([...tempEdit]);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'You need fix all error before click button Done or Edit',
            })
        }
    }
    return (
      <>
        <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
            <InputLabel style={{marginBottom: '1rem'}} className="text-medium  " name='title'>Option</InputLabel>
            <FormControlLabel control={<Checkbox defaultChecked={oldForm?.product?.is_variant} checked={showOpt} onChange={(e) => handleOnChangeShowOpt(e)}/>} label="This product has options, like size or color" />
            {showOpt ?
                <>  
                    <Divider className="divider-custom"/>
                    {optionTag.map((element,index) => {
                        let popoverId = open ? 'pop-over-' + index : undefined;
                        return element ?
                        (
                            <div key={index}>  
                                <InputLabel className="text-normal " name='title'>Option name</InputLabel>
                                <div className="row">
                                    <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                                        <TextField
                                            aria-describedby={popoverId} 
                                            className={`text-field-input ${errorOption === index ? "error-cell" : ""}`}
                                            name='title'
                                            fullWidth
                                            required
                                            value={optionValue[index]?.name || ""}
                                            onClick={handlePopoverOpen}
                                            onBlur={handlePopoverClose}
                                            onChange={(e) => handleChangeOption(e, index)}
                                            error={errorOption === index  ? true : false}
                                            helperText={errorOption === index  ? `You need to enter a value for this field and this value can not be duplicated`: ""}
                                            FormHelperTextProps={{
                                                className: 'error-text'
                                            }}
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
                                            Example: size, color, material,...
                                        </Box>
                                </Popper>
                                <div style={{paddingLeft: '2rem'}}>
                                    <InputLabel className="text-normal " name='title'>Option value</InputLabel>
                                    {
                                        optionValue[index]?.value.map((value, idxValue) => {
                                            return (
                                                <div className="row" key={idxValue}>
                                                    <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                                                        
                                                    <TextField
                                                            className={`text-field-input ${errorValue === idxValue && errorIdxOption === index ? "error-cell" : ""}`}
                                                            name='title'
                                                            fullWidth
                                                            required
                                                            value={value}
                                                            autoFocus={true}
                                                            onChange={(e) => changeOptionValue(e, index, idxValue)}
                                                            error={errorValue === idxValue && errorIdxOption === index  ? true : false}
                                                            helperText={errorValue === idxValue && errorIdxOption === index  ? `You need to enter a value other than "/" for this field and this value can not be duplicated`: ""}
                                                            FormHelperTextProps={{
                                                                className: 'error-text'
                                                            }}
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
                                                className={`text-field-input ${errorValue === optionValue[index]?.value?.length && errorIdxOption === index  ? "error-cell" : ""}`}
                                                name='title'
                                                fullWidth
                                                required
                                                value=''
                                                onChange={(e) => changeOptionValue(e, index)}
                                                error={errorValue ===  optionValue[index]?.value?.length && errorIdxOption === index ? true : false}
                                                helperText={errorValue === optionValue[index]?.value?.length && errorIdxOption === index ? `You need to enter a value other than "/" for this field and this value can not be duplicated`: ""}
                                                FormHelperTextProps={{
                                                    className: 'error-text'
                                                }}
                                            />
                                        </div>
                                        <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                            <i className="fa-trash fa-icon icon-trash" ></i>
                                        </div>
                                    </div>  
                                </div>
                                <button className="btn-option" onClick={() => doneOrEditOption(index)}>
                                    Done
                                </button>
                                {index !== 2 ?    
                                    <Divider className="divider-custom"/>
                                : ""
                                }
                            </div>
                        ) : (
                            <div className="row" key={index}>
                                <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                    <h5>{optionValue[index].name}</h5>
                                    <div className="row">
                                        {optionValue[index]?.value?.map((element, index) => {
                                            return <Chip className="chip-width-auto" key={index} label={element}/>
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
        <TableVariant key="TableVariant" oldForm={oldForm} optionTag={optionTag} optionValue={optionValue} formRef={form} columnsOfData={columns} setOptionValue={setOptionValue} setOptionTag={setOptionTag} setShowOpt={setShowOpt}>
        </TableVariant>
      </>
    );
}

export default Variant;