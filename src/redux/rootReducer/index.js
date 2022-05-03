import { combineReducers } from "@reduxjs/toolkit";
import listStore from './../slice/storeSlice';
import formProduct from './../slice/formProduct';
import collectionSlice from "../slice/collectionSlice";
import productSlice from "../slice/productSlice";

export const rootReducer = combineReducers ({
    listStore,
    formProduct,
    collectionSlice,
    productSlice
})