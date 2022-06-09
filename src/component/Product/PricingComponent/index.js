import React, {useEffect, useState} from "react";
import { Paper } from '@mui/material';
import {InputLabel, Stack,InputAdornment, Divider, FormHelperText , TextField   } from '@mui/material';
import { BaseNumberField } from '../../common/BaseNumberField';

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
        setProductPrice(event);
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
                                <InputLabel name='title' className="text-label" style={{margin: 0, marginRight: '1rem'}}>Price</InputLabel>
                                <BaseNumberField key="Price" className={`${isVariant && 'disabled-text'}`} disabled={isVariant} currency="VND" placeholder="0.00" value={productPrice} fullWidth={false} setValue={(value) => handleChangeProductPrice(value)}></BaseNumberField>
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
                                <BaseNumberField currency="VND" placeholder="0.00" key="CostPerItem"  value={costPerItem} fullWidth={true} setValue={(value) => handleChangeProductCostPerItem(value)}></BaseNumberField>
                            {costPerItem && productPrice ? 
                            <>
                                <div>
                                    <p style={{margin: 0}}>Margin(%)</p>
                                    <p style={{margin: 0}}>{((productPrice -costPerItem) / productPrice * 100).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p style={{margin: 0}}>Profit(VND)</p>
                                    <p style={{margin: 0}}>{(productPrice - costPerItem).toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                                </div>
                            </>: ""}
                        </Stack>
                        <FormHelperText id="filled-weight-helper-text">Customers won’t see this</FormHelperText>
                    </Paper>
        </>
    );
}

export default PricingComponent;