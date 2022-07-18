import React, {useEffect, useState} from "react";
import { Paper } from '@mui/material';
import {InputLabel, Stack,InputAdornment, Divider, FormHelperText , TextField   } from '@mui/material';
import { BaseNumberField } from '../../common/BaseNumberField';

const PricingComponent = ({mode, formRef, isVariant, oldForm, currency='VND', handleChangeCurrency= () => {}}) => {
    const form = formRef;
    const [productPrice, setProductPrice] = useState(null);
    const [costPerItem, setCostPerItem] = useState(null);
    const handleChangeProductPrice = (event) => {
        if (mode === "EDIT") {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    price: event,
                    update: "Change"
                }
            }
        } else {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    price: event
                }
            }
        }
        setProductPrice(event);
    }
    const handleChangeProductCostPerItem = (event) => {
        if (mode === "EDIT") {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    cost_item: event,
                    update: "Change"
                }
            }
        } else {
            form.current = {
                ...form?.current,
                product: {
                    ...form?.current?.product,
                    cost_item: event
                }
            }
        } 
        setCostPerItem(event);
    }
    
    useEffect(() => {
        if (mode === "ADD") {
            setProductPrice(null)
            setCostPerItem(null)
        } else {
            setProductPrice(Number(form.current?.product?.price))
            setCostPerItem(Number(form.current?.product?.cost_item))
        }
    }, [mode])
    useEffect(() => {
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
                                <InputLabel name='title' className="text-label" style={{margin: 0, marginRight: '1rem', minWidth: 40}}>Price</InputLabel>
                                <BaseNumberField key="Price" className={`${isVariant && 'disabled-text'}`} disabled={isVariant} currency={currency} handleChangeCurrency={handleChangeCurrency} placeholder={currency === 'USD' ? '0.00' : '0'} value={productPrice} fullWidth={false} setValue={(value) => handleChangeProductPrice(value)}></BaseNumberField>
                            </Stack>
                        </div>
                        <Divider className="divider-custom"/>
                        
                        <InputLabel className="text-label" name='title' style={{margin: 0}}>Cost per item</InputLabel>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            style={{flexWrap: 'wrap'}}
                            >
                                <div style={{display: 'inline-flex'}}>
                                    <BaseNumberField currency={currency} handleChangeCurrency={handleChangeCurrency} placeholder={currency === 'USD' ? '0.00' : '0'} key="CostPerItem"  value={costPerItem} fullWidth={true} setValue={(value) => handleChangeProductCostPerItem(value)}></BaseNumberField>
                            
                                </div>
                            {costPerItem && productPrice ? 
                            <div style={{display: 'inline-flex', marginLeft: 20}}>
                                <div style={{ marginRight: 20}}>
                                    <p style={{margin: 0}}>Margin(%)</p>
                                    <p style={{margin: 0}}>{isNaN((productPrice -costPerItem) / productPrice * 100) ? 0 : ((productPrice -costPerItem) / productPrice * 100).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p style={{margin: 0}}>Profit({`${currency}`})</p>
                                    <p style={{margin: 0}}>{(productPrice - costPerItem).toFixed(2).toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                </div>
                            </div>: ""}
                        </Stack>
                        <FormHelperText id="filled-weight-helper-text">Customers won’t see this</FormHelperText>
                    </Paper>
        </>
    );
}

export default PricingComponent;