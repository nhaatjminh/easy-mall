import React from "react";
import './CustomButton.scss'

export const CustomButton = ({ children, className, content, style ,onClick,disabled=false }) => {


    return (
        <div
            className={`custom-button ${className}`}
            style={style}
            onClick={onClick}
            disabled = {disabled}
        >
            {content}
            {children}
        </div>
    )
}