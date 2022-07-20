import React, { useEffect } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { BlankCard } from "../../common/BlankCard/BlankCard";
import './index.scss'
import { SettingTitle } from "../Title/Title";
import { useState } from "react";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { StoreIcon } from './../../../assets/icon/svg/StoreIcon';
import { doDeleteStore } from "../../../redux/slice/storeSlice";

export const DangerZone = ({ store }) => {
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState('');
    let navigate = useNavigate();

    const dispatch = useDispatch();
    const params = useParams();

    const handleCloseModal = () => {
        setShowModal(false)
        setValue('')
    }

    const handleDeleteStore = () => {
        dispatch(doDeleteStore(params.storeId))
        .then(() => navigate('/store-login'))
        handleCloseModal()
    }


    return (
        <>
            <SettingTitle> Danger Zone </SettingTitle>
            <BlankCard className="setting__danger-zone">
                <Card.Body className="setting__danger-zone__title">
                    <div className="text-title-2">Delete</div>
                </Card.Body>
                <Card.Body className="setting__danger-zone__content">
                    <Row>
                        <Col
                            sm={12} md={8}
                            className="setting__danger-zone__content__item"
                        >
                            <div className="setting__danger-zone__content__item__icon">
                                <StoreIcon />
                            </div>
                            <div className="setting__danger-zone__content__item__info">
                                <div className="text-normal-1 font-weight-bold">
                                    Delete this store
                                </div>
                                <div className="text-normal-2">
                                    Once you delete a store, there is no going back. Please be certain.
                                </div>
                            </div>
                        </Col>
                        <Col
                            sm={12} md={4}
                            className="setting__danger-zone__content__item"
                        >
                            <Button
                                onClick={() => setShowModal(true)}
                                style={{ width: '100%' }}
                                variant="outline-danger"
                            >
                                Delete this store
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </BlankCard>


            <Modal
                className="setting__danger-zone__modal"
                centered
                show={showModal}
                onHide={handleCloseModal}
            >
                <Modal.Header closeButton>
                    <div className="text-title-1">Are you absolutely sure?</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-normal-1">
                        This action <b>cannot</b> be undone. This will permanently delete the <b>{store.name}</b>, products, pages, orders, settings and remove all your store infomations.
                    </div>
                    <div className="text-normal-1">
                        Please type <b><i>permanently delete</i></b> to confirm.
                    </div>
                    <CustomInput
                        className="setting__danger-zone__modal__phone"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={handleCloseModal}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteStore}
                        variant="danger"
                        disabled={value !== 'permanently delete'}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} 