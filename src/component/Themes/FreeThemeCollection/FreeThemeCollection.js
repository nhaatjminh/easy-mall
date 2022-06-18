import React, { useEffect } from "react";
import { Loader } from '../../common/Loader/Loader';
import defaultThemeImg from '../../../assets/image/temp.png';
import { Button, Modal, Card } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import './FreeThemeCollection.scss'
import { useDispatch, useSelector } from "react-redux";
import { doGetFreeTemplates } from './../../../redux/slice/themeSlice';
import { FreeThemeCard } from "./FreeThemeCard";

export const FreeThemeCollection = ({ show, setShow, title, storeId }) => {

    const listFreeTheme = useSelector((state) => state.theme.freeTemplates)
    const isLoading = useSelector((state) => state.theme.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        if (listFreeTheme.length === 0 && show) {
            dispatch(doGetFreeTemplates(storeId))
        }
        // return () => {
        //     console.log('unmouted')
        // }
    }, [show])

    return (
        <Modal
            className='theme-collection'
            centered
            size="xl"
            show={show}
            onHide={setShow}
        >
            <Modal.Header closeButton>
                <div className="text-title-1">{title}</div>
            </Modal.Header>
            <Modal.Body className="theme-collection__body">
                {isLoading ?
                    <Loader className='theme-collection__loader' /> :
                    <Row className="theme-collection__list-theme">
                        {listFreeTheme?.map((item, index) =>
                        <FreeThemeCard 
                            key={item.id}
                            item={item} 
                            storeId={storeId} 
                        />
                        )}
                    </Row>
                }
            </Modal.Body>
            <Modal.Footer>
                <div className="">
                    <Button
                        className="btn btn-secondary"
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}