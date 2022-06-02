import { React } from 'react';
import './Loader.scss'

export const Loader = ({ className, small }) => {

    return (
        <div className={`loader ${className ? className : ''}`}>
            <svg viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20"></circle>
            </svg>
        </div>
    )
}