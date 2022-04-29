import React from "react";
import { Avatar, Typography } from '@material-ui/core';
import { Dropdown } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import './index.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/image/Logo.png';

import { useNavigate } from "react-router-dom";
const NavBar = () => {
    let navigate = useNavigate();
    const routeChange = (newPath) => {
        navigate(newPath);
    }
    return (
        <div className="nav-bar">
            <div className="row logo desktop">
                <div className=" col-md-3 col-lg-3 col-xl-3">
                    <img src={logo} />
                </div>
                <div className="col-md-5 col-lg-5 col-xl-4 offset-lg-4 offset-lg-4 offset-xl-5 ">
                    <Stack direction="row" spacing={5} className="navigation-menu ">
                        <Link to={'#'} className="text-nav"> Giá cước</Link>
                        <Link to={'#'} className="text-nav"> Tìm hiểu</Link>
                        <Link to={'/login'}>
                            <button className="btn btn-success btn-login"> <p className="text-btn-login"> Đăng nhập </p></button>
                        </Link>
                    </Stack>
                </div>

            </div>
            <div className="row logo mobile">
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 p-0 m-0">
                    <img src={logo} />
                </div>
                <div className="col-6 col-sm-6 col-md-5 col-lg-4 col-xl-4 offset-md-3 offset-lg-5 offset-xl-5 p-0">
                    <Stack direction="row" spacing={3} className="navigation-menu ">
                        <button className="btn btn-success btn-login" onClick={() => routeChange("/login")}> <p className="text-btn-login"> Đăng nhập </p></button>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <i class="fa fa-icon fa-bars"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#"> <p className="text-nav">Giá cước</p></Dropdown.Item>
                                <Dropdown.Item href="#"><p className="text-nav">Tìm hiểu</p></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Stack>

                </div>

            </div>
        </div>
    );
}

export default NavBar;