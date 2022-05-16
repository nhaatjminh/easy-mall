import React, { useState, useEffect, useRef } from "react";
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';

import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';

import { Dropdown } from 'react-bootstrap';
import StoreLoginList from "../../component/StoreLoginList";

import { useSelector, useDispatch } from "react-redux";
import { doCreateStore, doGetListStore, doSwitchListStore, doSwitchSelectedStore } from "../../redux/slice/storeSlice";
import logo from '../../assets/image/Logo.png'
import { SearchIcon } from "../../assets/icon/svg/SearchIcon";
import { CustomInput } from "../../component/common/CustomInput/CustomInput";
import { BackIcon } from './../../assets/icon/svg/BackIcon';
import { CustomSearchInput } from "../../component/common/CustomSearchInput/CustomSearchInput";
import { useDebounce } from './../../hooks/useDebounce';
import { StoreApi } from './../../service/api/storeApi';
import { NotAllowIcon } from './../../assets/icon/svg/NotAllowIcon';

const StoreLogin = ({ nameAccount }) => {

    // use redux to manage state
    const dispatch = useDispatch();
    // console.log(listStoreInStore);
    //use navigate to change url
    let navigate = useNavigate();
    const routeChange = (newPath) => {
        navigate(newPath);
    }
    // const [listStore, setListStore] = useState([]);
    const listStore = useSelector((state) => state.listStore.listStore);
    const [isCreateStore, setIsCreateStore] = useState(false);
    const [listStoreShow, setListStoreShow] = useState(listStore);
    const [newStoreName, setNewStoreName] = useState('');
    const [err, setErr] = useState('');
    // const [isValid, setIsValid] = useState(false);
    const dbValue = useDebounce(newStoreName, 300);

    const mounted = useRef();

    useEffect(async () => {
        if (!mounted.current) mounted.current = true
        else {
            if (newStoreName.length >= 4) {
                const result = await StoreApi.getStoreByName(newStoreName);
                if (result.data.length > 0) setErr('A store with that name already exists')
                else setErr('')
            } else {
                setErr('Your store name must be at least 4 characters')
            }
        }
    }, [dbValue])

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
        if (newStoreName.length < 4) {
            setErr('Your store name must be at least 4 characters');
            return;
        }
        
        if (err !== '') return;

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
                                        <h4 className="text-store">Stores</h4>
                                    </div>
                                    <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">

                                        <button
                                            className="store-login__btn--create btn btn-success btn-create-store float-right"
                                            onClick={() => setIsCreateStore(true)}>
                                            <p className="text-btn-login text-small"> Create another store </p>
                                        </button>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="store-login__search">


                                        <CustomSearchInput
                                            placeholder='Search'
                                            onChange={handleOnchangeSearch}
                                        />
                                    </div>

                                    <div className="store-login__list row find-store p-0 scroll-list" >
                                        {listStoreShow ? listStoreShow.map((store, index) => (
                                            <StoreLoginList shopName={store.name} shopLink={store.store_link} key={index} onClicked={() => {
                                                dispatch(doSwitchSelectedStore(store.name));
                                                routeChange("/store-detail/manage-home/" + store.id);
                                            }}></StoreLoginList>
                                        )) :
                                            ""
                                        }
                                    </div>

                                </div>

                            </div>
                            :
                            <div className="create-store">
                                <div className="create-store__header">
                                    <div className="create-store__header__back-icon" onClick={() => setIsCreateStore(false)}>
                                        <BackIcon />
                                    </div>
                                    <h5 className="font-weight-bold text-create-store">Create a store</h5>

                                </div>
                                <div className="row create-store-connect">
                                    <p className="text-create-store-2">This store will be connected to {emailAccount}, and is free for 14 days.</p>
                                </div>
                                <div className="row create-store-connect font-weight-bold">
                                    <p className="text-create-store-3">Store name</p>
                                </div>
                                <div className="row mt-1 ml-2 mr-3">
                                    <CustomInput
                                        value={newStoreName}
                                        placeholder='Store name'
                                        warning={err !== ''}
                                        onChange={(e) => setNewStoreName(e.target.value)}
                                    />
                                </div>
                                <div className="row mt-1 ml-2 p-0 create-store__check-valid-text">
                                    {err !== '' &&
                                        <div style={{padding: '0'}}>
                                            <span><NotAllowIcon /></span>
                                            <span className="create-store__invalid-text">{err}</span>
                                        </div>
                                    }
                                </div>
                                <div className="row mt-1">
                                    <div className="col-8   div-button-create-store pt-5">
                                        <button 
                                            className="btn btn-success basic-btn" 
                                            onClick={onCreateStore} 
                                            disabled={err !== ''}> 
                                            <p className="text-btn-login"> Create store </p>
                                        </button>
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