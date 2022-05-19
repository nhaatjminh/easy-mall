import React from "react";
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import { StoreIcon } from "../../assets/icon/svg/StoreIcon";
import { GoIcon } from "../../assets/icon/svg/GoIcon";

const StoreLoginList = ({shopName, shopLink, onClicked}) => {
    
    return (
        <>
            <div className="row mt-3 store-list m-0" onClick={onClicked}>
                <div className="store-list__icon-container col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    <div className="store-list__icon">
                    <StoreIcon/>
                    </div>
                </div>
                <div className="store-list__store-detail col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                    <p className="store-list__store-detail--name font-weight-bold">{shopName}</p>
                    <p className="store-list__store-detail--name text-link">{shopLink}</p>
                </div>
                <div className="store-list__go-icon col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                    <GoIcon/>
                </div>
            </div>

        </>
    );
}

export default StoreLoginList;