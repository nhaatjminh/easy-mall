import React, { useEffect, useRef, useState } from "react";
import './index.scss'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Accordion, Button, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { doCreatePage, doDeletePage, doGetListPages, doUpdatePage } from './../../../redux/slice/pageSlice';
import HeaderDetailStore from "../../../component/HeaderDetailStore";
import NavBarDetailStore from "../../../component/NavBarDetailStore";
import { CustomCard } from "../../../component/common/CustomCard/CustomCard";
import { CustomInput } from "../../../component/common/CustomInput/CustomInput";
import { Key } from "../../../constants/constForNavbarDetail";
import { ConfirmModal } from './../../../component/common/ConfirmModal/ConfirmModal';
import { NotAllowIcon } from "../../../assets/icon/svg/NotAllowIcon";
import { useDebounce } from './../../../hooks/useDebounce';
import { PageApi } from './../../../service/api/pageApi';
import { useDidMountEffect } from "../../../hooks/useDidMountEffct";
import { Loader } from './../../../component/common/Loader/Loader';
import { checkValidURL } from "../../../helpers/common";
import { LoadingModal } from "../../../component/common/LoadingModal/LoadingModal";

const Page = ({ }) => {

    const listDefaultPages = useSelector((state) => state.page.listDefaultPages)
    const listCustomPages = useSelector((state) => state.page.listCustomPages)
    const listPages = useSelector((state) => state.page.listPages)
    const isLoading = useSelector((state) => state.page.isLoading)
    const dispatch = useDispatch();
    const params = useParams();
    const [name, setName] = useState('');
    const [preName, setPreName] = useState('');
    const [link, setLink] = useState('');
    const [preLink, setPreLink] = useState('');
    const [mode, setMode] = useState('ADD');
    const [updatePageId, setUpdatePageId] = useState(-1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [err, setErr] = useState('');
    const [linkErr, setLinkErr] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const dbValue = useDebounce(name, 300);
    const mounted = useRef();

    useEffect(async () => {
        if (!mounted.current) mounted.current = true
        else {
            if ((mode === 'EDIT') && (name === preName)) return;
            if (name.length >= 4) {
                setIsChecking(true)
                const result = await PageApi.checkExistName(name, params.storeId);
                if (result?.data?.length > 0) {
                    setErr('A page with that name already exists')
                }
                else {
                    setErr('')
                }
            } else {
                setErr('Your page name must be at least 4 characters')
            }         
            setIsChecking(false)
        }
    }, [dbValue])

    useEffect(() => {
        if (showModal) {
            if (link === '') {
                setLinkErr('Link cannot be blank!')
                return
            }
            const isValid = checkValidURL('/pages/' + link);
            if (isValid) setLinkErr('')
            else setLinkErr('Invalid link!')
        }
    }, [link])

    useEffect(() => {
        dispatch(doGetListPages(params.storeId))
    }, [params.storeId])

    const handleCloseModal = () => {
        setName('')
        setPreName('')
        setLink('')
        setErr('')
        setLinkErr('')
        setShowModal(false)
    }

    const handleOpenModal = () => {
        setErr('')
        setLinkErr('')
        setShowModal(true)
    }

    const handleOnchangeLink = (e) => {
        const value = e.target.value;

        // if (value.length === 0) setLink('/');
        setLink(value)
    }

    const handleAddNewPage = () => {
        if (name === '') {
            setErr('Your page name must be at least 4 characters')
            return
        }
        dispatch(doCreatePage({
            store_id: params.storeId,
            name: name,
            // link: link
        }))
            .then((res) => {
                if (res.error) setErr(res.error.message)
            })

        handleCloseModal()
    }

    const handleEitPage = () => {
        dispatch(doUpdatePage({
            id: updatePageId,
            store_id: params.storeId,
            name: name,
            page_url: '/' + link
        }))
        handleCloseModal()
    }

    const handleDeletePage = () => {
        dispatch(doDeletePage(deleteId))
        setDeleteId('')
        setShowDeleteModal(false)
    }

    return (
        <div>
            <HeaderDetailStore keySelected={Key.Page} />
            <div className="row callpage">
                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
                    <NavBarDetailStore isDesktop={true} keySelected={Key.Page}></NavBarDetailStore>
                </div>
                <div className="page col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-5 pt-4 desktop-table">
                    <div className="page__header">
                        {/* <span 
                            onClick={() => navigate(-1)}
                            className="page__header--back-icon">
                            <BackIcon/>
                        </span> */}
                        <div className="page__header--title text-title-1">Pages</div>

                    </div>

                    {/* <CustomCard className='page__table'> */}
                    <Accordion className='page__table'>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <div
                                    style={{ padding: '15px 0' }}
                                    className='page__table--title text-title-2'
                                >
                                    Default pages
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="page__table--list">
                                    {
                                        listDefaultPages?.length ? listDefaultPages.map((item) => (
                                            <div key={item.id} className="page__table--list--item">
                                                <div className="page__table--list--item--name">
                                                    <div className="text-normal-1">{item.name}</div>
                                                    <div className="text-normal-2">{item.page_url}</div>
                                                </div>
                                                {/* <div className="page__table--list--item--btn">
                                            <div
                                                className="page__table--list--item--btn--edit text-title-3"
                                                onClick={() => {
                                                    setMode('EDIT')
                                                    setName(item.name)
                                                    setPreName(item.name)
                                                    setUpdatePageId(item.id)
                                                    setLink(item.page_url)
                                                    setPreLink(item.page_url)
                                                    handleOpenModal()
                                                }}
                                            >
                                                Edit
                                            </div>
                                            <div
                                                className="page__table--list--item--btn--delete text-title-3"
                                                onClick={() => {
                                                    setDeleteId(item.id)
                                                    setShowDeleteModal(true)
                                                }}
                                            >
                                                Delete
                                            </div>
                                        </div> */}
                                            </div>
                                        )) : null}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    {/* <div
                            className="page__menu--add"
                            onClick={() => {
                                setMode('ADD')
                                setShowModal(true)
                            }}>
                            <span className="page__menu--add--icon">
                                <AddIcon />
                            </span>
                            <span className="page__menu--add--text text-normal-1">
                                Add menu item
                            </span>
                        </div> */}
                    {/* </CustomCard> */}

                    <CustomCard className='page__table'>
                        <div className='page__table--title text-title-2'>
                            Custom pages
                            <Button
                                className="btn btn-success"
                                onClick={() => {
                                    setMode('ADD')
                                    handleOpenModal()
                                }}
                            >
                                Add page
                            </Button>
                        </div>
                        <div className="page__table--list">
                            {
                                listCustomPages?.length ? listCustomPages.map((item) => (
                                    <div key={item.id} className="page__table--list--item">
                                        <div className="page__table--list--item--name">
                                            <div className="text-normal-1">{item.name}</div>
                                            <div className="text-normal-2">{item.page_url}</div>
                                        </div>
                                        <div className="page__table--list--item--btn">
                                            <div
                                                className="page__table--list--item--btn--edit text-title-3"
                                                onClick={() => {
                                                    setMode('EDIT')
                                                    setName(item.name)
                                                    setPreName(item.name)
                                                    setUpdatePageId(item.id)
                                                    setLink(item.page_url.substr(7))
                                                    setPreLink(item.page_url.substr(7))
                                                    handleOpenModal()
                                                }}
                                            >
                                                Edit
                                            </div>
                                            <div
                                                className="page__table--list--item--btn--delete text-title-3"
                                                onClick={() => {
                                                    setDeleteId(item.id)
                                                    setShowDeleteModal(true)
                                                }}
                                            >
                                                Delete
                                            </div>
                                        </div>
                                    </div>
                                )) : null}
                        </div>

                    </CustomCard>

                </div>
            </div>

            <Modal centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <div className="text-title-1">{mode === 'ADD' ? 'Add page' : preName}</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="page__add-page-modal--name">
                        <div className="text-normal-1">Name</div>
                        <CustomInput
                            placeholder='e.g About us'
                            value={name}
                            warning={err !== ''}
                            onChange={(e) => {
                                setName(e.target.value)
                                if (!isChecking) setIsChecking(true)
                            }}
                        />
                        {err !== '' &&
                            <div style={{ marginTop: '10px' }}>
                                <span style={{ marginRight: '10px' }}><NotAllowIcon /></span>
                                <span>{err}</span>
                            </div>
                        }
                    </div>
                    {mode === "EDIT" &&
                        <div className="page__add-page-modal--link">
                            <div className="text-normal-1">Link</div>
                            <CustomInput
                                placeholder='Link to your page or external link'
                                value={link}
                                warning={linkErr !== ''}
                                onChange={handleOnchangeLink}
                                icon={<div className="text-normal-2">/pages/</div>}
                            />
                        </div>
                    }
                    {linkErr !== '' &&
                        <div style={{ marginTop: '10px' }}>
                            <span style={{ marginRight: '10px' }}><NotAllowIcon /></span>
                            <span>{linkErr}</span>
                        </div>
                    }
                    {/* {isChecking && <Loader className="page__loader" small/> } */}
                </Modal.Body>
                <Modal.Footer>
                    <div className="page__add-page-modal--btn">
                        <Button
                            className="btn btn-secondary"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="btn btn-success"
                            disabled={(err !== '') || (linkErr !== '') || ((mode === 'EDIT') && (name === preName) && (link === preLink)) || isChecking}
                            onClick={mode === 'ADD' ? handleAddNewPage : handleEitPage}
                        >
                            {mode === 'ADD' ? 'Add' : 'Save'}
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <ConfirmModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                title='Delete page?'
                content='Deleted page cannot be recovered. Do you still want to continue?'
                onConfirm={handleDeletePage}
            />

            <LoadingModal show={isLoading} />
        </div>
    )
}

export default Page;