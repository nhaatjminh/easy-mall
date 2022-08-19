import React, { useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { BlankCard } from "../../common/BlankCard/BlankCard";
import './index.scss'
import { SettingTitle } from "../Title/Title";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { doUploadLogo } from "../../../redux/slice/storeSlice";
import { getBase64 } from "../../../helpers/common";
import CameraIcon from '../../../assets/image/CameraIcon.png'
import defaultImg from '../../../assets/image/default-image-620x600.png'

const getImgSrc = (img) => {
    if (img) {
        if (typeof img === 'string') {
            if (img.includes('/DefaultImage/default-image-620x600.png')) {
                return defaultImg
            }
            return img
        } else return URL.createObjectURL(img)
    } else {
        return defaultImg
    }
}

export const Logo = ({ storeLogo }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [logo, setLogo] = useState();

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        if (storeLogo && !storeLogo.includes('/DefaultImage/default-image-620x600.png')) {
            setLogo(storeLogo)
        }
    }, [storeLogo])

    const handleCloseEditModal = () => {
        setShowEditModal(false)
    }

    const handleUpdate = async () => {
        const base64 = await getBase64(logo)
        dispatch(doUploadLogo({
            id: params.storeId,
            img: base64
        }))
        setShowEditModal(false)
    }

    return (
        <>
            <SettingTitle> Logo </SettingTitle>
            <BlankCard className="setting__logo">
                <Card.Body className="setting__logo__title">
                    <div className="text-title-2">Store logo</div>
                    <div
                        onClick={() => setShowEditModal(true)}
                        className="text-link"
                    >
                        Edit
                    </div>
                </Card.Body>
                <Card.Body className="setting__logo__content">
                    <Row>
                        <Col
                            sm={12} md={6}
                            className="setting__logo__content__item"
                        >
                            <div className="setting__logo__content__item__icon">
                                <img
                                    className="setting__logo__content__item__icon__img"
                                    src={getImgSrc(storeLogo)}
                                />
                            </div>
                            <div className="setting__logo__content__item__info">
                                <div className="text-normal-1 font-weight-bold">
                                    Logo
                                </div>
                                <div className="text-normal-2">
                                    {storeLogo ? 'This logo will be displayed on your site' : 'Your store has no logo'}
                                </div>
                            </div>
                        </Col>
                        <Col
                            sm={12} md={6}
                            className="setting__logo__content__item"
                        >
                        </Col>
                    </Row>
                </Card.Body>
            </BlankCard>

            <Modal
                className="setting__logo__modal"
                centered
                show={showEditModal}
                onHide={handleCloseEditModal}
            >
                <Modal.Header closeButton>
                    <div className="text-title-1">Store logo</div>
                </Modal.Header>
                <Modal.Body>

                    <img
                        className="setting__logo__modal__preview-img"
                        src={getImgSrc(logo)}
                    />

                    <div
                        className="input-img"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files[0].size > 4 * 1024 * 1024) {
                                    alert('Please choose a photo with a maximum size of 4MB!')
                                    return;
                                }
                                const img = new Image();
                                img.src = URL.createObjectURL(e.target.files[0])
                                img.onload = () => {
                                    setLogo(e.target.files[0]);
                                }
                            }}
                        />
                        <div className="input-img-icon">
                            <img src={CameraIcon} />
                        </div>
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
                        disabled={logo === storeLogo}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} 