import { combineReducers } from "@reduxjs/toolkit";
import listStore from './../slice/listStore';
import keySelected from './../slice/keySelected';
import formProduct from './../slice/formProduct';

export const rootReducer = combineReducers ({
    listStore,
    keySelected,
    formProduct
})