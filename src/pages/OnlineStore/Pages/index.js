import React, { useEffect, useRef, useState } from "react";
import './index.scss'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button, Modal } from "react-bootstrap";
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

const Page = ({ }) => {

    const listPages = useSelector((state) => state.page.listPages)
    const dispatch = useDispatch();
    const params = useParams();
    const [name, setName] = useState('');
    const [preName, setPreName] = useState('');
    const [link, setLink] = useState('');
    const [mode, setMode] = useState('ADD');
    const [updatePageId, setUpdatePageId] = useState(-1);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [err, setErr] = useState('');
    const dbValue = useDebounce(name, 300);
    const mounted = useRef();

    useEffect(async () => {
        if (!mounted.current) mounted.current = true
        else {
            if ((mode === 'EDIT') && (name === preName)) return;
            if (name.length >= 4) {
                const result = await PageApi.checkExistName(name, params.storeId);
                if (result.data.length > 0) setErr('A page with that name already exists')
                else setErr('')
            } else {
                setErr('Your page name must be at least 4 characters')
            }
        }
    }, [dbValue])

    useEffect(() => {
        dispatch(doGetListPages(params.storeId));
    }, [params.storeId])

    const handleCloseModal = () => {
        setName('')
        setPreName('')
        setLink('')
        setErr('')
        setShowModal(false)
    }

    const handleOpenModal = () => {
        setErr('')
        setShowModal(true)
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
        handleCloseModal()
    }

    const handleEitPage = () => {
        dispatch(doUpdatePage({
            id: updatePageId,
            name: name
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
            <HeaderDetailStore />
            <div className="row callpage">
                <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
                    <NavBarDetailStore isDesktop={true} keySelected={Key.Page}></NavBarDetailStore>
                </div>
                <div className="page col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-5 m-0 pt-4 desktop-table">
                    <div className="page__header">
                        {/* <span 
                            onClick={() => navigate(-1)}
                            className="page__header--back-icon">
                            <BackIcon/>
                        </span> */}
                        <div className="page__header--title text-title-1">Pages</div>
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

                    <CustomCard className='page__table'>
                        <div className='page__table--title text-title-2'>
                            All pages
                        </div>
                        <div className="page__table--list">
                            {listPages?.length ? listPages.map((item) => (
                                <div key={item.id} className="page__table--list--item">
                                    <div className="page__table--list--item--name text-normal-1">{item.name}</div>
                                    <div className="page__table--list--item--btn">
                                        <div
                                            className="page__table--list--item--btn--edit text-title-3"
                                            onClick={() => {
                                                setMode('EDIT')
                                                setName(item.name)
                                                setPreName(item.name)
                                                setUpdatePageId(item.id)
                                                setLink(item.page_url)
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
                    </CustomCard>

                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
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
                            onChange={(e) => setName(e.target.value)}
                        />
                        {err !== '' &&
                            <div style={{ marginTop: '10px' }}>
                                <span style={{ marginRight: '10px' }}><NotAllowIcon /></span>
                                <span>{err}</span>
                            </div>
                        }
                    </div>
                    {/* <div className="page__add-page-modal--link">
                        <div className="text-normal-1">Link</div>
                        <CustomInput
                            placeholder='Link to your page or external link'
                            value={link}
                            disabled={true}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div> */}
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
                            disabled={(err !== '') || ((mode === 'EDIT') && (name === preName))}
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
        </div>
    )
}

export default Page;