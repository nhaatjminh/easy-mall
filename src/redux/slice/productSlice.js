import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductApi } from '../../service/api';

export const doGetListCollectionOfStores = createAsyncThunk(
    'collection@get/GetListProduct',
    async (id) => {
      const result = await ProductApi.getProductsOfStore(id);
      return result.data;
    }
);
export const doCreateProduct = createAsyncThunk(
    'store@post/CreateProduct',
    async ({storeId,productObj}) => {
      const result = await ProductApi.createProduct(storeId,productObj);
      return {
          ...productObj,
          id: result.data
        };
    }
);
export const doUploadImageProduct = createAsyncThunk(
    'store@post/UploadImageProduct',
    async ({data}) => {
      const result = await ProductApi.uploadImageProduct(data);
      return result.data
    }
);
export const productSlice = createSlice({
    name: 'productSlice',
    initialState:  {
        productState: {}
    },
    reducers: {
        doSwitchProduct(state, action) {
            state.productState = action.payload;
        },
    },
    extraReducers: (builder) => {
        // create product
        builder.addCase(doCreateProduct.pending, (state) => {

        });
        builder.addCase(doCreateProduct.fulfilled, (state, action) => {
            state.productState = action.payload
        });
        builder.addCase(doCreateProduct.rejected, (state, action) => {

        });
    }
})
const {actions, reducer} = productSlice;
export const {doSwitchProduct } = actions;
export default reducer;