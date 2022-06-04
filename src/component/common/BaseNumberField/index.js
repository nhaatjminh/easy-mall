import * as React from 'react';
import {
    TextField,
    InputAdornment
} from '@mui/material';


export const BaseNumberField = ({value, length=12, setValue, fullWidth, disabled = false, className = '', placeholder='', currency=''}) => {
  const [show, setShow] = React.useState();
    const handleChangeValue = (event) => {
        setValue(event)
        setShow(event.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
    React.useEffect(() => {
        if (value) setShow(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }, [value])
  return (
    <>
    <TextField className={`${className} text-field-input text-content `}
        placeholder={placeholder}
        InputProps={ currency ? {
            startAdornment: <InputAdornment position="start" style={{paddingLeft: '0.25rem'}}>{currency}</InputAdornment>,
        } : {} }
        disabled={disabled}
        onInput = {(e) =>{
            e.target.value = e.target.value?.replaceAll(',','');
            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,length)
            if (isNaN(e.target.value)) e.target.value = null;
        }}
        inputProps={{
            'aria-label': 'weight',
        }}
        name='title'
        fullWidth={fullWidth}
        required
        value={show}
        onChange={(e) => handleChangeValue(e.target.value)}  />
    </>
  );
}