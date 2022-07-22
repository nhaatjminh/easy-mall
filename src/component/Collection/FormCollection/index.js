import React, {useState, useEffect, useCallback, useRef, Fragment } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import {
    Paper,
    TextField,
    InputLabel,
    Box,
    Chip,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Select,
    Checkbox,
    FormHelperText,
    CircularProgress,
    Modal,
    FormControl,
    ListItemText,
    OutlinedInput,
    IconButton,
    ListItemAvatar
} from '@mui/material';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import './index.css';
import { Link } from "react-router-dom";
import ImageInput from "../ImageInput"
import ReactQuill from 'react-quill'
import { useSelector, useDispatch } from "react-redux";
import { doUploadImageCollection, doCreateCollection, doDeleteCollection, doUpdateCollection } from "../../../redux/slice/collectionSlice";
import { doGetListProductsOfStores } from "../../../redux/slice/productSlice";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { LoadingModal } from "../../common/LoadingModal/LoadingModal";
import BaseEmpty from "../../common/BaseEmpty";
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
const FormCollection = ({mode, oldForm, returnAfterAdd, setIsEdit})=> { // mode add or update
    const dispatch = useDispatch();
    let form = useRef({});
    const params = useParams();
    const [errorTitle, setErrorTitle] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [listProducts, setListProducts] = useState([]);
    const [listProductOfCollection, setListProductOfCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleChangeCollectionName = (event) => {
        if (errorTitle) {
            setErrorTitle(null);
        }
        form.current = {
            ...form?.current,
            collection: {
                ...form?.current?.collection,
                name: event.target.value
            }
        }
    }
    const handleChangeRichtext = (event) => {
        form.current = {
            ...form?.current,
            collection: {
                ...form?.current?.collection,
                description: event
            }
        }
    }
    const isBase64 = (str) => {
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        }
    }
    const saveCollection = () => {
        if (form?.current?.collection?.name) {
            setIsLoading(true);
            new Promise((resolve) => { 
                const data = form?.current?.collection?.thumbnail;
                if (data) {
                    const base64result = data.substr(data.indexOf(',') + 1);
                    if (!isBase64(base64result)) {
                        resolve();
                    } else {
                        //need delete image if u change image
                        dispatch(doUploadImageCollection({
                            data: {
                                data: [data]
                            }
                        })).then((result) => {
                            if (result?.payload && result?.payload.length > 0) {
                                // payload is array data response from server, first item to link, so get payload[0] in here                  
                                form.current = {
                                    ...form?.current,
                                    collection: {
                                        ...form?.current?.collection,
                                        thumbnail: Object.values(result.payload)[0],
                                    }
                                }
                                resolve();
                            }
                        })
                    }
                } else {
                    resolve();
                }
            }).then(async () => {
                if (mode !== "EDIT") {
                    const createObj = {
                        storeId: params.storeId,
                        collectionObj: form.current
                    }
                    dispatch(doCreateCollection(createObj))
                    .then((res) => {
                        setIsLoading(false);
                        setIsEdit(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Create successful collection!',
                        }).then((result) => {
                            returnAfterAdd();
                        })
                    });
                }
                else {
                    const listProductUpdate = []
                    await form.current?.products?.forEach(product => {
                        if (product.update){
                            listProductUpdate.push(product)
                        }
                    })
                    form.current.products = listProductUpdate;
                    const updateObj = {
                        newCollection: form.current
                    }
                    dispatch(doUpdateCollection(updateObj))
                    .then((res) => {
                        setIsLoading(false);
                        setIsEdit(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Edit collection successful !',
                        }).then((result) => {
                            returnAfterAdd();
                        })
                    });
                }
            })
        } else {
                setErrorTitle('You need to enter a value for this field');
                window.scrollTo(0, 0);
        }
    }
    const handleOpen = () => setModalShow(true);
    const handleClose = () => setModalShow(false);
    const handleChangeProductForCollection = (event) => {
        let {target: { value }} = event;
        if (mode === "EDIT") { 
            typeof value === 'string' ? value = value.split(',') : value = value
            let haveProduct = value;
            form?.current?.products?.forEach((product) => {
                if (!value.includes(product.id)) { 
                    if (product.title) { // if have title. this is old Product
                        form.current.products = form?.current?.products?.map((productNeedDelete) => {
                            if (productNeedDelete.id === product.id) {
                                return {
                                    ...product,
                                    update: "Delete"
                                }
                            }
                            return productNeedDelete;
                        })
                    } else {
                        form.current.products = form?.current?.products?.filter(productNeedDelete => productNeedDelete.id !== product.id)
                    }
                } else if (product.title && product.update === "Delete" ){
                    delete product.update;
                }
                haveProduct = haveProduct.filter(selectCollection => selectCollection !== product.id);
            })
            haveProduct.forEach((productId) => {
                let newProduct = {
                    id: productId,
                    update: "Add"
                }
                form.current.products = [
                        ...form?.current?.products,
                        newProduct,
                    ]
            })
            setListProductOfCollection(typeof value === 'string' ? value.split(',') : value);
        } else {     
            setListProductOfCollection(typeof value === 'string' ? value.split(',') : value);
        }
    };
    const handleDeleteProducts = (index) => {
        const newList = [...listProductOfCollection];
        if (mode === "EDIT") {
            form?.current?.products?.forEach((product) => {
                if (product.id === newList[index]) { 
                    if (product.title) { // if have name. this is old collection
                        form.current.products = form?.current?.products?.map((productNeedDelete) => {
                            if (productNeedDelete.id === product.id) {
                                return {
                                    ...product,
                                    update: "Delete"
                                }
                            }
                            return productNeedDelete;
                        })
                    } else {
                        form.current.products = form?.current?.products?.filter(productNeedDelete => productNeedDelete.id !== product.id)
                    }
                }
            })
        } 
        else {
            const newProductForForm = form.current?.products?.filter((ProductId) => ProductId !== newList[index])
            form.current = {
                ...form?.current,
                products: newProductForForm
            }
        }
        newList.splice(index, 1);
        setListProductOfCollection(newList);
    }
    const handleDeleteCollection = () => {
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
                setIsEdit(false)
                dispatch(doDeleteCollection({
                    id: form.current.collection.id
                })).then((result) => {
                    setIsLoading(true);
                    returnAfterAdd();
                })
            }
        })
        
    }
    useEffect(() => {
        if (mode === "ADD") {
            form.current = {}
        }
        form.current = {
            ...form?.current,
            collection: {
                ...form?.current?.collection,
                store_id: params.storeId
            }
        }
        dispatch(doGetListProductsOfStores({
            id: params.storeId,
            params: {}
        })).then((result) => setListProducts(result.payload)); 
    },[])
    useEffect(() => {  
        if (mode !== "EDIT") {
            form.current = {
                ...form?.current,
                products: listProductOfCollection
            }
        }
    },[listProductOfCollection])
    useEffect(() => {
        if (mode) {
            if (oldForm && mode === 'EDIT') {
                form.current = oldForm;
                if (form.current.collection.description) delete form.current.collection.description;
                const listIdProduct = oldForm?.products?.map(product => product.id);
                setListProductOfCollection(listIdProduct || [])
            }
            else {
                form.current = {
                    ...form?.current,
                    collection: {
                        ...form?.current?.collection,
                        store_id: params.storeId
                    }
                }
            }
        }
    }, [oldForm, mode, params.storeId])
    return (
        <>
        <FormGroup>
            <div className="row  text-black">  
                <div className="offset-1 offset-sm-1 col-11 col-sm-11 col-md-6 col-lg-6 col-xl-6">   
                    <Paper elevation={5} style={{padding: '1rem 2rem'}}>
                        <InputLabel name='title' className="text-header font-weight-bold" style={{margin: 0}}>Title</InputLabel>
                        <TextField
                            className="text-field-input text-content"
                            id="title-product"
                            name='title'
                            key={`collection-name`}
                            onChange={handleChangeCollectionName}
                            fullWidth
                            required
                            error={errorTitle ? true : false}
                            helperText={errorTitle}
                            defaultValue={mode === "EDIT" && oldForm?.collection?.name ? oldForm.collection.name : ""}
                            FormHelperTextProps={{
                                className: 'error-text'
                            }}
                        />
                        <InputLabel style={{margin: 0, marginBottom: '0.75rem'}} className="text-header">Description</InputLabel>
                        <ReactQuill
                            className="text-content"
                            defaultValue={mode === "EDIT" && oldForm?.collection?.description ? oldForm?.collection?.description : ""}
                            onChange={(event) => handleChangeRichtext(event)}
                        />
                    </Paper>
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <div className="row">
                            <div className="col-9">
                                
                                <InputLabel name='title' className="text-header p-1" style={{margin: 0}}>Products</InputLabel>
                            </div>
                            <div className="col-3">  
                            
                                <i className="fa fa-plus-circle icon-color-black media-select-button float-right  btn btn-form-product p-1" onClick={handleOpen}></i>      
                                <Modal
                                    key={`modal`}
                                    open={modalShow}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={styleModal} 
                                    key={`box-modal`}>
                                        
                                        <InputLabel name='title' className="text-header" style={{margin: 0, marginBottom: 10}} >Product</InputLabel>
                                        <FormControl  style={{width: '100%'}}>
                                            <Select
                                            
                                            key={`collection-product`}
                                            className="text-field-input select-modal text-content select-height"
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={listProductOfCollection}
                                            renderValue={() => (
                                                <></>
                                            )}
                                            onChange={handleChangeProductForCollection}
                                            MenuProps={MenuProps}
                                            >
                                                { listProducts?.length > 0 ? listProducts.map((product) => (
                                                    <MenuItem key={`${product.id} select-modal`} value={product.id}>
                                                        <Checkbox checked={listProductOfCollection.indexOf(product.id) > -1} />
                                                        {
                                                            product.thumbnail ?
                                                                <Box style={{width: 80, height: 'auto'}}>
                                                                    <ListItemAvatar className="image-container-item-list m-0">
                                                                        <img alt="image" src={product.thumbnail}/>
                                                                    </ListItemAvatar>
                                                                </Box>
                                                            : <Box style={{width: 80, height: 'auto' }}>
                                                                    <ListItemAvatar className="image-container-item-list m-0">
                                                                        <img alt="image" src='/img/default-image-620x600.jpg'/>
                                                                    </ListItemAvatar>
                                                                </Box>
                                                        }
                                                        
                                                        <ListItemText primary={product.title}/>
                                                    </MenuItem>
                                                )) : <BaseEmpty></BaseEmpty>}
                                            </Select>
                                        </FormControl>
                                        <Button className="float-right p-0 m-0 text-black mt-2 btn-close-modal" onClick={handleClose}><p className="p-0 m-0">Close</p></Button>
                                    </Box>
                                </Modal>
                            </div>
                            <Box style={{overflow: "auto", maxHeight: 400}}>
                                {listProducts.length && listProductOfCollection.map((productId, index) => {
                                    const product = listProducts.find(productTemp => productTemp.id === productId)
                                    return (
                                        <div key={productId + "item-select"}>
                                            <MenuItem key={`${productId}-selected`} value={product.id}>
                                                <p className="pr-2 m-0">{index}.</p>
                                                {
                                                product.thumbnail ?
                                                    <Box key={`${productId} - box`} style={{width: 80, height: 'auto'}}>
                                                        <ListItemAvatar className="image-container-item-list m-0" key={`${productId} - avatar`}>
                                                            <img alt="image" src={product.thumbnail}/>
                                                        </ListItemAvatar>
                                                    </Box>
                                                :  <Box key={`${productId} - box`} style={{width: 80, height: 'auto' }}>
                                                        <ListItemAvatar className="image-container-item-list m-0" key={`${productId} - avatar`}>
                                                            <img alt="image" src='/img/default-image-620x600.jpg'/>
                                                        </ListItemAvatar>
                                                    </Box>
                                                }
                                                
                                                <ListItemText key={`${product.id} title`} primary={product.title}/>
                                                <IconButton className="float-right text-extra-large" onClick={() => handleDeleteProducts(index)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </MenuItem>
                                            {index !== listProductOfCollection.length - 1 && <Divider className="divider-custom" />}
                                            
                                        </div>
                                )})}
                            </Box>
                        </div>
                    </Paper> 
                </div>   
                <div className="pt-md  offset-1 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1 col-11 col-sm-11 col-md-4 col-lg-4 col-xl-4">                       
                    <Paper elevation={5} style={{padding: '1rem 2rem'}}>
                        <ImageInput formRef={form} oldForm={oldForm} mode={mode}></ImageInput>
                    </Paper> 
                </div>    
            </div>
            <Divider className="custom-devider" style={{marginTop: 15}} />
            <div className="mt-4 mb-4 row form-group-button">
                <div className="col-6">
                    {
                        mode === "EDIT" ?
                        <button onClick={handleDeleteCollection} style={{width: 'auto'}} className="float-left btn btn-collection btn-light btn-form-product btn-delete-product">Delete</button>
                        : ""
                    }
                </div>
                <div className="col-6">
                    <button onClick={saveCollection} className="float-right btn btn-collection btn-success btn-form-product">Save</button>
            
                </div>
            </div>  
        </FormGroup> 
        
        <LoadingModal show={isLoading} />
        </>
    );
}

export default FormCollection;