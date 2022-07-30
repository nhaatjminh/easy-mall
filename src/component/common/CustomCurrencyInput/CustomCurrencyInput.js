import { React } from 'react';
import CurrencyInput from 'react-currency-input-field';

export const CustomCurrencyInput = ({
    defaultValue,
    value,
    placeholder,
    onChange,
    width,
    height,
    warning,
    disabled,
    currency,
    onFocus,
    onBlur,
    icon,
    type,
    step,
    unit,
    length,
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
            {/* <input
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
            /> */}
            <CurrencyInput
                id="input-example"
                decimalSeparator="." groupSeparator=","
                className={''}
                name="input-name"
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                maxLength={length}
                defaultValue={defaultValue}
                decimalsLimit={2}
                allowDecimals={currency === 'USD' ? true : false}
                allowNegativeValue={false}
                onValueChange={onChange}
            />
            {unit &&
                <div className='custom-input__unit'>
                    {unit}
                </div>}
        </div>
    )
}