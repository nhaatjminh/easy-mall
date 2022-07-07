import React from "react";
import './Title.scss'

export const SettingTitle = ({ children }) => {
    return (
        <div className="setting__title text-title-1">
            {children}
        </div>
    )
}