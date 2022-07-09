import React from "react";
import './index.css';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../../component/NavBar";
import FooterHomePage from "../../component/FooterHomepage";
import { EndSlide } from "../../component/EndSlide";
const ManageGuide = () => {

    return (
        <>
            <NavBar />
            <div className="manageguide">
                <div className="mg-first-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                            <h1 className="title1">Manage</h1>
                            <h1 className="title2">Your  own business</h1>
                            <h3 className="content">Powerful management tools to keep your business running efficiently, all in one place.</h3>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                    <h5 className="sub-title">Orders</h5>
                                    <h5 className="sub-content">Easily manage and execute orders from order to delivery</h5>
                                </div>
                                <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                    <h5 className="sub-title">Payments</h5>
                                    <h5 className="sub-content">Accept payment and get money quickly</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                    <h5 className="sub-title">Mobile Devices</h5>
                                    <h5 className="sub-content">Run your business wherever you are</h5>
                                </div>
                                <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                    <h5 className="sub-title">In depth Infomation</h5>
                                    <h5 className="sub-content">Identify the key factors and grow your business</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6  slide-part text-align-center align-self-end order-mobile-1">
                            <div className="row align-items-end ">
                                <div className="col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6">
                                    <img alt="img" src="/img/manageguide/slide1-1.png" />
                                </div>
                                <div className="col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6">
                                    <img alt="img" src="/img/manageguide/slide1-2.png" className="img-first-slide-t" />
                                    <img alt="img" src="/img/manageguide/slide1-3.png" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="mg-second-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-5">Centralized order fulfillment</h4>
                            <h2 className="title2">Managing
                            </h2>
                            <h2 className="title2 mb-3">Your Orders</h2>
                            <h5 className="sub-content mb-5">Get products to the right places with streamlined inventory, orders, fulfillment, and shipping.</h5>

                            <h5 className="sub-title-2">Order management and fulfillment</h5>
                            <h5 className="sub-content">Get your orders to the right place sooner with efficient fulfillment for you.</h5>

                            <h5 className="sub-title-2">Inventory management</h5>
                            <h5 className="sub-content">Save time and money with tools that help you manage, monitor, and move inventory across multiple locations.</h5>

                            <h5 className="sub-title-2">Shipping and Delivery</h5>
                            <h5 className="sub-content">Use affordable shipping options to ship orders globally.</h5>

                            <h5 className="sub-title-2">Returns and refunds</h5>
                            <h5 className="sub-content">Strengthen customer trust through hassle-free, easy-to-manage returns and refunds.</h5>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-1">
                            <div className="row">
                                <img alt="img" src="/img/manageguide/slide2-2.png" className="img-second-slide-2" />

                            </div>

                        </div>
                    </div>
                </div>

                <div className="mg-third-slide p-0 mt-5">
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/manageguide/slide3-1.png" className="img3-2" />

                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 pb-4 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-4">Payment process</h4>
                            <h2 className="title1">Simple payment
</h2>
                            <h5 className="sub-content">Peace of mind accept credit cards at the online store.</h5>

                            <h5 className="sub-title-2">Payment methods</h5>
                            <h5 className="sub-content">Accept credit cards and local payment methods.</h5>

                            <h5 className="sub-title-2">Payment gateways</h5>
                            <h5 className="sub-content">
                                Easymall also integrates with over 7 third-party payment gateways.</h5>
                        </div>

                    </div>
                </div>

                <div className="mg-third-slide p-0 mt-5">
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/manageguide/slide4-1.png" className="img3-2" />

                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 pb-4 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-4">EasyMall Mobile App</h4>
                            <h2 className="title1">Available</h2>
                            <h2 className="title1">Everywhere you go</h2>
                            <h5 className="sub-content">Get work done in more locations with product management, payments, shipping, and order fulfillment on your mobile device.</h5>

                            <h5 className="sub-title-2">Add Products</h5>
                            <h5 className="sub-content">Easily add products wherever you are</h5>

                            <h5 className="sub-title-2">Inventory management</h5>
                            <h5 className="sub-content">Inventory control no matter where you are. Use mobile devices to accurately scan, transfer, and maintain stores in stock.</h5>

                            <h5 className="sub-title-2">Order fulfillment</h5>
                            <h5 className="sub-content">Be proactive in the order fulfillment process</h5>
                        </div>

                    </div>
                </div>
                <EndSlide />

            </div>

            <FooterHomePage></FooterHomePage>
        </>
    );
}

export default ManageGuide;