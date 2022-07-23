import React, {useState, useEffect, useRef, Fragment } from "react";
import { useParams } from 'react-router-dom';
import {
    Paper,
    TextField,
    InputLabel,
    Select,
    FormHelperText,
    MenuItem,
    TextareaAutosize
} from '@mui/material';
import './index.css'
import Divider from '@mui/material/Divider';
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { doGetCity, doGetDistrict } from '../../../redux/slice/dataSlice'
import { doCreateOrder } from "../../../redux/slice/orderSlice";

import validator from "validator";
import { LoadingModal } from "../../common/LoadingModal/LoadingModal";
import ManageProductOrder from "./ManageProductOrder";

const FormOrder = ({mode, oldForm, returnAfterAdd, setIsEdit, WIDTH_ITEM_ORDER})=> { // mode add or update
    const dispatch = useDispatch();
    let form = useRef({});
    const { handleSubmit, reset, control, resetField } = useForm();
    const [listCity, setListCity] = useState([]);
    const [selectCity, setSelectCity] = useState('');
    const [listDistrict, setListDistrict] = useState([]);
    const [selectDistrict, setSelectDistrict] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [discountCode, setDiscountCode] = useState('');
    const [listDiscount, setListDiscount] = useState([]);
    const params = useParams();

    const handleChangeUserName = (event) => {
        form.current = {
            ...form.current,
            order: {
                ...form.current.order,
                name: event.target.value
            }
        }
    }
    const handleChangeUserEmail = (event) => {
        form.current = {
            ...form.current,
            order: {
                ...form.current.order,
                email: event.target.value
            }
        }
    }
    
    const handleChangeAdressCity = (event) => {
        let selectCity = listCity.find((city) => city.id === event.target.value)
        form.current = {
            ...form.current,
            order: {
                ...form.current.order,
                city: selectCity.name
            }
        }
        setSelectCity(event.target.value);
        dispatch(doGetDistrict( event.target.value)).then((result) => {
            setListDistrict(result.payload);
            resetField('Address-District')
        });  
    }
    const handleChangeAdressDistrict = (event) => {
        let selectDistrict = listDistrict.find((district) => district.id === event.target.value)
        form.current = {
            ...form.current,
            order: {
                ...form.current.order,
                district: selectDistrict.name
            }
        }
        setSelectDistrict(event.target.value);
    }
    const handleChangeAdress = (event) => {
        form.current = {
            ...form.current,
            order: {
                ...form.current.order,
                address: event.target.value
            }
        }
    }
    
    const handleChangePhoneNumber = (event) => {
        form.current = {
            ...form.current,
            order: {
                ...form.current.order,
                phone: event.target.value
            }
        }
    }
    const saveOrder = () => {
        setIsLoading(true);
        
        const selectDiscount = listDiscount.find(discount => discount.code === discountCode);
        if (selectDiscount) form.current.order.discount_id = selectDiscount.id;
        if (form.current.products) {
            form.current.products?.map((product) => {
                delete product.total_to_show;
                return product
            })
            form.current.products = form.current.products?.filter(product => product.quantity > 0);
        } else {
            form.current.products = [];
        }
        const createObj = {
            storeId: params.storeId,
            orderObj: form.current
        }
        dispatch(doCreateOrder(createObj))
        .then((res) => {
            setIsLoading(false);
            if (res.payload.id) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Create successful Order!',
                }).then((result) => {
                    setIsEdit(false);
                    returnAfterAdd();
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Can not create this order. Please check again!',
                }).then((result) => {
                })
            }
        });
        
    };
    useEffect(() => {
        dispatch(doGetCity()).then((result) => {
            setListCity(result.payload);
        });  
             
    }, [])
    useEffect(() => {
        if (mode) {
            if (oldForm && mode === 'EDIT') {
                form.current = oldForm;
            }
            else {
                form.current = {}
                form.current = {
                    order: {
                        store_id: params.storeId,
                        currency: 'VND',
                        shipping_method: 0,
                        payment_method: 0
                    }
                }
            }
        }

    }, [oldForm, mode, params.storeId])
    return (
        <>
            <form>
                <div className="row  text-black">  
                        <ManageProductOrder key='manage-product-order' formRef={form} WIDTH_ITEM_ORDER={WIDTH_ITEM_ORDER} listDiscount={listDiscount} setListDiscount={setListDiscount} setDiscountCode={setDiscountCode} discountCode={discountCode}></ManageProductOrder> 
                        <div className="pt-md offset-1 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1 col-11 col-sm-11 col-md-4 col-lg-4 col-xl-4">                      
                            <Paper elevation={5}  style={{padding: '1rem 2rem'}}>
                                <InputLabel name='title' className="text-header" style={{margin: 0}}>Customer</InputLabel>
                                
                                <InputLabel style={{ marginTop: "1rem"}} className="text-label">Name</InputLabel>
                                <Controller
                                    name={"Customer-UserName"}
                                    control={control}
                                    defaultValue={form.current?.order?.name}
                                    rules={{ required: { value: true, message: 'You need enter name to create Order'}}}
                                    render={({ field: { onChange, value }, fieldState: {error} }) => (
                                        <>
                                            <TextField
                                                className="text-field-input text-content"
                                                onChange={(e) => {
                                                    onChange(e);
                                                    handleChangeUserName(e);
                                                }}
                                                value={value}
                                                fullWidth
                                                error={!!error}
                                                helperText={error?.message}
                                                FormHelperTextProps={{
                                                    className: 'error-text'
                                                }} />
                                        </>
                                    )}
                                />
                                <InputLabel style={{marginTop: "1rem"}} className="text-label">Email</InputLabel>
                                <Controller
                                    name={"Customer-Email"}
                                    control={control}
                                    defaultValue={form.current?.order?.email}
                                    rules={{ 
                                        required: { value: true, message: 'You need enter email to create Order'},
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid Email Address"
                                        }
                                    }}
                                    render={({ field: { onChange, value }, fieldState: {error} }) => (
                                        <>
                                            <TextField
                                                className="text-field-input text-content"
                                                onChange={(e) => {
                                                    onChange(e);
                                                    handleChangeUserEmail(e);
                                                }}
                                                value={value}
                                                fullWidth
                                                error={!!error}
                                                helperText={error?.message}
                                                FormHelperTextProps={{
                                                    className: 'error-text'
                                                }} />
                                        </>
                                    )}
                                />
                                <InputLabel style={{marginTop: "1rem"}} className="text-label">Phone</InputLabel>
                                <Controller
                                    name={"Customer-Phone"}
                                    control={control}
                                    defaultValue={form.current?.order?.phone}
                                    rules={{ 
                                        required: { value: true, message: 'You need enter phone to create Order'},
                                        validate: (value) => validator.isMobilePhone(value) || 'Invalid Phone Number'
                                    }}
                                    render={({ field: { onChange, value }, fieldState: {error} }) => (
                                        <>
                                            <TextField
                                                className="text-field-input text-content"
                                                onChange={(e) => {
                                                    onChange(e);
                                                    handleChangePhoneNumber(e);
                                                }}
                                                type='tel'
                                                value={value}
                                                fullWidth
                                                error={!!error}
                                                helperText={error?.message}
                                                FormHelperTextProps={{
                                                    className: 'error-text'
                                                }} />
                                        </>
                                    )}
                                />
                            </Paper> 
                            <Paper elevation={5}  style={{padding: '1rem 2rem', marginTop: "2rem"}}>
                            <InputLabel name='title' className="text-header" style={{margin: 0}}>Address</InputLabel>
                                
                                <InputLabel style={{ marginTop: "1rem"}} className="text-label">City</InputLabel>
                                <Controller
                                    name={"Address-City"}
                                    control={control}
                                    rules={{ required: { value: true, message: 'You need select city to create Order'}}}
                                    render={({ field: { onChange, value }, fieldState: {error} }) => (
                                        <>
                                            <Select
                                                className="text-field-input text-content select-height"
                                                onChange={(e) => {
                                                    onChange(e);
                                                    handleChangeAdressCity(e);
                                                }}
                                                fullWidth
                                                error={!!error}
                                                value={value || ''}>
                                                    {listCity?.map((city) => (
                                                        <MenuItem key={city.id} value={city.id}>
                                                            {city.name}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                            {!!error && <FormHelperText className='error-text text-content'>You need select city to create Order</FormHelperText>}
                                        </>
                                    )}
                                />
                                <InputLabel style={{marginTop: "1rem"}} className="text-label">District</InputLabel>
                                <Controller
                                    name={"Address-District"}
                                    control={control}
                                    rules={{ required: { value: true, message: 'You need select city to create Order'}}}
                                    render={({ field: { onChange, value }, fieldState: {error} }) => (
                                        <>
                                            <Select
                                                MenuProps={{
                                                    anchorOrigin: {
                                                        vertical: "top",
                                                        horizontal: "left"
                                                    },
                                                    transformOrigin: {
                                                        vertical: "bottom",
                                                        horizontal: "left"
                                                    },
                                                    getContentAnchorEl: null,
                                                    style: {maxHeight: 300}
                                                }}
                                                
                                                className="text-field-input text-content select-height"
                                                onChange={(e) => {
                                                    onChange(e);
                                                    handleChangeAdressDistrict(e);
                                                }}
                                                disabled={!!!selectCity}
                                                fullWidth
                                                error={!!error}
                                                value={value || ''}>
                                                    {listDistrict?.map((district) => (
                                                        <MenuItem key={district.id} value={district.id}>
                                                            {district.name}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                            {!!error && <FormHelperText className='error-text text-content'>You need select district to create Order</FormHelperText>}
                                        </>
                                    )}
                                />
                                <InputLabel style={{marginTop: "1rem"}} className="text-label">Address</InputLabel>
                                <Controller
                                    name={"Address-Address"}
                                    control={control}
                                    rules={{ required: { value: true, message: 'You need enter address to create Order'}}}
                                    render={({ field: { onChange, value }, fieldState: {error} }) => (
                                        <>
                                            <TextareaAutosize
                                                aria-label="empty textarea"
                                                minRows={5}
                                                maxLength={255}
                                                maxRows={5}
                                                draggable={false}
                                                style={{width: '100%', resize: 'none'}}
                                                onChange={(e) => {
                                                    onChange(e);
                                                    handleChangeAdress(e);
                                                }} 
                                                className="text-field-input text-content"
                                                
                                                value={value}
                                                disabled={!!!selectDistrict}
                                            />    
                                            {!!error && <FormHelperText className='error-text text-content'>You need enter address to create Order</FormHelperText>}
                                       
                                            
                                        </>
                                    )}
                                />
                            </Paper> 
                        </div>    
                </div>
                <Divider className="custom-devider" style={{marginTop: 15}} />
                <div className="mt-4 mb-4 row form-group-button" style={{overflowX: 'hidden'}}>
                    <div className="col-6">
                        {
                            mode === "EDIT" ?
                            <button  style={{width: 'auto'}} className="float-left btn btn-collection btn-light btn-form-product btn-delete-product">Delete</button>
                            : ""
                        }
                    </div>
                    <div className="col-6">
                        <button onClick={handleSubmit(saveOrder)}  style={{width: 'auto'}} className="float-right btn btn-collection btn-success btn-form-product">Save</button>
                
                    </div>
                </div>  
            </form>
            
            <LoadingModal show={isLoading} />
        </>
    );
}

export default FormOrder;