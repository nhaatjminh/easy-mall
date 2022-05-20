import React from "react";
import { Button, Modal } from "react-bootstrap";
import './ConfirmModal.scss'

export const ConfirmModal = ({ show, setShow, title, content, onConfirm }) => {
    return (
        <Modal show={show} onHide={setShow}>
            <Modal.Header closeButton>
                <div className="text-title-1">{title}</div>
            </Modal.Header>
            <Modal.Body>
                <div className="text-normal-1">{content}</div>
            </Modal.Body>
            <Modal.Footer>
                <div className="confirm-modal__btn">
                    <Button
                        className="btn btn-secondary"
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="confirm-modal__btn--confirm btn btn-danger"
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}