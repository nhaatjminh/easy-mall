import React, {useState, useRef, useEffect} from "react";
import BaseModal from '../../../common/BaseModal'
import './index.css';
import {
    TextField,
    InputLabel,
} from '@mui/material';

const ModalAddVariant = ({form, optionValue, optionRef}) => {
    const handleOk = () => {

    }
    useEffect(() => {
        console.log(1);
    }, [optionRef])
    return (
        <>
            <BaseModal
                title={"Add Variant"}
                titleButton={"Add Variant"}
                onOK={handleOk}
                showAction={true}
                classNameModal='add-variant-modal'>
                {optionRef.current ? 
                optionRef.current.map(option => {
                    return (
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <p style={{margin: 0}}>{option.name}: </p>
                            <TextField
                                style={{width: 'auto'}}
                                className="text-field-input"
                                name='title'
                                fullWidth
                                required
                                onChange={(e) => console.log(e)}
                            />
                        </div>
                    )
                })
                : <></>}
                {optionRef.current ? 
                <>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p style={{margin: 0}}>Price: </p>
                        <TextField
                            style={{width: 'auto'}}
                            className="text-field-input"
                            name='title'
                            fullWidth
                            required
                            onChange={(e) => console.log(e)}
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <p style={{margin: 0}}>Quantity: </p>
                        <TextField
                            style={{width: 'auto'}}
                            className="text-field-input"
                            name='title'
                            fullWidth
                            required
                            onChange={(e) => console.log(e)}
                        />
                    </div>
                </>
                : <></>}
            </BaseModal>
        </>
    );
}

export default ModalAddVariant;