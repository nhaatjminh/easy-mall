import * as React from 'react';
import './index.css';
import {
    TextField,
    InputAdornment,
    Select,
    MenuItem
} from '@mui/material';


export const BaseNumberField = ({value, length=12, setValue, fullWidth, disabled = false, className = '', placeholder='', currency='', handleChangeCurrency= () => {} }) => {
    const [show, setShow] = React.useState();
    const handleChangeValue = (event) => {
        setValue(event.target.value)
        if (currency === 'VND') setShow(event.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        else {
            let tempValue = Intl.NumberFormat('en-us').format(event.target.value);
            if (!tempValue.split('.')[1]) tempValue += '.00';
            setShow(tempValue);
        }
    }
    
    React.useEffect(() => {
        if (currency === 'USD') setShow('0.00');
        else setShow('');
    }, [currency])
    React.useEffect(() => {
        if (value) {
            if (currency === 'VND') {
                setShow(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            } else {
                let tempValue = Intl.NumberFormat('en-us').format(value);
                if (!tempValue.split('.')[1]) tempValue += '.00';
                setShow(tempValue);
            }
        }
    }, [value])
    return (
        <>
        <TextField className={`${className} text-field-input div-currency text-content `}
            placeholder={placeholder}
            InputProps={ currency ? {
                startAdornment: <InputAdornment position="start">
                    <Select disabled={disabled} value={currency} onChange={handleChangeCurrency} className='select-currency'>
                        <MenuItem value='VND'>VND</MenuItem>
                        <MenuItem value='USD'>USD</MenuItem>
                    </Select>
                    </InputAdornment>,
            } : {} }
            disabled={disabled}
            onInput = {(e) =>{
                const caret = e.target.selectionStart
                const element = e.target
                window.requestAnimationFrame(() => {
                    element.selectionStart = caret
                    element.selectionEnd = caret
                })
                if (currency === 'VND') {
                    e.target.value = e.target.value?.replaceAll(',','');
                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,length)
                    if (isNaN(e.target.value)) e.target.value = null;
                } else {
                    let checkArray = e.target.value.split('.');
                    checkArray = checkArray
                                .map((value, index) => index === 1 ? parseInt(value, 10) : value)
                                .map(value => value.toString().replaceAll(',',''))
                                .map((value, index) => {
                                    if (index === 0) return Math.max(0, parseInt(value)).toString().slice(0,length)
                                    else return Math.max(0, parseInt(value)).toString().slice(0,2)
                                })
                                .map(value => isNaN(value) ? '0' : value);
                    e.target.value = checkArray[1] ? checkArray[0] + '.' + checkArray[1] : checkArray[0] + '.00';
                }
            }}
            inputProps={{
                'aria-label': 'weight',
            }}
            name='title'
            fullWidth={fullWidth}
            required
            value={show || ''}
            onChange={(e) => handleChangeValue(e)}  />
        </>
    );
}