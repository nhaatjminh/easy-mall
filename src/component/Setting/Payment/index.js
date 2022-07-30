import React, { useEffect } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { BlankCard } from "../../common/BlankCard/BlankCard";
import './index.scss'
import { SettingTitle } from "../Title/Title";
import { useState } from "react";
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { doCreatePaypal, doDeletePaypal, doGetPaypal, doUpdatePaypal } from "../../../redux/slice/storeSlice";
import { BasicButton } from './../../common/BasicButton/CustomButton';
import paypal1 from '../../../assets/image/paypal1.png';
import paypal2 from '../../../assets/image/paypal2.png';
import paypal3 from '../../../assets/image/paypal3.png';
import paypal4 from '../../../assets/image/paypal4.png';
import { PaymentIcon } from './../../../assets/icon/svg/PaymentIcon';
import Swal from "sweetalert2";

export const Payment = ({ store }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showGuideModal, setShowGuideModal] = useState(false);
    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const paypal = useSelector((state) => state.listStore.paypal);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(doGetPaypal(params.storeId))
    }, [store])

    useEffect(() => {
        if (paypal?.client_id) setClientId(paypal.client_id)
    }, [paypal])


    const handleCloseEditModal = () => {
        setShowEditModal(false)
        setIsEdit(false)
        setClientSecret('')
    }

    const handleUpdatePaypal = () => {
        dispatch(doUpdatePaypal({
            id: params.storeId,
            client_id: clientId,
            secret_key: clientSecret
        })).then((res) => {
            if (res.payload.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.payload.error,
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully connect to Paypal',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        handleCloseEditModal()
    }

    const handleCreatePaypal = () => {
        dispatch(doCreatePaypal({
            id: params.storeId,
            client_id: clientId,
            secret_key: clientSecret
        })).then((res) => {
            if (res.payload.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.payload.error,
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully connect to Paypal',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        handleCloseEditModal()
    }

    const handleDisconnectPaypal = () => {
        dispatch(doDeletePaypal(params.storeId))
        handleCloseEditModal()
    }

    return (
        <>
            <SettingTitle> Payments </SettingTitle>
            <BlankCard className="setting__payment">
                <Card.Body className="setting__payment__title">
                    <div className="text-title-2">Paypal</div>
                    <div
                        onClick={() => setShowEditModal(true)}
                        className="text-link"
                    >
                        {paypal ? 'Edit' : 'Connect'}
                    </div>
                </Card.Body>
                <Card.Body className="setting__payment__content">
                    <Row>
                        <Col
                            sm={12} md={6}
                            className="setting__payment__content__item"
                        >
                            <div className="setting__payment__content__item__icon">
                                <PaymentIcon />
                            </div>
                            <div className="setting__payment__content__item__info">
                                <div className="text-normal-1 font-weight-bold">
                                    PayPal
                                </div>
                                <div className="text-normal-2">
                                    {paypal ? 'Connected to paypal' : 'Not connected to paypal yet'}
                                </div>
                            </div>
                        </Col>
                        <Col
                            sm={12} md={6}
                            className="setting__payment__content__item"
                        >
                            <BasicButton
                                style={{ width: '100%', textAlign: 'center' }}
                                onClick={() => setShowGuideModal(true)}
                            >
                                How to connect to your PayPal?
                            </BasicButton>
                        </Col>
                    </Row>
                </Card.Body>
            </BlankCard>


            <Modal
                className="setting__payment__modal"
                centered
                show={showEditModal}
                onHide={handleCloseEditModal}
            >
                <Modal.Header closeButton>
                    <div className="text-title-1">PayPal</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-normal-1">
                        Client Id
                    </div>
                    <CustomInput
                        className="setting__payment__modal__phone"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        disabled={paypal && !isEdit}
                        autoComplete='off'
                    />
                    {(!paypal || (paypal && isEdit)) &&
                        <>
                            <div className="text-normal-1">
                                Client secret
                            </div>
                            <CustomInput
                                className="setting__payment__modal__phone"
                                value={clientSecret}
                                onChange={(e) => setClientSecret(e.target.value)}
                                type='password'
                                autoComplete='new-password'
                            />
                        </>
                    }

                </Modal.Body>
                <Modal.Footer>
                    {(paypal && !isEdit) ?
                        <>
                        <Button
                            onClick={handleDisconnectPaypal}
                            variant={'danger'}
                        >
                            Disconnect
                        </Button>
                        <Button
                            onClick={() => setIsEdit(true)}
                            variant="success"
                        >
                            Edit
                        </Button>
                        </>
                        
                        :
                        <>
                        <Button
                            onClick={handleCloseEditModal}
                            variant={'secondary'}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={paypal ? handleUpdatePaypal : handleCreatePaypal}
                            variant="success"
                            disabled={(!clientSecret || !clientSecret)}
                        >
                            Connect
                        </Button>
                        </>
                    }
                    {/* <Button
                        onClick={paypal ? handleUpdatePaypal : handleCreatePaypal}
                        variant="success"
                        disabled={(!clientSecret || !clientSecret)}
                    >
                        Connect
                    </Button> */}
                </Modal.Footer>
            </Modal>

            <Modal
                size="xl"
                className="setting__payment__setup"
                centered
                show={showGuideModal}
                onHide={() => setShowGuideModal(false)}
            >
                <Modal.Header closeButton>
                    <div className="text-title-1">Setting up your payment</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-title-2">
                        Create Paypal account
                    </div>
                    <div className="text-normal-1">
                        Create your Paypal Account via the link below:
                    </div>
                    <a href="https://www.paypal.com/" className="text-link" target="_blank">
                        https://www.paypal.com/
                    </a>

                    <div className="text-title-2">
                        Setting up your payment
                    </div>
                    <div className="text-normal-1">
                        1. Go to <a href="https://developer.paypal.com/" className="text-link" target="_blank">https://developer.paypal.com/</a> and login to Dashboard
                    </div>
                    <img
                        className="setting__payment__setup__img"
                        src={paypal1}
                    />

                    <div className="text-normal-1">
                        2. Click <b>Create App</b> to create your new app
                    </div>

                    <img
                        className="setting__payment__setup__img"
                        src={paypal2}
                    />

                    <div className="text-normal-1">
                        3. After creating, your app information almost there.
                    </div>

                    <img
                        className="setting__payment__setup__img"
                        src={paypal3}
                    />

                    <div className="text-normal-1">
                        4. Click <b>Show</b> to show your Client secret.
                    </div>
                    <img
                        className="setting__payment__setup__img"
                        src={paypal4}
                    />

                    <div className="text-normal-1">
                        5. Get your Client ID and Secret.
                    </div>

                    <div className="text-normal-1">
                        Then go back to <b>Easy Mall</b> and set up payment with your Paypal information
                    </div>

                    <div className="text-normal-1">
                        Thanks you for your cooperation.
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
        </>
    )
} 