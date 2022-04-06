import React, {useState, useEffect} from "react";
import Stack from '@mui/material/Stack';
import { Paper, TextField, InputLabel, MenuItem, Select, Input, FormGroup, FormControlLabel, Checkbox, InputAdornment, FormHelperText} from '@material-ui/core';
import {EditorState} from 'draft-js'
import { Editor } from "react-draft-wysiwyg";
import Divider from '@mui/material/Divider';
import FormProduct from './FormProduct'
import './index.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector, useDispatch } from "react-redux";
import {  doSwitchTitle, doSwitchDescription, doSwitchCollection } from "../../redux/slice/formProduct";
const AddProduct = ( {returnTable })=> {
    // use redux to manage state
    const dispatch = useDispatch();
    var titleProduct = useSelector((state) => state.formProduct.title);
    var changeTitleProduct = (name) => {
        dispatch(doSwitchTitle(name));
    }
    var descriptionProduct = useSelector((state) => state.formProduct.description);
    var changeDescriptionProduct = (list) => {
        dispatch(doSwitchDescription(list));
    }
    var CollectionProduct = useSelector((state) => state.formProduct.collection);
    var changeCollectionProduct = (list) => {
        dispatch(doSwitchCollection(list));
    }
    const [editorState, setEditorState] = useState(()=> EditorState.createEmpty());
    const [trackQuantity, setTrackQuantity] = useState(false);
    const onChangeTrackQuantity = () => {
        setTrackQuantity(!trackQuantity);
    }
    return (
        <>
         <div className="row">  
            <div className="offset-1 col-1" style={{width: '5%'}}>
                <button className="btn-icon mt-1" onClick={returnTable}>              
                    <i className="fa-angle-left fa-icon  float-right fa-store-login" ></i>
                </button>
            </div>   
            <div className="col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9 pt-3 ">                      
                <h5 className="font-weight-bold text-create-store mt-3">Tạo Cửa Hàng</h5>
            </div>    
        </div>
        <FormProduct></FormProduct>
        </>
    );
}

export default AddProduct;