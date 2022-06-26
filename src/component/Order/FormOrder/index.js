import React, {useState, useEffect, useRef, Fragment } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import BaseModal from '../../common/BaseModal'
import {
    Paper,
    TextField,
    InputLabel,
    Select,
    FormHelperText,
    MenuItem,
    ListItem,
    ListItemText,
    ListItemAvatar,
    TextareaAutosize,
    FormControl,
    List,
    Box,
    ListItemIcon
} from '@mui/material';
import './index.css'
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from "react-redux";
import { doGetListProductsOfStores, doGetListProductsOfStoresScopeFull } from "../../../redux/slice/productSlice";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { doGetCity, doGetDistrict, doGetRate } from '../../../redux/slice/dataSlice'
import { CustomSearchInput } from "../../common/CustomSearchInput/CustomSearchInput";
import BaseNestedList from "../../common/BaseNestedList";
import { BaseNumberField } from "../../common/BaseNumberField";
import Item from "./Item";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};
const FormOrder = ({mode, oldForm, returnAfterAdd})=> { // mode add or update
    const dispatch = useDispatch();
    let form = useRef({});
    const { handleSubmit, reset, control, resetField } = useForm();
    const [listCity, setListCity] = useState([]);
    const [selectCity, setSelectCity] = useState('');
    const [listDistrict, setListDistrict] = useState([]);
    const [selectDistrict, setSelectDistrict] = useState('');
    const [listRate, setListRate] = useState([]);
    const [currency, setCurrency] = useState('USD');
    
    const [listProducts, setListProducts] = useState([]);
    
    const [listFilterProducts, setListFilterProducts] = useState([]);
    const [listValueProduct, setListValueProduct] = useState({})
    const [listValueVariant, setListValueVariant] = useState({})
    const [subTotal, setSubTotal] = useState([]);
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
    const saveOrder = (data) => console.log(data);
    useEffect(() => {
        dispatch(doGetCity()).then((result) => {
            setListCity(result.payload);
        });  
        dispatch(doGetRate()).then((result) => {
            setListRate(result.payload);
        });  
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
                        store_id: params.storeId
                    }
                }
            }
        }

    }, [oldForm, mode, params.storeId])
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
                                    <InputLabel name='title' className="text-content" style={{margin: 0}}>{subTotal} {currency}</InputLabel>
                                </div>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Select placeholder='Discount'
                                        className="text-field-input text-content"
                                        onChange={() => {}}
                                        height={'30px'}
                                        width={'auto'}>

                                    </Select>
                                    <InputLabel name='title' className="text-content" style={{margin: 0}}>0.00 {currency}</InputLabel>
                                </div>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <InputLabel name='title' className="text-label" style={{margin: 0}}>Total</InputLabel>
                                    <InputLabel name='title' className="text-content" style={{margin: 0}}>0.00 {currency}</InputLabel>
                                </div>
                            </Paper>
                        </div>   
                        <div className="offset-1 offset-sm-1 offset-md-0 offset-lg-0 offset-xl-0 col-11 col-sm-11 col-md-4 col-lg-4 col-xl-4">                      
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
                                                className="text-field-input text-content"
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
                                                
                                                className="text-field-input text-content"
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
                                                fullWidth
                                                error={!!error}
                                                helperText={error?.message}
                                                FormHelperTextProps={{
                                                    className: 'error-text'
                                                }}
                                            />
                                        </>
                                    )}
                                />
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
        </>
    );
}

export default FormOrder;