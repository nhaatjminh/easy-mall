import React, {useState, useEffect, useRef, Fragment } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import {
    Paper,
    TextField,
    InputLabel,
    Box,
    MenuItem,
    FormGroup,
    ListItemText,
    IconButton,
    ListItemAvatar,
    TextareaAutosize
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import './index.css'
import ImageInput from "../ImageInput"
import ReactQuill from 'react-quill'
import { useSelector, useDispatch } from "react-redux";
import { doUploadImageBanner, doCreateCollectionBanner, doDeleteCollectionBanner, doUpdateCollectionBanner } from "../../../redux/slice/bannerSlice";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import { BackIcon } from "../../../assets/icon/svg/BackIcon";
import { CollectionIcon } from "../../../assets/icon/svg/Collection";
import { PagesIcon } from "../../../assets/icon/svg/Pages";
import { ProductIcon } from "../../../assets/icon/svg/Product";
import { Root, Listbox, InputWrapper, SpanError } from './FormBanner.styled';
import { doGetListPages } from '../../../redux/slice/pageSlice';
import { doGetListProductsOfStores } from '../../../redux/slice/productSlice';
import { doGetListCollectionOfStores } from '../../../redux/slice/collectionSlice';
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
const FormBanner = ({mode, oldForm, returnAfterAdd})=> { // mode add or update
    const dispatch = useDispatch();
    let form = useRef({});
    const urlStore = useSelector((state) => state.listStore.baseStoreUrl);
    const params = useParams();
    const [errorTitle, setErrorTitle] = useState(null);
    const [listBanner, setListBanner] = useState([]);
    const [showAddBanner, setShowAddBanner] = useState(false);
    const [customUrl, setCustomUrl] = useState('');
    const [valueToAdd, setValueToAdd] = useState({});
    const [typeLink, setTypeLink] = useState('');
    const [optionCollection, setOptionCollection] = useState([]);
    const [optionPage, setOptionPage] = useState([]);
    const [optionProduct, setOptionProduct] = useState([]);
    const [validateLink, setValidateLink] = useState(null);
    const [openPopup, setOpenPopUp] = useState(false);
    const handleChangeCaption = (event) => {
        const value = {...valueToAdd};
        value.caption = event.target.value;
        setValueToAdd(value);
    }
    const handleChangeDescription = (event) => {
        const value = {...valueToAdd};
        value.description = event.target.value;
        setValueToAdd(value);
    }
    const handleAddBanner = () => {
        if (!valueToAdd.caption) {
            Swal.fire({
                title: 'Warning',
                text: 'You need enter caption to add',
                icon: 'warning'
            })
        } else if (validateLink) {
            Swal.fire({
                title: 'Error',
                text: 'Url is malformed',
                icon: 'error'
            })
        }
         else {
            let valueNeedPush = {...valueToAdd};
            if (mode === 'EDIT') {
                if (valueToAdd.id) {
                    valueNeedPush.update = 'Change';
                    setShowAddBanner(false);
                    const newListBanner = [...listBanner];
                    let idxOfBannerForList = newListBanner.findIndex((banner) => banner.id === valueNeedPush.id);
                    newListBanner[idxOfBannerForList] = valueNeedPush;
                    setListBanner(newListBanner);
                    let idxOfBannerForForm = newListBanner.findIndex((banner) => banner.id === valueNeedPush.id);
                    form.current.banners[idxOfBannerForForm] = valueNeedPush;
                    setValueToAdd({});
                    setCustomUrl(null);
                } else {
                    valueNeedPush.update = 'Add';
                    setShowAddBanner(false);
                    const newListBanner = [...listBanner];
                    newListBanner.push(valueNeedPush);
                    setListBanner(newListBanner);
                    form.current.banners.push(valueNeedPush);
                    setValueToAdd({});
                    setCustomUrl(null);
                }
            }
        }
    }
    const handleDeleteBanner = (banner) => {
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
                setShowAddBanner(false);
                const newListBanner = [...listBanner];
                let idxOfBannerForList = newListBanner.findIndex((bannerList) => bannerList.id === banner.id);
                newListBanner.splice(idxOfBannerForList, 1);
                setListBanner(newListBanner);
                let idxOfBannerForForm = form.current.banners.findIndex((bannerForm) => bannerForm.id === banner.id);
                setValueToAdd({});
                setCustomUrl(null);
                if (banner.id) {
                    form.current.banners[idxOfBannerForForm].update = 'Delete';
                } else {
                    form.current.banners.splice(idxOfBannerForForm,1)
                }
            }
        })
    }
    const optionLink = [
        {
            title: 'Product',
            icon: <ProductIcon />,
            onClick: () => setTypeLink('Product')
        },
        {
            title:'Collection',
            icon: <CollectionIcon />,
            onClick: () => setTypeLink('Collection')
        },
        {
            title:'Page',
            icon: <PagesIcon />,
            onClick: () => setTypeLink('Page')
        }
    ]
    const handleChangeCollectionBannerName = (event) => {
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
    const saveCollection =  () => {
        if (form?.current?.collection?.name) {   
            Swal.showLoading();
            let ListPromise = [];
            ListPromise.push(new Promise((resolve) => {
                const data = form?.current?.collection?.thumbnail;
                if (data) {
                    const base64result = data.substr(data.indexOf(',') + 1);
                    if (!isBase64(base64result)) {
                        resolve();
                    } else {
                        //need delete image if u change image
                        dispatch(doUploadImageBanner({
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
            }))
            ListPromise.push(new Promise((resolve) => {
                const banners = form?.current?.banners;
                const listData = banners.map(banner => banner.image);
                if (listData && listData.length) {
                    
                    const listPromiseForListData = [];
                    listData.map((data, idxData) => {
                        if (!data) return;
                        const base64result = data.substr(data.indexOf(',') + 1);
                        if (isBase64(base64result)) {
                            //need delete image if u change image
                            listPromiseForListData.push(
                                new Promise((resolveForListData) => {
                                    dispatch(doUploadImageBanner({
                                        data: {
                                            data: [data]
                                        }
                                    })).then((result) => {
                                        if (result?.payload && result?.payload.length > 0) {
                                            // payload is array data response from server, first item to link, so get payload[0] in here                  
                                            form.current.banners[idxData].image =  Object.values(result.payload)[0];
                                        }
                                        resolveForListData();
                                    })
                                })
                            )
                            
                        }
                    }) 
                    Promise.all(listPromiseForListData).then(() => {
                        resolve();
                    })       
                } else {
                    resolve();
                }
            }))
            Promise.all(ListPromise).then(async () => {
                if (mode !== "EDIT") {
                    const createObj = {
                        storeId: params.storeId,
                        collectionObj: form.current
                    }
                    dispatch(doCreateCollectionBanner(createObj))
                    .then((res) => {
                        Swal.close();
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
                    form.current.banners = form.current.banners.filter(banner => {
                        if (banner.update) return true;
                        return false;
                    });
                    if (form.current.banners && !form.current.banners.length) delete form.current.banners;
                    const updateObj = {
                        newCollection: form.current
                    }
                    dispatch(doUpdateCollectionBanner(updateObj))
                    .then((res) => {
                        Swal.close();
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
                Swal.fire({
                    title: 'Please Wait !',
                    html: 'Deleting Collection',// add html attribute if you want or remove
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                        Swal.showLoading()
                    },
                });
                dispatch(doDeleteCollectionBanner({
                    id: form.current.collection.id
                })).then((result) => {
                    Swal.close();
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
        dispatch(doGetListPages(params.storeId)).then((result) => {   
            let exactUrlPage = result.payload.map((page) => ({
                title: `${page.name}`,
                icon: <PagesIcon />,
                url: `https://www.${urlStore}${page.page_url}`,
                onClick: () => setCustomUrl(`https://www.${urlStore}${page.page_url}`)
            }))
            let newOptionPage = [{
                title: 'Back',
                icon: <BackIcon />,
                onClick: () => setTypeLink(null)
            }]
            newOptionPage = newOptionPage.concat(exactUrlPage);
            setOptionPage(newOptionPage);
        })

        dispatch(doGetListProductsOfStores({
            id: params.storeId,
            params: {}
        })).then((result) => {   
            let exactUrlProduct = result.payload.map((product) => ({
                title: `${product.title}`,
                icon: <ProductIcon />,
                url: `https://www.${urlStore}/products?id=${product.id}`,
                onClick: () => setCustomUrl(`https://www.${urlStore}/products?id=${product.id}`)
            }))
            let newOptionProduct = [{
                title: 'Back',
                icon: <BackIcon />,
                onClick: () => setTypeLink(null)
            }]
            newOptionProduct = newOptionProduct.concat(exactUrlProduct);
            setOptionProduct(newOptionProduct);
        })

        dispatch(doGetListCollectionOfStores({
            id: params.storeId,
            params: {}
        })).then((result) => {   
            let exactUrlCollection = result.payload.map((collection) => ({
                title: `${collection.name}`,
                icon: <CollectionIcon />,
                url: `https://www.${urlStore}/collection?id=${collection.id}`,
                onClick: () => setCustomUrl(`https://www.${urlStore}/collection?id=${collection.id}`)
            }))
            let newOptionCollection = [{
                title: 'Back',
                icon: <BackIcon />,
                onClick: () => setTypeLink(null)
            }]
            newOptionCollection = newOptionCollection.concat(exactUrlCollection);
            setOptionCollection(newOptionCollection);
        })
    },[])
    useEffect(() => {
        const value = {...valueToAdd};
        value.link = customUrl;
        setValueToAdd(value);
    }, [customUrl])
    useEffect(() => {
        if (mode) {
            if (oldForm && mode === 'EDIT') {
                form.current = oldForm;
                if (form.current.collection.description) delete form.current.collection.description;
                setListBanner(form.current.banners);
            }
            else {
                form.current = {
                    ...form?.current,
                    collection: {
                        ...form?.current?.collection,
                        store_id: params.storeId
                    },
                    banners: []
                }
            }
        }
    }, [oldForm, mode, params.storeId])
    const checkUrl = (url) => {
        if (!url.startsWith('https://www.')) {
            setValidateLink('startsWith');
        }
        else {
            let newUrl = url.slice(12);
            let haveDot = newUrl.split('.');
            let flagToNotEmpty = haveDot.every(urlSplit => urlSplit !== '')
            if (haveDot.length < 2 || !flagToNotEmpty) setValidateLink('haveDot') 
            else setValidateLink(null);
        }
    }
    const checkType = () => {
        if (!typeLink) return optionLink;
        if (typeLink === 'Product') return optionProduct;
        else if (typeLink === 'Page') return optionPage;
        else return optionCollection;
    }
    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        focused,
        setAnchorEl,
        
      } = useAutocomplete({
        id: 'customized-hook-demo',
        options: checkType(),
        getOptionLabel: (option) => option.title,
      });
    return (
        <>
        <FormGroup>
            <div className="row  text-black">  
                <div className="offset-1 offset-sm-1 col-11 col-sm-11 col-md-7 col-lg-7 col-xl-7">   
                    <Paper elevation={5} style={{padding: '1rem 2rem'}}>
                        <InputLabel name='title' className="text-header " style={{margin: 0}}>Title</InputLabel>
                        <TextField
                            className="text-field-input  text-content"
                            id="title-product"
                            name='title'
                            key={`collection-name`}
                            onChange={handleChangeCollectionBannerName}
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
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <InputLabel name='title' className="text-header p-1" style={{margin: 0}}>List Banner</InputLabel>
                                {showAddBanner
                                ? <></>
                                : <i onClick={() => {
                                    setShowAddBanner(true) 
                                    setValueToAdd({});
                                    setCustomUrl(null);
                                }} className="fa fa-plus-circle icon-color-black media-select-button float-right  btn btn-form-product p-1"></i>
                            }
                            </div>
                            <Box style={{overflowY: "auto", overflowX: 'hidden', maxHeight: 400}}>
                                {listBanner.length ? listBanner.map((banner, index) => {
                                    return (
                                        <div key={banner.id + "item-select"}>
                                            <MenuItem onClick={() => {
                                                setShowAddBanner(true);
                                                setCustomUrl(banner.link)
                                                setValueToAdd(banner);
                                            }} className='row p-0 m-0' key={`${banner.id}-selected`} value={banner.id}>
                                                <p className="pr-2 m-0" style={{width: 20}}>{index}.</p>
                                                {
                                                banner.image ?
                                                    <Box key={`${banner.id} - box`} style={{width: 35, height: 'auto', marginRight: 30}}>
                                                        <ListItemAvatar key={`${banner.id} - avatar`}>
                                                            <img alt="thumbnail" src={banner.image}/>
                                                        </ListItemAvatar>
                                                    </Box>
                                                :  <Box key={`${banner.id} - box`} style={{width: 35, height: 'auto', marginRight: 30}}>
                                                        <ListItemAvatar key={`${banner.id} - avatar`}>
                                                            <img alt="thumbnail" src='/img/default-image-620x600.jpg'/>
                                                        </ListItemAvatar>
                                                    </Box>
                                                }
                                                <div className="responsive-text" style={{ display: `flex`, flexDirection: 'column'}}>

                                                    <ListItemText key={`${banner.id}-caption-title`} className='item-text-banner' primary={banner.caption}/>
                                                    <ListItemText key={`${banner.id}-link-title`} className='item-text-banner' primary={banner.link}/>
                                                </div>
                                                <div style={{width: 35, height: 'auto'}}>
                                                    <IconButton className="float-right text-extra-large" onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteBanner(banner)
                                                    }}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </div>
                                            </MenuItem>
                                            {index !== listBanner.length - 1 && <Divider className="divider-custom" />}
                                            
                                        </div>
                                )}) : <></>}
                            </Box>
                        </div>
                    </Paper>
                    {
                        showAddBanner ?
                        <Paper className='paper-add-banner' elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem', overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <div>
                                
                                <InputLabel name='title' className="text-header pb-2" style={{margin: 0, padding: 0}}>Add Banner</InputLabel>
                                <div>
                                    <InputLabel name='title' className="text-label" style={{margin: 0, padding: 0}}>Caption</InputLabel>
                                    <TextField
                                        className="text-field-input text-content "
                                        style={{marginLeft: 10, padding: 0}}
                                        fullWidth
                                        inputProps={{ maxLength: 255 }}
                                        onChange={handleChangeCaption}
                                        value={valueToAdd?.caption || ''}
                                    />
                                </div>
                                <div>
                                    <InputLabel style={{margin: 0, marginBottom: '0.75rem'}} className="text-label">Description</InputLabel>
                                    <TextareaAutosize
                                        aria-label="empty textarea"
                                        minRows={5}
                                        maxLength={255}
                                        maxRows={5}
                                        style={{width: '100%'}}
                                        onChange={handleChangeDescription}
                                        value={valueToAdd?.description || ''}
                                    />
                                </div>
                                <div>
                                    <InputLabel style={{margin: 0, marginBottom: '0.25rem'}} className="text-label">Link</InputLabel>    
                                    <div {...getRootProps()}>
                                        
                                        <SpanError className="text-error" hidden={!validateLink}>
                                            {
                                                validateLink === 'startsWith' ?
                                                `URL must be start with https://www.
                                                `: validateLink === 'haveDot' ? 
                                                `Example url : https://www.abc.xyz`
                                                : ``
                                            }
                                        </SpanError>
                                        <InputWrapper style={{width: '100%', marginBottom: 15}} ref={setAnchorEl} className={focused ? 'focused' : ''}>
                                            <input {...getInputProps()} value={customUrl} onChange={(e) => {
                                                checkUrl(e.target.value);
                                                setCustomUrl(e.target.value);
                                            }}
                                            onClick={() => {
                                                setOpenPopUp(true);
                                            }}/>
                                        </InputWrapper>
                                    </div>
                                    {groupedOptions.length > 0 && openPopup ? (
                                        <Listbox {...getListboxProps()} style={{ maxHeight: 200}}>
                                            {groupedOptions.map((option, index) => {
                                                return (<li className={`${option?.url && customUrl === option?.url ? 'selected-url' : ''}`} {...getOptionProps({ option, index })} onClick={(e) => {
                                                    
                                                    if (option.onClick) option.onClick();
                                                    if (typeLink && option.title !== 'Back') {
                                                        setOpenPopUp(false);
                                                        getInputProps().ref.current.blur();
                                                        setValidateLink(null);
                                                    };
                                                }}>
                                                    <p style={{paddingRight: 15}}>{option.icon}</p>
                                                    <p>{option.title}</p>
                                                </li>)
                                            })}
                                        </Listbox>
                                    ) : null}
                                
                                </div>
                                <div key={'add-modal-banner-image'}>
                                    <ImageInput boldTitle={false} formRef={form} oldForm={oldForm} mode={mode} modal={true} valueToAdd={valueToAdd} setValueToAdd={setValueToAdd}></ImageInput>
                                </div>
                            </div>
                           
                            <div>
                                <Divider className="custom-devider" style={{marginTop: 15, marginBottom: 15}} />
                                <div className="row float-right" >
                                    <button onClick={() => {
                                        setShowAddBanner(false)
                                        setTypeLink(null);
                                    }} style={{width: 'auto', border: '1px solid #666666', marginRight:15}} className="float-right btn btn-collection btn-light btn-form-product">Cancel</button>
                                    <button onClick={() => {
                                        handleAddBanner();
                                        setTypeLink(null);
                                    }} style={{width: 'auto'}} className="float-right btn btn-collection btn-success btn-form-product">Save</button>
                                </div>
                            </div>
                        </Paper>
                        : <></>
                    }
                </div>   
                <div key={'add-banner-image'} className="offset-1 offset-sm-1 offset-md-0 offset-lg-0 offset-xl-0 col-11 col-sm-11 col-md-4 col-lg-4 col-xl-4">                       
                    <Paper elevation={5} style={{padding: '1rem 2rem'}}>
                        <ImageInput formRef={form} oldForm={oldForm} mode={mode} modal={false}></ImageInput>
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
                    <button onClick={saveCollection} style={{width: 'auto'}} className="float-right btn btn-collection btn-success btn-form-product">Save</button>
            
                </div>
            </div>  
        </FormGroup> 
        </>
    );
}

export default FormBanner;