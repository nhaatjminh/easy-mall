import React, { useEffect, useState } from "react";
import './index.scss'
import { useParams } from 'react-router-dom';
import { batch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import HeaderDetailStore from "../../../../component/HeaderDetailStore";
import NavBarDetailStore from "../../../../component/NavBarDetailStore";
import { CustomInput } from "../../../../component/common/CustomInput/CustomInput";
import { CustomCard } from './../../../../component/common/CustomCard/CustomCard';
import { AddIcon } from "../../../../assets/icon/svg/AddIcon";
import { doGetCurrentMenu } from "../../../../redux/slice/navigationSlice";
import { Button, Modal } from "react-bootstrap";
import { doCreateMenuItem, doUpdateMenuItem } from './../../../../redux/slice/navigationSlice';
import { BackIcon } from "../../../../assets/icon/svg/BackIcon";
import { useNavigate } from 'react-router-dom';
import { Key } from "../../../../constants/constForNavbarDetail";
import { doGetListPages } from './../../../../redux/slice/pageSlice';
import { ConfirmModal } from './../../../../component/common/ConfirmModal/ConfirmModal';

const DetailMenu = ({ }) => {

    const menu = useSelector((state) => state.navigation.currentMenu)
    const listPage = useSelector((state) => state.page.listPages)
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [mode, setMode] = useState('ADD');
    const [updateItemId, setUpdateItemId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [showPageLinks, setShowPageLinks] = useState(false);
    const [linkValue, setLinkValue] = useState('');

    useEffect(() => {
        batch(() => {
            dispatch(doGetCurrentMenu(params.id));
            dispatch(doGetListPages(params.storeId));
        })

    }, [params.id])

    useEffect(() => {
        if (menu.title) setTitle(menu.title)
    }, [menu.title])

    const handleCloseModal = () => {
        setName('')
        setLink('')
        setShowModal(false)
    }

    const hanndleAddNewMenuItem = () => {
        dispatch(doCreateMenuItem({
            menu_id: menu.id,
            name: name,
            link: linkValue
        }))
        handleCloseModal()
    }

    const handleEitMenuItem = () => {
        dispatch(doUpdateMenuItem({
            id: updateItemId,
            name: name,
            link: linkValue
        }))
        handleCloseModal()
    }

    return (
        <div>
            <HeaderDetailStore />
            <div className="row callpage">
                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
                    <NavBarDetailStore isDesktop={true} keySelected={Key.Navigation}></NavBarDetailStore>
                </div>
                <div className="detail-menu col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-5 m-0 pt-4 desktop-table">
                    <div className="detail-menu__header">
                        <span
                            onClick={() => navigate(-1)}
                            className="detail-menu__header--back-icon">
                            <BackIcon />
                        </span>
                        <span className="detail-menu__header--title text-title-1">{menu.title}</span>
                    </div>
                    <CustomCard className="detail-menu__edit-title">
                        <div className="detail-menu__edit-title--text text-normal-1">Title</div>
                        <div className="detail-menu__edit-title--input">
                            <CustomInput
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
                            {menu?.listMenuItem?.length ? menu.listMenuItem.map((item) => (
                                <div key={item.id} className="detail-menu__menu--list--item">
                                    <div className="detail-menu__menu--list--item--name text-normal-1">{item.name}</div>
                                    <div className="detail-menu__menu--list--item--btn">
                                        <div
                                            className="detail-menu__menu--list--item--btn--edit text-title-3"
                                            onClick={() => {
                                                setMode('EDIT')
                                                setUpdateItemId(item.id)
                                                setName(item.name)
                                                setLink(item.link)
                                                setShowModal(true)
                                            }}
                                        >
                                            Edit
                                        </div>
                                        <div
                                            className="detail-menu__menu--list--item--btn--delete text-title-3"
                                            onClick={() => setOpenConfirmModal(true)}
                                        >
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            )) : null}
                        </div>

                        <div
                            className="detail-menu__menu--add"
                            onClick={() => {
                                setMode('ADD')
                                setShowModal(true)
                            }}>
                            <span className="detail-menu__menu--add--icon">
                                <AddIcon />
                            </span>
                            <span className="detail-menu__menu--add--text text-normal-1">
                                Add menu item
                            </span>
                        </div>
                    </CustomCard>

                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <div className="text-title-1">{mode === 'ADD' ? 'Add menu item' : name}</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="detail-menu__add-item-modal--name">
                        <div className="text-normal-1">Name</div>
                        <CustomInput
                            placeholder='e.g About us'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="detail-menu__add-item-modal--link">
                        <div className="text-normal-1">Link</div>
                        <CustomInput
                            placeholder='Link to your page or external link'
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            onFocus={() => setShowPageLinks(!showPageLinks)}
                        />
                        {showPageLinks ?
                            <CustomCard className='detail-menu__add-item-modal--link--list'>
                                {listPage?.length ? listPage.map((item) => (
                                    <div
                                        className="detail-menu__add-item-modal--link--list--link-item text-normal-1"
                                        onClick={() => {
                                            setLink(item.name)
                                            setLinkValue(item.page_url)
                                            setShowPageLinks(false)
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                )) : null}
                            </CustomCard>
                            :
                            null
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="detail-menu__add-item-modal--btn">
                        <Button
                            className="btn btn-secondary"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="btn btn-success"
                            onClick={mode === 'ADD' ? hanndleAddNewMenuItem : handleEitMenuItem}
                        >
                            {mode === 'ADD' ? 'Add' : 'Save'}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <ConfirmModal 
                show={openConfirmModal}
                setShow={setOpenConfirmModal}
                title='Remove menu item?'
                content={`This will remove this menu item.`}
                onConfirm={() => {}}
            />
        </div>
    )
}

export default DetailMenu;