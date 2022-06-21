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
import { doDeleteMenuItem, doGetCurrentMenu, doUpdateMenu } from "../../../../redux/slice/navigationSlice";
import { Button, Modal } from "react-bootstrap";
import { doCreateMenuItem, doUpdateMenuItem } from './../../../../redux/slice/navigationSlice';
import { BackIcon } from "../../../../assets/icon/svg/BackIcon";
import { useNavigate } from 'react-router-dom';
import { Key } from "../../../../constants/constForNavbarDetail";
import { doGetListPages } from './../../../../redux/slice/pageSlice';
import { ConfirmModal } from './../../../../component/common/ConfirmModal/ConfirmModal';
import { LoadingModal } from './../../../../component/common/LoadingModal/LoadingModal';
import { CustomButton } from "../../../../component/common/CustomButton/CustomButton";
import { ExternalLinkIcon } from "../../../../assets/icon/svg/ExternalLinkIcon";
import { BasicButton } from "../../../../component/common/BasicButton/CustomButton";
import { XIcon } from "../../../../assets/icon/svg/XIcon";
import { BlankCard } from './../../../../component/common/BlankCard/BlankCard';
import { PageIcon } from './../../../../assets/icon/svg/PageIcon';
import { useDebounce } from './../../../../hooks/useDebounce';
import { removeSpace } from './../../../../helpers/common';
import validator from "validator";

