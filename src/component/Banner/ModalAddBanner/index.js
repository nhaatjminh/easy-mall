import React, {useState} from "react";
import BaseModal from '../../common/BaseModal'
import {
    Box,
    InputLabel,
    Autocomplete,
    TextField,
    TextareaAutosize 
} from '@mui/material';
import './index.css';
import ImageInput from "../ImageInput"

const ModalAddBanner = ({form, oldForm, mode}) => {
    const handleOk = () => {

    }
    return (
        <>
            <BaseModal
                title="Add Banner"
                titleButton={<i className="fa fa-plus-circle icon-color-black media-select-button float-right  btn btn-form-product p-1"></i>}
                onOK={handleOk}
                showAction={true}
                classNameModal='add-banner-modal'>
                    <div>
                        <InputLabel name='title' className="text-medium  " style={{margin: 0}}>Caption</InputLabel>
                        <TextField
                            className="text-field-input text-content "
                            style={{marginLeft: 10}}
                            fullWidth
                            inputProps={{ maxLength: 255 }}
                        />
                    </div>
                    <div>
                        <InputLabel style={{margin: 0, marginBottom: '0.75rem'}} className="text-medium">Description</InputLabel>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            minRows={5}
                            maxLength={255}
                            maxRows={5}
                            style={{width: '100%'}}
                        />
                    </div>
                    <div>
                        <InputLabel style={{margin: 0, marginBottom: '0.75rem'}} className="text-medium">Link</InputLabel>    
                        <Autocomplete
                                className="auto-complete-vendor"
                                value={''}
                                onChange={(e, newValue) => {
                                   
                                }}
                                inputValue={''}
                                onInputChange={(event, newInputValue) => {
                                }}
                                options={[]}
                                fullWidth
                                renderInput={(params) => <TextField {...params} 
                                onChange = {(e) => {
                                    if (!e.target.value) e.target.value = "";
                                }}
                                className="text-field-input text-content" size="small" />}
                            />    
                    </div>
                    <div style={{ border: `1px solid #666666`}}>
                    </div>
            </BaseModal>
        </>
    );
}

export default ModalAddBanner;