import React from "react";
import Login from "./component/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./component/Register";
import HomePage from "./component/HomePage";
import SellGuide from "./component/SellGuide";
import MarketGuide from "./component/MarketGuide";
import ManageGuide from "./component/ManageGuide";
import StoreLogin from "./component/StoreLogin";
import PricingScene from "./component/PricingScene";
import DetailStore from "./component/DetailStore";
import ManageStoreProduct from "./component/ManageStoreProduct";
const App = () => {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/sell-guide' element={<SellGuide/>}/>
          <Route path='/market-guide' element={<MarketGuide/>}/>
          <Route path='/manage-guide' element={<ManageGuide/>}/>
          <Route path='/pricing-scene' element={<PricingScene/>}/>
          
          <Route path='/store-login' element={<StoreLogin/>}/>
          
          <Route path='/store-detail/home/:storeId' element={<DetailStore/>}/>
          
          <Route path='/store-detail/manage-product/:storeId' element={<ManageStoreProduct/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
