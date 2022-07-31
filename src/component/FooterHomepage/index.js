import React from "react";
import Stack from "@mui/material/Stack";
import "./index.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const FooterHomePage = () => {
  return (
    <div className="row footer">
      <Stack
        direction="row"
        spacing={5}
        className="p-0 pb-2 first-footer"
      ></Stack>
      <div className="line"></div>
      <div className="p-0 pb-2 mt-3 mobile-footer">
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <div className="p-0">
            <p to={"#"} className="text-footer-2 font-weight-bold">
              {" "}
              Online Store
            </p>
            <Stack direction="column" spacing={1} className="p-0 pb-2 mt-4">
              <Link to={"/manage-guide"} className="text-footer-1 ">
                {" "}
                Manage Guide
              </Link>
              <Link to={"/sell-guide"} className="text-footer-1 ">
                {" "}
                Sell Guide
              </Link>
              <Link to={"/market-guide"} className="text-footer-1 ">
                {" "}
                Market Guide
              </Link>
            </Stack>
          </div>
          <div className="p-0 pr-2rem">
            <p to={"#"} className="text-footer-2 font-weight-bold">
              Support
            </p>
            <Stack direction="column" spacing={1} className="p-0 pb-2  mt-4">
              <Link to={"#"} className="text-footer-1 ">
                {" "}
                24/7 service
              </Link>
              <Link to={"/pricing-scene"} className="text-footer-1 ">
                {" "}
                Pricing
              </Link>
              <Link to={"#"} className="text-footer-1 ">
                {" "}
                API
              </Link>
            </Stack>
          </div>
        </Stack>
        <div className="col-12 col-sm-12 p-0 pt-4">
          <p className="text-footer-2 font-weight-bold"> EasyMall</p>
          <Stack direction="column" spacing={1} className="p-0 pb-2  mt-4">
            <Link to={"#"} className="text-footer-1 ">
              Contact
            </Link>
            <Link to={"#"} className="text-footer-1 ">
              About Us
            </Link>
          </Stack>
        </div>
      </div>
      <div className="desktop-footer">
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          className="p-0 pb-2 mt-3 "
        >
          <div>
            <p to={"#"} className="text-footer-2 font-weight-bold">
              {" "}
              Online Store
            </p>
            <Stack direction="column" spacing={1} className="p-0 pb-2 mt-4">
              <Link to={"/manage-guide"} className="text-footer-1 ">
                {" "}
                Manage Guide
              </Link>
              <Link to={"/sell-guide"} className="text-footer-1 ">
                {" "}
                Sell Guide
              </Link>
              <Link to={"/market-guide"} className="text-footer-1 ">
                {" "}
                Market Guide
              </Link>
            </Stack>
          </div>
          <div>
            <p to={"#"} className="text-footer-2 font-weight-bold">
              {" "}
              Support
            </p>
            <Stack direction="column" spacing={1} className="p-0 pb-2  mt-4">
              <Link to={"#"} className="text-footer-1 ">
                {" "}
                24/7 service
              </Link>
              <Link to={"/pricing-scene"} className="text-footer-1 ">
                {" "}
                Pricing
              </Link>
              <Link to={"#"} className="text-footer-1 ">
                {" "}
                API
              </Link>
            </Stack>
          </div>
          <div className="pr-2rem">
            <p className="text-footer-2 font-weight-bold"> EasyMall</p>
            <Stack direction="column" spacing={1} className="p-0 pb-2  mt-4">
              <Link to={"#"} className="text-footer-1 ">
                Contact
              </Link>
              <Link to={"#"} className="text-footer-1 ">
                About Us
              </Link>
            </Stack>
          </div>
        </Stack>
      </div>

      <div className="line"></div>
      <div className='row'>

        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 end-footer">
          <div>
            <i className="fab fa-linkedin-square fa-icon ml-0 fa-footer"></i>
            <i className="fa-envelope-o fa-icon fa-footer"></i>
            <i className="fa-facebook-square fa-icon fa-footer"></i>
          </div>
        </div>
        
        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 p-0 end-footer-right-parent" style={{ alignSelf: 'flex-end'}}>
          <div>
            <p className="text-footer-1 mr-1rem" style={{ textAlign: 'center'}}>Version 1.0</p>
            <p className="text-footer-1 mr-1rem" style={{ textAlign: 'center'}}>Copyright &copy; 2022 by HCMUS Team</p>
            
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 p-0 end-footer-right-parent">
          <div className="end-footer-right">
            <Link to={"#"} className="text-footer-1 mr-1rem">
              {" "}
              Terms of Service
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterHomePage;
