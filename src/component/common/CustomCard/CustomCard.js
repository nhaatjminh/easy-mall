import { React } from 'react';
import './CustomCard.scss'

export const CustomCard = ({ children, className, width }) => {

    return (
        <div className={`custom-card ${className ? className : ''}`}
            style={{ width }}
        >
            {children}
        </div>
    )
}