import React, {useEffect, useState} from "react";
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Box,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { BaseNumberField } from "../../../common/BaseNumberField";

const Item = ({thumbnail, currency, name, id, price, parentName})=> { // mode add or update
    const [quantity, setQuantity] = useState('');
    const [totalShow, setTotalShow] = useState(0);
    useEffect(() => {
        setTotalShow(quantity * 1.0 * price || 0)
    }, [quantity])
    return (
        <ListItem
            key={`${id}-show-product`}
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
            <div  style={{width: 150, minWidth: 150}}>
                <BaseNumberField length={8} key="Inventory" fullWidth={true} value={quantity} setValue={setQuantity} ></BaseNumberField>
            </div>
            <div style={{minWidth: 200}}>
                <ListItemText
                    primary={`${currency} ${totalShow}`}
                />
            </div>
            <Divider key={id} absolute />
        </ListItem>
    );
}

export default Item;