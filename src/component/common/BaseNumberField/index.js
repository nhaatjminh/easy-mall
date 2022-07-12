import * as React from 'react';
import './index.css';
import {
    Select,
    MenuItem
} from '@mui/material';
import CurrencyInput from 'react-currency-input-field';


export const BaseNumberField = ({defaultValue, value, length=12, setValue, fullWidth, disabled = false, className = '', placeholder='', currency='', handleChangeCurrency= () => {} }) => {
    return (
        <>
            {currency ?
            <>
                <Select disabled={disabled} value={currency} onChange={handleChangeCurrency} className='text-field-input text-content select-currency'>
                    <MenuItem value='VND'>VND</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                </Select>
                
            </> :
            <></>
            }
            
            <CurrencyInput
                id="input-example"
                decimalSeparator="." groupSeparator=","
                className={`m-0 p-0 style-input text-field-input text-content ${className} ${fullWidth ? 'full-width' : ''}`}
                name="input-name"
                placeholder={placeholder}
                value={value}
                fullWidth={fullWidth}
                disabled={disabled}
                maxLength={length}
                defaultValue={defaultValue}
                decimalsLimit={2}
                allowDecimals={currency === 'USD' ? true : false}
                allowNegativeValue={false}
                onValueChange={(value) => setValue(value)}
            />
        </>
    );
}