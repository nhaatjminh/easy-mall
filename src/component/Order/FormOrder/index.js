import React, {useState, useEffect, useRef, Fragment } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {
    Paper,
    TextField,
    InputLabel,
    Select,
    FormHelperText,
    MenuItem,
    Modal,
    ListItemText,
    Box,
    TextareaAutosize,
    FormControl,
    ListItemAvatar,
    Checkbox
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from "react-redux";
import { doGetListProductsOfStores } from "../../../redux/slice/productSlice";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { doGetCity, doGetDistrict } from '../../../redux/slice/dataSlice'
import { CustomSearchInput } from "../../common/CustomSearchInput/CustomSearchInput";
const styleModal = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
    const [currency, setCurrency] = useState('USD');
    const [openModal, setOpenModal] = useState(false);
    
    const [listProducts, setListProducts] = useState([]);
    const [listProductAddOrder, setListProductAddOrder] = useState([]);
    const params = useParams();
    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }
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

    }
    const saveOrder = (data) => console.log(data);
    useEffect(() => {
        dispatch(doGetCity()).then((result) => {
            setListCity(result.payload);
        });  
        
        dispatch(doGetListProductsOfStores({
            id: params.storeId,
            params: {}
        })).then((result) => setListProducts(result.payload)); 
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
                                <InputLabel name='title' className="text-header" style={{margin: 0}}>Products</InputLabel>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <CustomSearchInput
                                        placeholder='Search'
                                        onChange={handleSearchProduct}
                                        height={'30px'}
                                    />
                                    <Button onClick={handleOpenModal} style={{ width: 100 ,border: '1px solid #9fa3a7', borderRadius: 5, marginLeft: 10, height: 30, color: '#333', textTransform: 'none'}}>Browser</Button>
                                </div>
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
                                    <InputLabel name='title' className="text-content" style={{margin: 0}}>0.00 {currency}</InputLabel>
                                </div>
                                <div className="pt-3" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <TextField
                                        placeholder='Discount'
                                        className="text-field-input text-content"
                                        onChange={handleSearchProduct}
                                        height={'30px'}
                                        width={'auto'}
                                    />
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
                <Modal
                    key={`modal`}
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal} 
                    key={`box-modal`}>
                        
                        <InputLabel name='title' className="text-header" style={{margin: 0, marginBottom: 10}} >Product</InputLabel>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                                key={`collection-product`}
                                className="text-field-input select-modal text-content"
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={listProductAddOrder}
                                renderValue={() => (
                                    <></>
                                )}
                                // onChange={handleChangeProductForCollection}
                                MenuProps={MenuProps}
                            >
                                {listProducts.map((product) => (
                                    <MenuItem key={`${product.id} select-modal`} value={product.id}>
                                        <Checkbox checked={listProductAddOrder.indexOf(product.id) > -1} />
                                        {
                                            product.thumbnail ?
                                                <Box style={{width: 35, height: 'auto', marginRight: 30}}>
                                                    <ListItemAvatar>
                                                        <img alt="thumbnail" src={product.thumbnail}/>
                                                    </ListItemAvatar>
                                                </Box>
                                            : <Box style={{width: 35, height: 'auto', marginRight: 30}}>
                                                    <ListItemAvatar>
                                                        <img alt="thumbnail" src='/img/default-image-620x600.jpg'/>
                                                    </ListItemAvatar>
                                                </Box>
                                        }
                                        
                                        <ListItemText primary={product.title}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button className="float-right p-0 m-0 text-black mt-2 btn-close-modal" onClick={handleCloseModal}><p className="p-0 m-0">Close</p></Button>
                    </Box>
                </Modal>
        </>
    );
}

export default FormOrder;