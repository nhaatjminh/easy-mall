import React, {useState} from "react";
import { Paper } from '@material-ui/core';

import {InputLabel, Stack,InputAdornment, Checkbox , FormControlLabel , Divider, FormHelperText , TextField   } from '@mui/material';

const PricingComponent = ({mode, formRef, isVariant, oldForm}) => {
    const form = formRef;
    const [productPrice, setProductPrice] = useState(Number(oldForm?.product?.price) || 0);
    const [costPerItem, setCostPerItem] = useState(Number(oldForm?.product?.cost_item) || 0);
    const handleChangeProductPrice = (event) => {
        setProductPrice(Number(event));
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
    }
    const handleChangeProductCostPerItem = (event) => {
        setCostPerItem(Number(event));
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
        
    }
    const handleChangeChargeTax = (event) => {
        if (mode === "EDIT") {  
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    is_charge_tax: event,
                    update: "Change"
                }
            }
        } else {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    is_charge_tax: event
                }
            }
        }
    }
    return (
        <>
            <Paper elevation={5} style={{padding: '1rem 2rem', marginTop: '2rem'}}>
                        <InputLabel name='title' className="text-medium  font-weight-bold" style={{margin: 0, marginBottom: '1rem'}}>Pricing</InputLabel>
                        <div className="row">
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={10}
                                >
                                <InputLabel name='title' className="text-normal" style={{margin: 0, marginRight: '1rem'}}>Price</InputLabel>
                                <TextField className="text-field-input"
                                    disabled={isVariant}
                                    style={{width: 'auto'}}
                                    placeholder="0.00"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" style={{paddingLeft: '0.25rem'}}>VND</InputAdornment>,
                                    }}
                                    name='title'
                                    fullWidth
                                    required
                                    defaultValue={oldForm?.product?.price || 0}
                                    onChange={(e) => handleChangeProductPrice(e.target.value)}  />
                            </Stack>
                        </div>
                        <FormControlLabel style={{paddingLeft: "0.5rem"}} control={<Checkbox onChange={(event) => handleChangeChargeTax(event.target.checked)}/>} className='font-weight-normal' label="Charge tax on this product" />
                        <Divider className="divider-custom"/>
                        
                        <InputLabel name='title' style={{margin: 0}}>Cost per item</InputLabel>
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={10}
                            >
                            
                            <TextField className="text-field-input"
                                placeholder="0.00"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" style={{paddingLeft: '0.25rem'}}>VND</InputAdornment>,
                                }}
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                name='title'
                                fullWidth
                                required
                                
                                defaultValue={oldForm?.product?.cost_item || 0}
                                onChange={(e) => handleChangeProductCostPerItem(e.target.value)}  />
                            {costPerItem && productPrice ? 
                            <>
                                <div>
                                    <p style={{margin: 0}}>Margin ̣(%)</p>
                                    <p style={{margin: 0}}>{(productPrice - costPerItem)/productPrice * 100} %</p>
                                </div>
                                <div>
                                    <p style={{margin: 0}}>Profit ($)</p>
                                    <p style={{margin: 0}}>${productPrice - costPerItem}</p>
                                </div>
                            </>: ""}
                        </Stack>
                        <FormHelperText id="filled-weight-helper-text">Customers won’t see this</FormHelperText>
                    </Paper>
        </>
    );
}

export default PricingComponent;