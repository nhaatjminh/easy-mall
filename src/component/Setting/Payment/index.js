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
import cloudflare1 from '../../../assets/image/cloudflare1.png';
import cloudflare2 from '../../../assets/image/cloudflare2.png';
import cloudflare3 from '../../../assets/image/cloudflare3.png';
import cloudflare4 from '../../../assets/image/cloudflare4.png';
import cloudflare5 from '../../../assets/image/cloudflare5.png';
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
                        Setting up CloudFlare account
                    </div>
                    <div className="text-normal-1">
                        Create your CloudFlare Account via the link below:
                    </div>
                    <a href="https://www.cloudflare.com/" className="text-link" target="_blank">
                        https://www.cloudflare.com/
                    </a>

                    <div className="text-title-2">
                        Setting up your payment
                    </div>
                    <img
                        className="setting__payment__setup__img"
                        src={cloudflare1}
                    />

                    <div className="text-normal-1">
                        1. Create your new site in CloudFlare and and your custom payment's name. Eg Example.com, after that, just hit Next to move to Step 2 in cloudFlare Configuration.
                    </div>

                    <div className="text-normal-1">
                        2. Go to your hosting server website like NameCheap or Godaddy. Go to DNS setting and change Name Server to the provided Name Server from CloudFlare.
                    </div>

                    <img
                        className="setting__payment__setup__img"
                        src={cloudflare2}
                    />

                    <div className="text-normal-1">
                        3. Finish it and wait for around 10 to 20 minutes for your site to successfully registered.
                        You can check it by clicking <b>“Review Setting”</b> Button or untils A popup shows up.
                    </div>
                    <img
                        className="setting__payment__setup__img"
                        src={cloudflare3}
                    />

                    <div className="text-normal-1">
                        4. Go to CloudFlare DNS setting, which is located on the left side menu
                    </div>
                    <img
                        className="setting__payment__setup__img"
                        src={cloudflare4}
                    />

                    <div className="text-normal-1">
                        5. Create 2 news Records which contain these following information
                    </div>
                    <div className="text-normal-1">
                        A Type, Set <b>Name</b> for your <b className="b-green">payment name</b> and content is <b className="b-green">104.21.9.169</b>, which is EasyMall IP number configuration
                    </div>
                    <div className="text-normal-1">
                        CNAME type, Set <b>Name</b> your <b className="b-green">www</b>,  content is your shop's easymall URL. which is <b className="b-green">“Your-Shop.myeasymall.site”</b>, also, set <b>proxy status</b> to <b className="b-green">DNS only</b>
                    </div>
                    <img
                        className="setting__payment__setup__img"
                        src={cloudflare5}
                    />

                    <div className="text-normal-1">
                        It can take up to 24 hours for this progress to complete. But usually it takes around 10 minutes. After that, go to your website URL and check whether it complete or not.
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