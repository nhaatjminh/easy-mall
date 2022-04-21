import React, {useState} from "react";
import {Avatar, Button, Grid, Paper, TextField, Typography} from '@material-ui/core';
import { Dropdown } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {  doSwitchListStore, doSwitchSelectedStore } from "../../redux/slice/listStore";
import {  doSwitchKeySelected } from "../../redux/slice/keySelected";

const NavBarDetailStore = ({isDesktop}) => {
    const params = useParams();
    let navigate = useNavigate(); 
    const routeChange = (newPath) =>{
        navigate(newPath);
    }
    //use redux to manage state
    const keySelected = useSelector((state) => state.keySelected.key);
    console.log(keySelected);
    const dispatch = useDispatch();
    var changeKeySelectedParent = (index) => {
        dispatch(doSwitchKeySelected(index));
    }
    var nameStore = useSelector((state) => state.listStore.selectedName);
    var changeNameStoreSelectedCall = (name) => {
        dispatch(doSwitchSelectedStore(name));
    }

    var listStoreInStore = useSelector((state) => state.listStore.listStore);
    var changeListStoreCall = (list) => {
        dispatch(doSwitchListStore(list));
    }
    var listStore = listStoreInStore;
    return (
        <>
            <Stack direction="column" spacing={3} justifyContent="space-between" alignItems="stretch" className={`all-nav-detail   ${isDesktop ? "desktop" : "mobile"}`} > 
                <Stack direction="column" spacing={0} >  
                    {isDesktop ? "" :
                    <Stack direction="row" spacing={0} >  
                        <Avatar
                            src={process.env.PUBLIC_URL + '/img/Logo.png'}
                            style={{ height: '4rem', width: '4rem' }}
                        /> 
                        <Typography component={'span'} ><p className="mt-3 font-weight-bold mr-0-3rem">{nameStore}</p></Typography>
                        <Dropdown className="float-right dropdown-store-detail p-0">
                            <Dropdown.Toggle id="dropdown-basic">       
                                <i className="fa-angle-down fa-icon  float-right fa-store-detail"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                    {listStore ? listStore.map((store, index) => (
                                        <div onClick={() => changeNameStoreSelectedCall(store.name)}>
                                            <Dropdown.Item href="#" key={index}> <p className="text-nav m-0">{store.name}</p> <p >{store.storeLink}</p> </Dropdown.Item>
                                        </div>
                                    )) 
                                    : ""}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Stack> }       
                    <Typography component={'span'} className={keySelected === 1 ? "nav-element nav-element-selected" : "nav-element "}
                    onClick={() => changeKeySelectedParent(1)}>
                        <p className="m-0 mb-2 mt-2  text-nav-detail">
                            <i className="fa-home fa-icon fa-store-detail-nav "></i>
                            Trang chủ
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === 2 ? "nav-element nav-element-selected" : "nav-element "}
                    onClick={() => changeKeySelectedParent(2)}>
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-file-text-o fa-icon fa-store-detail-nav "></i>
                            Đơn hàng
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === 3 ? "nav-element nav-element-selected" : "nav-element "}
                    onClick={() => {
                        routeChange(`/store-detail/manage-product/${params.storeId}`)
                        changeKeySelectedParent(3)
                    }}>
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-cube  fa-icon fa-store-detail-nav "></i>
                            Sản phẩm
                        </p>
                    </Typography>
                    <Stack direction="column" spacing={0} 
                        hidden={(keySelected === 3) || 
                                (keySelected === 31) ||
                                (keySelected === 32) ||
                                (keySelected === 33) ? "" : "true"} >         
                        <Typography component={'span'} className={keySelected === 31 ? "nav-element-selected nav-extend" : "nav-extend"}
                        onClick={() => changeKeySelectedParent(31)}>
                            <p className="m-0 mb-2 mt-2 text-extend ">
                                Kho
                            </p>
                        </Typography><Typography component={'span'} className={keySelected === 32 ? "nav-element-selected nav-extend" : "nav-extend"}
                        onClick={() => changeKeySelectedParent(32)}>
                            <p className="m-0 mb-2 mt-2 text-extend">
                                Bộ sưu tập
                            </p>
                        </Typography><Typography component={'span'} className={keySelected === 33 ? "nav-element-selected nav-extend" : " nav-extend"}
                        onClick={() => changeKeySelectedParent(33)}>
                            <p className="m-0 mb-2 mt-2 text-extend">
                                Quà tặng
                            </p>
                        </Typography>
                    
                    </Stack> 
                    <Typography component={'span'} className={keySelected === 4 ? "nav-element nav-element-selected" : "nav-element "}
                    onClick={() => changeKeySelectedParent(4)}>
                        <p className="m-0 mb-2 mt-2 pl-0-5rem">
                            <i className="fa-user fa-icon fa-store-detail-nav p-0 ml-0-25rem mr-1rem"></i>
                            Khách hàng
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === 5 ? "nav-element nav-element-selected" : "nav-element "}
                    onClick={() => changeKeySelectedParent(5)}>
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-line-chart fa-icon fa-store-detail-nav "></i>
                            Phân tích
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === 6 ? "nav-element nav-element-selected" : "nav-element "}
                    onClick={() => changeKeySelectedParent(6)}>
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-bullhorn fa-icon fa-store-detail-nav "></i>
                            Thị trường
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === 7 ? "nav-element nav-element-selected" : "nav-element "}
                    onClick={() => changeKeySelectedParent(7)}>
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-tags fa-icon fa-store-detail-nav "></i>
                            Giảm giá
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
                    <Typography component={'span'} className={keySelected === 8 ? "nav-element nav-element-selected" : "nav-element "}
                    onClick={() => changeKeySelectedParent(81)}>
                        <p className="m-0 mb-2 ">
                            <i className="fa-university fa-icon fa-store-detail-nav "></i>
                            Online Store
                            <button className="btn-icon float-right pt-1">   
                                <i className="fa fa-eye icon-color-black"></i>
                            </button>
                        </p>
                    </Typography>
                    <Stack direction="column" spacing={0} 
                        hidden={(keySelected === 8) || 
                                (keySelected === 81) ||
                                (keySelected === 82) ||
                                (keySelected === 83) ||
                                (keySelected === 84) ||
                                (keySelected === 85) ? "" : "true"} >         
                        <Typography component={'span'} className={keySelected === 81 ? "nav-element-selected nav-extend" : "nav-extend"}
                        onClick={() => changeKeySelectedParent(81)}>
                            <p className="m-0 mb-2 mt-2 text-extend ">
                                Theme
                            </p>
                        </Typography><Typography component={'span'} className={keySelected === 82 ? "nav-element-selected nav-extend" : "nav-extend"}
                        onClick={() => changeKeySelectedParent(82)}>
                            <p className="m-0 mb-2 mt-2 text-extend">
                                Blog Posts
                            </p>
                        </Typography><Typography component={'span'} className={keySelected === 83 ? "nav-element-selected nav-extend" : " nav-extend"}
                        onClick={() => changeKeySelectedParent(83)}>
                            <p className="m-0 mb-2 mt-2 text-extend">
                                Pages
                            </p>
                        </Typography>
                        <Typography component={'span'} className={keySelected === 84 ? "nav-element-selected nav-extend" : " nav-extend"}
                        onClick={() => changeKeySelectedParent(84)}>
                            <p className="m-0 mb-2 mt-2 text-extend">
                                Navigation
                            </p>
                        </Typography>
                        <Typography component={'span'} className={keySelected === 85 ? "nav-element-selected nav-extend" : " nav-extend"}
                        onClick={() => changeKeySelectedParent(85)}>
                            <p className="m-0 mb-2 mt-2 text-extend">
                                Preferences
                            </p>
                        </Typography>
                    
                    </Stack>      
                </Stack> 
                <Stack direction="column" spacing={0} >         
                    <Typography component={'span'} className={keySelected === 9 ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => changeKeySelectedParent(9)}>
                            <p className="m-0 mb-2 mt-2  text-nav-detail">
                                <i className="fa-gear fa-icon fa-store-detail-nav "></i>
                                Cài đặt
                            </p>
                    </Typography>
                
                </Stack> 
            </Stack>
        </>
    );
}

export default NavBarDetailStore;