import React from "react";
import './index.css';
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../../component/NavBar";
import FooterHomePage from "../../component/FooterHomepage";
const PricingScene = () => {

    return (
        <>
            <NavBar />

            <div className="end-slide pricingscene">
                <h1 className="font-weight-bold text-start px-5 pt-5" style={{ fontFamily: `"Merriweather", serif` }}>Pricing Plans: An Overview</h1>

                <p className="text-end-slide-2 text-start px-5" >
                    Pricing Plans is a powerful app which lets you charge for your content and services. It's a great way to grow your business by selling bundles and memberships.
                </p>
                <p className="text-end-slide-2 text-start px-5 pb-5">
                    You can sell one-time membership plans or recurring plans. You decide how long a plan lasts before it expires or renews, and what benefits you offer with the plan.
                </p>
                {/* <button className="btn btn-success btn-end-slide mt-5" > <p className="text-btn-end-slide"> Bắt đầu dùng thử miễn phí </p></button> */}
                <div className="row pricing mx-5">
                        <div className="col-12 col-lg-3 my-4" >
                        <div className="service-pack mb-2 h-100">
                            <h1 className="service-pack-title free">Free</h1>
                            <h1 className="text-start" style={{ marginBottom: '0px' }}> Free</h1>
                            <p className="sub-title-price text-start" style={{ borderBottom: "2px solid #2b9361" }}>No credit card required</p>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/ios-filled/50/000000/template.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>3 free templates  </span>
                            </div>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/ios-filled/50/000000/dns.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>Customizable domain  </span>
                            </div>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/ios-filled/50/000000/mail.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>Customizable email  </span>
                            </div>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/external-phatplus-solid-phatplus/64/000000/external-chart-business-ecosystem-phatplus-solid-phatplus.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>Analyse and chart  </span>
                            </div>
                        </div>

                    </div>
                        <div className="col-12 col-lg-3 my-4" >
                        <div className="service-pack mb-2 h-100">
                            <h1 className="service-pack-title basic">Basic</h1>
                            <h1 className="text-start" style={{ marginBottom: '0px' }}> 6$</h1>
                            <p className="sub-title-price text-start" style={{ borderBottom: "2px solid rgb(200, 204, 208)" }}>/month</p>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/ios-filled/50/000000/template.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>3 free templates  </span>
                            </div>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/ios-filled/50/000000/dns.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>Customizable domain  </span>
                            </div>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/ios-filled/50/000000/mail.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>Customizable email  </span>
                            </div>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/external-phatplus-solid-phatplus/64/000000/external-chart-business-ecosystem-phatplus-solid-phatplus.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>Analyse and chart  </span>
                            </div>
                        </div>

                    </div>
                        <div className="col-12 col-lg-3 my-4" >
                        <div className="service-pack mb-2 h-100">
                            <h1 className="service-pack-title intermediate">Intermediate</h1>
                            <h1 className="text-start" style={{ marginBottom: '0px' }}>12$</h1>
                            <p className="sub-title-price text-start" style={{ borderBottom: "2px solid rgb(59, 64, 69)" }}>/month</p>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/ios-filled/50/000000/template.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>3 free templates  </span>
                            </div>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/ios-filled/50/000000/dns.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>Customizable domain  </span>
                            </div>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/ios-filled/50/000000/mail.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>Customizable email  </span>
                            </div>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/external-phatplus-solid-phatplus/64/000000/external-chart-business-ecosystem-phatplus-solid-phatplus.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>Analyse and chart  </span>
                            </div>
                        </div>

                    </div>
                        <div className="col-12 col-lg-3 my-4" >
                        <div className="service-pack mb-2 h-100">
                            <h1 className="service-pack-title advanced">Advanced</h1>
                            <h1 className="text-start" style={{ marginBottom: '0px' }}>24$</h1>
                            <p className="sub-title-price text-start" style={{ borderBottom: "2px solid rgb(43, 45, 110)" }}>/month</p>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/ios-filled/50/000000/template.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>3 free templates  </span>
                            </div>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/ios-filled/50/000000/dns.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>Customizable domain  </span>
                            </div>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/ios-filled/50/000000/mail.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>Customizable email  </span>
                            </div>
                            <div className="text-start d-flex align-items-center my-3">
                                <img src="https://img.icons8.com/external-phatplus-solid-phatplus/64/000000/external-chart-business-ecosystem-phatplus-solid-phatplus.png" style={{ width: '25px', height: '25px',marginRight:'10px' }} />
                                <span style={{letterSpacing:'-1px'}}>Analyse and chart  </span>
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
            {/* <div className="pricingscene">
                <div className="price-first-slide  p-4 mt-5">
                    <div className="text-align-center m-5">
                        <h1 className="title1">Tự tin</h1>
                        <h1 className="title2">Làm chủ doanh nghiệp của bạn</h1>
                    </div>

                </div>

                <div className="price-second-slide  p-4 mt-5">
                    <img alt="img" src="/img/price/Table.png" />
                </div>


            </div> */}

            <FooterHomePage></FooterHomePage>
        </>
    );
}

export default PricingScene;