const DetailMenu = ({ }) => {

    const menu = useSelector((state) => state.navigation.currentMenu)
    const isLoading = useSelector((state) => state.navigation.isLoading)
    const listPage = useSelector((state) => state.page.listPages)
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [preLink, setPreLink] = useState('');
    const [mode, setMode] = useState('ADD');
    const [updateItemId, setUpdateItemId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [showPageLinks, setShowPageLinks] = useState(false);
    const [linkValue, setLinkValue] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [err, setErr] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const dbValue = useDebounce(link, 300);
    const [icon, setIcon] = useState('page');
    const [isClick, setIsClick] = useState(false);

    useEffect(() => {
        batch(() => {
            dispatch(doGetCurrentMenu(params.id));
            dispatch(doGetListPages(params.storeId))
        })

    }, [])

    useEffect(() => {
        if (menu.name) setTitle(menu.name)
    }, [menu.name])

    useEffect(() => {
        let result = [];

        // from external link
        if (link.includes(".") && validator.isURL(link)) {
            if (link.substring(0, 8) === 'https://' || link.substring(0, 7) === 'http://') {
                result.push({
                    id: 0,
                    page_url: link,
                    name: link,
                    type: 2
                })
            }
            else {
                const url = 'https://' + link;
                result.push({
                    id: 0,
                    page_url: url,
                    name: url,
                    type: 2
                });
            }
        }

        // from pages of store
        const resultFromPage = listPage.reduce((list, item) => {
            const s = removeSpace(link).toLowerCase();
            if (item.name.toLowerCase().includes(s)) {
                list.push({
                    ...item,
                    type: 1
                })
            }
            return list;
        }, [])

        result = [...result, ...resultFromPage];
        setSearchResult(result);
    }, [dbValue])

    const getPageNameFromUrl = (url) => {
        const index = listPage?.findIndex((item) => item.page_url === url);
        if (index >= 0) {
            return listPage[index].name;
        }
        return '';
    }

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

    const handleEitMenu = () => {
        dispatch(doUpdateMenu({
            id: menu.id,
            name: title,
        }))
        handleCloseModal()
    }

    const handleDeleteMenuItem = () => {
        dispatch(doDeleteMenuItem(deleteId))
        setDeleteId('')
        setOpenConfirmModal(false)
    }

    // useEffect(() => {
    //     console.log(isClick)
    // }, [isClick])

    return (
        <div>
            <HeaderDetailStore keySelected={Key.Navigation} />
            <div className="row callpage">
                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
                    <NavBarDetailStore isDesktop={true} keySelected={Key.Navigation}></NavBarDetailStore>
                </div>
                <div className="detail-menu col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-5 pt-4 desktop-table">
                    <div className="detail-menu__header">
                        <span
                            onClick={() => navigate(-1)}
                            className="detail-menu__header--back-icon">
                            <BackIcon />
                        </span>
                        <span className="detail-menu__header--title text-title-1">{menu.name}</span>
                    </div>
                    <CustomCard className="detail-menu__edit-title">
                        <div className="detail-menu__edit-title--text text-normal-1">Title</div>
                        <div className="detail-menu__edit-title--input">
                            <CustomInput
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={!isEditTitle}
                            />
                            <CustomButton
                                style={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    border: '1px solid #c9cccf',
                                    height: 'fit-content',
                                    marginLeft: '15px',
                                    width: '70px',
                                    textAlign: 'center',
                                    "&:hover": {
                                        background: '#f6f6f7'
                                    }

                                }}
                                onClick={() => {
                                    setIsEditTitle((isEditTitle) => !isEditTitle)
                                    if (isEditTitle) handleEitMenu()
                                }}
                            >
                                {isEditTitle ? 'Save' : 'Edit'}
                            </CustomButton>
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
                                                setLink(item.link[0] === '/' ? getPageNameFromUrl(item.link) : item.link)
                                                setPreLink(item.link[0] === '/' ? getPageNameFromUrl(item.link) : item.link)
                                                setShowModal(true)
                                                setIcon(item.link[0] === '/' ? 'page' : 'external')
                                            }}
                                        >
                                            Edit
                                        </div>
                                        <div
                                            className="detail-menu__menu--list--item--btn--delete text-title-3"
                                            onClick={() => {
                                                setOpenConfirmModal(true)
                                                setDeleteId(item.id)
                                            }}
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
            </div >

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
                        <div className="detail-menu__add-item-modal--link__input-group">
                            <CustomInput
                                placeholder='Link to your page or external link'
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                onFocus={() => setShowPageLinks(true)}
                                onBlur={() => {
                                    // setTimeout(() => {
                                    //     console.log('blur')
                                    //     console.log({isClick})
                                    //     if (!isClick) {
                                    //         setShowPageLinks(false)
                                    //         setLink(preLink)
                                    //     }
                                    //     else {
                                    //         setIsClick(false)
                                    //     }
                                    //     // if (isClick) {
                                    //     //     setShowPageLinks(false)
                                    //     //     setLink(preLink)
                                    //     //     setIsClick(false)
                                    //     // }
                                    // }, 3000)
                                }}
                                icon={icon === 'page' ? <PageIcon /> : <ExternalLinkIcon />}
                            />
                            <BasicButton
                                className="detail-menu__add-item-modal--link__input-group__clear-btn"
                                onClick={() => {
                                    setLink('')
                                    setPreLink('')
                                    setLinkValue('')
                                }}
                            >
                                <XIcon />
                            </BasicButton>
                        </div>
                        {showPageLinks ?
                            <CustomCard className='detail-menu__add-item-modal--link--list'>
                                {searchResult?.length ? searchResult.map((item) => (
                                    <div
                                        key={item.id}
                                        className="detail-menu__add-item-modal--link--list--link-item"
                                        onClick={() => {
                                            console.log('click')
                                            setLink(item.name)
                                            setLinkValue(item.page_url)
                                            setPreLink(item.name)
                                            setShowPageLinks(false)
                                            setIcon(item.type === 1 ? 'page' : 'external')
                                            setIsClick(true)
                                        }}
                                    >
                                        <span>{item.type === 1 ? <PageIcon /> : <ExternalLinkIcon />}</span>
                                        <span
                                            className=" text-normal-1"

                                        >
                                            {item.name}
                                        </span>
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
                onConfirm={handleDeleteMenuItem}
            />
            <LoadingModal show={isLoading} />
        </div >

    )
}

export default DetailMenu;