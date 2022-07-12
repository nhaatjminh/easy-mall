import React from "react";
import {
    ListItem,
    ListItemText,
    ListItemAvatar,
    Box
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { parseLocaleNumber } from "../../../../utils/parseLocaleNumber";

const ItemFollow = ({thumbnail, productCurrency, name, price,quantity, parentName, product_id, variant_id})=> { 
    return (
        <ListItem
            key={`${product_id}-${variant_id}-show-product`}
            style={{ textAlign: 'center', display: 'flex' , justifyContent: 'space-between'}}
        >
            <div className="w-100" style={{ display: 'inline-flex', minWidth: 225}}>
                {
                    thumbnail ?
                        <Box style={{width: 80, height: 'auto'}}>
                            <ListItemAvatar className="image-container-item-list m-0">
                                <img alt="thumbnail" src={thumbnail}/>
                            </ListItemAvatar>
                        </Box>
                        : <Box style={{width: 80, height: 'auto'}}>
                            <ListItemAvatar className="image-container-item-list m-0">
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
                <ListItemText
                    primary={`${quantity}`}
                />
            </div>
            <div style={{minWidth: 200}}>
                <ListItemText
                    primary={`${productCurrency === 'USD' ? parseLocaleNumber(price,'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(price,'vi-VN')} ${productCurrency}`}
                />
            </div>
            <Divider absolute />
        </ListItem>
    );
}

export default ItemFollow;