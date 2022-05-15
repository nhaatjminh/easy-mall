import React, { useEffect, useState } from "react";
import './index.scss'
import HeaderDetailStore from './../../../component/HeaderDetailStore/index';
import NavBarDetailStore from "../../../component/NavBarDetailStore";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { doGetListNavigation, doSetCurrentMenu } from './../../../redux/slice/navigationSlice';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {

    const listNavigation = useSelector((state) => state.navigation.listNavigation);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(doGetListNavigation(params.storeId));
    }, [])

    const listMenuItem = (menu) => {
        return (
            <div key={menu.id} className="navigation__menus__table--items">
                <div 
                    className="navigation__menus__table--items--title"
                    onClick={() => {
                      dispatch(doSetCurrentMenu(menu));
                      navigate(`/store-detail/menu/${menu.id}`);
                    }}
                    >
                    {menu.title}
                </div>
                <div className="navigation__menus__table--items--content">
                {menu.listMenuItem.map((item) => `${item.name}, `)}
                </div>
            </div>
        )
    }

    return (
        <div>
            <HeaderDetailStore />
            <div className="row callpage">
                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
                    <NavBarDetailStore isDesktop={true}></NavBarDetailStore>
                </div>
                <div className="navigation col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-5 m-0 pt-4 desktop-table">
                    <div className="navigation__header">
                        <div className="navigation__header--title">Navigation</div>
                    </div>
                    <div className="navigation__menus">
                        <div className="navigation__menus__description">
                            <div className="navigation__menus__description--title">Menus</div>
                            <div className="navigation__menus__description--content">Menus, or link lists, help your customers navigate around your online store.</div>
                        </div>
                        <div className="navigation__menus__table">
                            <div className="navigation__menus__table--header">
                                <div className="navigation__menus__table--header--menu">Menu</div>
                                <div className="navigation__menus__table--header--add-btn">Add menu</div>
                            </div>
                            <div className="navigation__menus__table--col">
                                <div className="navigation__menus__table--col--title">Title</div>
                                <div className="navigation__menus__table--col--content">Menu items</div>
                            </div>
                            {listNavigation.map((menu) => listMenuItem(menu))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navigation;