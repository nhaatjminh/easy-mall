import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderApi } from '../../service/api';

export const doGetListOrderOfStores = createAsyncThunk(
    'order@get/GetListOrder',
    async (object) => {
      const result = await orderApi.getAllOrder(object.id, object.params);
      return result.data;
    }
);
export const doGetOneOrder = createAsyncThunk(
    'order@get/doGetOneOrder',
    async (id) => {
      const result = await orderApi.getOneOrder(id);
      return result.data;
    }
);
export const doCreateOrder = createAsyncThunk(
    'order@post/doCreateOrder',
    async ({storeId,orderObj}) => {
      const result = await orderApi.createOrder(storeId,orderObj);
      return {
          ...orderObj,
          id: result.data
        };
    }
);

export const collectionStore = createSlice({
    name: 'Order',
    initialState:  {
    },
    reducers: {
    }
})
const {actions, reducer} = collectionStore;
export const {} = actions;
export default reducer;