import React, { useEffect, useState } from "react";
import './index.scss'
import HeaderDetailStore from './../../../component/HeaderDetailStore/index';
import NavBarDetailStore from "../../../component/NavBarDetailStore";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { doGetListNavigation, doSetCurrentMenu, doCreateMenu } from './../../../redux/slice/navigationSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";
import { CustomInput } from "../../../component/common/CustomInput/CustomInput";
import { Key } from "../../../constants/constForNavbarDetail";
import { LoadingModal } from "../../../component/common/LoadingModal/LoadingModal";

const Navigation = () => {

    const listNavigation = useSelector((state) => state.navigation.listNavigation);
    const isLoading = useSelector((state) => state.navigation.isLoading);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        dispatch(doGetListNavigation(params.storeId))
    }, [])

    const handleCloseModal = () => {
        setTitle('');
        setShowModal(false);
    }

    const hanndleAddNewMenu = () => {
        dispatch(doCreateMenu({ store_id: params.storeId, name: title }))
        handleCloseModal();
    }

    const listMenuItem = (menu) => {
        return (
            <div key={menu.id} className="navigation__menus__table--items">
                <div
                    className="navigation__menus__table--items--title"
                    onClick={() => {
                        dispatch(doSetCurrentMenu(menu));
                        navigate(`/store-detail/manage-navigation/${params.storeId}/menu/${menu.id}`);
                    }}
                >
                    {menu.name}
                </div>
                <div className="navigation__menus__table--items--content">
                    {menu?.listMenuItem?.length ? menu.listMenuItem.map((item) => `${item.name}, `) : null}
                </div>
            </div>
        )
    }

    return (
        <div>
            <HeaderDetailStore />
            <div className="row callpage">
                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
                    <NavBarDetailStore isDesktop={true} keySelected={Key.Navigation}></NavBarDetailStore>
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
                                <div
                                    className="navigation__menus__table--header--add-btn"
                                    onClick={() => setShowModal(true)}
                                >
                                    Add menu
                                </div>
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

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <div className="text-title-1">Add menu</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="navigation__add-menu-modal--title">
                        <div className="text-normal-1">Title</div>
                        <CustomInput
                            placeholder='e.g Slide bar menu'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="navigation__add-menu-modal--btn">
                        <Button
                            className="btn btn-secondary"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="btn btn-success"
                            onClick={hanndleAddNewMenu}
                        >
                            Add
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <LoadingModal show={isLoading}/>
        </div>
    )
}

export default Navigation;