import React, { useEffect, useState } from "react";
import { HeaderAccount } from "../../component/HeaderAccount/HeaderAccount";
import './index.scss'
import { useDispatch, useSelector } from "react-redux";
import { LoadingModal } from './../../component/common/LoadingModal/LoadingModal';
import { Contact } from "../../component/Setting/Contact";
import { useNavigate, useParams } from 'react-router-dom';
import { doGetCurrentStore } from "../../redux/slice/storeSlice";
import { Domain } from "../../component/Setting/Domain";
import { DangerZone } from "../../component/Setting/DangerZone";
import { BackIcon } from "../../assets/icon/svg/BackIcon";
import { Payment } from './../../component/Setting/Payment/index';
import { Currency } from "../../component/Setting/Currency";
import { Logo } from "../../component/Setting/Logo";
import { doGetUserInfo } from "../../redux/slice/userSlice";

export const Setting = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const store = useSelector((state) => state.listStore.currentStore);
    const isLoading = useSelector((state) => state.listStore.isLoading);
    const { fullname } = useSelector((state) => state.user.info);
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(doGetCurrentStore(params.storeId))
        dispatch(doGetUserInfo())
    }, [])

    return (
        <div className="blank-layout">
            <HeaderAccount name={fullname} />
            <div className="setting">
                <div className="setting__header text-title-1">
                    <span className="setting__header__back-btn" onClick={() => navigate(-1)}>
                        <BackIcon />
                    </span>
                    Setting
                </div>
                <Logo storeLogo={store.logo_url} />
                <Contact store={store} />
                <Domain store={store} />
                <Currency storeCurrency={store?.currency} />
                <Payment store={store} />
                <DangerZone store={store} />
            </div>

            <LoadingModal show={isLoading} />
        </div>
    )
}