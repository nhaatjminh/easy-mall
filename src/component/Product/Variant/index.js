import React, {useState, useRef, useEffect} from "react";
import { Paper } from '@mui/material';

import {Checkbox, Box, TextField } from '@mui/material';
import { InputLabel,Chip ,Link, FormControlLabel,Popper, IconButton } from '@mui/material';

import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import TableVariant from "./TableVariant";
import './index.css'
import Swal from "sweetalert2";
import { v4 as uuid } from 'uuid';

const Variant = ({optionRef, mode, formRef, setIsVariant, oldForm }) => {
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
    
    // save {key: value} = {oldName: newName} use for variant
    const optionValueRef = useRef({});

    useEffect(() => {
        form.current = {
            product: {},
            option: [],
            variant: [],
            collection: []
        }
    }, [])

    
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
    const createNameForNewVariant = (arrayAfterSplit, newValue, idxValue) => {
        let result = '';
        arrayAfterSplit.map((curValue, idx) => {
            if (idx === idxValue) {
                result += newValue;
            } else {
                result += curValue;
            }
            if (idx !== arrayAfterSplit.length - 1) result += "/"
        })
        return result;
    }
    const changeOptionValue = (e, index, idxValue) => {
        const valueChange = e.target.value ? e.target.value : "";
        const newObj = JSON.parse(JSON.stringify(optionValue));
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
            let oldValue = newObj[index].value[idxValue];
            newObj[index].value[idxValue] = valueChange;
            if (mode === "EDIT") {
                let update;
                let indexOfOptionRef = optionRef.current.findIndex(option =>
                    (option?.id && option?.id === newObj[index].id)
                    || (option?.idTemp && option?.idTemp === newObj[index]?.idTemp))

                let arrayOptionRefLikeOptionValue = optionRef.current[indexOfOptionRef].value.filter((value) => value.update !== "Delete")
                let indexOfOptionValue =
                    optionRef.current[indexOfOptionRef].value.findIndex(option => 
                        (option?.id && option?.id === arrayOptionRefLikeOptionValue[idxValue]?.id)
                        || (option?.idTemp && option?.idTemp === arrayOptionRefLikeOptionValue[idxValue]?.idTemp))
                
                if (optionRef.current[indexOfOptionRef]?.value[indexOfOptionValue]?.update) update = optionRef?.current[indexOfOptionRef]?.value[indexOfOptionValue]?.update;
                else update = "Change"
                optionRef.current[indexOfOptionRef].value[indexOfOptionValue] = {
                    ...optionRef.current[indexOfOptionRef].value[indexOfOptionValue],
                    value: valueChange,
                    update: update
                };


                if (optionRef.current[indexOfOptionRef].update) update = optionRef?.current[indexOfOptionRef]?.update;
                else update = "Change"
                optionRef.current[indexOfOptionRef].update = update


                newObj[index] = {
                    ...newObj[index],
                    update: "Change"
                }
            }
            if (optionValueRef.current) {
                for (const [key, variantName] of Object.entries(optionValueRef.current)) {
                    let optionOfVariant = variantName.split("/");
                    if (optionOfVariant[index] === oldValue) {
                        optionValueRef.current[key] = createNameForNewVariant(optionOfVariant, valueChange, index)   
                    }
                }
            }
        } else {
            newObj[index].value.push(valueChange);  
            if (mode === "EDIT") {
                let update;
                if ( newObj[index]?.update) update = newObj[index].update;
                else update = "Change"   
                newObj[index] = {
                    ...newObj[index],
                    update: update
                }
                let newOption = {
                    idTemp: uuid(),
                    value: valueChange,
                    update: "Add"
                };
                let indexOfOptionRef = optionRef.current.findIndex(option =>
                    (option?.id && option?.id === newObj[index]?.id)
                    || (option?.idTemp && option?.idTemp === newObj[index]?.idTemp))
                optionRef.current[indexOfOptionRef].value.push(newOption)
                if (optionRef.current[indexOfOptionRef].update) update = optionRef?.current[indexOfOptionRef]?.update;
                else update = "Change"
                optionRef.current[indexOfOptionRef].update = update
                if (optionValueRef.current && !valueChange.includes("/")) {
                    const key = Object.keys(optionValueRef.current)
                    if (key.length) {
                        const lengthOptionOfFirstVariant = optionValueRef.current[key[0]].split("/");
                        if (lengthOptionOfFirstVariant !== optionRef?.current?.length) {
                           
                            optionValueRef.current = null; //clear this to create new Variant
                        }
                    }

                }
            }
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
        if (!showOpt && optionTag.length) return;
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
        let newOption = {
            name: "",
            value: []
        }
        if (mode === "EDIT") {
            newOption = {
                ...newOption,
                update: "Add",  
                idTemp: uuid()
            }
        }
        const newOptionValue =[ 
            ...optionValue,
            newOption
        ];
        // if mode !== EDIT => optionValue === form.current.option
        let newOptionForForm;
        if (form.current?.option) {
            newOptionForForm = [
                ...form.current?.option,
                newOption
            ]
        } else newOptionForForm = [newOption]
        optionRef.current.push(newOption)
        setOptionValue(newOptionValue);
        form.current = {
            ...form?.current,
            option: newOptionForForm
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
                is_variant: e
            }
        }
        if (mode === "EDIT") {
            form.current.product.update = "Change"
        }
    }
    const handleChangeOption = (e, index) => {    
        const newTargetValue = e.target.value ? e.target.value : "";
        const newObj = [...optionValue];
        let oldValue = newObj[index]?.value.length ? [...optionValue[index].value] : []     
        newObj[index] = {
            ...newObj[index],
            name: newTargetValue,
            value: oldValue
        };
        if (mode === "EDIT") {
            let indexOfOptionRef = optionRef.current.findIndex(option =>
                (option?.id && option?.id === newObj[index]?.id)
                || (option?.idTemp && option?.idTemp === newObj[index]?.idTemp))
            if (newObj[index].id) {
                optionRef.current[indexOfOptionRef].update = "Change";
            } else {
                optionRef.current[indexOfOptionRef].update = "Add";
            }  
            optionRef.current[indexOfOptionRef].name = newTargetValue;
        }
        form.current.option = form.current.option.map((option) => {
            if (option?.id && option?.id === newObj[index]?.id) {
                return newObj[index]
            } else if (option?.idTemp && option?.idTemp === newObj[index]?.idTemp) {
                return newObj[index]
            }
            else return option;
        })
        setOptionValue(newObj);
        checkErrorOption(newObj);
    }

    const handleDeleteOption = (index) => {
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
                    title: 'Deleted!',
                    text: 'This Option has been deleted.',
                    icon: 'success'
                }) 
                let newOptionValue = [];
                if (mode === "EDIT") {
                    let optionForForm = [];
                    optionValue.forEach((value, idx) => {
                        if (idx === index) {
                            if (value.id) {
                                value = {
                                    ...value,
                                    update: "Delete"
                                }        
                                optionForForm.push(value);
                            }
                        } else {
                            optionForForm.push(value);
                        }
                        form.current = {
                            ...form?.current,
                            option: optionForForm
                        }
                    });
                    if (mode === "EDIT") {
                        let indexOfOptionRef = optionRef.current.findIndex(option =>
                            (option?.id && option?.id === optionValue[index].id)
                            || (option?.idTemp && option?.idTemp === optionValue[index]?.idTemp))
                        if (optionRef.current[indexOfOptionRef]?.idTemp) {
                            optionRef.current.splice(indexOfOptionRef,1)
                        } else optionRef.current[indexOfOptionRef].update = "Delete";
                    }
                    optionValueRef.current = null; //clear this to create new Variant
                    newOptionValue = optionValue.filter((value, idx) => idx !== index);
                } else {
                    newOptionValue = optionValue.filter((value, idx) => idx !== index);
                    form.current = {
                        ...form?.current,
                        option: newOptionValue
                    }
                }
                setOptionValue(newOptionValue);
                let newOptionTag = optionTag.filter((value, idx) => idx !== index);
                setOptionTag(newOptionTag);
                if (newOptionTag.length <= 0) {
                    handleOnChangeShowOpt(false)
                };
                checkErrorOption(newOptionValue);
                checkErrorValue(newOptionValue);
            }
        })
    }
    const handleDeleteOptionValue = (index, idxValue) => {
        if (errorValue !== -1) {
            Swal.fire({
                title: 'Warning!',
                text: 'You need fix value error before delete.',
                icon: 'warning'
            }) 
        } else {
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
                        title: 'Deleted!',
                        text: 'This Option has been deleted.',
                        icon: 'success'
                    }) 
                    const newObj = [...optionValue];
                    
                    let oldValue = newObj[index]?.value[idxValue]
                    newObj[index].value = newObj[index]?.value.filter((value, idx) => idx !== idxValue);
                    setOptionValue(newObj);
                    
                    checkErrorOption(newObj);
                    checkErrorValue(newObj);
                    form.current = {
                        ...form?.current,
                        option: newObj
                    }
                    if (mode === "EDIT") {
                        let indexOfOptionRef = optionRef.current.findIndex(option =>
                            (option?.id && option?.id === newObj[index].id)
                            || (option?.idTemp && option?.idTemp === newObj[index]?.idTemp))
    
                        let arrayOptionRefLikeOptionValue = optionRef.current[indexOfOptionRef].value.filter((value) => value.update !== "Delete")
                        let indexOfOptionValue =
                            optionRef.current[indexOfOptionRef].value.findIndex(option => 
                                (option?.id && option?.id === arrayOptionRefLikeOptionValue[idxValue].id)
                                || (option?.idTemp && option?.idTemp === arrayOptionRefLikeOptionValue[idxValue]?.idTemp))
                        if (optionRef.current[indexOfOptionRef]?.value[indexOfOptionValue]?.idTemp) {
                            delete optionRef.current[indexOfOptionRef]?.value[indexOfOptionValue]
                        } else {
                            optionRef.current[indexOfOptionRef].value[indexOfOptionValue].update = "Delete"
                        }
                        let update;
                        if (optionRef.current[indexOfOptionRef].update) update = optionRef?.current[indexOfOptionRef]?.update;
                        else update = "Change"
                        optionRef.current[indexOfOptionRef].update = update
                        if (optionValueRef.current) {
                            for (const [key, variantName] of Object.entries(optionValueRef.current)) {
                                let optionOfVariant = variantName.split("/");
                                if (optionOfVariant[index] === oldValue) {
                                    delete optionValueRef.current[key]   
                                }
                            }
                        }
                    }
                }
            })
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
    useEffect(() => {
        if (mode === "EDIT") {
            oldForm?.variant?.map((variant) => {
                optionValueRef.current[variant.name] = variant.name
            })
        }
    },[mode])
    return (
      <>
        <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
            <InputLabel style={{marginBottom: '1rem'}} className="text-header" name='title'>Option</InputLabel>
            <FormControlLabel className="text-label" control={
                <Checkbox checked={showOpt} onChange={(e) => handleOnChangeShowOpt(e.target.checked)}/>} label="This product has options, like size or color" />
            {showOpt ?
                <>  
                    <Divider className="divider-custom"/>
                    {optionTag.map((element,index) => {
                        let popoverId = open ? 'pop-over-' + index : undefined;
                        return element ?
                        (
                            <div key={index}>  
                                <InputLabel className="text-label" name='title'>Option name</InputLabel>
                                <div className="row">
                                    <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                                        <TextField
                                            aria-describedby={popoverId} 
                                            className={`text-field-input text-content ${errorOption === index ? "error-cell" : ""}`}
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
                                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 pl-3">
                                        <IconButton onClick={(e) => handleDeleteOption(index)}>
                                            <DeleteIcon/>
                                        </IconButton>
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
                                <div style={{paddingLeft: '2rem', paddingRight: 3}}>
                                    <InputLabel className="text-label" name='title'>Option value</InputLabel>
                                    {
                                        optionValue[index]?.value.map((value, idxValue) => {
                                            return (
                                                <div className="row" key={idxValue}>
                                                    <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                                                        
                                                    <TextField
                                                            className={`text-content text-field-input ${errorValue === idxValue && errorIdxOption === index ? "error-cell" : ""}`}
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
                                                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 pl-3">
                                                        <IconButton onClick={(e) => handleDeleteOptionValue(index, idxValue)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="row">
                                        <div className="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11">
                                                        
                                            <TextField
                                                className={`text-content text-field-input ${errorValue === optionValue[index]?.value?.length && errorIdxOption === index  ? "error-cell" : ""}`}
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
                                        <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 pl-3">
                                            <IconButton>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </div>
                                    </div>  
                                </div>
                                <button className="btn-option button-done text-content" onClick={() => doneOrEditOption(index)}>
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
                                    <button className="btn-option button-done text-content" type='button' variant='contained' onClick={() => doneOrEditOption(index)}>Edit</button>
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
                            <i className="fa-plus fa-icon icon-plus-before-text link-add-option" style={{color:'blue'}} ></i>
                            <Link to="#" className='link-add-option' style={{color: 'blue', textDecoration: 'underline', cursor:'pointer'}} onClick={addAnotherOption}>Add another option</Link>
                        </div>
                    : ""
                    }
                </>
                : ""
            }

        </Paper> 
        <TableVariant key="TableVariant" optionRef={optionRef} optionValueRef={optionValueRef} mode={mode} showOpt={showOpt} oldForm={oldForm} optionTag={optionTag} optionValue={optionValue} formRef={form} columnsOfData={columns} setOptionValue={setOptionValue} setOptionTag={setOptionTag} setShowOpt={setShowOpt}>
        </TableVariant>
      </>
    );
}

export default Variant;