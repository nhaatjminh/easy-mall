import React from "react";
import { NotAllowIcon } from './../../../assets/icon/svg/NotAllowIcon';
import './TextError.scss'

export const TextError = ({ className, children }) => {
    return (
        <div className="text-error">
            <span className="text-error__icon"><NotAllowIcon /></span>
            <span className="text-error__content">{children}</span>
        </div>
    )
}