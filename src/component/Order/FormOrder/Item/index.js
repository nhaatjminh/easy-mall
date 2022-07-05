import React, {useEffect, useState} from "react";
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Box,
    IconButton
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { BaseNumberField } from "../../../common/BaseNumberField";
import Delete from "@mui/icons-material/Delete";
import { parseLocaleNumber } from "../../../../utils/parseLocaleNumber";

const Item = ({formRef, setSubTotal = () => {},listRate, thumbnail, productCurrency,selectCurrency, name, price, parentName, is_variant, product_id, variant_id, handleDelete=() => {}})=> { // mode add or update
    const [quantity, setQuantity] = useState('');
    const [totalShow, setTotalShow] = useState(0);
    useEffect(() => {
        let total;
        if (selectCurrency === productCurrency) {
            total = quantity * 1.0 * price ?? 0;
            setTotalShow(total)
        } else {
            let rate;
            if (productCurrency === 'USD') {
                rate = listRate?.find(rate => rate.currency === selectCurrency)?.amount ?? 0;
                total = (Number(quantity * 1.0 * price || 0) * rate);
            } else {
                rate = listRate?.find(rate => rate.currency === productCurrency)?.amount ?? 0;
                total = (Number(quantity * 1.0 * price || 0) / rate);
            } 
            if (selectCurrency === 'USD') total = total.toFixed(2);
            else total = total.toFixed(0);
            setTotalShow(total);
        }
        let newObj = {
            id: product_id,
            quantity: quantity ? Number(quantity) : 0,
            price: price,
            currency: productCurrency,
            product_name: parentName,
            is_variant: is_variant,
            total_to_show: total // need delete when save
        }
        if (is_variant) {
            newObj = {
                ...newObj,
                variant_id: variant_id,
                variant_name: name
            }
        }
        if (formRef.current.products) {
            let index;
            if (is_variant) index = formRef.current.products.findIndex(product => product.variant_id === variant_id)
            else index = formRef.current.products.findIndex(product => product.id === product_id);
            if (index >= 0) {
                formRef.current.products[index] = newObj;
            } else {
                formRef.current.products.push(newObj)
            }
        }
        else formRef.current.products = [newObj];
        if (!formRef.current.products) setSubTotal(0)
        else {
            let totalPlus = 0;
            formRef.current.products.map((product) => {
                totalPlus += Number(product.total_to_show);
            })
            setSubTotal(totalPlus)
        }
    }, [quantity, selectCurrency])
    return (
        <ListItem
            key={`${product_id}-${variant_id}-show-product`}
            style={{ textAlign: 'center', display: 'flex' , justifyContent: 'space-between'}}
        >
            <div className="w-100" style={{ display: 'inline-flex', minWidth: 225}}>
                {
                    thumbnail ?
                        <Box style={{width: 35, height: 'auto', marginRight: 30}}>
                            <ListItemAvatar className="image-container m-0">
                                <img alt="thumbnail" src={thumbnail}/>
                            </ListItemAvatar>
                        </Box>
                        : <Box style={{width: 35, height: 'auto', marginRight: 30}}>
                            <ListItemAvatar className="image-container m-0">
                                <img alt="thumbnail" src='/img/default-image-620x600.jpg'/>
                            </ListItemAvatar>
                        </Box>
                }
                <div>
                    <ListItemText
                        className="title-label"
                        primary={parentName}
                    />
                    <ListItemText
                        className="title-product"
                        primary={name}
                    />
                </div>
            </div>
            <div  style={{width: 125, minWidth: 125}}>
                <BaseNumberField length={4} key="Inventory" fullWidth={true} value={quantity} setValue={setQuantity} ></BaseNumberField>
            </div>
            <div style={{minWidth: 200}}>
                <ListItemText
                    primary={`${selectCurrency} ${selectCurrency === 'USD' ? parseLocaleNumber(totalShow,'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(totalShow,'vi-VN')}`}
                />
            </div>
            <div style={{width: 24}}>
                
                <IconButton className="p-0" onClick={() => handleDelete(is_variant, variant_id, product_id)}>
                    <Delete/>
                </IconButton>
            </div>
            <Divider absolute />
        </ListItem>
    );
}

export default Item;