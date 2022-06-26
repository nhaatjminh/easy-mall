import React, {useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import BaseModal from '../../common/BaseModal'
import {
    Paper,
    TextField,
    InputLabel,
    Select,
    FormHelperText,
    MenuItem,
    TextareaAutosize,
    FormControl
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { useDispatch } from "react-redux";
import { doGetListProductsOfStoresScopeFull } from "../../../redux/slice/productSlice";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { doGetCity, doGetDistrict, doGetRate } from '../../../redux/slice/dataSlice'
import { doCreateOrder } from "../../../redux/slice/orderSlice";
import { CustomSearchInput } from "../../common/CustomSearchInput/CustomSearchInput";
import BaseNestedList from "../../common/BaseNestedList";
import Item from "../FormOrder/Item";
import validator from "validator";
import { LoadingModal } from "../../common/LoadingModal/LoadingModal";

const FollowOrder = ({mode, oldForm, returnAfterAdd})=> { // mode add or update
    const dispatch = useDispatch();
    let form = useRef({});
    const { handleSubmit, reset, control, resetField } = useForm();
    const [listCity, setListCity] = useState([]);
    const [selectCity, setSelectCity] = useState('');
    const [listDistrict, setListDistrict] = useState([]);
    const [selectDistrict, setSelectDistrict] = useState('');
    const [listRate, setListRate] = useState([]);
    const [currency, setCurrency] = useState('USD');
    const [isLoading, setIsLoading] = useState(false);
    const [listProducts, setListProducts] = useState([]);
    
    const [listFilterProducts, setListFilterProducts] = useState([]);
    const [listValueProduct, setListValueProduct] = useState({})
    const [listValueVariant, setListValueVariant] = useState({})
    const [subTotal, setSubTotal] = useState(0);
    const [discountTotal, setDiscountTotal] = useState(0);
    const [total, setTotal] = useState(0);
    
    const [paymentMethod, setPaymentMethod] = useState(0);
    const [shippingMethod, setShippingMethod] = useState(0);
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
        form.current = {
            ...form.current,
            order: {
                ...form.current.order,
                city: event.target.value
            }
        }
        setSelectCity(event.target.value);
        dispatch(doGetDistrict( event.target.value)).then((result) => {
            setListDistrict(result.payload);
            resetField('Address-District')
        });  
    }
    const handleChangeAdressDistrict = (event) => {
        form.current = {
            ...form.current,
            order: {
                ...form.current.order,
                district: event.target.value
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
    const handleChangeCurrency = (event) => {
        setCurrency(event.target.value);
        form.current = {
            ...form.current,
            order: {
                ...form.current.order,
                currency: event.target.value
            }
        }
    }
    const handleChangePaymentMethod = (event) => {
        setPaymentMethod(event.target.value);
        form.current = {
            ...form.current,
            order: {
                ...form.current.order,
                payment_method: event.target.value
            }
        }
    }
    const handleChangeShippingMethod = (event) => {
        setShippingMethod(event.target.value);
        form.current = {
            ...form.current,
            order: {
                ...form.current.order,
                shipping_method: event.target.value
            }
        }
    }
    const handleSearchProduct = (event) => {
        if (!event.target.value) setListFilterProducts(listProducts);
        else {
            let newFilterList = listProducts.map((product) => {
                let newProduct = JSON.parse(JSON.stringify(product));
                newProduct.variants = newProduct.variants.filter(variant => variant.name.includes(event.target.value))
                return newProduct
            })
            newFilterList = newFilterList.filter((product) => product.title.includes(event.target.value) || product.variants.length)
            setListFilterProducts(newFilterList);
        }
    }
    const handleDelete = (is_variant, variant_id, product_id) => {
        let newListValueProduct = JSON.parse(JSON.stringify(listValueProduct));
        if (is_variant) {
            let newListValueVariant = JSON.parse(JSON.stringify(listValueVariant));
            delete newListValueVariant[variant_id];
            setListValueVariant(newListValueVariant);
            let index = listProducts.findIndex((product) => product.id === product_id);
            
            let checkSome = listProducts[index].variants?.some(variant => newListValueVariant[variant.id])
            if (!checkSome) {
                delete newListValueProduct[product_id];
            }
        } else {
            delete newListValueProduct[product_id]
        }
        setListValueProduct(newListValueProduct);
        if (is_variant) form.current.products = form.current.products.filter(product => product.variant_id !== variant_id)
        else form.current.products = form.current.products.filter(product => product.id !== product_id)

        if (!form.current.products) setSubTotal(0)
        else {
            let totalPlus = 0;
            form.current.products.map((product) => {
                totalPlus += Number(product.total_to_show);
            })
            setSubTotal(totalPlus)
        }
    }
    const saveOrder = () => {
        setIsLoading(true);
        form.current.products.map((product) => {
            delete product.total_to_show;
            return product
        })
        const createObj = {
            storeId: params.storeId,
            orderObj: form.current
        }
        dispatch(doCreateOrder(createObj))
        .then((res) => {
            setIsLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Create successful Order!',
            }).then((result) => {
                returnAfterAdd();
            })
        });
        
    };
    useEffect(() => {
        dispatch(doGetListProductsOfStoresScopeFull({
            id: params.storeId,
            params: {}
        })).then((result) => {
            setListProducts(result.payload)
            setListFilterProducts(result.payload);
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
                        currency: 'USD',
                        shipping_method: 0,
                        payment_method: 0
                    }
                }
            }
        }

    }, [oldForm, mode, params.storeId])
    useEffect(() => {
        const newTotal = subTotal - discountTotal;
        if (newTotal <= 0) setTotal(0);
        else setTotal(newTotal);
    }, [subTotal, discountTotal])
    return (
        <>
            <form>
                <div className="row  text-black">  
                        <div className="offset-1 offset-sm-1 col-11 col-sm-11 col-md-7 col-lg-7 col-xl-7">   
                            <Paper elevation={5} style={{padding: '1rem 2rem', minHeight: 150}}>
                                <div style={{ display: 'flex', justifyContent: 'space-between'}}>

                                    <InputLabel name='title' className="text-header" style={{margin: 0}}>Products</InputLabel>
                                    <BaseModal
                                            title="Select Variant"
                                            titleButton="Browser"
                                            onOK={() => {}}
                                            classNameModal='style-modal'
                                            styleButton={{ width: 100 ,border: '1px solid #9fa3a7', borderRadius: 5, marginLeft: 10, height: 30, color: '#333', textTransform: 'none'}}>
                                            <FormControl style={{width: 600}}>
                                                <CustomSearchInput
                                                    placeholder='Search'
                                                    onChange={handleSearchProduct}
                                                    height={'30px'}
                                                />
                                                <BaseNestedList items={listFilterProducts} valueProduct={listValueProduct} setValueProduct={setListValueProduct}
                                                valueVariant={listValueVariant}
                                                setValueVariant={setListValueVariant}></BaseNestedList>
                                            </FormControl>
                                        </BaseModal>
                                </div>
                                {
                                    Object.keys(listValueProduct || {}).length || Object.keys(listValueVariant || {}).length ?
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
                                            
                                            <div  style={{width: 24}}>
                                            </div>
                                        </div>
                                        
                                        {listProducts.map((product) => {
                                            if (listValueProduct[product.id]) {
                                                if (!product.is_variant) {
                                                    return (
                                                        <Item formRef={form} listRate={listRate} setSubTotal={(e) => setSubTotal(e)} handleDelete={handleDelete} is_variant={product.is_variant} thumbnail={product.thumbnail} selectCurrency={currency} parentName={product.title} product_id={product.id} productCurrency={product.currency} price={product.price}></Item>
                                                    )
                                                } else {
                                                    return product.variants?.map((variant) => {
                                                        if (listValueVariant[variant.id]) {
                                                            return (
                                                                <Item  formRef={form} listRate={listRate} setSubTotal={(e) => setSubTotal(e)} handleDelete={handleDelete} is_variant={product.is_variant} parentName={product.title} selectCurrency={currency} thumbnail={product.thumbnail} name={variant.name} product_id={product.id} variant_id={variant.id} productCurrency={product.currency} price={variant.price}></Item>
                                                            )
                                                        }
                                                    })
                                                }
                                            }
                                        })}
                                    </div>
                                    : <></>
                                }
                            </Paper> 
                            <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                                <InputLabel name='title' className="text-header" style={{margin: 0}}>Payment</InputLabel>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Currency</InputLabel>
                                    <Select value={currency} onChange={handleChangeCurrency} className='text-field-input text-content select-currency'>
                                        <MenuItem value='VND'>VND</MenuItem>
                                        <MenuItem value='USD'>USD</MenuItem>
                                    </Select>
                                </div>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Subtotal</InputLabel>
                                    <InputLabel name='title' className="text-content" style={{margin: 0}}>{currency === 'USD' ? Intl.NumberFormat('en-US').format(subTotal) : Intl.NumberFormat('vi-VN').format(subTotal)} {currency}</InputLabel>
                                </div>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Select placeholder='Discount'
                                        className="text-field-input text-content"
                                        onChange={() => {}}
                                        height={'30px'}
                                        width={'auto'}>

                                    </Select>
                                    <InputLabel name='title' className="text-content" style={{margin: 0}}>{currency === 'USD' ? Intl.NumberFormat('en-US').format(discountTotal) : Intl.NumberFormat('vi-VN').format(discountTotal)} {currency}</InputLabel>
                                </div>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Total</InputLabel>
                                    <InputLabel name='title' className="text-content" style={{margin: 0}}>{currency === 'USD' ? Intl.NumberFormat('en-US').format(total) : Intl.NumberFormat('vi-VN').format(total)} {currency}</InputLabel>
                                </div>
                            </Paper>
                            <Paper elevation={5}  style={{padding: '1rem 2rem', marginTop: "2rem"}}>
                                <InputLabel name='title' className="text-header" style={{margin: 0}}>Method</InputLabel>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Payment</InputLabel>
                                    <Select value={oldForm?.order?.payment_method} className='text-field-input text-content select-currency' disabled>
                                        <MenuItem value='0'>COD</MenuItem>
                                        <MenuItem value='1'>Paypal</MenuItem>
                                    </Select>
                                </div>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Shipping</InputLabel>
                                    <Select value={oldForm?.order?.shipping_method} className='text-field-input text-content select-currency' disabled>
                                        <MenuItem value='0'>Tieu chuan</MenuItem>
                                        <MenuItem value='1'>gi gi do</MenuItem>
                                    </Select>
                                </div>
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
                        </div>    
                </div>
                <Divider className="custom-devider" style={{marginTop: 15}} />
                <div className="mt-4 mb-4 row form-group-button">
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

export default FollowOrder;