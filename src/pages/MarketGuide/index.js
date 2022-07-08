import React from "react";
import './index.css';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../../component/NavBar";
import FooterHomePage from "../../component/FooterHomepage";
import { EndSlide } from "../../component/EndSlide";
const MarketGuide = () => {

    return (
        <>
            <NavBar />
            <div className="marketguide">
                <div className="mg-first-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                            <h1 className="title1">Control- </h1>
                            <h1 className="title2">Your own business</h1>
                            <h3 className="content">A platform to help find and sell to the right customers, wherever they are.</h3>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                    <h5 className="sub-title-orange">Customers</h5>
                                    <h5 className="sub-content">Find customers with SEO and content marketing tools</h5>
                                </div>
                                <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                    <h5 className="sub-title-orange">Campaign</h5>
                                    <h5 className="sub-content">Reach your audience and promote your products</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                    <h5 className="sub-title-orange">In-depth information</h5>
                                    <h5 className="sub-content">Improve each campaign with reports</h5>
                                </div>
                                <div className="col-12 col-sm-6 col-md-12 col-lg-6 col-xl-6">
                                    <h5 className="sub-title-orange">Business Connection</h5>
                                    <h5 className="sub-content">Mater and improve your business connection</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6  slide-part text-align-center align-self-end order-mobile-1">
                            <div className="row align-items-end ">
                                <div className="col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6">
                                    <img alt="img" src="/img/marketguide/slide1-1.png" className="img-first-slide-t" />
                                    <img alt="img" src="/img/marketguide/slide1-2.png" />
                                </div>
                                <div className="col-6 col-sm-6  col-md-6 col-lg-6 col-xl-6">
                                    <img alt="img" src="/img/marketguide/slide1-3.png" className="img-first-slide-t" />
                                    <img alt="img" src="/img/marketguide/slide1-4.png" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="mg-second-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-5">Audience targeting</h4>
                            <h2 className="title2">Attracting
                            </h2>
                            <h2 className="title2 mb-3">The right customers</h2>
                            <h5 className="sub-content mb-5">Reach your ideal customers through content marketing, SEO and social media.</h5>

                            <h5 className="sub-title-2">Blog</h5>
                            <h5 className="sub-content">Build an audience and increase store’s traffic with EasyMall's built-in blog</h5>

                            <h5 className="sub-title-2">SEO tools</h5>
                            <h5 className="sub-content">Help people find your store by using SEO tools to edit title tags, description tags, and product details</h5>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-1">
                            <div className="row">
                                <img alt="img" src="/img/marketguide/slide2-2.png" className="img-second-slide-2" />

                            </div>

                        </div>
                    </div>
                </div>

                <div className="mg-third-slide p-0 mt-5">
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/marketguide/slide3-2.png" className="img3-2" />

                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 pb-4 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-4">Creating campaign</h4>
                            <h2 className="title1">Advertising your products</h2>
                            <h5 className="sub-content">Create an online marketing campaign to show your store to the right people - no experience needed.</h5>

                            <h5 className="sub-title-2">Email marketing</h5>
                            <h5 className="sub-content">Create email campaigns from available devices with EasyMall email</h5>

                            <h5 className="sub-title-2">Google Smart Shopping </h5>
                            <h5 className="sub-content">Set a daily budget and use Google technology to run strategic campaigns for you.</h5>

                            <h5 className="sub-title-2">Advertising on Facebook</h5>
                            <h5 className="sub-content">Use EasyMall to select your audience and be confident that you are targeting your ideal customers.</h5>
                        </div>

                    </div>
                </div>

                <div className="mg-second-slide p-0 mt-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-5">In-depth information</h4>
                            <h2 className="title2 mb-2">Effective improvement </h2>
                            <h5 className="sub-content mb-5">Limit guesswork and improve campaigns over time.</h5>
                            <h5 className="sub-title-2">Marketing report overview</h5>
                            <h5 className="sub-content">Track campaign performance across all channels, from start to finish.</h5>
                        </div>
                        <div className="col-12 col-sm-12  col-md-6 col-lg-6 col-xl-6 slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/marketguide/slide4-2.png" className="img-second-slide-2" />
                        </div>
                    </div>
                </div>

                <div className="mg-third-slide p-0 mt-5">
                    <div className="row ">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  slide-part align-self-center order-mobile-1">
                            <img alt="img" src="/img/marketguide/slide5-1.png" className="img3-2" />

                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0 pb-4 slide-part align-self-center order-mobile-2">
                            <h4 className="sub-title-2 mb-4">Business Connection</h4>
                            <h2 className="title1">Build your own connection with customers</h2>
                            <h5 className="sub-content">Master and improve your own customer relationships through powerful messaging from a single, convenient platform.</h5>

                            <h5 className="sub-title-2">Learn more about your customers</h5>
                            <h5 className="sub-content">Collect and systematize your data securely and in a single place to connect with buyers anywhere.</h5>

                            <h5 className="sub-title-2">Turn your data into revenue through Shop Email</h5>
                            <h5 className="sub-content">Our commercial-first email solutions help you target customers and grow your business.</h5>
                        </div>

                    </div>
                </div>

                <EndSlide />

            </div>

            <FooterHomePage></FooterHomePage>
        </>
    );
}

export default MarketGuide;