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

const Item = ({setSubtotal = () => {}, subTotal = 0,thumbnail, productCurrency,selectCurrency, name, price, parentName, is_variant, product_id, variant_id, handleDelete=() => {}})=> { // mode add or update
    const [quantity, setQuantity] = useState('');
    const [totalShow, setTotalShow] = useState(0);
    useEffect(() => {
        if (selectCurrency === productCurrency) {
            setTotalShow(quantity * 1.0 * price || 0)
            setSubtotal(1000)
        }
        else if (selectCurrency === 'VND') {
            setTotalShow(Number(quantity * 1.0 * price || 0).toFixed(0))
            setSubtotal(1000)
        }
        else {
            setTotalShow(Number(quantity * 1.0 * price || 0).toFixed(2))
            setSubtotal(1000)
        }
    }, [quantity])
    return (
        <ListItem
            key={`${product_id}-${variant_id}-show-product`}
            style={{ textAlign: 'center', display: 'flex' , justifyContent: 'space-between'}}
        >
            <div className="w-100" style={{ display: 'inline-flex', minWidth: 225}}>
                {
                    thumbnail ?
                        <Box style={{width: 35, height: 'auto', marginRight: 30}}>
                            <ListItemAvatar>
                                <img alt="thumbnail" src={thumbnail}/>
                            </ListItemAvatar>
                        </Box>
                        : <Box style={{width: 35, height: 'auto', marginRight: 30}}>
                            <ListItemAvatar>
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
                <BaseNumberField length={8} key="Inventory" fullWidth={true} value={quantity} setValue={setQuantity} ></BaseNumberField>
            </div>
            <div style={{minWidth: 200}}>
                <ListItemText
                    primary={`${selectCurrency} ${totalShow}`}
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