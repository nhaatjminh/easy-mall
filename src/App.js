import React from "react";
import Login from "./pages/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import SellGuide from "./pages/SellGuide";
import MarketGuide from "./pages/MarketGuide";
import ManageGuide from "./pages/ManageGuide";
import StoreLogin from "./pages/StoreLogin";
import CustomSortableTree from "./component/CustomSortableTree";
import PricingScene from "./pages/PricingScene";
import ManageStoreProduct from "./pages/ManageStoreProduct";
import ManageCollection from "./pages/ManageCollection";
import ManageHome from "./pages/ManageHome";
import ManageThems from './pages/OnlineStore/ManageThemes/index';
import Navigation from './pages/OnlineStore/Navigations/index';
import DetailMenu from './pages/OnlineStore/Navigations/DetailMenu/index';
import Page from "./pages/OnlineStore/Pages";
import ManageDomain from "./pages/OnlineStore/ManageDomain";
import { Profile } from "./pages/Profile";
import ForgottenPassword from "./pages/ForgottenPassword";
import Notify from "./pages/Notify/index";
import ResetPassword from "./pages/ResetPassword";
import ManageBanner from "./pages/ManageBanner";
import ManageOrder from "./pages/ManageOrder";
import ManageInventory from "./pages/ManageInventory";
import { Setting } from "./pages/Setting";
import { Discount } from "./pages/Discount";
import { CreateDiscount } from "./pages/Discount/CreateDiscount";
import { DetailDiscount } from "./pages/Discount/DetailDiscount";
import ManageAnalysis from "./pages/ManageAnalysis";
import ResendVerify from "./pages/ResendVerify";

const App = () => {
  return(
    <div style={{overflowX: 'hidden', backgroundColor:  '#f6f6f7'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/sell-guide' element={<SellGuide/>}/>
          <Route path='/market-guide' element={<MarketGuide/>}/>
          <Route path='/manage-guide' element={<ManageGuide/>}/>
          <Route path='/pricing-scene' element={<PricingScene/>}/>
          
          <Route path='/store-login' element={<StoreLogin/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/setting/:storeId' element={<Setting/>}/>
          <Route path='/store-detail/manage-theme/:storeId' element={<ManageThems/>}/>
          <Route path='/store-detail/manage-page/:storeId' element={<Page/>}/>
          <Route path='/store-detail/manage-navigation/:storeId' element={<Navigation/>}/>
          <Route path='/store-detail/manage-navigation/:storeId/menu/:id' element={<DetailMenu/>}/>
          <Route path='/store-detail/manage-domain/:storeId' element={<ManageDomain/>}/>
           
          <Route path='/store-detail/manage-home/:storeId' element={<ManageHome />}/>
          <Route path='/store-detail/manage-product/:storeId' element={<ManageStoreProduct/>}/>
          <Route path='/store-detail/manage-banner/:storeId' element={<ManageBanner/>}/>
          <Route path='/store-detail/manage-collection/:storeId' element={<ManageCollection/>}/>
          <Route path='/store-detail/manage-order/:storeId' element={<ManageOrder/>}/>
          <Route path='/store-detail/manage-inventory/:storeId' element={<ManageInventory/>}/>
          <Route path='/store-detail/manage-analysis/:storeId' element={<ManageAnalysis/>}/>
          <Route path='/store-detail/manage-discount/:storeId' element={<Discount/>}/>
          <Route path='/store-detail/manage-discount/:storeId/new' element={<CreateDiscount/>}/>
          <Route path='/store-detail/manage-discount/:storeId/:discountId' element={<DetailDiscount/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/check-verify' element={<ResendVerify/>}/>
          <Route path='/notify/:type/:email' element={<Notify/>}/>
          <Route path='/notify/:type' element={<Notify/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/forgotten-password' element={<ForgottenPassword/>}/>
          <Route path='reset-password/:userId/:resetString' element={<ResetPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
