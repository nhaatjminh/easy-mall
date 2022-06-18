import React from "react";
import './CustomButton.scss'

export const BasicButton = ({ children, className, content, style, onClick }) => {


    return (
        <div
            className={`basic-button ${className}`}
            style={style}
            onClick={onClick}
        >
            {content}
            {children}
        </div>
    )
}