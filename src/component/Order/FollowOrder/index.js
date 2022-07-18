import React, {useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import {
    Paper,
    InputLabel,
    TextareaAutosize,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { useDispatch } from "react-redux";
import { LoadingModal } from "../../common/LoadingModal/LoadingModal";
import ItemFollow from "./ItemFollow";
import { parseLocaleNumber } from "../../../utils/parseLocaleNumber";
import TimeLine from "./TimeLine";
import { doChangeStatus, doRemoveStatus, doDeleteStatus, doRestoreStatus, doGetOneOrder } from "../../../redux/slice/orderSlice";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";
import { WIDTH_ITEM_ORDER } from "..";

const FollowOrder = ({mode, oldForm, returnAfterAdd})=> { // mode add or update
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [note, setNote] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [callFunction, setCallFunction] = useState(null);
    const [formToShow, setFormToShow] = useState(oldForm);
    const params = useParams();
    const handleCallChangeStatus = () => {
        setOpenModal(true);
        setCallFunction('ChangeStatus');
    }
    const handleChangeStatus = () => {
        dispatch(doChangeStatus({
            orderId: formToShow.order.id,
            params: {
                status: formToShow.status?.[0].status,
                store_id: formToShow.order.store_id,
                note: note
            }
          }))
    }
    const handleCallDeleteStatus = () => {
        setOpenModal(true);
        setCallFunction('DeleteStatus');
    }
    const handleDeleteStatus = () => {
        dispatch(doDeleteStatus({
            orderId: formToShow.order.id,
            params: {
                status: formToShow.status?.[0].status,
                store_id: formToShow.order.store_id,
                note: note
            }
          }))
    }
    const handleCallRestoreStatus = () => {
        setOpenModal(true);
        setCallFunction('RestoreStatus');
    }
    const handleRestoreStatus = () => {
        dispatch(doRestoreStatus({
            orderId: formToShow.order.id,
            params: {
                status: formToShow.status?.[0].status,
                store_id: formToShow.order.store_id,
                note: note
            }
          }))
    }
    const handleRemoveStatus = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                dispatch(doRemoveStatus({
                    orderId: formToShow.order.id,
                    params: {
                        store_id: formToShow.order.store_id
                    }
                })).then(() => { 
                    setIsLoading(false);
                    returnAfterAdd();
                })
            }
        })
    }
    const renderFormButton = () => {
        let curStatus = formToShow.status?.[0].status;
        if (curStatus === 'COMPLETED' || curStatus === 'PRE-PAID' || curStatus === 'PREPAID & RESTOCK') {
            return (
                <div className="mt-4 mb-4 row form-group-button">
                    <div className="col-6">
                        <button type='button' onClick={() => handleRemoveStatus()}  style={{width: 'auto'}} className="float-left btn btn-collection btn-light btn-form-product btn-delete-product">Remove</button>
                    </div>
                    <div className="col-6">
                    </div>
                </div>  
            )
        } else if (curStatus === 'DELETED') {
            return (<div className="mt-4 mb-4 row form-group-button">
                    <div className="col-6">
                        <button type='button' onClick={() => handleRemoveStatus()}  style={{width: 'auto'}} className="float-left btn btn-collection btn-light btn-form-product btn-delete-product">Remove</button>
                    </div>
                    <div className="col-6">
                        <button type='button' onClick={() => handleCallRestoreStatus()} style={{width: 'auto'}} className="float-right btn btn-collection btn-success btn-form-product">Restore</button>
                    </div>
                </div> )
        } else {
            return (<div className="mt-4 mb-4 row form-group-button">
                <div className="col-6">
                    <button type='button' onClick={() => handleCallDeleteStatus()}  style={{width: 'auto'}} className="float-left btn btn-collection btn-light btn-form-product btn-delete-product">Delete</button>
                </div>
                <div className="col-6">
                    <button type='button' onClick={() => handleCallChangeStatus()} style={{width: 'auto'}} className="float-right btn btn-collection btn-success btn-form-product">{curStatus === 'RESTOCK' || curStatus === 'PAID & RESTOCK' ? `Refill` : `Change Status`}</button>
                </div>
            </div> )
        }
    }
    const handleChangeNote = (e) => {
        setNote(e.target.value);
    }
    const handleOK = async () => {
        setIsLoading(true);
        if (callFunction === 'ChangeStatus') {
            await handleChangeStatus()
        } else if (callFunction === 'DeleteStatus') {
            await handleDeleteStatus()
        } else if (callFunction === 'RestoreStatus') {
            await handleRestoreStatus()
        }
        await dispatch((doGetOneOrder({id: formToShow.order.id, storeId: params.storeId})))
        .then((result) => {
            setFormToShow(result.payload);
            setOpenModal(false)
            setIsLoading(false);
            setNote('');
            window.scrollTo(0, 0); 
        })
    }
    return (
        <>
            <div className="row  text-black">  
                    <div className="offset-1 offset-sm-1 col-11 col-sm-11 col-md-7 col-lg-7 col-xl-7">   
                        <Paper elevation={5} style={{padding: '1rem 2rem', minHeight: 150}}>
                            <InputLabel name='title' className="text-header" style={{margin: 0}}>Products</InputLabel>
                            {
                                Object.keys(formToShow.products || {}).length ?
                                <div style={{ overflowX: 'auto'}}>
                                    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between', width: WIDTH_ITEM_ORDER}}>
                                        <div className="w-100"  style={{minWidth: 225}}>
                                            <span className='float-left pl-5'>Products</span>
                                        </div>
                                        <div  style={{width: 125, minWidth: 125}} className='pr-5'>
                                            Quantity
                                        </div>
                                        <div  style={{minWidth: 175}} className='pr-3'>
                                            Total
                                        </div>
                                    </div>
                                    <Divider style={{width: WIDTH_ITEM_ORDER}}/>
                                    {formToShow.products.map((product, index) => 
                                        (
                                            <ItemFollow key={`${index}-item-follow`} existed={product.existed}  thumbnail={product.thumbnail} name={product?.variant_name ?? ''} quantity={product?.quantity} variant_id={product?.variant_id}  parentName={product.product_name} product_id={product.product_id} productCurrency={product.currency} price={product.price}></ItemFollow>
                                        )
                                    )}
                                </div>
                                : <></>
                            }
                        </Paper> 
                        <Paper elevation={5} style={{padding: '1rem 1rem 1rem 2rem', marginTop: '2rem'}}>
                            <InputLabel name='title' className="text-header" style={{margin: 0}}>Timeline</InputLabel>
                            <div style={{overflowY: 'auto',  maxHeight: 500, padding: 0, margin: 0}}>
                                <TimeLine listStatus={formToShow.status}></TimeLine>
                            </div>
                        </Paper>
                    </div>   
                    <div className="pt-md offset-1 offset-sm-1 offset-md-0 offset-lg-0 offset-xl-0 col-11 col-sm-11 col-md-4 col-lg-4 col-xl-4">                      
                        <Paper elevation={5}  style={{padding: '1rem 2rem'}}>
                            <InputLabel name='title' className="text-header" style={{margin: 0}}>Customer</InputLabel>
                            <div className="pt-3 row">
                                <div className="col-4">
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Name</InputLabel>
                                </div>
                                <div className="col-8">
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>{formToShow?.order?.name}</InputLabel>
                                </div>
                            </div>
                            <div className="pt-3 row">
                                <div className="col-4">
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Email</InputLabel>
                                </div>
                                <div className="col-8">
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>{formToShow?.order?.email}</InputLabel>
                                </div>
                            </div>
                            <div className="pt-3 row">
                                <div className="col-4">
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Phone</InputLabel>
                                </div>
                                <div className="col-8">
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>{formToShow?.order?.phone}</InputLabel>
                                </div>
                            </div>
                        </Paper> 
                        <Paper elevation={5}  style={{padding: '1rem 2rem', marginTop: "2rem"}}>
                        <InputLabel name='title' className="text-header" style={{margin: 0}}>Address</InputLabel>
                            <div className="pt-3 row">
                                <div className="col-4">
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>City</InputLabel>
                                </div>
                                <div className="col-8">
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>{formToShow?.order?.city}</InputLabel>
                                </div>
                            </div>
                            <div className="pt-3 row">
                                <div className="col-4">
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>District</InputLabel>
                                </div>
                                <div className="col-8">
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>{formToShow?.order?.district}</InputLabel>
                                </div>
                            </div>
                            <div className="pt-3 row">
                                <div className="col-4">
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Address</InputLabel>
                                </div>
                                <div className="col-8">
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>{formToShow?.order?.address}</InputLabel>
                                </div>
                            </div>
                        </Paper> 
                        <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                            <InputLabel name='title' className="text-header" style={{margin: 0}}>Payment</InputLabel>
                            <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                
                                <InputLabel name='title' className="text-label" style={{margin: 0}}>Currency</InputLabel>
                                <InputLabel name='title' className="text-label" style={{margin: 0}}>{formToShow?.order?.currency ?? ''}</InputLabel>
                                
                            </div>
                            <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                
                                <InputLabel name='title' className="text-label" style={{margin: 0}}>Subtotal</InputLabel>
                                <InputLabel name='title' className="text-content" style={{margin: 0}}>{formToShow?.order?.currency === 'USD' ? parseLocaleNumber(formToShow?.order?.original_price,'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(formToShow?.order?.original_price,'vi-VN')} {formToShow?.order?.currency}</InputLabel>
                            </div>
                            <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <InputLabel name='title' className="text-content" style={{margin: 0}}>Discount</InputLabel>
                            
                                <InputLabel name='title' className="text-content" style={{margin: 0}}>{formToShow?.order?.currency === 'USD' ? parseLocaleNumber(formToShow?.order?.discount_price,'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(formToShow?.order?.discount_price,'vi-VN')} {formToShow?.order?.currency}</InputLabel>
                            </div>
                            <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <InputLabel name='title' className="text-label" style={{margin: 0}}>Total</InputLabel>
                                <InputLabel name='title' className="text-content" style={{margin: 0}}>
                                {formToShow?.order?.currency === 'USD' ? parseLocaleNumber(Number(formToShow?.order?.original_price) - Number(formToShow?.order?.discount_price),'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(Number(formToShow?.order?.original_price) - Number(formToShow?.order?.discount_price),'vi-VN')} {formToShow?.order?.currency}
                                </InputLabel>
                            </div>
                        </Paper>
                        <Paper elevation={5}  style={{padding: '1rem 2rem', marginTop: "2rem"}}>
                            <InputLabel name='title' className="text-header" style={{margin: 0}}>Method</InputLabel>
                            <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <InputLabel name='title' className="text-label" style={{margin: 0}}>Payment</InputLabel>
                                <InputLabel name='title' className="text-label" style={{margin: 0}}>{formToShow.order.payment_method === 0 ? `COD` : `PayPal`}</InputLabel>
                                    
                            </div>
                            <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <InputLabel name='title' className="text-label" style={{margin: 0}}>Shipping</InputLabel>
                                <InputLabel name='title' className="text-label" style={{margin: 0}}>{formToShow.order.shipping_method === 0 ? `Take it at store` : `Standard shipping`}</InputLabel>
                                
                            </div>
                        </Paper>
                    </div>    
            </div>
            <Divider className="custom-devider" style={{marginTop: 15}} />
            {renderFormButton()}
            <LoadingModal show={isLoading} />
            <BaseModal
                title="Note"
                boolOpen={openModal}
                setBoolOpen={(bool) => setOpenModal(bool)}
                showButton={false}
                showAction={true}
                onOK={() => handleOK()}
                classNameModal='style-modal'
                styleButton={{ width: 100 ,border: '1px solid #9fa3a7', borderRadius: 5, marginLeft: 10, height: 30, color: '#333', textTransform: 'none'}}>
                    <TextareaAutosize
                        aria-label="empty textarea"
                        minRows={3}
                        maxLength={255}
                        maxRows={3}
                        draggable={false}
                        style={{width: '500px', resize: 'none'}}
                        onChange={(e) => {
                            handleChangeNote(e);
                        }} 
                        className="text-field-input text-content"
                        
                    />   
            </BaseModal>
        </>
    );
}

export default FollowOrder;