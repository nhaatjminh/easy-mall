import React, {useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import {
    Paper,
    TextField,
    InputLabel,
    Chip,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Select,
    Checkbox,
    Autocomplete,
    Box
} from '@mui/material';
import Divider from '@mui/material/Divider';
import './index.css';
import Variant from "../Variant";
import ImageInput from "../ImageInput"
import PricingComponent from "../PricingComponent"
import ReactQuill from 'react-quill'
import { useSelector, useDispatch } from "react-redux";
import { doGetListCollectionOfStores } from "../../../redux/slice/collectionSlice";
import { doCreateProduct, doUploadImageProduct, doUploadProduct, doGetDescription, doDeleteProduct, doGetAllType, doGetAllVendor } from "../../../redux/slice/productSlice";
import Swal from "sweetalert2";
import CustomType from "../CustomType";
import { BaseNumberField } from '../../common/BaseNumberField';
import { LoadingModal } from "../../common/LoadingModal/LoadingModal";

const FormProduct = ({mode, oldForm, returnAfterAdd})=> { // mode add or update
    const dispatch = useDispatch();
    const collectionList = useSelector((state) => state.collectionSlice.listCollection);
    let form = useRef(oldForm);
    const params = useParams();
    const [isVariant, setIsVariant] = useState(mode === "EDIT" && oldForm?.product?.is_variant ? oldForm?.product?.is_variant : false);
    const [errorTitle, setErrorTitle] = useState(null);
    const [collectionSelected, setCollectionSelected] = useState([]);
    const [customTypeList, setCustomTypeList] = useState([]);
    const [vendorList, setVendorList] = useState([]);
    const nameStore = useSelector((state) => state.listStore.selectedName);
    const [isLoading, setIsLoading] = useState(false);
    const [vendorValue, setVendorValue] = useState('');
    const [optionVendor, setOptionVendor] = useState([nameStore]);
    const [trickRerender, setTrickRerender] = useState(0);
    const [selectCurrency, setSelectCurrency] = useState(oldForm?.product?.currency ? oldForm?.product?.currency : 'VND');
    const initOptionRef = () => {
        const ref = JSON.parse(JSON.stringify(oldForm));
        return ref.option;
    }

        // save option to check optionValue
    // because change form.current.option.value from object array to string array to async with add render.
    // so need use ref to save it. will assign for form.current.option when save.
    const optionRef = useRef(oldForm?.option ? initOptionRef() : []);

    const onChangeIsContinueSelling = (event) => {
        if (mode === "EDIT") {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    continue_sell: event.target.checked,
                    update: "Change"
                }
            }
        } else {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    continue_sell: event.target.checked
                }
            }
        }
    };
    const handleChangeCollection = (event) => {
        let selectedCol = [];
        let value = event.target.value;
        if (typeof value !== 'string') {
            value = value.map((collectionId) => {
                const curColl = collectionList.find((collection) => collection.id === collectionId)
                let newSelectedCol = {
                    name: curColl.name,
                    id: curColl.id
                }
                selectedCol.push(newSelectedCol);
                return curColl.id
            })
        }
        if (mode !== "EDIT") {
            typeof value === 'string' ? form.current = {
                ...form?.current,   
                collection: value.split(',')
            } : form.current = {
                ...form?.current,
                collection: value
            }
        } else {
            const listCollection = value;
            let haveCollection = listCollection;
            form?.current?.collection?.forEach((collection) => {
                if (!listCollection.includes(collection.id)) { 
                    if (collection.name) { // if have name. this is old collection
                        form.current.collection = form?.current?.collection?.map((collectionNeedDelete) => {
                            if (collectionNeedDelete.id === collection.id) {
                                return {
                                    ...collection,
                                    update: "Delete"
                                }
                            }
                            return collectionNeedDelete;
                        })
                    } else {
                        form.current.collection = form?.current?.collection?.filter(collectionNeedDelete => collectionNeedDelete.id !== collection.id)
                    }
                } else if (collection.name && collection.update === "Delete" ){
                    delete collection.update;
                }
                haveCollection = haveCollection.filter(selectCollection => selectCollection !== collection.id);
            })
            haveCollection.forEach((collection) => {
                const newCollection = {
                    id: collection,
                    update: "Add"
                }
                form.current = {
                    ...form?.current,
                    collection: [
                        ...form?.current?.collection,
                        newCollection,
                    ]
                }
            })
        }
        setCollectionSelected(selectedCol);
    };
    const handleChangeDeleteCollection = (id) => {
        const newCollSelected = collectionSelected.filter((value) => value.id !== id);
        if (mode === "EDIT") {
            form?.current?.collection?.forEach((collection) => {
                if (collection.id === id) { 
                    if (collection.name) { // if have name. this is old collection
                        form.current.collection = form?.current?.collection?.map((collectionNeedDelete) => {
                            if (collectionNeedDelete.id === collection.id) {
                                return {
                                    ...collection,
                                    update: "Delete"
                                }
                            }
                            return collectionNeedDelete;
                        })
                    } else {
                        form.current.collection = form?.current?.collection?.filter(collectionNeedDelete => collectionNeedDelete.id !== collection.id)
                    }
                }
            })
        } else {
            const newCollForForm = form.current?.collection?.filter((CollId) => CollId !== id)
            form.current = {
                ...form?.current,
                collection: newCollForForm
            }
        }
        setCollectionSelected(newCollSelected);
    }
    const handleChangeProductName = (event) => {
        if (errorTitle) {
            setErrorTitle(null);
        }
        if (mode === "EDIT") {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    title: event.target.value,
                    update: "Change"
                }
            }
        } else {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    title: event.target.value
                }
            }
        }
        setTrickRerender(trickRerender + 1);
    }
    const handleOnChangeSKU = (event) => {
        if (mode === "EDIT") {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    sku: event.target.value,
                    update: "Change"
                }
            }
        } else {
            
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    sku: event.target.value
                }
            }
        }
    }
    const handleOnChangeStatus = (event) => {
        if (mode === "EDIT") {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    status: event.target.value,
                    update: "Change"
                }
            }
        } else {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    status: event.target.value
                }
            }
        } 
        setTrickRerender(trickRerender + 1);
    }
    const handleOnChangeVendor = (value) => {
        if (mode === "EDIT") {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    vendor: value,
                    update: "Change"
                }
            }
        } else {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    vendor: value,
                }
            }
        }
    }
    const handleOnChangeInventory = (event) => {
        if (mode === "EDIT") {
            if (isVariant)
                form.current = {
                    ...form?.current,
                    product: {
                        ...form?.current?.product,
                        inventory: 0,
                        update: "Change"
                    }
                }
            else {
                form.current = {
                    ...form?.current,
                    product: {
                        ...form?.current?.product,
                        inventory: event,
                        update: "Change"
                    }
                }
            }
        } else {
            if (isVariant)
                form.current = {
                    ...form?.current,
                    product: {
                        ...form?.current?.product,
                        inventory: 0
                    }
                }
            else {
                form.current = {
                    ...form?.current,
                    product: {
                        ...form?.current?.product,
                        inventory: event
                    }
                }
            }
        }
       
    }
    const handleChangeRichtext = (event) => {
        if (mode === "EDIT") {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    description: event,
                    update: "Change"
                }
            }
        } else {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    description: event
                }
            }
        }
    }
    const handleChangeCurrency = (event) => {
        setSelectCurrency(event.target.value);
        if (mode === "EDIT") {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    currency: event.target.value,
                    update: "Change"
                }
            }
        } else {
            
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    currency: event.target.value
                }
            }
        }
        
    }
    const handleCheckVariantDelete = () => {
        let listVariant = form.current.variant;
        listVariant = listVariant?.filter((element) => !element?.delete || element.update);
        if (!listVariant) listVariant = []
        form.current = {
            ...form?.current,
            variant: listVariant
        }

    }
    const isBase64 = (str) => {
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        }
    }
    const saveProduct = () => {
        if (form?.current?.product?.title) {
            if (!form.current?.product?.vendor || !form.current?.product?.vendor?.replaceAll(' ','')) form.current.product.vendor = nameStore;
            setIsLoading(true);
            new Promise((resolve) => { 
                const data = form?.current?.product?.images;
                if (data) {
                    const oldResult = [];
                    const listImage = [];
                    for (let item of data) {
                        const base64result = item.substr(item.indexOf(',') + 1);
                        if (isBase64(base64result)) {
                            listImage.push(item);
                        } else {
                            oldResult.push(item);
                        }
                       
                    };
                    new Promise((resolveForUpload) => {
                        dispatch(doUploadImageProduct({
                            data: {
                                data: listImage
                            }
                        })).then((result) => {
                            resolveForUpload(result);
                        })
                    }).then((result) => {
                        if (result) {
                            // payload is array data response from server, first item to link, so get payload[0] in here
                            result = result.payload
                            result = result.concat(oldResult);
                            form.current = {
                                ...form?.current,
                                product: {
                                    ...form?.current?.product,
                                    thumbnail: result[0],
                                    images: result
                                }
                            }
                            resolve();
                        }
                        if (mode === "EDIT") form.current.product.update = "Change";
                    })
                } else {
                    resolve();
                }
            }).then(() => {
                handleCheckVariantDelete();
                if (mode === "EDIT") {
                    const id = form.current.product.id;
                    if (optionRef.current) {
                        optionRef.current = optionRef.current.filter((option, index) => {
                            if (option.idTemp) delete option.idTemp;
                            option.value = option.value.filter((value, idxValue) => {
                                if (value.idTemp) delete value.idTemp;
                                if (!value.update) {
                                    return false
                                } else return true
                            })
                            if (!option.update) {
                                return false
                            } else return true
                        }) 
                        form.current.option = optionRef.current
                    }
                    form.current.collection = form.current?.collection?.filter((collection, index) => {
                        if (!collection.update) {
                            return false
                        } else return true
                    })
                    form.current.variant = form.current?.variant?.filter((variant, index) => {
                        if (!variant.update) {
                            return false
                        } else return true
                    })
                    if (!form.current?.product?.update) delete form.current.product
                    if (!form.current?.collection.length) delete form.current.collection
                    if (!form.current?.variant.length) delete form.current.variant
                    if (!form.current?.option.length) delete form.current.option
                    //api chưa xong. còn api upload với api delete image
                    dispatch(doUploadProduct({
                        data: form.current,
                        id: id
                    }))
                    .then(() => {
                        setIsLoading(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Update product success!',
                        }).then((result) => {
                            returnAfterAdd();
                        })
                    });
                } else {
                    if (!form.current?.collection?.length) delete form.current.collection
                    if (!form.current?.variant?.length) delete form.current.variant
                    if (!form.current?.option?.length) delete form.current.option
                    const createObj = {
                        storeId: params.storeId,
                        productObj: form.current
                    }
                    dispatch(doCreateProduct(createObj))
                    .then((res) => {
                        setIsLoading(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Create successful products!',
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
    const deleteProduct = () => {
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
                dispatch(doDeleteProduct({
                    id: form.current.product.id
                })).then((result) => {
                    setIsLoading(false);
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
            product: {
                ...form?.current?.product,
                store_id: params.storeId
            }
        }
        if (mode === "ADD") {
            form.current.product.status = 'Draft';
            form.current.product.vendor = nameStore;
        }
        dispatch(doGetListCollectionOfStores({
            id: params.storeId,
            params: {}
        }));   
        dispatch(doGetAllType({
            id: params.storeId
        })).then((result) => {
            setCustomTypeList(result.payload);
        })
        dispatch(doGetAllVendor({
            id: params.storeId
        })).then((result) => {
            setVendorList(result.payload);
        })
    }, [])
    useEffect(() => {
        if (mode) {
            if (oldForm && mode === 'EDIT') {
                form.current = oldForm;
                if (form.current.product.description) delete form.current.product.description;
                setCollectionSelected(oldForm.collection || []);
                setVendorValue(oldForm.product.vendor);
            }
            else {
                form.current = {}
                form.current = {
                    product: {
                        store_id: params.storeId,
                        status: 'Draft',
                        vendor: nameStore
                    }
                }
            }
        }

    }, [oldForm, mode, params.storeId])
    useEffect(() => {
        if (vendorList.length) {
            if (!vendorList.includes(nameStore)) vendorList.push(nameStore);
            setOptionVendor(vendorList);
        }
    }, [vendorList])
    return (
        <>
        <FormGroup key={mode === 'EDIT' ? '1' : '2'}>
            <div className="row  text-black">  
                <div className="offset-1 offset-sm-1 col-11 col-sm-11 col-md-7 col-lg-7 col-xl-7">   
                    <Paper elevation={5} style={{padding: '1rem 2rem'}}>
                        <InputLabel name='title' className="text-header" style={{margin: 0}}>Title</InputLabel>
                        <TextField
                            className="text-field-input text-content"
                            id="title-product"
                            name='title'
                            onChange={handleChangeProductName}
                            fullWidth
                            required
                            error={errorTitle ? true : false}
                            helperText={errorTitle}
                            value={form.current?.product?.title || ''}
                            key={"Name"}
                            FormHelperTextProps={{
                                className: 'error-text'
                            }}
                        />
                        <InputLabel style={{margin: 0, marginBottom: '0.75rem'}} className="text-header">Description</InputLabel>
                        <ReactQuill
                            className="text-content"
                            defaultValue={mode === "EDIT" && oldForm?.product?.description ? oldForm?.product?.description : ""}
                            onChange={(event) => handleChangeRichtext(event)}
                        />
                    </Paper> 
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <ImageInput mode={mode} formRef={form} oldForm={oldForm}></ImageInput>
                    </Paper> 
                    
                   <PricingComponent currency={selectCurrency} handleChangeCurrency={handleChangeCurrency} mode={mode} key="PricingComponent" formRef={form} isVariant={isVariant} oldForm={oldForm}></PricingComponent>
                    <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <InputLabel name='title' className="text-header" style={{margin: 0, marginBottom: '1rem'}}>Inventory</InputLabel>
                        <div className="row">
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">

                                <InputLabel className="text-label" name='title' style={{margin: 0}}>SKU (Stock Keeping Unit)</InputLabel>
                                <TextField
                                    style={{width: 'auto'}}
                                    className="text-field-input text-content"
                                    name='title'
                                    fullWidth
                                    required
                                    onChange={(e) => handleOnChangeSKU(e)}
                                    defaultValue={mode === "EDIT" && oldForm?.product?.sku ? oldForm?.product?.sku : ""}
                                />
                            </div>
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">  
                                <InputLabel className="text-label" name='title' style={{margin: 0}}>Quantity</InputLabel>
                                <BaseNumberField length={8} className={`${isVariant && 'disabled-text'}`} key="Inventory" disabled={isVariant}  value={oldForm?.product?.inventory} fullWidth={true} setValue={(value) => handleOnChangeInventory(value)}></BaseNumberField>
                            </div>
                        </div>
                        <div>
                            <FormControlLabel
                                className='font-weight-normal text-label'
                                style={{padding: 8}}
                                control={
                                    <Checkbox defaultChecked={mode === "EDIT" && oldForm?.product?.continue_sell ? oldForm?.product?.continue_sell : false} onChange={(event) => onChangeIsContinueSelling(event)}/>
                                }
                                label="Continue selling when out of stock" />
                        </div>
                    </Paper> 
                    <Variant key="Variant" currency={selectCurrency} handleChangeCurrency={handleChangeCurrency} optionRef={optionRef} mode={mode}  formRef={form} setIsVariant={setIsVariant} oldForm={oldForm}
                    ></Variant>
                </div>   
                <div className="offset-1 offset-sm-1 offset-md-0 offset-lg-0 offset-xl-0 col-11 col-sm-11 col-md-4 col-lg-4 col-xl-4">                      
                    <Paper elevation={5}  style={{padding: '1rem 2rem'}}>
                        <InputLabel style={{marginBottom: '1rem'}} className="text-header" name='title'>Status</InputLabel>
                        <div key={form?.current?.product?.status || "SelectStatus"}>
                            <Select fullWidth
                            key={"SelectStatusSelectInput"}
                            className="poper-item text-content"
                            value={form.current?.product?.status || 'Draft'}
                            onChange={(e) => handleOnChangeStatus(e)}
                            >
                                <MenuItem value="Draft" fullWidth>Draft</MenuItem>
                                <MenuItem value="Active" fullWidth>Active</MenuItem>
                            </Select>
                        </div>
                    </Paper> 
                    <Paper elevation={5}  style={{padding: '1rem 2rem', marginTop: "2rem"}}>
                        <InputLabel style={{marginBottom: '1rem'}} className="text-header">Product organization</InputLabel>
                        <CustomType formRef={form} oldForm={oldForm} customTypeList={customTypeList} mode={mode}></CustomType>
                        
                        <InputLabel style={{marginBottom: '1rem', marginTop: "1rem"}} className="text-label">Vendor</InputLabel>
                        <div key={ "SelectVendor"}>
                            <Autocomplete
                                className="auto-complete-vendor"
                                value={vendorValue || ''}
                                onChange={(e, newValue) => {
                                    setVendorValue(newValue);
                                    handleOnChangeVendor(newValue);
                                }}
                                inputValue={vendorValue || ''}
                                onInputChange={(event, newInputValue) => {
                                    setVendorValue(newInputValue);
                                    handleOnChangeVendor(newInputValue);
                                }}
                                options={optionVendor}
                                fullWidth
                                renderInput={(params) => <TextField {...params} 
                                onChange = {(e) => {
                                    if (!e.target.value) e.target.value = "";
                                }}
                                className="text-field-input text-content" size="small" />}
                            />
                        </div>
                        

                        <InputLabel style={{marginBottom: '1rem', marginTop: "1rem"}} className="text-label" name='title'>Collection</InputLabel>
                        <div key={"SelectCollection"}>
                            <Select
                                fullWidth multiple
                                className="poper-item text-content"
                                value={collectionSelected?.map((value) => value.id)}
                                onChange={(e) => handleChangeCollection(e)}
                                key={"Select-Collection-Select"}
                                renderValue={() => (
                                    [<div key={`null-collection`}></div>]
                                )}
                            >
                                {collectionList.map((collection, index) => {
                                    return <MenuItem value={collection.id} key={`collection-list-${index}`}>
                                        <Checkbox checked={collectionSelected.some(el => el.id === collection.id)} />
                                        {collection.name}
                                    </MenuItem>      
                                })}
                            </Select>
                        </div>
                        {collectionSelected?.length > 0 ?
                            collectionSelected.map((collection, index) => {
                                return <Chip className="collection-chip" key={index} label={collection.name} onDelete={() => handleChangeDeleteCollection(collection.id)}/>
                            })
                        : ""}
                    </Paper> 
                </div>    
            </div>
            
            <Divider className="custom-devider" style={{marginTop: 15}} />
            <div className="mt-4 mb-4 row form-group-button">
                <div className="col-6">
                    {
                    mode === "EDIT" ?
                    <button onClick={deleteProduct} className="float-left btn btn-light btn-product btn-delete-product">Delete</button>
                    : ""}
                </div>
                <div className="col-6">
                    <button onClick={saveProduct} className="float-right btn btn-success btn-product">Save</button>
                </div>
            </div> 
        </FormGroup> 
        <LoadingModal show={isLoading} />
        </>
    );
}

export default FormProduct;