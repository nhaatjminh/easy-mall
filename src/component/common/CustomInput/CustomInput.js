import { React } from 'react';
import './CustomInput.scss'

export const CustomInput = ({ 
    defaultValue, 
    value, 
    placeholder, 
    onChange, 
    width, 
    height, 
    warning, 
    disabled,
    onFocus
 }) => {

    return (
        <div className={`custom-input ${disabled ? 'custom-input__disabled' : ''} ${warning ? 'custom-input__warning' : ''}`}
            style={{ width: `${width}`, height: `${height}` }}>
            <input
                defaultValue={defaultValue}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                onChange={onChange}
                onFocus={onFocus}
            />
        </div>
    )
}