import React from "react";
import './index.css';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../../component/NavBar";
import FooterHomePage from "../../component/FooterHomepage";
const SellGuide = () => {

    return (
        <>
            <NavBar />
            <div className="sellguide">
                <div className="sg-first-slide p-0 mt-5">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                        <h1 className="title1">Selling</h1>
                        <h1 className="title2">Everywhere you want to</h1>
                        <h3 className="content">The platform allows selling wherever the customer is - online or in person.</h3>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                <h5 className="sub-title">Your Online Store</h5>
                                <h5 className="sub-content">Selling products online with an e-commerce website</h5>
                            </div>
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                <h5 className="sub-title">Customize by your style</h5>
                                <h5 className="sub-content">Add e-commerce functionality to any website or blog</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                <h5 className="sub-title">Stores Locations</h5>
                                <h5 className="sub-content">Direct sales at retail locations, pop-up stores and more. </h5>
                            </div>
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                <h5 className="sub-title">Store retails</h5>
                                <h5 className="sub-content">Selling on social and media networks, online marketplaces and more</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6  slide-part text-align-center align-self-end order-mobile-1">
                        <div className="row align-items-end ">
                            <div className="col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6">
                                <img alt="img" src="/img/sellguide/slide1-1.png" className="img-first-slide-1" />
                            </div>
                            <div className="col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6">
                                <img alt="img" src="/img/sellguide/slide1-2.png" className="img-first-slide-2" />
                                <img alt="img" src="/img/sellguide/slide1-3.png" className="img-first-slide-3" />
                            </div>

                        </div>
                    </div>
                </div>
                </div>

                <div className="sg-second-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-5">Your custom online store</h4>
                            <h2 className="title2">Your own professional style</h2>

                            <h5 className="sub-title-2">More than 50 themes</h5>
                            <h5 className="sub-content">Bringing brands to life with responsive, customizable themes</h5>

                            <h5 className="sub-title-2">Easy to use with Drag and drop</h5>
                            <h5 className="sub-content">Create stores without programming or design skills</h5>

                            <h5 className="sub-title-2">Domain</h5>
                            <h5 className="sub-content">Use your own domain or buy a domain through Easy Mall</h5>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-1">
                            <div className="row">
                                <img alt="img" src="/img/sellguide/slide2-1.png" className="img-second-slide-1" />
                                <img alt="img" src="/img/sellguide/slide2-2.png" className="img-second-slide-2" />
                                
                            </div>

                        </div>
                    </div>
                </div>

                <div className="sg-third-slide p-0 mt-5">
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/sellguide/slide3-2.png" className="img3-2"/>

                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 pb-4 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-4">Store Location</h4>
                            <h2 className="title1">Retail experience </h2>
                            <h2 className="title1 mb-4">Distinctive</h2>
                            <h5 className="sub-content">Increase direct sales revenue</h5>

                            <h5 className="sub-title-2">Shopping is more enjoyable</h5>
                            <h5 className="sub-content">Offer customers personalized service, flexible shopping, and easy returns</h5>

                            <h5 className="sub-title-2">Software helps</h5>
                            <h5 className="sub-content">Simplify store setup and employee training</h5>

                            <h5 className="sub-title-2">Integrated administrative management tool</h5>
                            <h5 className="sub-content">Manage your storages, products with ease</h5>
                        </div>
                        
                    </div>
                </div>

                <div className="sg-second-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">

                            <h2 className="title2">Your very own brand</h2>
                            <h2 className="title2 mb-5">Within your reach</h2>

                            <h5 className="sub-title-2">Secure payment</h5>
                            <h5 className="sub-content">Add a secure, easy-to-use mobile payment experience to your site</h5>

                            <h5 className="sub-title-2">Customizable pages and content</h5>
                            <h5 className="sub-content">Create an on-demand shopping experience for an existing website or blog</h5>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/sellguide/slide4-1.png" className="img-second-slide-2" />
                        </div>
                    </div>
                </div>

                <div className="end-slide mt-5">
                    <h5 className="font-weight-bold text-end-slide-1">Start your business journey with EasyMall</h5>

                    <h5 className="text-end-slide-2">
                    Try EasyMall for free, discover all the tools and services to start, run and grow your own business..
                    </h5>
                    <button className="btn btn-success btn-end-slide mt-5" > <p className="text-btn-end-slide"> Start your free trial </p></button>
                </div>
            </div>

            <FooterHomePage></FooterHomePage>
        </>
    );
}

export default SellGuide;