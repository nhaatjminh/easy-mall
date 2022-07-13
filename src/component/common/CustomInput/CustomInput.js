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
    onFocus,
    onBlur,
    icon,
    type,
    step,
    unit,
    autoComplete,
}) => {

    return (
        <div className={`custom-input ${disabled ? 'custom-input__disabled' : ''} ${warning ? 'custom-input__warning' : ''}`}
            style={{ width: `${width}`, height: `${height}` }}>
            {icon ?
            <div className='custom-input__icon'>
                {icon}
            </div>
            : null}
            {/* <div className='custom-input__input'> */}
                <input
                    defaultValue={defaultValue}
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    type={type}
                    step={step}
                    autoComplete={autoComplete}
                />
            {/* </div> */}
            {unit &&
            <div className='custom-input__unit'>
                {unit}
            </div>}
        </div>
    )
}