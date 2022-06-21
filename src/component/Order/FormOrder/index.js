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
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from "react-redux";
import { doUploadImageBanner, doCreateCollectionBanner, doDeleteCollectionBanner, doUpdateCollectionBanner } from "../../../redux/slice/bannerSlice";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

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
    const params = useParams();
   
    return (
        <>
        <FormGroup>
            
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
                    <button  style={{width: 'auto'}} className="float-right btn btn-collection btn-success btn-form-product">Save</button>
            
                </div>
            </div>  
        </FormGroup> 
        </>
    );
}

export default FormOrder;