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
import cloudflare1 from '../../../assets/image/cloudflare1.png';
import cloudflare2 from '../../../assets/image/cloudflare2.png';
import cloudflare3 from '../../../assets/image/cloudflare3.png';
import cloudflare4 from '../../../assets/image/cloudflare4.png';
import cloudflare5 from '../../../assets/image/cloudflare5.png';

export const Domain = ({ store }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showGuideModal, setShowGuideModal] = useState(false);
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
                                onClick={() => setShowGuideModal(true)}
                            >
                                How to set up your domain?
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

            <Modal
                size="xl"
                className="setting__domain__setup"
                centered
                show={showGuideModal}
                onHide={() => setShowGuideModal(false)}
            >
                <Modal.Header closeButton>
                    <div className="text-title-1">Setting up your domain</div>
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
                        Setting up your domain
                    </div>
                    <img
                        className="setting__domain__setup__img"
                        src={cloudflare1}
                    />

                    <div className="text-normal-1">
                        1. Create your new site in CloudFlare and and your custom domain's name. Eg Example.com, after that, just hit Next to move to Step 2 in cloudFlare Configuration.
                    </div>

                    <div className="text-normal-1">
                        2. Go to your hosting server website like NameCheap or Godaddy. Go to DNS setting and change Name Server to the provided Name Server from CloudFlare.
                    </div>

                    <img
                        className="setting__domain__setup__img"
                        src={cloudflare2}
                    />

                    <div className="text-normal-1">
                        3. Finish it and wait for around 10 to 20 minutes for your site to successfully registered.
                        You can check it by clicking <b>“Review Setting”</b> Button or untils A popup shows up.
                    </div>
                    <img
                        className="setting__domain__setup__img"
                        src={cloudflare3}
                    />

                    <div className="text-normal-1">
                        4. Go to CloudFlare DNS setting, which is located on the left side menu
                    </div>
                    <img
                        className="setting__domain__setup__img"
                        src={cloudflare4}
                    />

                    <div className="text-normal-1">
                        5. Create 2 news Records which contain these following information
                    </div>
                    <div className="text-normal-1">
                        A Type, Set <b>Name</b> for your <b className="b-green">Domain name</b> and content is <b className="b-green">104.21.9.169</b>, which is EasyMall IP number configuration
                    </div>
                    <div className="text-normal-1">
                        CNAME type, Set <b>Name</b> your <b className="b-green">www</b>,  content is your shop's easymall URL. which is <b className="b-green">“Your-Shop.myeasymall.site”</b>, also, set <b>proxy status</b> to <b className="b-green">DNS only</b>
                    </div>
                    <img
                        className="setting__domain__setup__img"
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