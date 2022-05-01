import React from "react";

import NavBarDetailStore from "../../component/NavBarDetailStore";
import HeaderDetailStore from "../../component/HeaderDetailStore";
const ManageHome = () => {
  return (
    <>
      <HeaderDetailStore ></HeaderDetailStore>
      <div className="row callpage" >
          <div className="col-lg-2 col-xl-2 p-0 m-0 pt-4">
              <NavBarDetailStore  isDesktop={true}></NavBarDetailStore>
          </div> 
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 p-0 m-0 pt-4 desktop-table">
          </div> 
      </div>   
      </>    
    );
}

export default ManageHome;