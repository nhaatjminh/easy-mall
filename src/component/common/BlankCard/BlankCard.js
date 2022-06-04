import { React } from 'react';
import './BlankCard.scss'

export const BlankCard = ({ children, className }) => {

    return (
        <div className={`blank-card ${className ? className : ''}`}>
            {children}
        </div>
    )
}