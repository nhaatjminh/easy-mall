import React from "react";
import './HeaderAccount.scss'
import logo from '../../assets/image/Logo.png'
import { Dropdown } from "react-bootstrap";
import { logout } from "../../helpers/login";
import { useNavigate } from "react-router-dom";

export const HeaderAccount = ({ name }) => {
    let navigate = useNavigate()

    return (
        <div className="header-account">
            <div className="header-account__logo">
                <img
                    className="header-account__logo__img"
                    src={logo}
                />
            </div>
            <div className="header-account__info">
                <span className="circle">
                    <p className="pt-1">{name}</p>
                </span>
                <span>
                <Dropdown className="n">
                    <Dropdown.Toggle id="dropdown-basic">
                        <i className="fa-angle-down fa-icon  fa-store-login"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={() => navigate('/store-login')}> <p className="text-nav">Stores</p></Dropdown.Item>
                        <Dropdown.Item href="#" onClick={logout}><p className="text-nav">Log out</p></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </span>

            </div>
        </div>
    )
}