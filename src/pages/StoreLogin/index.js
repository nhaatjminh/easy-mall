import React, { useState, useEffect } from "react";
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';

import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';

import { Dropdown } from 'react-bootstrap';
import StoreLoginList from "../../component/StoreLoginList";

import { useSelector, useDispatch } from "react-redux";
import { doCreateStore, doGetListStore, doSwitchListStore, doSwitchSelectedStore } from "../../redux/slice/listStore";
import logo from '../../assets/image/Logo.png'
import { SearchIcon } from "../../assets/icon/svg/SearchIcon";

const StoreLogin = ({ nameAccount }) => {

    // use redux to manage state
    const dispatch = useDispatch();
    var nameStoreInStore = useSelector((state) => state.listStore.selectedName);
    var changeNameStoreSelectedCall = (name) => {
        dispatch(doSwitchSelectedStore(name));
    }
    var listStoreInStore = useSelector((state) => state.listStore.listStore);
    var changeListStoreCall = (list) => {
        dispatch(doSwitchListStore(list));
    }

    // console.log(listStoreInStore);
    //use navigate to change url
    let navigate = useNavigate();
    const routeChange = (newPath) => {
        navigate(newPath);
    }
    // const [listStore, setListStore] = useState([]);
    const listStore = useSelector((state) => state.listStore.listStore);
    const [isCreateStore, setIsCreateStore] = useState(false);
    const [listStoreShow, setListStoreShow] = useState([]);
    const [newStoreName, setNewStoreName] = useState('');

    nameAccount = "TP";

    const emailAccount = "Yooooo@gmail.com";
    const handleOnchangeSearch = (e) => {

        const newListSearch = [];
        console.log(listStore)
        listStore.map((store) => {
            if (store.name.includes(e.target.value) || store.store_link.includes(e.target.value)) {
                newListSearch.push(store);
            }

        })
        setListStoreShow([...newListSearch]);

    }

    const onCreateStore = () => {
        const storeObj = {
            name: newStoreName
        }
        dispatch(doCreateStore(storeObj))
            .then((res) => navigate(`/store-detail/home/${res.payload.id}`))
    }

    useEffect(() => {
        dispatch(doGetListStore())
    }, [])

    useEffect(() => {
        setListStoreShow(listStore)
    }, [listStore])

    return (
        <div className="bgImg">

            <div className="store-login">
                <Grid>
                    <Paper elevation={10} className="paper-style">
                        <div className="row">
                            <div className=" col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <img className="store-login__logo" src={logo} />

                            </div>
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <Dropdown className="store-login__dropdown float-right dropdown-store-login p-0 pt-1">
                                    <Dropdown.Toggle id="dropdown-basic">
                                        <i className="fa-angle-down fa-icon  float-right fa-store-login"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#"> <p className="text-nav">Giá cước</p></Dropdown.Item>
                                        <Dropdown.Item href="#"><p className="text-nav">Tìm hiểu</p></Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <div className="circle  float-right">
                                    <p className="pt-1">{nameAccount}</p>
                                </div>
                            </div>
                        </div>
                        {!isCreateStore ?
                            <div>
                                <div className="row mt-5">
                                    <div className="store-login__text-store col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                                        <h4 className="text-store">Các cửa hàng của bạn</h4>
                                    </div>
                                    <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">

                                        <button
                                            className="store-login__btn--create btn btn-success btn-create-store float-right"
                                            onClick={() => setIsCreateStore(true)}>
                                            <p className="text-btn-login"> Tạo cửa hàng </p>
                                        </button>
                                    </div>
                                </div>
                                <div className="row mt-5 ">
                                    <div className="store-login__search">
                                        <div className="store-login__search--icon">
                                            <SearchIcon />
                                        </div>
                                        <div className="store-login__search--input">
                                            <input
                                                placeholder='Tìm Kiếm'
                                                onChange={handleOnchangeSearch} />
                                        </div>
                                    </div>

                                    <div className="store-login__list row find-store p-0 scroll-list" >
                                        {listStoreShow ? listStoreShow.map((store, index) => (
                                            <StoreLoginList shopName={store.name} shopLink={store.storeLink} key={index} onClicked={() => {
                                                changeNameStoreSelectedCall(store.name);
                                                routeChange("/store-detail/home/" + store.id);
                                            }}></StoreLoginList>
                                        )) :
                                            ""
                                        }
                                    </div>

                                </div>

                            </div>
                            :
                            <div>
                                <div className="row mt-5">
                                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                                        <i className="fa-angle-left fa-icon  float-right fa-store-login" onClick={() => setIsCreateStore(false)}></i>
                                    </div>
                                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 pt-3">
                                        <h5 className="font-weight-bold text-create-store">Tạo Cửa Hàng</h5>
                                    </div>
                                </div>
                                <div className="row create-store-connect">
                                    <p className="text-create-store-2">Cửa hàng này được tạo và kết nối bởi {emailAccount}, và được sử dụng miến phí trong vòng 14 ngày</p>
                                </div>
                                <div className="row mt-1">
                                    <TextField
                                        name='create-store'
                                        className="find-store"
                                        placeholder='Tên cửa hàng'
                                        value={newStoreName}
                                        onChange={(e) => setNewStoreName(e.target.value)}
                                        fullWidth />
                                </div>
                                <div className="row mt-1">
                                    <div className="col-8   div-button-create-store pt-5">
                                        <button className="btn btn-success btn-create-store" onClick={onCreateStore}> <p className="text-btn-login"> Tạo cửa hàng </p></button>
                                    </div>
                                </div>
                            </div>
                        }

                    </Paper>
                </Grid>
            </div>
        </div>
    );
}

export default StoreLogin;