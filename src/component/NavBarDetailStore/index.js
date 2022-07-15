import React, { useEffect, useState } from "react";
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Dropdown } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doSwitchSelectedStore, doSwitchBaseUrl } from "../../redux/slice/storeSlice";
import { Key } from "../../constants/constForNavbarDetail";
import Swal from "sweetalert2";

const NavBarDetailStore = ({ isDesktop, keySelected, isEdit }) => {
    const params = useParams();
    let routeChange = useNavigate();
    //use redux to manage state
    const dispatch = useDispatch();
    const nameStore = useSelector((state) => state.listStore.selectedName);
    const listStoreInStore = useSelector((state) => state.listStore.listStore);
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
                                            warningWhenLeave(() => {
                                                dispatch(doSwitchSelectedStore(store.name));
                                                dispatch(doSwitchBaseUrl(store.store_link));
                                                routeChange(`/store-detail/manage-home/${store.id}`)
                                            })
                                        }}>
                                            <Dropdown.Item href="#" key={index}> <p className="text-nav m-0">{store.name}</p> <p >{store.storeLink}</p> </Dropdown.Item>
                                        </div>
                                    ))
                                        : ""}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Stack>}
                    <Typography component={'span'} className={keySelected === Key.Home ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {
                            warningWhenLeave(() => {
                                if (keySelected === Key.Home) {
                                    window.location.reload();
                                } else {
                                    routeChange(`/store-detail/manage-home/${params.storeId}`);
                                }
                            })
                        }}
                    >
                        <p className="m-0 mb-2 mt-2  text-nav-detail">
                            <i className="fa-home fa-icon fa-store-detail-nav "></i>
                            <span className="font-weight-bold">Home</span>
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === Key.Order ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {
                            warningWhenLeave(() => {
                                if (keySelected === Key.Order) {
                                    window.location.reload();
                                } else {
                                    routeChange(`/store-detail/manage-order/${params.storeId}`);
                                }
                            })
                        }}
                    >
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-file-text-o fa-icon fa-store-detail-nav "></i>
                            <span className="font-weight-bold">Order</span>
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === Key.Product ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {
                            warningWhenLeave(() => {
                                if (keySelected === Key.Product) {
                                    window.location.reload();
                                } else {
                                    routeChange(`/store-detail/manage-product/${params.storeId}`)
                                }
                            })
                        }}
                    >
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-cube  fa-icon fa-store-detail-nav "></i>
                            <span className="font-weight-bold">Product</span>
                        </p>
                    </Typography>
                    <Stack direction="column" spacing={0}
                        hidden={(keySelected === Key.Product) ||
                            (keySelected === Key.Inventory) ||
                            (keySelected === Key.Collection) ||
                            (keySelected === Key.GiftCard) ? false : true} >
                        <Typography component={'span'} className={keySelected === Key.Inventory ? "nav-element-selected nav-extend" : "nav-extend"}
                            onClick={() => {
                                warningWhenLeave(() => {
                                    if (keySelected === Key.Inventory) {
                                        window.location.reload();
                                    } else {
                                        routeChange(`/store-detail/manage-inventory/${params.storeId}`)
                                    }
                                })
                            }}
                        >
                            <p className="m-0 ml-0 mb-2 mt-2 text-extend font-weight-bold">
                                Inventory
                            </p>
                        </Typography><Typography component={'span'} className={keySelected === Key.Collection ? "nav-element-selected nav-extend" : "nav-extend"}
                            onClick={() => {
                                warningWhenLeave(() => {
                                    if (keySelected === Key.Collection) {
                                        window.location.reload();
                                    } else {
                                        routeChange(`/store-detail/manage-collection/${params.storeId}`)
                                    }
                                })
                            }}
                        >
                            <p className="m-0 ml-0 mb-2 mt-2 text-extend font-weight-bold">
                                Collection
                            </p>
                        </Typography>

                    </Stack>
                    <Typography component={'span'} className={keySelected === Key.Banner ? "nav-element nav-element-selected" : "nav-element "}
                            onClick={() => {
                                warningWhenLeave(() => {
                                    if (keySelected === Key.Banner) {
                                        window.location.reload();
                                    } else {
                                        routeChange(`/store-detail/manage-banner/${params.storeId}`)
                                    }
                                })
                            }}
                        >
                            <p className="m-0 mb-2 mt-2">
                                <i className="fa-bookmark fa-icon fa-store-detail-nav p-0" style={{ marginRight: 17 }}></i>
                                <span className="font-weight-bold">
                                    Banner</span>
                            </p>
                        </Typography>
                    <Typography component={'span'} className={keySelected === Key.Analysis ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {
                            warningWhenLeave(() => {
                                if (keySelected === Key.Analysis) {
                                    window.location.reload();
                                } else {
                                    routeChange(`/store-detail/manage-analysis/${params.storeId}`)
                                }
                            })
                        }}
                    >
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-line-chart fa-icon fa-store-detail-nav "></i>
                            <span className="font-weight-bold">Analysis</span>
                        </p>
                    </Typography>
                    <Typography component={'span'} className={keySelected === Key.Discount ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {routeChange(`/store-detail/manage-discount/${params.storeId}`)}}
                    >
                        <p className="m-0 mb-2 mt-2 ">
                            <i className="fa-tags fa-icon fa-store-detail-nav "></i>
                            <span className="font-weight-bold"> Discount </span>
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
                            warningWhenLeave(() => {
                                if (keySelected === Key.OnlineStore) {
                                    window.location.reload();
                                } else {
                                    routeChange(`/store-detail/manage-theme/${params.storeId}`);
                                }
                            })
                        }}
                    >
                        <p className="m-0 mb-2 ">
                            <i className="fa-university fa-icon fa-store-detail-nav "></i>
                            <span className="font-weight-bold"> Online Store </span>
                            <button className="btn-icon float-right pt-1">
                                <i className="fa fa-eye icon-color-black"></i>
                            </button>
                        </p>
                    </Typography>
                    <Stack direction="column" spacing={0}
                        hidden={(keySelected === Key.OnlineStore) ||
                            (keySelected === Key.Theme) ||
                            (keySelected === Key.Domain) ||
                            (keySelected === Key.BlogPost) ||
                            (keySelected === Key.Navigation) ||
                            (keySelected === Key.Preferences) ||
                            (keySelected === Key.Page) ? false : true} >
                        <Typography component={'span'} className={keySelected === Key.Theme ? "nav-element-selected nav-extend" : "nav-extend"}
                            onClick={() => {routeChange(`/store-detail/manage-theme/${params.storeId}`);}}
                        >
                            <p className="m-0 ml-0-8rem mb-2 mt-2 text-extend font-weight-bold">
                                Theme
                            </p>
                        </Typography>
                        {/* <Typography component={'span'} className={keySelected === Key.Domain ? "nav-element-selected nav-extend" : "nav-extend"}
                            onClick={() => {
                                warningWhenLeave(() => {
                                    if (keySelected === Key.Domain) {
                                        window.location.reload();
                                    } else {
                                        routeChange(`/store-detail/manage-domain/${params.storeId}`);
                                    }
                                })
                            }}
                        >
                            <p className="m-0 ml-0-8rem mb-2 mt-2 text-extend font-weight-bold">
                                Domain
                            </p>
                        </Typography> */}
                        {/* <Typography component={'span'} className={keySelected === Key.BlogPost ? "nav-element-selected nav-extend" : "nav-extend"}
                            onClick={() => {
                                //routeChange(`/store-detail/manage-theme/${params.storeId}`);
                            }}
                        >
                            <p className="m-0 ml-0-8rem mb-2 mt-2 text-extend font-weight-bold">
                                Blog Posts
                            </p>
                        </Typography> */}
                        <Typography component={'span'} className={keySelected === Key.Page ? "nav-element-selected nav-extend" : " nav-extend"}
                            onClick={() => {routeChange(`/store-detail/manage-page/${params.storeId}`);}}
                        >
                            <p className="m-0 ml-0-8rem mb-2 mt-2 text-extend font-weight-bold">
                                Pages
                            </p>
                        </Typography>
                        <Typography component={'span'} className={keySelected === Key.Navigation ? "nav-element-selected nav-extend" : " nav-extend"}
                            onClick={() => {routeChange(`/store-detail/manage-navigation/${params.storeId}`);}}
                        >
                            <p className="m-0 ml-0-8rem mb-2 mt-2 text-extend font-weight-bold">
                                Navigation
                            </p>
                        </Typography>
                        {/* <Typography component={'span'} className={keySelected === Key.Preferences ? "nav-element-selected nav-extend" : " nav-extend"}
                            onClick={() => {
                                //routeChange(`/store-detail/manage-theme/${params.storeId}`);
                            }}
                        >
                            <p className="m-0 ml-0-8rem mb-2 mt-2 text-extend font-weight-bold">
                                Preferences
                            </p>
                        </Typography> */}

                    </Stack>
                </Stack>
                <Stack direction="column" spacing={0} style={{ marginTop: 'auto' }}>
                    <Typography component={'span'} className={keySelected === Key.Setting ? "nav-element nav-element-selected" : "nav-element "}
                        onClick={() => {
                            routeChange(`/setting/${params.storeId}`);
                        }}
                    >
                        <p className="m-0 mb-2 mt-2  text-nav-detail">
                            <i className="fa-gear fa-icon fa-store-detail-nav "></i>
                            <span className="font-weight-bold">Setting</span>
                        </p>
                    </Typography>

                </Stack>
            </Stack>
        </>
    );
}

export default NavBarDetailStore;