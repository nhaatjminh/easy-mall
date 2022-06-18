import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import './StoreThemeCollection.scss'
import { useDispatch, useSelector } from "react-redux";
import { doGetStoreTemplates, doUseTemplate } from '../../../redux/slice/themeSlice';
import { StoreThemeDetail } from "./StoreThemeDetail";
import { BackIcon } from './../../../assets/icon/svg/BackIcon';
import { ListStoreTheme } from './ListStoreTheme';
import Swal from "sweetalert2";
import { Loader } from "../../common/Loader/Loader";
import { LoadingModal } from "../../common/LoadingModal/LoadingModal";

export const StoreThemeCollection = ({ show, setShow, title, storeId }) => {

    const listStoreTheme = useSelector((state) => state.theme.storeTemplates)
    const isLoading = useSelector((state) => state.theme.isLoading)
    const dispatch = useDispatch()
    const [themeDetail, setThemeDetail] = useState(null);

    useEffect(() => {
        if (listStoreTheme?.length === 0 && show) {
            dispatch(doGetStoreTemplates(storeId))
        }
        // return () => {
        //     console.log('unmouted')
        // }
    }, [show])

    const handleUseTheme = () => {
        const templateObj = {
            template: themeDetail,
            user_id: localStorage.getItem('userId'),
            store_id: storeId
        }
        dispatch(doUseTemplate(templateObj))
        .then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Use theme successfully!',
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oop...',
                    text: 'Something went wrong, please try again later!',
                })
            }
        })
    }

    return (
        <Modal
            className='store-theme-collection'
            centered
            size="xl"
            show={show}
            onHide={setShow}
        >
            <Modal.Header closeButton>
                {themeDetail ?
                    <div className="">
                        <span
                            style={{ cursor: 'pointer', marginRight: '15px' }}
                            onClick={() => setThemeDetail(null)}
                        >
                            <BackIcon />
                        </span>
                        <span className="text-title-1">{themeDetail.name}</span>
                    </div>
                    :
                    <div className="text-title-1">{title}</div>
                }

            </Modal.Header>
            <Modal.Body className="store-theme-collection__body">
                {themeDetail ?
                    <StoreThemeDetail theme={themeDetail} />
                    :
                    <ListStoreTheme
                        listTheme={listStoreTheme}
                        isLoading={isLoading}
                        setThemeDetail={setThemeDetail}
                        
                    />
                }
            </Modal.Body>
            <Modal.Footer>
                {themeDetail ?
                    <>
                        <span>
                            <Button
                                className="btn btn-secondary"
                                onClick={() => setThemeDetail(null)}
                            >
                                Back
                            </Button>
                        </span>
                        <span>
                            <Button
                                className="btn btn-success"
                                onClick={handleUseTheme}
                            >   
                                {isLoading ? <Loader className="store-theme-collection__loader" /> : null}
                                Use theme
                            </Button>
                        </span>
                    </>
                    :
                    <Button
                        className="btn btn-secondary"
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </Button>
                }

            </Modal.Footer>
        </Modal>
    )
}