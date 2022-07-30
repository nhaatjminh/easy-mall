import React, { useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { BlankCard } from "../../common/BlankCard/BlankCard";
import './index.scss'
import { SettingTitle } from "../Title/Title";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { doUpdateStoreCurrency } from "../../../redux/slice/storeSlice";
import { FinanceIcon } from "../../../assets/icon/svg/FinanceIcon";

export const Currency = ({ storeCurrency }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [currency, setCurrency] = useState(storeCurrency);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if (storeCurrency) {
            setCurrency(storeCurrency)
        }
    }, [storeCurrency])

    const handleCloseEditModal = () => {
        setShowEditModal(false)
        setCurrency(storeCurrency)
    }

    const handleUpdate = () => {
        dispatch(doUpdateStoreCurrency({
            id: params.storeId,
            currency: currency
        }))
        setShowEditModal(false)
    }

    return (
        <>
            <SettingTitle> Currency </SettingTitle>
            <BlankCard className="setting__contact">
                <Card.Body className="setting__contact__title">
                    <div className="text-title-2">Store currency</div>
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
                                <FinanceIcon />
                            </div>
                            <div className="setting__contact__content__item__info">
                                <div className="text-normal-1 font-weight-bold">
                                    {storeCurrency}
                                </div>
                                <div className="text-normal-2">
                                    Select your store currency here
                                </div>
                            </div>
                        </Col>
                        <Col
                            sm={12} md={6}
                            className="setting__contact__content__item"
                        >
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
                    <div className="text-title-1">Store currency</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="create-discount__code-card__currency">
                        <div className="text-normal-1">Currency: </div>
                        <Form.Select
                            style={{ width: 'fit-content' }}
                            className="text-normal-1"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <option className="text-normal-1" value='USD'>USD</option>
                            <option className="text-normal-1" value='VND'>VND</option>
                        </Form.Select>
                    </div>

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
                        disabled={storeCurrency === currency}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} 