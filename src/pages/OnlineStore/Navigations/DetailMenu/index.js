import React, { useEffect, useState } from "react";
import './index.scss'
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import HeaderDetailStore from "../../../../component/HeaderDetailStore";
import NavBarDetailStore from "../../../../component/NavBarDetailStore";
import { CustomInput } from "../../../../component/common/CustomInput/CustomInput";
import { CustomCard } from './../../../../component/common/CustomCard/CustomCard';
import { AddIcon } from "../../../../assets/icon/svg/AddIcon";
import { doGetCurrentMenu } from "../../../../redux/slice/navigationSlice";

const DetailMenu = ({}) => {

    const menu = useSelector((state) => state.navigation.currentMenu)
    const dispatch = useDispatch();
    const params = useParams();
    const [title, setTitle] = useState('');

    useEffect(() => {
        dispatch(doGetCurrentMenu(params.id));
    }, [params.id])


    return (
        <div>
            <HeaderDetailStore />
            <div className="row callpage">
                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
                    <NavBarDetailStore isDesktop={true}></NavBarDetailStore>
                </div>
                <div className="detail-menu col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-5 m-0 pt-4 desktop-table">
                    <div className="detail-menu__header">
                        <div className="detail-menu__header--title text-title-1">{title}</div>
                    </div>
                    <CustomCard className="detail-menu__edit-title">
                        <div className="detail-menu__edit-title--text text-normal-1">Title</div>
                        <div className="detail-menu__edit-title--input">
                            <CustomInput
                                // defaultValue={location.title}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </CustomCard>

                    <CustomCard className='detail-menu__menu'>
                        <div className='detail-menu__menu--title text-title-2'>
                            Menu items
                        </div>
                        <div className="detail-menu__menu--list">
                            {menu?.listMenuItem.length && menu.listMenuItem.map((item) => (
                                <div key={item.id} className="detail-menu__menu--list--item">
                                    <div className="detail-menu__menu--list--item--name text-normal-1">{item.name}</div>
                                    <div className="detail-menu__menu--list--item--btn">
                                        <div
                                            className="detail-menu__menu--list--item--btn--edit text-title-3"

                                        >
                                            Edit
                                        </div>
                                        <div
                                            className="detail-menu__menu--list--item--btn--delete text-title-3"

                                        >
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="detail-menu__menu--add">
                            <span className="detail-menu__menu--add--icon">
                                <AddIcon/>
                            </span>
                            <span className="detail-menu__menu--add--text text-normal-1">
                                Add menu item
                            </span>
                        </div>
                    </CustomCard>

                </div>
            </div>

        </div>
    )
}

export default DetailMenu;