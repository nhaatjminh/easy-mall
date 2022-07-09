import React from "react";
import './index.scss'
import { useNavigate } from "react-router-dom";

export const EndSlide = () => {
    const routeChange = useNavigate();

    return (
        <div className="text-center mb-5">
            <h5 className="font-weight-bold text-end-slide-1 end-slide__title">Start your business journey with EasyMall</h5>

            <h5 className="text-end-slide-2 end-slide__content">
            Try EasyMall for free, discover all the tools and services to start, run and grow your own business.
            </h5>
            <button onClick={() => routeChange('/store-login')} className="btn btn-success btn-end-slide mt-5 end-slide__btn"> <p className="text-btn-end-slide"> Start your free trial </p></button>
        </div>
    )
}