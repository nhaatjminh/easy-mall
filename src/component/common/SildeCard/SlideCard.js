import React from "react";
import './SlideCard.scss';

export const SlideCard = ({ className, children, underline }) => {
    return (
        <div className={`slide-card ${className ? className : ''}`} 
            style={{ borderBottom: underline ? '1px solid #c9cccf' : undefined }}
        >
            {children}
        </div>
    )
}