import React, { useEffect, useState } from "react";
import './index.scss'
import HeaderDetailStore from './../../../component/HeaderDetailStore/index';
import NavBarDetailStore from "../../../component/NavBarDetailStore";
import { useParams } from 'react-router-dom';
import { StoreApi } from "../../../service/api";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { doGetListpage } from './../../../redux/slice/pageSlice';

const Page = () => {

    const listpage = useSelector((state) => state.page.listpage);
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(doGetListpage(params.storeId));
    }, [])

    return (
        <div>
            <HeaderDetailStore />
            <div className="row callpage">
                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
                    <NavBarDetailStore isDesktop={true}></NavBarDetailStore>
                </div>
                <div className="page col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-5 m-0 pt-4 desktop-table">
                    <div className="page__header">
                        <div className="page__header--title">page</div>
                    </div>
                    <div className="page__menus">
                        <div className="page__menus__description">
                            <div className="page__menus__description--title">Menus</div>
                            <div className="page__menus__description--content">Menus, or link lists, help your customers navigate around your online store.</div>
                        </div>
                        <div className="page__menus__table">
                            <div className="page__menus__table--header">
                                <div className="page__menus__table--header--menu">Menu</div>
                                <div className="page__menus__table--header--add-btn">Add menu</div>
                            </div>
                            <div className="page__menus__table--col">
                                <div className="page__menus__table--col--title">Title</div>
                                <div className="page__menus__table--col--content">Menu items</div>
                            </div>
                            <div className="page__menus__table--items">
                                <div className="page__menus__table--items--title">Title</div>
                                <div className="page__menus__table--items--content">Menu items</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page;