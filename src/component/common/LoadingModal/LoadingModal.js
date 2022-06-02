import { React } from 'react';
import { Modal } from 'react-bootstrap';
import './LoadingModal.scss'
import { Loader } from './../Loader/Loader';

export const LoadingModal = ({ show }) => {

    return (
        <Modal centered className='loading-modal' show={show} backdrop='none'>
            <Loader />
        </Modal>
    )
}