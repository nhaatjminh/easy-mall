import React, { useEffect } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { BlankCard } from "../../common/BlankCard/BlankCard";
import './index.scss'
import { PhoneIcon } from './../../../assets/icon/svg/PhoneIcon';
import { MailIcon } from "../../../assets/icon/svg/MailIcon";
import { SettingTitle } from "../Title/Title";
import { useState } from "react";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { doUpdateStoreInfo } from "../../../redux/slice/storeSlice";
import validator from 'validator';
import { useDebounce } from './../../../hooks/useDebounce';
import { TextError } from "../../common/TextError/TextError";
import { useDidMountEffect } from './../../../hooks/useDidMountEffct';

export const Contact = ({ store }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [sender, setSender] = useState(store.mail_link);
    const [phone, setPhone] = useState(store.phone);
    const [err, setErr] = useState({ });
    const dbSender = useDebounce(sender, 300);
    const dbPhone = useDebounce(phone, 300);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        setSender(store.mail_link)
        setPhone(store.phone)
    }, [store])

    useDidMountEffect(() => {
        if(!validator.isEmail(sender)) {
            setErr({
                ...err,
                sender: 'Invalid email'
            })
        }
        else {
            setErr({
                ...err,
                sender: null
            })
        }
    }, [dbSender])

    useDidMountEffect(() => {
        if(phone !== '' && !validator.isMobilePhone(phone)) {
            setErr({
                ...err,
                phone: 'Invalid phone number'
            })
        }
        else {
            setErr({
                ...err,
                phone: null
            })
        }
    }, [dbPhone])

    const handleCloseEditModal = () => {
        setShowEditModal(false)
        setPhone(store.phone)
        setSender(store.mail_link)
    }

    const handleUpdate = () => {
        dispatch(doUpdateStoreInfo({ 
            id: params.storeId,
            mail_link: sender, 
            phone: phone 
        }))
        setShowEditModal(false)
    }


    return (
        <>
            <SettingTitle> Store details </SettingTitle>
            <BlankCard className="setting__contact">
                <Card.Body className="setting__contact__title">
                    <div className="text-title-2">Contact information</div>
                    <div
                        onClick={() => setShowEditModal(true)}
                        className="text-link"
                    >
                        Edit
                    </div>
                </Card.Body>
                <Card.Body className="setting__contact__content">
                    <Row>
                        <Col
                            sm={12} md={6}
                            className="setting__contact__content__item"
                        >
                            <div className="setting__contact__content__item__icon">
                                <PhoneIcon />
                            </div>
                            <div className="setting__contact__content__item__info">
                                <div className="text-normal-1 font-weight-bold">
                                    {store.phone}
                                </div>
                                <div className="text-normal-2">
                                    For your customers to contact you
                                </div>


                            </div>
                        </Col>
                        <Col
                            sm={12} md={6}
                            className="setting__contact__content__item"
                        >
                            <div className="setting__contact__content__item__icon">
                                <MailIcon />
                            </div>
                            <div className="setting__contact__content__item__info">
                                <div className="text-normal-1 font-weight-bold">
                                    {store.mail_link}
                                </div>
                                <div className="text-normal-2">
                                    Customers see this if you email them
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </BlankCard>


            <Modal
                className="setting__contact__modal"
                centered
                show={showEditModal}
                onHide={handleCloseEditModal}
            >
                <Modal.Header closeButton>
                    <div className="text-title-1">Contact information</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-normal-1">
                        Phone
                    </div>
                    <CustomInput
                        className="setting__contact__modal__phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        warning={err.phone}
                    />
                    {err.phone ? <TextError>{err.phone}</TextError> : null}

                    <div className="text-normal-1">
                        Sender email
                    </div>
                    <CustomInput
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        warning={err.sender}
                    />
                    {err.sender ? <TextError>{err.sender}</TextError> : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        onClick={handleCloseEditModal}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleUpdate}
                        variant="success"
                        disabled={(phone === store.phone && sender === store.mail_link) || err.sender || err.phone }
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} 