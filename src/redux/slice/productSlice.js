import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductApi } from '../../service/api';

export const doGetListProductsOfStores = createAsyncThunk(
    'collection@get/GetListProduct',
    async (object) => {
        const result = await ProductApi.getProductsOfStore(object.id, object.params);
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

export const doDeleteImageProduct = createAsyncThunk(
    'store@post/UploadImageProduct',
    async ({data}) => {
      const result = await ProductApi.deleteImageProduct(data);
      return result.data
    }
);
export const doGetOneProductOfStores = createAsyncThunk(
    'collection@get/GetOneProduct',
    async (productId) => {
      const result = await ProductApi.getOneProduct(productId);
      return result.data;
    }
);
export const doUploadProduct = createAsyncThunk(
    'product@put/UploadProduct',
    async ({data, id}) => {
      const result = await ProductApi.uploadProduct(data, id);
      return result.data
    }
);
export const doDeleteProduct = createAsyncThunk(
    'product@delete/DeleteProduct',
    async ({id}) => {
      const result = await ProductApi.deleteProduct(id);
      return result.data
    }
);
export const doGetAllType = createAsyncThunk(
    'product@get/getAllType',
    async ({id}) => {
      const result = await ProductApi.getAllType(id);
      return result.data
    }
);
export const doGetAllVendor = createAsyncThunk(
    'product@get/getAllVendor',
    async ({id}) => {
      const result = await ProductApi.getAllVendor(id);
      return result.data
    }
);
export const doGetDescription = createAsyncThunk(
    'product@get/getDescription',
    async ({url}) => {
      const result = await ProductApi.getDescription(url);
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