import React, {useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import BaseModal from '../../../common/BaseModal'
import {
    Paper,
    InputLabel,
    Select,
    MenuItem,
    FormControl
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from "react-redux";
import { doGetListProductsOfStoresScopeFull } from "../../../../redux/slice/productSlice";
import {  doGetRate } from '../../../../redux/slice/dataSlice'
import { doGetActiveDiscount } from "../../../../redux/slice/orderSlice";
import { CustomSearchInput } from "../../../common/CustomSearchInput/CustomSearchInput";
import BaseNestedList from "../../../common/BaseNestedList";
import Item from "../Item";
import { cloneDeep } from "lodash";
import { parseLocaleNumber } from "../../../../utils/parseLocaleNumber";
import BaseEmpty from "../../../common/BaseEmpty";

const ManageProductOrder = ({formRef, WIDTH_ITEM_ORDER, listDiscount, setListDiscount, discountCode, setDiscountCode})=> { // mode add or update
    const dispatch = useDispatch();
    const [listRate, setListRate] = useState([]);
    const form=formRef;
    const [currency, setCurrency] = useState('VND');
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
    const havePaypal = useSelector((state) => state.listStore?.currentStore?.have_paypal)
    const currencyStore = useSelector((state) => state.listStore?.currentStore?.currency || 'USD');
    useEffect(() => {
        if (currencyStore) setCurrency(currencyStore)
    }, [currencyStore])
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
    const handleChangeDiscountSelect = (code) => {
        if (code) {
            const selectDiscount = listDiscount.find(discount => discount.code === code);
            setDiscountCode(code);
            let totalAccept = 0;
            if (selectDiscount.type === 0) {
                totalAccept = selectDiscount.amount / 100 * subTotal;
            } else {
                if (currency === selectDiscount.currency) {
                    totalAccept = selectDiscount.amount;    
                }
                else {
                    let rate;
                    if (selectDiscount.currency === 'USD') {
                        rate = listRate?.find(rate => rate.currency === currency)?.amount ?? 0;
                        totalAccept = (Number(selectDiscount.amount * 1.0 * rate));
                    } else {
                        rate = listRate?.find(rate => rate.currency === selectDiscount.currency)?.amount ?? 0;
                        totalAccept = (Number(selectDiscount.amount * 1.0 / rate));
                    } 
                }
            }
            setDiscountTotal(totalAccept);
        }
    }
    const handleSearchProduct = (event) => {
        if (!event.target.value) setListFilterProducts(listProducts);
        else {
            let newFilterList = listProducts.map((product) => {
                let newProduct = JSON.parse(JSON.stringify(product));
                if (newProduct.title?.toLowerCase().includes(event.target.value?.toLowerCase())) return newProduct
                newProduct.variants = newProduct.variants.filter(variant => variant.name?.toLowerCase().includes(event.target.value?.toLowerCase()))
                return newProduct
            })
            newFilterList = newFilterList.filter((product) => product.title?.toLowerCase().includes(event.target.value?.toLowerCase()) || product.variants.length)
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
        if (is_variant) form.current.products = form.current.products?.filter(product => product.variant_id !== variant_id)
        else form.current.products = form.current.products?.filter(product => product.id !== product_id)

        if (!form.current.products) setSubTotal(0)
        else {
            let totalPlus = 0;
            form.current.products.map((product) => {
                totalPlus += Number(product.total_to_show);
            })
            setSubTotal(totalPlus)
        }
    }
    useEffect(() => {
        dispatch(doGetRate()).then((result) => {
            setListRate(result.payload);
        });  
        dispatch(doGetListProductsOfStoresScopeFull({
            id: params.storeId,
            params: {
                status: 'Active'
            }
        })).then((result) => {
            setListProducts(result.payload)
            setListFilterProducts(result.payload);
        });   
    }, [])
    useEffect(() => {
        const newTotal = subTotal - discountTotal;
        if (newTotal <= 0) setTotal(0);
        else setTotal(newTotal);
    }, [subTotal, discountTotal])
    useEffect(() => {
        handleChangeDiscountSelect(discountCode);
    }, [currency])
    useEffect(() => {
        if(discountTotal >= subTotal) setDiscountTotal(subTotal);
    }, [discountTotal, subTotal])
    useEffect(() => {
        const newListValueProduct = cloneDeep(listValueProduct);
        Object.keys(listValueProduct ?? {}).forEach((id) => {
            const product = listProducts.find(product => product.id === id);
            if (newListValueProduct[id] === false || (product && product.is_variant)) delete newListValueProduct[id]
        })
        const newListValueVariant = cloneDeep(listValueVariant);
        Object.keys(listValueVariant ?? {}).forEach((id) => {
            if (newListValueVariant[id] === false) delete newListValueProduct[id]
        })
        const totalProducts = Object.keys(newListValueProduct ?? {}).length + Object.keys(newListValueVariant  ?? {}).length;
        dispatch(doGetActiveDiscount({
            storeId: params.storeId,
            params: {
                total_price: !isNaN(Number(subTotal)) ? Number(subTotal) : 0,
                currency: currency ?? 'VND',
                total_products: totalProducts ?? 0
            }
        })).then((result) => {
            setListDiscount(result.payload)
        });
    }, [listValueVariant, listValueProduct, subTotal])
    return (
        <> 
            <div className="offset-1 offset-sm-1 col-11 col-sm-11 col-md-6 col-lg-6 col-xl-6">   
                <Paper  id='paper-resize-item' elevation={5} style={{padding: '1rem 2rem', minHeight: 150}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>

                        <InputLabel name='title' className="text-header" style={{margin: 0}}>Products</InputLabel>
                        <BaseModal
                                title="Select Variant"
                                titleButton="Browser"
                                onOK={() => {}}
                                onClose={() => setListFilterProducts(listProducts)}
                                classNameModal='style-modal'
                                styleButton={{ width: 100 ,border: '1px solid #9fa3a7', borderRadius: 5, marginLeft: 10, height: 30, color: '#333', textTransform: 'none'}}>
                                <FormControl style={{width: 900}}>
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
                        Object.values(listValueProduct || {})?.filter(o => o)?.length || Object.values(listValueVariant || {})?.filter(o => o)?.length ?
                        <div style={{ overflowX: 'auto', display: 'flex', flexDirection: 'column'}}>
                            <div style={{ width: WIDTH_ITEM_ORDER ,textAlign: 'center', display: 'inline-flex', justifyContent: 'space-between', padding: 'auto 16px'}}>
                                <div  style={{ width: '40%', minWidth: 225 }}>
                                    <span className='float-left pl-5'>Products</span>
                                </div>
                                <div  style={{width: '22%', minWidth: 125}} className='pr-5'>
                                    Quantity
                                </div>
                                <div  style={{width: '35%', minWidth: 175}} className='pr-3'>
                                    Total
                                </div>
                                
                                <div  style={{width: '3%'}}>
                                </div>
                            </div>
                            
                            <Divider style={{width: WIDTH_ITEM_ORDER}}/>
                            {listProducts.map((product) => {
                                if (listValueProduct[product.id]) {
                                    if (!product.is_variant) {
                                        return (
                                            <Item WIDTH_ITEM_ORDER={WIDTH_ITEM_ORDER} key={`${product.id}`}  formRef={form} listRate={listRate} setSubTotal={(e) => setSubTotal(e)} handleDelete={handleDelete} is_variant={product.is_variant} thumbnail={product.thumbnail} selectCurrency={currency} parentName={product.title} product_id={product.id} productCurrency={product.currency} price={product.price}></Item>
                                        )
                                    } else {
                                        return product.variants?.map((variant) => {
                                            if (listValueVariant[variant.id]) {
                                                return (
                                                    <Item WIDTH_ITEM_ORDER={WIDTH_ITEM_ORDER} key={`${variant.id}`}  formRef={form} listRate={listRate} setSubTotal={(e) => setSubTotal(e)} handleDelete={handleDelete} is_variant={product.is_variant} parentName={product.title} selectCurrency={currency} thumbnail={product.thumbnail} name={variant.name} product_id={product.id} variant_id={variant.id} productCurrency={product.currency} price={variant.price}></Item>
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
                        <Select disabled={true} value={currency} onChange={handleChangeCurrency} className='text-field-input text-content select-currency'>
                            <MenuItem value='VND'>VND</MenuItem>
                            <MenuItem value='USD'>USD</MenuItem>
                        </Select>
                    </div>
                    <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        
                        <InputLabel name='title' className="text-label" style={{margin: 0}}>Subtotal</InputLabel>
                        <InputLabel name='title' className="text-content" style={{margin: 0}}>
                        {currency === 'USD' ? parseLocaleNumber(subTotal,'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(subTotal,'vi-VN')} {currency}
                        </InputLabel>
                    </div>
                    <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Select placeholder='Discount'
                            className="text-field-input text-content select-height"
                            onChange={(e) => handleChangeDiscountSelect(e.target.value)}
                            style={{ width: 200}}
                            height={'30px'}
                            displayEmpty={true}
                            renderValue={(value) => {
                                if (!value) {
                                    return <div className="text-content">---- Select Code ----</div>
                                } else {
                                    return <div className="text-content">{value}</div>
                                }
                            }}>
                            {listDiscount.length > 0
                            ? listDiscount.map((discount) => 
                                <MenuItem value={`${discount.code}`}>{discount.code}</MenuItem>
                            ) : <BaseEmpty></BaseEmpty>
                            }
                        </Select>
                        <InputLabel name='title' className="text-content" style={{margin: 0}}>
                        {currency === 'USD' ? parseLocaleNumber(discountTotal,'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(discountTotal,'vi-VN')} {currency}</InputLabel>
                    </div>
                    <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <InputLabel name='title' className="text-label" style={{margin: 0}}>Total</InputLabel>
                        <InputLabel name='title' className="text-content" style={{margin: 0}}>
                        {currency === 'USD' ? parseLocaleNumber(total,'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(total,'vi-VN')} {currency}</InputLabel>
                    </div>
                </Paper>
                <Paper elevation={5}  style={{padding: '1rem 2rem', marginTop: "2rem"}}>
                    <InputLabel name='title' className="text-header" style={{margin: 0}}>Method</InputLabel>
                    <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <InputLabel name='title' className="text-label" style={{margin: 0}}>Payment</InputLabel>
                        <Select value={paymentMethod} onChange={handleChangePaymentMethod} className='select-height text-field-input text-content select-currency'>
                            <MenuItem value='0'>Cash On Delivery (COD)</MenuItem>
                            {havePaypal ? 
                            <MenuItem value='1'>Paypal</MenuItem> : <></>}
                        </Select>
                    </div>
                    <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <InputLabel name='title' className="text-label" style={{margin: 0}}>Shipping</InputLabel>
                        <Select value={shippingMethod} onChange={handleChangeShippingMethod} className='text-field-input text-content select-currency'>
                            <MenuItem value='0'>Take it at store</MenuItem>
                            <MenuItem value='1'>Standard shipping</MenuItem>
                        </Select>
                    </div>
                </Paper>
            </div>  
            
        </>
    );
}

export default ManageProductOrder;