import React from "react";
import './CustomButton.scss'

export const CustomButton = ({ children, className, content, color, onClick }) => {


    return (
        <div className={`custom-button ${className}`} onClick={onClick}>
            {content}
            {children}
        </div>
    )
}