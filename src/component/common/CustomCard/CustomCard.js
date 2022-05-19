import { React } from 'react';
import './CustomCard.scss'

export const CustomCard = ({ children, className }) => {

    return (
        <div className={`custom-card ${className}`}>
            {children}
        </div>
    )
}