import { React } from 'react';
import './CustomInput.scss'

export const CustomInput = ({ value, placeholder, onChange, width, height }) => {

    return (
        <div className="custom-input" style={{width: `${width}`, height: `${height}`}}>
            <input
                value={value}
                placeholder={placeholder}
                onChange={onChange} 
            />
        </div>
    )
}