import { combineReducers } from "@reduxjs/toolkit";
import listStore from './../slice/storeSlice';
import formProduct from './../slice/formProduct';
import collectionSlice from "../slice/collectionSlice";
import productSlice from "../slice/productSlice";
import navigation from '../slice/navigationSlice';
import page from '../slice/pageSlice';
import user from '../slice/userSlice';
import theme from '../slice/themeSlice';
import order from '../slice/orderSlice';

export const rootReducer = combineReducers ({
    listStore,
    formProduct,
    collectionSlice,
    productSlice,
    navigation,
    page,
    user,
    theme,
    order
})