import React, {useEffect, useState } from "react";
import {List, ListItem, ListItemText, Collapse, Divider, ListItemIcon, Checkbox, Box, ListItemAvatar} from "@mui/material";
import { parseLocaleNumber } from "../../../utils/parseLocaleNumber";
import BaseEmpty from "../BaseEmpty";
import { useNavigate, useParams } from "react-router-dom";

export const NestedList = ({items, alwayShowExpand = true, valueProduct = [], setValueProduct = (e) => {} ,valueVariant = [], setValueVariant = (e) => {}}) => {

    const [click, setClick] = useState({});
    const [clickVariant, setClickVariant] = useState({});
    const [clickIterminate, setClickIterminate] = useState({});
    const handleClick = (product_id, is_variant, variants) => {
        let newClick = JSON.parse(JSON.stringify(click));
        newClick = {
            ...newClick,
            [`${product_id}`]: !newClick[product_id]
        }
        setClick(newClick)
        setValueProduct(newClick);
        let newClickVariant = JSON.parse(JSON.stringify(clickVariant));
        if (is_variant && variants?.length) {
            variants.forEach((variant) => {
                newClickVariant = {
                    ...newClickVariant,
                    [`${variant.id}`]: newClick[product_id]
                }
            })
            setClickVariant(newClickVariant)
            setValueVariant(newClickVariant);
        }
        let newClickIterminate = JSON.parse(JSON.stringify(clickIterminate));
        let checkEvery = variants?.every(variant => newClickVariant[variant.id])
        let checkSome = variants?.some(variant => newClickVariant[variant.id])
        newClickIterminate = {
            ...newClickIterminate,
            [`${product_id}`]: !checkEvery && checkSome
        }
        setClickIterminate(newClickIterminate);
    };
    const handleClickVariant = (variant_id, product_id, variants) => {
        let newClickVariant = JSON.parse(JSON.stringify(clickVariant));
        newClickVariant = {
            ...newClickVariant,
            [`${variant_id}`]: !newClickVariant[variant_id]
        }
        setClickVariant(newClickVariant)
        setValueVariant(newClickVariant);
        if (newClickVariant[variant_id]) {
            let checkEvery = variants.every(variant => newClickVariant[variant.id])
            let newClick = JSON.parse(JSON.stringify(click));
            newClick = {
                ...newClick,
                [`${product_id}`]: true
            }
            setClick(newClick)
            setValueProduct(newClick);
            let newClickIterminate = JSON.parse(JSON.stringify(clickIterminate));
            newClickIterminate = {
                ...newClickIterminate,
                [`${product_id}`]: !checkEvery
            }
            setClickIterminate(newClickIterminate);
        } else {
            let checkSome = variants.some(variant => newClickVariant[variant.id])
            let newClick = JSON.parse(JSON.stringify(click));
            if (checkSome) {
                newClick = {
                    ...newClick,
                    [`${product_id}`]: true
                }
            } else {
                newClick = {
                    ...newClick,
                    [`${product_id}`]: false
                }
            }
            setClick(newClick)
            setValueProduct(newClick);
            let newClickIterminate = JSON.parse(JSON.stringify(clickIterminate));
            newClickIterminate = {
                ...newClickIterminate,
                [`${product_id}`]: checkSome
            }
            setClickIterminate(newClickIterminate);
        }
    };
    useEffect(() => {
        setClick(valueProduct);
        setClickVariant(valueVariant);
        let newClickIterminate = JSON.parse(JSON.stringify(clickIterminate));
        Object.keys(valueProduct || {}).map((product_id) => {
            let indexItem = items.findIndex((item) => item.id === product_id);
            let checkEvery = items[indexItem]?.variants?.every(variant => valueVariant[variant.id])
            let checkSome = items[indexItem]?.variants.some(variant => valueVariant[variant.id])
            newClickIterminate = {
                ...newClickIterminate,
                [`${product_id}`]: !checkEvery && checkSome
            }
        })
        setClickIterminate(newClickIterminate);
    }, [])
    
    const params = useParams();
    const routeChange = useNavigate();
    return (
        <div>
            {items?.length ? items?.map(item => {
                return (
                    <List
                        key={item.id}
                        className='m-0 p-0'
                    >
                        <div key={item.id}>
                            {item?.is_variant ? (
                                <div key={item.id}>
                                    <ListItem
                                        button
                                        key={item.id}
                                        onClick={() => handleClick(item.id, item.is_variant, item.variants)}
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={!!click[item.id]}
                                                tabIndex={-1}
                                                disableRipple
                                                indeterminate={!!clickIterminate[item.id]}
                                            />
                                        </ListItemIcon>
                                        {
                                            item.thumbnail ?
                                                <Box style={{width: 80, height: 'auto'}}>
                                                    <ListItemAvatar className="image-container-item-list m-0">
                                                        <img alt="image" src={item.thumbnail}/>
                                                    </ListItemAvatar>
                                                </Box>
                                            : <Box style={{width: 80, height: 'auto'}}>
                                                    <ListItemAvatar className="image-container-item-list m-0">
                                                        <img alt="image" src='/img/default-image-620x600.jpg'/>
                                                    </ListItemAvatar>
                                                </Box>
                                        }
                                        <ListItemText
                                            className="text-label-span"
                                            primary={item.title}
                                        />
                                        <Divider key={item.id} absolute />
                                    </ListItem>
                                    
                                    <Collapse
                                        key={items.id}
                                        component="li"
                                        in={click[item.id] || alwayShowExpand}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List className="m-0">
                                            {item?.variants?.map(sitem => {
                                                return (
                                                    <>
                                                        <ListItem
                                                            button
                                                            key={sitem.id}
                                                            style={{ padding: '10px 0 10px 50px' }}
                                                            onClick={() => handleClickVariant(sitem.id, item.id, item.variants)}
                                                        >
                                                            <ListItemIcon>
                                                                <Checkbox
                                                                    edge="start"
                                                                    checked={!!clickVariant[sitem.id]}
                                                                    tabIndex={-1}
                                                                    disableRipple
                                                                />
                                                            </ListItemIcon>
                                                            <div className="w-100" style={{ display: 'flex'}}>
                                                                <div className="col-4">
                                                                    <ListItemText
                                                                        key={sitem.id}
                                                                        className="text-content-span"
                                                                        primary={sitem.name}
                                                                    />
                                                                </div>
                                                                <div className="col-4">
                                                                    <ListItemText
                                                                        style={{paddingLeft: 15}}
                                                                        primary={`${sitem.quantity} available`}
                                                                    />
                                                                </div>
                                                                <div className="col-4">
                                                                <ListItemText
                                                                    primary={`${item.currency === 'USD' ? parseLocaleNumber(sitem.price,'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(sitem.price,'vi-VN')} ${item.currency}`}
                                                                />
                                                                </div>
                                                            </div>
                                                            
                                                            
                                                            <Divider key={sitem.id} absolute />
                                                        </ListItem>
                                                        
                                                    </>
                                                )}
                                            )}
                                        </List>
                                    </Collapse>
                                </div>
                            ) : (
                                <>
                                    <ListItem
                                        button
                                        onClick={() => handleClick(item.id)}
                                        key={item.id}
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={!!click[item.id]}
                                                tabIndex={-1}
                                                disableRipple
                                            />
                                        </ListItemIcon>
                                        {
                                            item.thumbnail ?
                                                <Box style={{width: 80, height: 'auto'}}>
                                                    <ListItemAvatar className="image-container-item-list m-0">
                                                        <img alt="image" src={item.thumbnail}/>
                                                    </ListItemAvatar>
                                                </Box>
                                            : <Box style={{width: 80, height: 'auto' }}>
                                                    <ListItemAvatar className="image-container-item-list m-0">
                                                        <img alt="image" src='/img/default-image-620x600.jpg'/>
                                                    </ListItemAvatar>
                                                </Box>
                                        }
                                        <div className="w-100" style={{ display: 'flex'}}>
                                            <div className="col-4">
                                                
                                                <ListItemText
                                                    className="text-label-span"
                                                    primary={item.title}
                                                />
                                            </div>
                                            <div className="col-4">
                                                <ListItemText
                                                    primary={`${item.inventory} available`}
                                                />
                                            </div>
                                            <div className="col-4">
                                                <ListItemText
                                                    primary={`${item.currency === 'USD' ? parseLocaleNumber(item.price,'en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2})  : parseLocaleNumber(item.price,'vi-VN')} ${item.currency}`}
                                                />
                                            </div>
                                        </div>
                                        <Divider key={item.id} absolute />
                                    </ListItem>
                                    
                                </>
                                
                            )}
                        </div>
                    </List>
                );
            }) : <div style={{ paddingTop: 10}}>
                <BaseEmpty></BaseEmpty>
            </div>}
        </div>
    );
}
export default NestedList;
