import React from "react";
import './CustomButton.scss'

export const CustomButton = ({ children, className, content, style ,onClick }) => {


    return (
        <div
            className={`custom-button ${className}`}
            style={style}
            onClick={onClick}
        >
            {content}
            {children}
        </div>
    )
}