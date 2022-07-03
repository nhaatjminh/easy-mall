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
import { doChangeStatus, doRemoveStatus, doDeleteStatus, doRestoreStatus } from "../../../redux/slice/orderSlice";
import BaseModal from "../../common/BaseModal";
import Swal from "sweetalert2";

const FollowOrder = ({mode, oldForm, returnAfterAdd})=> { // mode add or update
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [note, setNote] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [callFunction, setCallFunction] = useState(null);
    const params = useParams();
    const handleCallChangeStatus = () => {
        setOpenModal(true);
        setCallFunction('ChangeStatus');
    }
    const handleChangeStatus = () => {
        setIsLoading(true);
        dispatch(doChangeStatus({
            orderId: oldForm.order.id,
            params: {
                status: oldForm.status?.[0].status,
                store_id: oldForm.order.store_id,
                note: note
            }
          })).then(() => {
              returnAfterAdd();
              setIsLoading(false);
          });
    }
    const handleCallDeleteStatus = () => {
        setOpenModal(true);
        setCallFunction('DeleteStatus');
    }
    const handleDeleteStatus = () => {
        setIsLoading(true);
        dispatch(doDeleteStatus({
            orderId: oldForm.order.id,
            params: {
                status: oldForm.status?.[0].status,
                store_id: oldForm.order.store_id,
                note: note
            }
          })).then(() => {
              returnAfterAdd();
              setIsLoading(false);
          });
    }
    const handleCallRestoreStatus = () => {
        setOpenModal(true);
        setCallFunction('RestoreStatus');
    }
    const handleRestoreStatus = () => {
        setIsLoading(true);
        dispatch(doRestoreStatus({
            orderId: oldForm.order.id,
            params: {
                status: oldForm.status?.[0].status,
                store_id: oldForm.order.store_id,
                note: note
            }
          })).then(() => {
              returnAfterAdd();
              setIsLoading(false);
          });
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
                    orderId: oldForm.order.id,
                    params: {
                        store_id: oldForm.order.store_id
                    }
                })).then(() => {
                    returnAfterAdd();
                    setIsLoading(false);
                });
            }
        })
    }
    const renderFormButton = () => {
        let curStatus = oldForm.status?.[0].status;
        if (curStatus === 'COMPLETED') {
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
        } else if (curStatus === 'RESTOCK') {
            return (<div className="mt-4 mb-4 row form-group-button">
                <div className="col-6">
                    <button type='button' onClick={() => handleCallDeleteStatus()}  style={{width: 'auto'}} className="float-left btn btn-collection btn-light btn-form-product btn-delete-product">Delete</button>
                </div>
                <div className="col-6">
                    <button type='button' onClick={() => handleCallChangeStatus()} style={{width: 'auto'}} className="float-right btn btn-collection btn-success btn-form-product">Refill</button>
                </div>
            </div> )
        } else {
            return (<div className="mt-4 mb-4 row form-group-button">
                <div className="col-6">
                    <button type='button' onClick={() => handleCallDeleteStatus()}  style={{width: 'auto'}} className="float-left btn btn-collection btn-light btn-form-product btn-delete-product">Delete</button>
                </div>
                <div className="col-6">
                    <button type='button' onClick={() => handleCallChangeStatus()} style={{width: 'auto'}} className="float-right btn btn-collection btn-success btn-form-product">Change Status</button>
                </div>
            </div> )
        }
    }
    const handleChangeNote = (e) => {
        setNote(e.target.value);
    }
    const handleOK = () => {
        if (callFunction === 'ChangeStatus') {
            handleChangeStatus()
        } else if (callFunction === 'DeleteStatus') {
            handleDeleteStatus()
        } else if (callFunction === 'RestoreStatus') {
            handleRestoreStatus()
        }
    }
    return (
        <>
            <form>
                <div className="row  text-black">  
                        <div className="offset-1 offset-sm-1 col-11 col-sm-11 col-md-7 col-lg-7 col-xl-7">   
                            <Paper elevation={5} style={{padding: '1rem 2rem', minHeight: 150}}>
                                <InputLabel name='title' className="text-header" style={{margin: 0}}>Products</InputLabel>
                                {
                                    Object.keys(oldForm.products || {}).length ?
                                    <div style={{ overflowX: 'auto'}}>
                                        <div className="header-table-list-product" style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between'}}>
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
                                        
                                        {oldForm.products.map((product) => 
                                            (
                                                <ItemFollow  thumbnail={product.thumbnail} name={product?.variant_name ?? ''} quantity={product?.quantity} variant_id={product?.variant_id}  parentName={product.product_name} product_id={product.product_id} productCurrency={product.currency} price={product.price}></ItemFollow>
                                            )
                                        )}
                                    </div>
                                    : <></>
                                }
                            </Paper> 
                            <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem', maxHeight: 500, overflowY: 'auto'}}>
                                <InputLabel name='title' className="text-header" style={{margin: 0}}>Timeline</InputLabel>
                                <TimeLine listStatus={oldForm.status}></TimeLine>
                            </Paper>
                        </div>   
                        <div className="offset-1 offset-sm-1 offset-md-0 offset-lg-0 offset-xl-0 col-11 col-sm-11 col-md-4 col-lg-4 col-xl-4">                      
                            <Paper elevation={5}  style={{padding: '1rem 2rem'}}>
                                <InputLabel name='title' className="text-header" style={{margin: 0}}>Customer</InputLabel>
                                <div className="pt-3 row">
                                    <div className="col-4">
                                        <InputLabel name='title' className="text-label" style={{margin: 0}}>Name</InputLabel>
                                    </div>
                                    <div className="col-8">
                                        <InputLabel name='title' className="text-label" style={{margin: 0}}>{oldForm?.order?.name}</InputLabel>
                                    </div>
                                </div>
                                <div className="pt-3 row">
                                    <div className="col-4">
                                        <InputLabel name='title' className="text-label" style={{margin: 0}}>Email</InputLabel>
                                    </div>
                                    <div className="col-8">
                                        <InputLabel name='title' className="text-label" style={{margin: 0}}>{oldForm?.order?.email}</InputLabel>
                                    </div>
                                </div>
                                <div className="pt-3 row">
                                    <div className="col-4">
                                        <InputLabel name='title' className="text-label" style={{margin: 0}}>Phone</InputLabel>
                                    </div>
                                    <div className="col-8">
                                        <InputLabel name='title' className="text-label" style={{margin: 0}}>{oldForm?.order?.phone}</InputLabel>
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
                                        <InputLabel name='title' className="text-label" style={{margin: 0}}>{oldForm?.order?.city}</InputLabel>
                                    </div>
                                </div>
                                <div className="pt-3 row">
                                    <div className="col-4">
                                        <InputLabel name='title' className="text-label" style={{margin: 0}}>District</InputLabel>
                                    </div>
                                    <div className="col-8">
                                        <InputLabel name='title' className="text-label" style={{margin: 0}}>{oldForm?.order?.district}</InputLabel>
                                    </div>
                                </div>
                                <div className="pt-3 row">
                                    <div className="col-4">
                                        <InputLabel name='title' className="text-label" style={{margin: 0}}>Address</InputLabel>
                                    </div>
                                    <div className="col-8">
                                        <InputLabel name='title' className="text-label" style={{margin: 0}}>{oldForm?.order?.address}</InputLabel>
                                    </div>
                                </div>
                            </Paper> 
                            <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                                <InputLabel name='title' className="text-header" style={{margin: 0}}>Payment</InputLabel>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Currency</InputLabel>
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>{oldForm?.order?.currency ?? ''}</InputLabel>
                                    
                                </div>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Subtotal</InputLabel>
                                    <InputLabel name='title' className="text-content" style={{margin: 0}}>{oldForm?.order?.currency === 'USD' ? parseLocaleNumber(oldForm?.order?.original_price,'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(oldForm?.order?.original_price,'vi-VN')} {oldForm?.order?.currency}</InputLabel>
                                </div>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <InputLabel name='title' className="text-content" style={{margin: 0}}>Discount</InputLabel>
                                
                                    <InputLabel name='title' className="text-content" style={{margin: 0}}>{oldForm?.order?.currency === 'USD' ? parseLocaleNumber(oldForm?.order?.discount_price,'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(oldForm?.order?.discount_price,'vi-VN')} {oldForm?.order?.currency}</InputLabel>
                                </div>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Total</InputLabel>
                                    <InputLabel name='title' className="text-content" style={{margin: 0}}>
                                    {oldForm?.order?.currency === 'USD' ? parseLocaleNumber(Number(oldForm?.order?.original_price) - Number(oldForm?.order?.discount_price),'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(Number(oldForm?.order?.original_price) - Number(oldForm?.order?.discount_price),'vi-VN')} {oldForm?.order?.currency}
                                    </InputLabel>
                                </div>
                            </Paper>
                            <Paper elevation={5}  style={{padding: '1rem 2rem', marginTop: "2rem"}}>
                                <InputLabel name='title' className="text-header" style={{margin: 0}}>Method</InputLabel>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Payment</InputLabel>
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>{oldForm.order.payment_method === 0 ? `COD` : `PayPal`}</InputLabel>
                                     
                                </div>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Shipping</InputLabel>
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>{oldForm.order.shipping_method === 0 ? `Tieu chuan` : `gi gi do`}</InputLabel>
                                    
                                </div>
                            </Paper>
                        </div>    
                </div>
                <Divider className="custom-devider" style={{marginTop: 15}} />
                {renderFormButton()}
            </form>
            
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