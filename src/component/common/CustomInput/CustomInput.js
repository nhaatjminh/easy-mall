import { React } from 'react';
import './CustomInput.scss'

export const CustomInput = ({ defaultValue, value, placeholder, onChange, width, height, warning }) => {

    return (
        <div className={`custom-input ${warning ? 'custom-input__warning' : ''}`} style={{width: `${width}`, height: `${height}`}}>
            <input
                defaultValue={defaultValue}
                value={value}
                placeholder={placeholder}
                onChange={onChange} 
            />
        </div>
    )
}