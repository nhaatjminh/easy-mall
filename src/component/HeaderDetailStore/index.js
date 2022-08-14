import React, {useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Avatar,  TextField, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import { Navbar, Container, Offcanvas } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap';
import NavBarDetailStore from "../NavBarDetailStore";

import { useSelector, useDispatch } from "react-redux";
import { doSwitchSelectedStore, doGetListStore, doSwitchBaseUrl } from "../../redux/slice/storeSlice";
import { CustomSearchInput } from "../common/CustomSearchInput/CustomSearchInput";
import { logout } from "../../helpers/login";
import Swal from "sweetalert2";
import { doGetUserInfo } from "../../redux/slice/userSlice";
import { getDisplayName } from "../../helpers/common";

const HeaderDetailStore = ({nameAccount, keySelected, isEdit}) => {
    //use redux to manage state
    const dispatch = useDispatch();
    let routeChange = useNavigate();
    const nameStore = useSelector((state) => state.listStore.selectedName);
    nameAccount = "TP";
    const listStoreInStore = useSelector((state) => state.listStore.listStore);
    const { fullname } = useSelector((state) => state.user.info);
    const params = useParams();
    useEffect(() => {
        if (!nameStore) {
            dispatch(doGetListStore()).then((result) => {
                result?.payload?.map((store) => {
                    if (store?.id && store?.id === params.storeId ) {
                        dispatch(doSwitchSelectedStore(store.name));
                        dispatch(doSwitchBaseUrl(store.store_link));
                    }
                })
            })
        }
        dispatch(doGetUserInfo())
    }, [])
    const warningWhenLeave = (applyFunction) => {
        if (isEdit) {
            Swal.fire({
                title: 'Are you sure?',
                text: "If you leave page. All new data will be reverted",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
              }).then((result) => {
                if (result.isConfirmed) {
                    applyFunction()
                }
              })
        } else {
            applyFunction()
        }
    }
    return (
        <>

            <div className="row logo desktop">
                <div className=" col-md-3 col-lg-3 col-xl-3 mt-1">
                    <Stack direction="row" spacing={0} >
                        <Avatar
                            src={process.env.PUBLIC_URL + '/img/Logo.png'}
                            style={{ height: '4rem', width: '4rem' }}
                        />
                        <Typography className="pointer-change"  onClick={() => {
                                warningWhenLeave(() => {
                                    routeChange(`/store-detail/manage-home/${params.storeId}`);
                                })
                            }}  component={'span'} ><p className="mt-3 font-weight-bold mr-0-3rem">{nameStore}</p></Typography>
                        <Dropdown className="float-right dropdown-store-detail p-0">
                            <Dropdown.Toggle id="dropdown-basic">
                                <i className="fa-angle-down fa-icon  float-right fa-store-detail"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {listStoreInStore ? listStoreInStore.map((store, index) => (
                                    <div key={index} onClick={() => {
                                        
                                        warningWhenLeave(() => {
                                            dispatch(doSwitchSelectedStore(store.name));
                                            dispatch(doSwitchBaseUrl(store.store_link));
                                            routeChange(`/store-detail/manage-home/${store.id}`);
                                        })
                                    }}>
                                        <Dropdown.Item href="#" key={index}> <p className="text-nav m-0">{store.name}</p> <p >{store.storeLink}</p> </Dropdown.Item>
                                    </div>
                                )) :
                                    ""}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Stack>
                </div>
                <div className=" col-md-6 col-lg-7 col-xl-7 header-store__search">
                    {/* <TextField name='findstore' className="find-store" placeholder='&#xf002; Tìm Kiếm' fullWidth />   */}
                    {/* <CustomSearchInput
                        placeholder='Search'
                    /> */}
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2  ">
                    <div>
                        <Dropdown className="float-right dropdown-store-login p-0 pt-1">
                            <Dropdown.Toggle id="dropdown-basic">
                                <i className="fa-angle-down fa-icon  float-right fa-store-login"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#" onClick={() => {
                                    warningWhenLeave(() => {
                                        routeChange(`/profile`)
                                    })
                                }}> <p className="text-nav">Profile</p></Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => {
                                    warningWhenLeave(() => {
                                        routeChange('/store-login')
                                    })
                                }}> <p className="text-nav">Stores</p></Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => {
                                    warningWhenLeave(() => {
                                        logout()
                                    })
                                }}><p className="text-nav">Log out</p></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="circle  float-right floating-name">
                            <p className="pt-1">{getDisplayName(fullname)}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row logo mobile">
                <div className=" col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 mt-1 button-header-mobile">

                    <Navbar bg="none" expand={false} className="navbar-header-mobile pt-2">
                        <Container fluid className="navbar-header-mobile ">
                            <Navbar.Toggle aria-controls="offcanvasNavbar" />
                            <Navbar.Offcanvas
                                id="offcanvasNavbar"
                                aria-labelledby="offcanvasNavbarLabel"
                                placement="start"
                                backdropClassName="mobile"
                                className="mobile"
                            >
                                <Offcanvas.Header closeButton style={{position: 'absolute', right: 0, top: 15}}>
                                    <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body >
                                    
                                    <NavBarDetailStore isEdit={isEdit} keySelected={keySelected} isDesktop={false}></NavBarDetailStore>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>
                </div>
                <div className=" col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 header-store__search">
                    {/* <TextField name='findstore' className="find-store" placeholder='&#xf002; Tìm Kiếm' fullWidth />   */}
                    {/* <CustomSearchInput
                        placeholder='Search'
                    /> */}
                </div>
                <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2  button-header-mobile">
                    <div>
                        <Dropdown className="float-right dropdown-store-login p-0 pt-1 ">
                            <Dropdown.Toggle id="dropdown-basic" className="navbar-header-mobile pt-1">
                                <i className="fa-angle-down fa-icon  float-right fa-store-login "></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                
                            <Dropdown.Item href="#" onClick={() => {
                                    warningWhenLeave(() => {
                                        routeChange(`/profile`)
                                    })
                                }}> <p className="text-nav">Profile</p></Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => {
                                    warningWhenLeave(() => {
                                        routeChange('/store-login')
                                    })
                                }}> <p className="text-nav">Stores</p></Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => {
                                    warningWhenLeave(() => {
                                        logout()
                                    })
                                }}><p className="text-nav">Log out</p></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="circle  float-right floating-name">
                            <p className="pt-1">{getDisplayName(fullname)}</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default HeaderDetailStore;