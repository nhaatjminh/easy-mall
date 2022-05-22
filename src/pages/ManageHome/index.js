import React from "react";
import './index.scss';
import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
import { Key } from "../../constants/constForNavbarDetail";
const ManageHome = () => {
  return (
    <>
      <HeaderDetailStore ></HeaderDetailStore>
      <div className="row callpage" >
          <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4 navbar-detail">
              <NavBarDetailStore  isDesktop={true} keySelected={Key.Home}></NavBarDetailStore>
          </div> 
          <div className="manage-home col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table main-content-manage">
            
          </div> 
      </div>   
      </>    
    );
}

export default ManageHome;