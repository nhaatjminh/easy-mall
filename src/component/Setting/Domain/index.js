import React, { useEffect } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { BlankCard } from "../../common/BlankCard/BlankCard";
import './index.scss'
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
import { DomainIcon } from "../../../assets/icon/svg/DomainIcon";
import { BasicButton } from './../../common/BasicButton/CustomButton';

export const Domain = ({ store }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [domain, setDomain] = useState(store.store_link);
    const [err, setErr] = useState('');
    const dbDomain = useDebounce(domain, 300);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        setDomain(store.store_link)
    }, [store])

    useDidMountEffect(() => {
        if (!validator.isURL(domain)) {
            setErr('Invalid URL')
        }
        else {
            setErr('')
        }
    }, [dbDomain])

    const handleCloseEditModal = () => {
        setShowEditModal(false)
        setDomain(store.store_link)
    }

    const handleUpdate = () => {
        dispatch(doUpdateStoreInfo({
            id: params.storeId,
            store_link: domain
        }))
        setShowEditModal(false)
    }


    return (
        <>
            <SettingTitle> Domains </SettingTitle>
            <BlankCard className="setting__domain">
                <Card.Body className="setting__domain__title">
                    <div className="text-title-2">Domain information</div>
                    <div
                        onClick={() => setShowEditModal(true)}
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
                            <div className="setting__domain__content__item__icon">
                                <DomainIcon />
                            </div>
                            <div className="setting__domain__content__item__info">
                                <div className="text-normal-1 font-weight-bold">
                                    {store.store_link}
                                </div>
                                <div className="text-normal-2">
                                    Your store link
                                </div>


                            </div>
                        </Col>
                        <Col
                            sm={12} md={6}
                            className="setting__domain__content__item"
                        >
                            <BasicButton
                                style={{ width: '100%', textAlign: 'center' }}
                            >
                                How to setting up your domain?
                            </BasicButton>
                        </Col>
                    </Row>
                </Card.Body>
            </BlankCard>


            <Modal
                className="setting__domain__modal"
                centered
                show={showEditModal}
                onHide={handleCloseEditModal}
            >
                <Modal.Header closeButton>
                    <div className="text-title-1">Contact information</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-normal-1">
                        Domain
                    </div>
                    <CustomInput
                        className="setting__domain__modal__phone"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        warning={err !== ''}
                    />
                    {err !== '' ? <TextError>{err}</TextError> : null}

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
                        disabled={(domain === store.store_link) || err !== ''}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} 