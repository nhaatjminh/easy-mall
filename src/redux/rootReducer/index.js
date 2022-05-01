import { combineReducers } from "@reduxjs/toolkit";
import listStore from './../slice/storeSlice';
import keySelected from './../slice/keySelected';
import formProduct from './../slice/formProduct';
import collectionSlice from "../slice/collectionSlice";
import productSlice from "../slice/productSlice";

export const rootReducer = combineReducers ({
    listStore,
    keySelected,
    formProduct,
    collectionSlice,
    productSlice
})