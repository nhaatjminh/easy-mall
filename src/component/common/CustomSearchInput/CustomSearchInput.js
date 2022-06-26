import { React } from 'react';
import { SearchIcon } from '../../../assets/icon/svg/SearchIcon';
import './CustomSearchInput.scss'

export const CustomSearchInput = ({ value, placeholder, onChange, width, height }) => {
    return (
        <div className="custom-search-input" style={{ width: `${width}`, height: `${height}` }}>
            <div className="custom-search-input__icon">
                <SearchIcon />
            </div>
            <div className="custom-search-input__input">
                <input
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange} />
            </div>
        </div>
    )
}