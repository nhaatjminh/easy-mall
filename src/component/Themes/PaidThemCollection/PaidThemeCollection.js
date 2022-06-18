import React, { useEffect, useState } from "react";
import { Loader } from '../../common/Loader/Loader';
import { Button, Modal } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import './PaidThemeCollection.scss'
import { useDispatch, useSelector } from "react-redux";
import { doGetPaidTemplates } from '../../../redux/slice/themeSlice';
import { PaidThemCard } from "./PaidThemCard";
import { LoadingModal } from "../../common/LoadingModal/LoadingModal";

export const PaidThemeCollection = ({ show, setShow, title, storeId }) => {

    const listPaidTheme = useSelector((state) => state.theme.paidTemplates)
    const isLoading = useSelector((state) => state.theme.isLoading)
    const dispatch = useDispatch()
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        if (listPaidTheme.length === 0 && show) {
            dispatch(doGetPaidTemplates(storeId))
        }
    }, [show])

    return (
        <Modal
            className='paid-theme-collection'
            centered
            size="xl"
            show={show}
            onHide={setShow}
        >
            <Modal.Header closeButton>
                <div className="text-title-1">{title}</div>
            </Modal.Header>
            <Modal.Body className="paid-theme-collection__body">
                {isLoading ?
                    <Loader className='paid-theme-collection__loader' /> :
                    <Row className="paid-theme-collection__list-theme">
                        {listPaidTheme?.map((item, index) =>
                            <PaidThemCard
                                key={item.id}
                                item={item}
                                storeId={storeId}
                                setIsProcessing={setIsProcessing}
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
            
            <LoadingModal show={isProcessing} />
        </Modal>
    )
}