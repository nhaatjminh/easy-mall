import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import './ThemeCollection.scss'
import { useDispatch, useSelector } from "react-redux";
import { doBuyTemplate, doGetFreeTemplates, doGetPaidTemplates, doGetStoreTemplates, doUseTemplate } from '../../../redux/slice/themeSlice';
import { ThemeDetail } from "./ThemeDetail";
import { BackIcon } from '../../../assets/icon/svg/BackIcon';
import { ListTheme } from './ListTheme';
import Swal from "sweetalert2";
import { Loader } from "../../common/Loader/Loader";

export const ThemeCollection = ({ show, setShow, title, storeId, type }) => {

    const listStoreTheme = useSelector((state) => state.theme.storeTemplates)
    const listFreeTheme = useSelector((state) => state.theme.freeTemplates)
    const listPaidTheme = useSelector((state) => state.theme.paidTemplates)
    const isLoading = useSelector((state) => state.theme.isLoading)
    const dispatch = useDispatch()
    const [themeDetail, setThemeDetail] = useState(null);

    useEffect(() => {
        if (!show) setThemeDetail(null)

        if (type === "STORE") {
            if (listStoreTheme?.length === 0 && show) {
                dispatch(doGetStoreTemplates(storeId))
            }
        }
        else if (type === "FREE") {
            if (listFreeTheme?.length === 0 && show) {
                dispatch(doGetFreeTemplates(storeId))
            }
        }
        else if (type === "PAID") {
            if (listPaidTheme?.length === 0 && show) {
                dispatch(doGetPaidTemplates(storeId))
            }
        }
        // return () => {
        //     console.log('unmouted')
        // }
    }, [show])

    const handleUseTheme = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Do you want to use this theme?',
            confirmButtonText: 'Yes',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
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
                            setShow(false)
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
        })
    }

    const handleBuyTheme = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Do you want to buy this theme?',
            confirmButtonText: 'Yes',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const templateObj = {
                    template: themeDetail,
                    user_id: localStorage.getItem('userId'),
                    store_id: storeId
                }
                dispatch(doBuyTemplate(templateObj))
                    .then((res) => {
                        if (!res.payload.message) {
                            setThemeDetail({
                                ...themeDetail,
                                owned: true
                            })
                            Swal.fire({
                                icon: 'success',
                                title: 'Success!',
                                text: 'Buy theme successfully!',
                            })
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oop...',
                                text: res.payload.message,
                            })
                        }
                    })
            }
        })


    }

    const BtnUseTheme = () => {
        return (
            <Button
                className="btn btn-success"
                onClick={handleUseTheme}
                disabled={isLoading}
            >
                {isLoading ? <Loader className="theme-collection__loader" /> : null}
                Use theme
            </Button>
        )
    }

    const BtnBuyTheme = () => {
        return (
            <Button
                className="btn btn-success"
                onClick={handleBuyTheme}
            >
                {isLoading ? <Loader className="theme-collection__loader" /> : null}
                Buy theme
            </Button>
        )
    }

    // const StoreThemeFooter = () => {
    //     return (
    //         <>
    //             <span>
    //                 <Button
    //                     className="btn btn-secondary"
    //                     onClick={() => setThemeDetail(null)}
    //                 >
    //                     Back
    //                 </Button>
    //             </span>
    //             <span>
    //                 <Button
    //                     className="btn btn-success"
    //                     onClick={handleUseTheme}
    //                 >
    //                     {isLoading ? <Loader className="theme-collection__loader" /> : null}
    //                     Use theme
    //                 </Button>
    //             </span>
    //         </>
    //     )
    // }

    // const PaidThemeFooter = () => {
    //     return (
    //         <>
    //             <span>
    //                 <Button
    //                     className="btn btn-secondary"
    //                     onClick={() => setThemeDetail(null)}
    //                 >
    //                     Back
    //                 </Button>
    //             </span>
    //             <span>
    //                 {themeDetail.onwed ?
    //                     <Button
    //                         className="btn btn-success"
    //                         onClick={handleUseTheme}
    //                     >
    //                         {isLoading ? <Loader className="theme-collection__loader" /> : null}
    //                         Use theme
    //                     </Button>
    //                     : null }

    //             </span>
    //         </>
    //     )
    // }

    return (
        <Modal
            className='theme-collection'
            centered
            size="xl"
            show={show}
            onHide={() => {
                if (!isLoading) setShow(false)
            }}
        >
            <Modal.Header closeButton>
                {themeDetail ?
                    <div className="">
                        <span
                            style={{ cursor: 'pointer', marginRight: '15px' }}
                            onClick={() => {if (!isLoading) setThemeDetail(null)}}
                        >
                            <BackIcon />
                        </span>
                        <span className="text-title-1">{themeDetail.name}</span>
                    </div>
                    :
                    <div className="text-title-1">{title}</div>
                }

            </Modal.Header>
            <Modal.Body className="theme-collection__body">
                {themeDetail ?
                    <ThemeDetail theme={themeDetail} />
                    :
                    <ListTheme
                        listTheme={type === "STORE" ? listStoreTheme
                            : type === "PAID" ? listPaidTheme
                                : listFreeTheme}
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
                                disabled={isLoading}
                            >
                                Back
                            </Button>
                        </span>
                        <span>
                            {(themeDetail.owned || type === "STORE") ? BtnUseTheme() : BtnBuyTheme()}
                        </span>
                    </>
                    :
                    <Button
                        className="btn btn-secondary"
                        onClick={() => setShow(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                }

            </Modal.Footer>
        </Modal>
    )
}