import React, {useEffect, useState} from "react";
import { Paper } from '@mui/material';
import {InputLabel, Stack,InputAdornment, Checkbox , FormControlLabel , Divider, FormHelperText , TextField   } from '@mui/material';

const PricingComponent = ({mode, formRef, isVariant, oldForm}) => {
    const form = formRef;
    const [productPrice, setProductPrice] = useState(null);
    const [costPerItem, setCostPerItem] = useState(null);
    const handleChangeProductPrice = (event) => {
        if (mode === "EDIT") {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    price: Number(event),
                    update: "Change"
                }
            }
        } else {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    price: Number(event)
                }
            }
        }
        setProductPrice(event.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
    const handleChangeProductCostPerItem = (event) => {
        if (mode === "EDIT") {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    cost_item: Number(event),
                    update: "Change"
                }
            }
        } else {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    cost_item: Number(event)
                }
            }
        } 
        setCostPerItem(event.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
    useEffect(() => {
        if (mode === "ADD") {
            setProductPrice(null)
            setCostPerItem(null)
        } else {
            setProductPrice(form.current?.product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
            setCostPerItem(form.current?.product?.cost_item?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        }
    }, [mode])
    useEffect(() => {
        setProductPrice(null);
    }, [isVariant])
    return (
        <>
            <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <InputLabel name='title' className="text-header font-weight-bold" style={{margin: 0, marginBottom: '1rem'}}>Pricing</InputLabel>
                        <div className="row">
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={10}
                                >
                                <InputLabel name='title' className="text-label" style={{margin: 0, marginRight: '1rem'}}>Price</InputLabel>
                                <TextField className={`text-field-input text-content ${isVariant && 'disabled-text'} `}
                                    disabled={isVariant}
                                    style={{width: 'auto'}}
                                    placeholder="0.00"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" style={{paddingLeft: '0.25rem'}}>VND</InputAdornment>,
                                    }} 
                                    onInput = {(e) =>{
                                        e.target.value = e.target.value.replaceAll(',','');
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,15)
                                        if (isNaN(e.target.value)) e.target.value = null;
                                    }}
                                    name='title'
                                    fullWidth
                                    required
                                    value={isVariant ? '' : productPrice}
                                    onChange={(e) => handleChangeProductPrice(e.target.value)}  />
                            </Stack>
                        </div>
                        <Divider className="divider-custom"/>
                        
                        <InputLabel className="text-label" name='title' style={{margin: 0}}>Cost per item</InputLabel>
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={10}
                            >
                            <TextField className="text-field-input text-content"
                                placeholder="0.00"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" style={{paddingLeft: '0.25rem'}}>VND</InputAdornment>,
                                }}
                                onInput = {(e) =>{
                                    e.target.value = e.target.value.replaceAll(',','');
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0,15)
                                    if (isNaN(e.target.value)) e.target.value = null;
                                }}
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                name='title'
                                fullWidth
                                required
                                value={costPerItem}
                                onChange={(e) => handleChangeProductCostPerItem(e.target.value)}  />
                            {costPerItem && productPrice && Number(productPrice.replaceAll(',','')) && Number(costPerItem.replaceAll(',','')) ? 
                            <>
                                <div>
                                    <p style={{margin: 0}}>Margin(%)</p>
                                    <p style={{margin: 0}}>{((Number(productPrice.replaceAll(',','')) - Number(costPerItem.replaceAll(',',''))) / Number(productPrice.replaceAll(',','')) * 100).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p style={{margin: 0}}>Profit(VND)</p>
                                    <p style={{margin: 0}}>{(Number(productPrice.replaceAll(',','')) - Number(costPerItem.replaceAll(',',''))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                </div>
                            </>: ""}
                        </Stack>
                        <FormHelperText id="filled-weight-helper-text">Customers won’t see this</FormHelperText>
                    </Paper>
        </>
    );
}

export default PricingComponent;