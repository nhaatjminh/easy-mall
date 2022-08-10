import * as React from 'react';
import './index.css';
import {
    Select,
    MenuItem
} from '@mui/material';
import CurrencyInput from 'react-currency-input-field';
import { useSelector } from 'react-redux';


export const BaseNumberField = ({defaultValue, value, length=9, setValue, fullWidth, disabled = false, className = '', placeholder='', currency='', handleChangeCurrency= () => {} }) => {
    
    const currencyStore = useSelector((state) => state.listStore?.currentStore?.currency || 'USD');
    
    return (
        <>
            {currency ?
            <>
                <Select disabled={true} value={currencyStore} onChange={handleChangeCurrency} className='text-field-input text-content select-currency'>
                    <MenuItem value='VND'>VND</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                </Select>
                
            </> :
            <></>
            }
            
            <CurrencyInput
                id="input-example"
                decimalSeparator="." groupSeparator=","
                style={{height: 35}}
                className={`m-0 p-0 style-input text-min-width text-field-input text-content ${className} ${fullWidth ? 'full-width' : ''}`}
                name="input-name"
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                maxLength={length}
                defaultValue={defaultValue}
                decimalsLimit={2}
                allowDecimals={currency === 'USD' ? true : false}
                allowNegativeValue={false}
                onValueChange={(value) => setValue(value)}
                onInput = {(e) => {
                    if (currency !== 'USD') {
                        e.target.value = e.target.value.replaceAll('.', '')
                    }
                }}
            />
        </>
    );
}