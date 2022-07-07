import React from "react";
import './index.css';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../../component/NavBar";
import FooterHomePage from "../../component/FooterHomepage";
import { EndSlide } from "../../component/EndSlide";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const routeChange = useNavigate();
    return (
        <>
            <NavBar />
            <div className="homepage">
                <div className="row first-slide p-0 mx-0 position-relative"  >
                    <div className="background-img">
                        <img src="/img/bg.jpg" style={{
                            objectFit: 'cover',
                            objectPosition: '50% 50%',
                            height: '100%'
                        }}></img>
                    </div>
                    <div className=" col-12 Description">
                        <div style={{ fontSize: '96px', fontWeight: '500', textAlign: 'center', maxWidth: '1000px' }}>
                            <div className="Home-title">
                                Create a website
                            </div>
                            <div className="Home-title" style={{ fontSize: '80px', fontWeight: '500', textAlign: 'center' }}>
                                of your dreams
                            </div>
                        </div>
                        {/* <div style={{ fontSize: '80px', fontWeight: '500', textAlign: 'center' }}>
                            of your dreams
                        </div> */}
                        <div className="_Descript" >
                            Discover the platform that gives you the freedom to create, design, manage and develop your web presence exactly the way you want.
                        </div>
                        <button style={{
                            background: 'rgba(17, 109, 255, 0.85)',
                            width: '200px',
                            borderRadius: '36px',
                            height: '50px',
                            marginTop: '40px',
                            color: 'white'
                            
                        }}
                            onClick={() => routeChange('/store-login')}
                            className="btn GetStart" > Get Started </button>

                    </div>
                    <div className="row" style={{
                        padding: 0,
                        margin: 0,
                        marginBottom: '100px',
                    }}>
                        <div className="d-none d-lg-flex col-3 d-flex justify-content-center flex-column align-items-end">
                            <p className="text-end hightlight" style={{
                                fontSize: '30px',

                            }}>Easy to use</p>
                            <p className="text-end hightlight" style={{
                                fontSize: '30px',

                            }}>Free to use</p>

                        </div>
                        <div className="col-12 col-lg-6" style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <img alt="img" src="/img/Cat.png" />
                        </div>
                        <div className="d-none d-lg-flex col-3 d-flex justify-content-center flex-column align-items-start">
                            <p className="text-start hightlight" style={{
                                fontSize: '30px',

                            }}>Support responsive</p>
                            <img alt="img" src="/img/phone.png" style={{ width: '30%' }} />
                        </div>

                    </div>

                </div>
                <div className="slide-middle ">
                    <div className="row d-none d-lg-flex">
                        <div className="_card col-3 arrow" >
                            <div className="item">
                                <img className="_Card_img" alt="img" src="/img/template.png" />

                                <div className="_card-body">
                                    <h2 className="_card-title text-center">1. Customize</h2>
                                    <p className="_card-text text-center">Pick a template and customize anything, or answer a few questions and get a free website designed just for you.</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="_card col-3 arrow" >
                            <div className="item">
                                <img className="_Card_img" alt="img" src="/img/products.png" />

                                <div className="_card-body">
                                    <h2 className="_card-title text-center">2. Add products</h2>
                                    <p className="_card-text text-center">After choosing the perfect template, you can post your very first product to your site.</p>
                                </div>
                            </div>
                        </div>
                        <div className="_card col-3 arrow" >
                            <div className="item">
                                <img className="_Card_img" alt="img" src="/img/hosting.png" />

                                <div className="_card-body">
                                    <h2 className="_card-title text-center">3. Hosting</h2>
                                    <p className="_card-text text-center">You can customize your very own domain. Or we will provide you one</p>
                                </div>
                            </div>
                        </div>
                        <div className="_card col-3 arrow" >
                            <div className="item">
                                <img className="_Card_img" alt="img" src="/img/shopping-cart.png" />

                                <div className="_card-body">
                                    <h2 className="_card-title text-center">4. Ready to go</h2>
                                    <p className="_card-text text-center">After all that you are all set to start your website.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row d-flex d-lg-none">
                        <div className="_card col-6 " >
                            <div className="item">
                                <img className="_Card_img" alt="img" src="/img/template.png" />

                                <div className="_card-body">
                                    <h2 className="_card-title text-center">1. Customize your site</h2>
                                    <p className="_card-text text-center">Pick a template and customize anything, or answer a few questions and get a free website designed just for you.</p>
                                </div>
                            </div>
                        </div>
                        <div className="_card col-6 " >
                            <div className="item">
                                <img className="_Card_img" alt="img" src="/img/products.png" />

                                <div className="_card-body">
                                    <h2 className="_card-title text-center">2. Add products</h2>
                                    <p className="_card-text text-center">After choosing the perfect template, you can post your very first product to your site.</p>
                                </div>
                            </div>
                        </div>
                        <div className="_card col-6 " >
                            <div className="item">
                                <img className="_Card_img" alt="img" src="/img/hosting.png" />

                                <div className="_card-body">
                                    <h2 className="_card-title text-center">3. Hosting</h2>
                                    <p className="_card-text text-center">You can customize your very own domain. Or we will provide you one</p>
                                </div>
                            </div>
                        </div>
                        <div className="_card col-6 " >
                            <div className="item">
                                <img className="_Card_img" alt="img" src="/img/shopping-cart.png" />

                                <div className="_card-body">
                                    <h2 className="_card-title text-center">4. Ready to go</h2>
                                    <p className="_card-text text-center">After all that you are all set to start your website.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="second-slide" style={{ backgroundColor: 'white' }} >

                    <div className="row p-0 m-0 pt-4 pb-0" style={{ backgroundColor: 'white' }}>

                        <div className="row">
                            <div >
                                <img alt="img" src="/img/Website.png" />
                            </div>
                        </div>

                    </div>

                    <div className="row  text-align-center pb-1 pt-2 p-12" style={{ background: '#7DBC9E', marginLeft: '12px', marginRight: '36px' }}>
                        <h5 className="font-weight-bold text-second-slide-2">Giving you the best choices</h5>

                    </div>
                    <div className=" row  column4-second-slide" style={{ background: '#7DBC9E', marginLeft: '12px', marginRight: '36px' }}>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                            <i className="fab fa-shopping-bag fa-icon ml-0"></i>
                            <h5 className="font-weight-bold text-second-slide-1">Online shopping</h5>
                            <h5 className=" text-second-slide-3">Create a business, whether you've just had a creative idea or are looking for a new way to make a profit</h5>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">

                            <i className="fab fa-globe fa-icon ml-0"></i>
                            <h5 className="font-weight-bold text-second-slide-1">3. Hosting your webite</h5>
                            <h5 className="text-second-slide-3">Turn your retail store into an online store and continue serving customers without interruption</h5>

                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                            <i className="fab fa-refresh fa-icon ml-0"></i>
                            <h5 className="font-weight-bold text-second-slide-1">Switch to Easymall</h5>
                            <h5 className="text-second-slide-3">Get your business on Easy Mall system, no matter what e-commerce platform you're currently on</h5>

                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                            <i className="fab fa-users fa-icon ml-0"></i>
                            <h5 className="font-weight-bold text-second-slide-1">Profressional Designer</h5>
                            <h5 className="text-second-slide-3">Set up shop with the help of our impressive designs</h5>

                        </div>
                    </div>
                </div>

                <div className="row text-align-center pt-5">
                    <h4 className="font-weight-bold">Why us ?</h4>
                    <div className="row pt-4">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-6 offset-xl-3 offset-lg-2 offset-md-2 offset-sm-1 offset-0">
                            <h5 className="text-why-not">We bring you the one and only platform with all the e-commerce and point of sale you need to start, operate and grow your business</h5>
                        </div>
                    </div>
                </div>
                <div className="slide-show third-slide mt-5" style={{ marginLeft: '3rem!important', marginRight: '3rem!important' }}>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 order-third-slide-2">
                            <img alt="img" src="/img/third-slide-3.png" className="third-slide-3-left" />
                        </div>
                        <div className="col-12 col-sm-12  col-md-12 col-lg-7 col-xl-7 order-third-slide-1 pt-3 part-2-third-slide pl-4rem">
                            <h5 className="header-text-third-slide">Multiple application accessible way </h5>
                            <h5 className="text-1rem pb-3">Use one platform to sell products anywhere, to any audience, and on any device. Sell ​​products in person and online via website, social media and online marketplace</h5>
                            <Link to={"#"} className="link-third-slide">Explore</Link>
                        </div>
                    </div>
                    <div className="row  third-slide-middle">
                        <div className="col-12 col-sm-12  col-md-12 col-lg-7 col-xl-7 part-2-third-slide pt-4rem pl-4rem" >
                            <h5 className="header-text-third-slide">Supporting your website</h5>
                            <h5 className="text-1rem pb-3">Take the guesswork out of marketing with built-in tools that help you create, execute, and analyze digital marketing campaigns.</h5>
                            <Link to={"#"} className="link-third-slide ">Explore how our business work </Link>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 order-third-slide-2 third-slide-3-right-parent">
                            <img alt="img" src="/img/third-slide-2.png" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 order-third-slide-2">
                            <img alt="img" src="/img/third-slide-1.png" className="third-slide-3-left" />
                        </div>
                        <div className="col-12 col-sm-12  col-md-12 col-lg-7 col-xl-7 part-2-third-slide pl-4rem">
                            <h5 className="header-text-third-slide">Control everything in your store</h5>
                            <h5 className="text-1rem pb-3">Capture the insights you need to grow - use a single admin page to manage orders, shipping and payments, wherever you are</h5>
                            <Link to={"#"} className="link-third-slide ">Explore ways to manage your store  </Link>
                        </div>
                    </div>
                </div>
                <EndSlide />
            </div>

            <FooterHomePage></FooterHomePage>
        </>
    );
}

export default HomePage;