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
import { doConfigEmail, doResetEmail, doUpdateEmail, doUpdateStoreInfo } from "../../../redux/slice/storeSlice";
import validator from 'validator';
import { useDebounce } from './../../../hooks/useDebounce';
import { TextError } from "../../common/TextError/TextError";
import { useDidMountEffect } from './../../../hooks/useDidMountEffct';
import { BasicButton } from "../../common/BasicButton/CustomButton";
import mailsetting1 from '../../../assets/image/mailsetting1.png';
import mailsetting2 from '../../../assets/image/mailsetting2.png';
import mailsetting3 from '../../../assets/image/mailsetting3.png';
import mailsetting4 from '../../../assets/image/mailsetting4.png';
import mailsetting5 from '../../../assets/image/mailsetting5.png';
import mailsetting6 from '../../../assets/image/mailsetting6.png';

export const Contact = ({ store }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [sender, setSender] = useState(store.mail_link);
    const [customEmail, setCustomEmail] = useState('');
    const [smtp, setSmtp] = useState('');
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState(store.phone);
    const [err, setErr] = useState({});
    const [showGuideModal, setShowGuideModal] = useState(false);
    const [showEditSenderModal, setShowEditSenderModal] = useState(false);
    const dbSender = useDebounce(sender, 300);
    const dbPhone = useDebounce(phone, 300);
    const isCustomed = store.custom_mail

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if (store) {
            setSender(store.mail_link)
            setPhone(store.phone)
            if (store.emailConfig) {
                setCustomEmail(store.emailConfig.email)
                setSmtp(store.emailConfig.smtp)
                setPassword(store.emailConfig.password)
            }
        }
    }, [store])

    useDidMountEffect(() => {
        if (!validator.isEmail(sender)) {
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
        if (phone !== '' && !validator.isMobilePhone(phone)) {
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

    const handleCloseSenderModal = () => {
        setShowEditSenderModal(false)
    }

    const handleUpdate = () => {
        dispatch(doUpdateStoreInfo({
            id: params.storeId,
            mail_link: sender,
            phone: phone
        }))
        setShowEditModal(false)
    }

    const handleConfig = () => {
        if (isCustomed) {
            dispatch(doUpdateEmail({
                id: params.storeId,
                email: customEmail,
                smtp: smtp,
                password: password
            }))
        }
        else {
            dispatch(doConfigEmail({
                id: params.storeId,
                email: customEmail,
                smtp: smtp,
                password: password
            }))
        }
        setShowEditSenderModal(false)
    }

    const handleReset = () => {
        dispatch(doResetEmail({ id: params.storeId }))
        setShowEditSenderModal(false)
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
                            {/* <div className="setting__contact__content__item__icon">
                                <MailIcon />
                            </div>
                            <div className="setting__contact__content__item__info">
                                <div className="text-normal-1 font-weight-bold">
                                    {store.mail_link}
                                </div>
                                <div className="text-normal-2">
                                    Customers see this if you email them
                                </div>
                            </div> */}
                        </Col>
                    </Row>
                </Card.Body>
            </BlankCard>

            <BlankCard className="setting__domain">
                <Card.Body className="setting__domain__title">
                    <div className="text-title-2">Sender email</div>
                    <div
                        onClick={() => setShowEditSenderModal(true)}
                        className="text-link"
                    >
                        Edit
                    </div>
                </Card.Body>
                <Card.Body className="setting__domain__content">
                    <Row>
                        <Col
                            sm={12} md={6}
                            className="setting__domain__content__item"
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
                        <Col
                            sm={12} md={6}
                            className="setting__domain__content__item"
                        >
                            <BasicButton
                                style={{ width: '100%', textAlign: 'center' }}
                                onClick={() => setShowGuideModal(true)}
                            >
                                How to set up your custom email?
                            </BasicButton>
                        </Col>
                    </Row>
                </Card.Body>
            </BlankCard>


            <Modal
                className="setting__domain__modal"
                centered
                show={showEditSenderModal}
                onHide={handleCloseSenderModal}
            >
                <Modal.Header closeButton>
                    <div className="text-title-1">Sender email</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-normal-1">
                        SMTP
                    </div>
                    <CustomInput
                        value={smtp}
                        onChange={(e) => setSmtp(e.target.value)}
                        placeholder='E.g: smtp.gmail.com'
                    />

                    <div className="text-normal-1">
                        Custom email
                    </div>
                    <CustomInput
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        warning={err.sender}
                        autoComplete='off'
                    />
                    {err.sender ? <TextError>{err.sender}</TextError> : null}

                    <div className="text-normal-1">
                        Password
                    </div>
                    <CustomInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        autoComplete='new-password'
                    />
                </Modal.Body>
                <Modal.Footer>
                    {isCustomed ?
                        <Button
                            onClick={handleReset}
                            variant="outline-danger"
                        >
                            Reset
                        </Button>
                        :

                        <Button
                            onClick={handleCloseSenderModal}
                            variant="secondary"
                        >
                            Cancel
                        </Button>
                    }
                    <Button
                        onClick={handleConfig}
                        variant="success"
                    // disabled={(sender === store.) || err !== ''}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                size="xl"
                className="setting__domain__setup"
                centered
                show={showGuideModal}
                onHide={() => setShowGuideModal(false)}
            >
                <Modal.Header closeButton>
                    <div className="text-title-1">Setting up your Google Mail</div>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} sn={12}>
                            <div className="text-title-2">Seting up Google SMTP serivce</div>
                            <div className="text-normal-1">
                                Go to your gmail account via
                                <a href="https://mail.google.com/mail/" className="text-link" target="_blank">
                                    https://mail.google.com/mail/
                                </a>
                            </div>
                            <div className="text-normal-1">On your top-right corner, click your user icon and click on <b>Manage your Google Account</b></div>
                        </Col>
                        <Col md={6} sn={12}>
                            <img 
                                style={{
                                    margin: '15px auto',
                                    maxWidth: '100%',
                                    width: 'auto',
                                    display: 'block'
                                }} 
                                src={mailsetting1} 
                            />
                        </Col>
                    </Row>
                    <div className="text-title-2">
                        Settign up your 2-step verification
                    </div>
                    <div className="text-normal-1">
                        1. Go to Security section
                    </div>
                    <div className="text-normal-1">
                        2. On the Signing in to Google section, click on 2-Step Verification
                    </div>
                    <img 
                        style={{
                            margin: '15px auto',
                            maxWidth: '100%',
                            width: 'auto',
                            display: 'block'
                        }} 
                        src={mailsetting2} 
                    />

                    <Row>
                        <Col sm={12} md={6}>
                            <div className="text-normal-1">
                                3. Provide your phone number continue
                            </div>
                            <div className="text-normal-1">
                                4. Make sure your 2-Step Verification is Turn on
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <img src={mailsetting3} />
                        </Col>
                    </Row>

                    <div className="text-title-2">
                        Setting up app password
                    </div>
                    <img
                        style={{
                            margin: '15px auto',
                            maxWidth: '100%',
                            width: 'auto',
                            display: 'block'
                        }}
                        src={mailsetting4}
                    />

                    <div className="text-normal-1">
                        1. Go back to your Securiy Tab, Signning in to Google, click on App passwords
                    </div>

                    <div className="text-normal-1">
                        2. Click on select app and choose other, Enter a name and continue
                    </div>

                    <img
                        style={{
                            margin: '15px auto',
                            maxWidth: '100%',
                            width: 'auto',
                            display: 'block'
                        }}
                        src={mailsetting5}
                    />

                    <img
                        style={{
                            margin: '15px auto',
                            maxWidth: '100%',
                            width: 'auto',
                            display: 'block'
                        }}
                        src={mailsetting6}
                    />

                    <div className="text-normal-1">
                        Provide us with your app password with these following information
                    </div>
                    <div style={{marginTop: 'unset'}} className="text-normal-1">
                        STMP: smtp.gmail.com
                    </div>
                    <div style={{marginTop: 'unset'}} className="text-normal-1">
                        Email : Your email
                    </div>
                    <div style={{marginTop: 'unset'}} className="text-normal-1">
                        Password: Your 2 verification password
                    </div>

                    <div className="text-normal-1">
                        It can take up to 24 hours for this progress to complete. But usually it takes around 10 minutes. After that, go to your website URL and check whether it complete or not.
                    </div>

                    <div className="text-normal-1">
                        Thanks you for your cooperation
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => setShowGuideModal(false)}
                        variant="secondary"
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>


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

                    {/* <div className="text-normal-1">
                        Sender email
                    </div>
                    <CustomInput
                        value={sender}
                        onChange={(e) => setSender(e.target.value)}
                        warning={err.sender}
                    />
                    {err.sender ? <TextError>{err.sender}</TextError> : null} */}
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
                        disabled={(phone === store.phone && sender === store.mail_link) || err.sender || err.phone}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} 