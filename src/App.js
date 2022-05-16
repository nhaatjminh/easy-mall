import React from "react";
import Login from "./pages/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import SellGuide from "./pages/SellGuide";
import MarketGuide from "./pages/MarketGuide";
import ManageGuide from "./pages/ManageGuide";
import StoreLogin from "./pages/StoreLogin";
import PricingScene from "./pages/PricingScene";
import ManageStoreProduct from "./pages/ManageStoreProduct";
import ManageCollection from "./pages/ManageCollection";
import ManageHome from "./pages/ManageHome";
import ManageThems from './pages/OnlineStore/ManageThemes/index';
import Navigation from './pages/OnlineStore/Navigations/index';
import DetailMenu from './pages/OnlineStore/Navigations/DetailMenu/index';
import Page from "./pages/OnlineStore/Pages";

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
          <Route path='/store-detail/themes/:storeId' element={<ManageThems/>}/>
          <Route path='/store-detail/pages/:storeId' element={<Page/>}/>
          <Route path='/store-detail/navigation/:storeId' element={<Navigation/>}/>
          <Route path='/store-detail/menu/:id' element={<DetailMenu/>}/>
           
          <Route path='/store-detail/manage-home/:storeId' element={<ManageHome />}/>
          <Route path='/store-detail/manage-product/:storeId' element={<ManageStoreProduct/>}/>
          <Route path='/store-detail/manage-collection/:storeId' element={<ManageCollection/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
