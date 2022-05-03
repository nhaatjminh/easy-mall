import React, {useEffect, useState} from "react";
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import { Dropdown } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doSwitchSelectedStore } from "../../redux/slice/storeSlice";
import { Key } from "../../constants/constForNavbarDetail";

const NavBarDetailStore = ({isDesktop, keySelected}) => {
    const params = useParams();
    let routeChange = useNavigate(); 
    //use redux to manage state
    const dispatch = useDispatch();
    const nameStore = useSelector((state) => state.listStore.selectedName);
    const listStoreInStore = useSelector((state) => state.listStore.listStore);
    return (
        <>
            <Stack direction="column" spacing={3} alignItems="stretch" className={`all-nav-detail   ${isDesktop ? "desktop" : "mobile"}`} > 
                <Stack direction="column" spacing={0} >  
                
                    {isDesktop ? "" :
                    <Stack direction="row" spacing={0} >  
                        <Avatar
                            src={process.env.PUBLIC_URL + '/img/Logo.png'}
                            style={{ height: '3rem', width: '3rem' }}
                        /> 
                        <Typography component={'span'} ><p className="mt-3 font-weight-bold mr-0-3rem">{nameStore}</p></Typography>
                        <Dropdown className="float-right dropdown-store-detail p-0">
                            <Dropdown.Toggle id="dropdown-basic">       
                                <i className="fa-angle-down fa-icon  float-right fa-store-detail"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                    {listStoreInStore ? listStoreInStore.map((store, index) => (
                                        <div onClick={() => {     
                                            dispatch(doSwitchSelectedStore(store.name));   
                                            routeChange(`/store-detail/manage-home/${store.id}`)
                                        }}>
                                            <Dropdown.Item href="#" key={index}> <p className="text-nav m-0">{store.name}</p> <p >{store.storeLink}</p> </Dropdown.Item>
                                        </div>
                                    )) 
                                    : ""}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Stack> }  
                    <Typography component={'span'} className={keySelected === Key.Home ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {
                            routeChange(`/store-detail/manage-home/${params.storeId}`);
                        }}
                    >
                        <p className="m-0 mb-2 mt-2  text-nav-detail">
                            <i className="fa-home fa-icon fa-store-detail-nav "></i>
                            Home
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === Key.Order ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {
                            //routeChange(`/store-detail/manage-home/${params.storeId}`);
                        }}
                    >
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-file-text-o fa-icon fa-store-detail-nav "></i>
                            Order
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === Key.Product ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {
                            routeChange(`/store-detail/manage-product/${params.storeId}`)
                        }}
                    >
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-cube  fa-icon fa-store-detail-nav "></i>
                            Product
                        </p>
                    </Typography>
                    <Stack direction="column" spacing={0} 
                        hidden={(keySelected === Key.Product) || 
                                (keySelected === Key.Inventory) ||
                                (keySelected === Key.Collection) ||
                                (keySelected === Key.GiftCard) ? 0 : 1} >         
                        <Typography component={'span'} className={keySelected === Key.Inventory ? "nav-element-selected nav-extend" : "nav-extend"}
                            onClick={() => {
                                //routeChange(`/store-detail/manage-product/${params.storeId}`)
                            }}
                        >
                            <p className="m-0 mb-2 mt-2 text-extend ">
                                Inventory
                            </p>
                        </Typography><Typography component={'span'} className={keySelected === Key.Collection ? "nav-element-selected nav-extend" : "nav-extend"}
                            onClick={() => {    
                                routeChange(`/store-detail/manage-collection/${params.storeId}`)
                            }}
                        >
                            <p className="m-0 mb-2 mt-2 text-extend">
                                Collection
                            </p>
                        </Typography><Typography component={'span'} className={keySelected === Key.GiftCard ? "nav-element-selected nav-extend" : " nav-extend"}
                            onClick={() => {    
                                routeChange(`/store-detail/manage-collection/${params.storeId}`)
                            }}
                        >
                            <p className="m-0 mb-2 mt-2 text-extend">
                                Gift card
                            </p>
                        </Typography>
                    
                    </Stack> 
                    <Typography component={'span'} className={keySelected === Key.Customer ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {    
                            //routeChange(`/store-detail/manage-collection/${params.storeId}`)
                        }}
                    >
                        <p className="m-0 mb-2 mt-2">
                            <i className="fa-user fa-icon fa-store-detail-nav p-0" style={{marginRight: 17}}></i>
                            Customer
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === Key.Analysis ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {    
                            //routeChange(`/store-detail/manage-collection/${params.storeId}`)
                        }}
                    >
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-line-chart fa-icon fa-store-detail-nav "></i>
                            Analysis
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === Key.Marketing ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {    
                            //routeChange(`/store-detail/manage-collection/${params.storeId}`)
                        }}
                    >
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-bullhorn fa-icon fa-store-detail-nav "></i>
                            Marketing
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === Key.Discount ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {    
                            //routeChange(`/store-detail/manage-collection/${params.storeId}`)
                        }}
                    >
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-tags fa-icon fa-store-detail-nav "></i>
                            Discount
                        </p>
                    </Typography>
                
                </Stack> 
                <Stack direction="column" spacing={0} >
                    <p className="m-0 mt-2 ml-1rem ">
                        Sales Channel
                        
                        <button className="btn-icon float-right pt-0">   
                            <i className="fa fa-plus-circle icon-color-black"></i>
                        </button>
                    </p>  
                    <Typography component={'span'} className={keySelected === Key.OnlineStore ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {               
                            routeChange(`/store-detail/themes/${params.storeId}`);
                        }}
                    >
                        <p className="m-0 mb-2 ">
                            <i className="fa-university fa-icon fa-store-detail-nav "></i>
                            Online Store
                            <button className="btn-icon float-right pt-1">   
                                <i className="fa fa-eye icon-color-black"></i>
                            </button>
                        </p>
                    </Typography>
                    <Stack direction="column" spacing={0} 
                        hidden={(keySelected === Key.OnlineStore) || 
                                (keySelected === Key.Theme) ||
                                (keySelected === Key.BlogPost) ||
                                (keySelected === Key.Navigation) ||
                                (keySelected === Key.Preferences) ||
                                (keySelected === Key.Page) ? 0 : 1} >         
                        <Typography component={'span'} className={keySelected === Key.Theme ? "nav-element-selected nav-extend" : "nav-extend"}
                            onClick={() => {               
                                routeChange(`/store-detail/themes/${params.storeId}`);
                            }}
                        >
                            <p className="m-0 mb-2 mt-2 text-extend ">
                                Theme
                            </p>
                        </Typography><Typography component={'span'} className={keySelected === Key.BlogPost ? "nav-element-selected nav-extend" : "nav-extend"}
                            onClick={() => {               
                                //routeChange(`/store-detail/themes/${params.storeId}`);
                            }}
                        >
                            <p className="m-0 mb-2 mt-2 text-extend">
                                Blog Posts
                            </p>
                        </Typography><Typography component={'span'} className={keySelected === Key.Page ? "nav-element-selected nav-extend" : " nav-extend"}
                            onClick={() => {               
                                //routeChange(`/store-detail/themes/${params.storeId}`);
                            }}
                        >
                            <p className="m-0 mb-2 mt-2 text-extend">
                                Pages
                            </p>
                        </Typography>
                        <Typography component={'span'} className={keySelected === Key.Navigation ? "nav-element-selected nav-extend" : " nav-extend"}
                            onClick={() => {               
                                //routeChange(`/store-detail/themes/${params.storeId}`);
                            }}
                        >
                            <p className="m-0 mb-2 mt-2 text-extend">
                                Navigation
                            </p>
                        </Typography>
                        <Typography component={'span'} className={keySelected === Key.Preferences ? "nav-element-selected nav-extend" : " nav-extend"}
                            onClick={() => {               
                                //routeChange(`/store-detail/themes/${params.storeId}`);
                            }}
                        >
                            <p className="m-0 mb-2 mt-2 text-extend">
                                Preferences
                            </p>
                        </Typography>
                    
                    </Stack>      
                </Stack> 
                <Stack direction="column" spacing={0} style={{ marginTop: 'auto' }}>         
                    <Typography component={'span'} className={keySelected === Key.Setting ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {               
                            //routeChange(`/store-detail/themes/${params.storeId}`);
                        }}
                    >
                            <p className="m-0 mb-2 mt-2  text-nav-detail">
                                <i className="fa-gear fa-icon fa-store-detail-nav "></i>
                                Setting
                            </p>
                    </Typography>
                
                </Stack> 
            </Stack>
        </>
    );
}

export default NavBarDetailStore;