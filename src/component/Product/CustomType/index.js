import React, {useState} from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import {InputLabel, Select,MenuItem, IconButton , Divider , TextField   } from '@mui/material';

const CustomType = ({mode, formRef, oldForm, customTypeList}) => {
    const form = formRef;
    const [type, setType]= useState(null);
    const [customType, setCustomType] = useState(mode === "EDIT" && oldForm?.product?.custom_type ? oldForm?.product?.custom_type : false);
    const handleOnChangeType = (event) => {
        if (mode === "EDIT") {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    type: event.target.value,
                    update: "Change"
                }
            }
        } else {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    type: event.target.value
                }
            }
        }
        form.current.product.custom_type = customType;
        setType(event.target.value);
    }
    const disableCustomType = () => {
        setCustomType(false);
        setType('')
        form.current.product.type = '';
    }
    const enableCustomType = () => {
        setCustomType(true);
        setType('')
        form.current.product.type = '';
    }
    return (
        <>
           <InputLabel style={{marginBottom: '1rem'}} className="text-label">Type</InputLabel>
                        <div key={form?.current?.product?.type ? `${form?.current?.product?.type} - type ` : "SelectType"}>
                            <Select fullWidth 
                            disabled={customType}
                            className="poper-item text-content"
                            defaultValue={mode === "EDIT" && oldForm?.product?.type ? oldForm?.product?.type : ""}
                            value={type}
                            key={"Select-Type"}
                            renderValue={(value) => {
                                if (value === 'custom-type') {
                                    if (customType)
                                        return <p className="m-0 p-0">Remove Custom Type To Enable Type</p>
                                    else {
                                        return <></>
                                    }
                                }
                                else return value;
                            }}
                            onChange={(e) => handleOnChangeType(e)}>
                                <MenuItem value="Bike">Bike</MenuItem>
                                <MenuItem value="Book">Book</MenuItem>
                                <MenuItem value="Clothes">Clothes</MenuItem>
                                <MenuItem value="Electronic">Electronic</MenuItem>
                                <MenuItem value="Entertainment">Entertainment</MenuItem>
                                <MenuItem value="Food">Food</MenuItem>
                                <MenuItem key={`${customType} - custom-type - select`} value="custom-type" onClick={enableCustomType} style={{justifyContent: 'space-between'}}>
                                    <p style={{margin: 0}}>Custom Type</p>
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                </MenuItem>
                                {customTypeList.length ?
                                 <Divider className="divider-custom"/>
                                : <></>
                                }
                                {customTypeList ?
                                customTypeList.map(type => {
                                    return <MenuItem key={`${type} - custom type`} value={`${type}`} onClick={() => setCustomType(true)}>{type}</MenuItem>
                                })
                                : <></>}
                            </Select>
                        </div>
                        {customType
                            ?   
                            <>
                                <InputLabel style={{marginTop: '1rem'}} className="text-label">Custom Type</InputLabel>
                                <div className="custom-type">
                                    <TextField
                                        style={{width: 'auto'}}
                                        className="text-field-input text-content"
                                        name='title'
                                        fullWidth
                                        required
                                        key={`custom-type`}
                                        onChange={(e) => handleOnChangeType(e)}
                                        defaultValue={mode === "EDIT" && oldForm?.product?.type ? oldForm?.product?.type : ""}
                                        value={type === 'custom-type' ? '' : type}  
                                    />
                                    <IconButton onClick={disableCustomType}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            </>
                            
                            :   <></>
                        }
        </>
    );
}

export default CustomType;