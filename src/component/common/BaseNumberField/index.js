import * as React from 'react';
import './index.css';
import {
    TextField,
    InputAdornment,
    Select,
    MenuItem
} from '@mui/material';
import { useDebounce } from '../../../hooks/useDebounce'


export const BaseNumberField = ({value, length=12, setValue, fullWidth, disabled = false, className = '', placeholder='', currency='', handleChangeCurrency= () => {} }) => {
    const [show, setShow] = React.useState();
    const dbValue = useDebounce(value, 100000);
    const unmounted = React.useRef(false);
    const checkDontDelete = React.useRef();
    React.useEffect(() => {
        unmounted.current = false;
        return () => {
          unmounted.current = true;
        };
    }, [dbValue])
    const handleChangeValue = (event) => {
        setValue(event.target.value)
        if (currency !== 'USD') setShow(event.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        else {
            let tempValue = Intl.NumberFormat('en-us').format(event.target.value);
            if (!tempValue.split('.')[1]) tempValue += '.00';
            setShow(tempValue);
        }
    }
    React.useEffect(() => {
        setShow('');
    }, [currency])
    React.useEffect(() => {
        if (value) {
            if (currency !== 'USD') {
                setShow(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            } else {
                let tempValue = Intl.NumberFormat('en-us').format(value);
                if (!tempValue.split('.')[1]) tempValue += '.00';
                setShow(tempValue);
            }
        }
    }, [dbValue])
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
            onInput = {(e) => {
                let checkButtonDelete = false
                if (checkDontDelete.current) {
                    let temp = e.target.value.split('.').length;
                    if (temp !== 2) checkButtonDelete = true;
                }
                if (checkButtonDelete) {
                    e.target.value = show;
                }
                const caret = e.target.selectionStart
                    const element = e.target
                    let beforPlus = 0;
                    if (currency !== 'USD') {
                        beforPlus = e.target.value.split(',').length - 1;
                    } else {
                        let temp = e.target.value.split('.');
                        beforPlus = temp[0].split(',').length - 1;
                    }
                    window.requestAnimationFrame(() => {
                        let afterPlus = 0;
                        if (currency !== 'USD') {
                            afterPlus = e.target.value.split(',').length - 1;
                        } else {
                            let temp = e.target.value.split('.');
                            afterPlus = temp[0].split(',').length - 1;
                        }
                        let plus = 0;
                        if (afterPlus > beforPlus) plus = 1;
                        else if (afterPlus < beforPlus) plus = -1;
                        element.selectionStart = caret + plus;
                        element.selectionEnd = caret + plus;
                    })
                    if (currency !== 'USD') {
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
            onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                    checkDontDelete.current = true;
                }
            }}
            onChange={(e) => {
                handleChangeValue(e)
            }}  />
        </>
    );
}