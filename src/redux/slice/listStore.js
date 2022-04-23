import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StoreApi } from '../../service/api';

export const doGetListStore = createAsyncThunk(
    'store@get/GetListStore',
    async () => {
      const result = await StoreApi.getStores();
      return result.data.id;
    }
);

export const doCreateStore = createAsyncThunk(
    'store@post/CreateStore',
    async (storeObj) => {
      const result = await StoreApi.createStore(storeObj);
      return {
          ...storeObj,
          id: result.data
        };
    }
);

export const listStoreSlice = createSlice({
    name: 'listStore',
    initialState:  {
        listStore: [],
        selectedName: ''
    },
    reducers: {
        doSwitchListStore(state, action) {
            state.listStore = action.payload;
        },
        doSwitchSelectedStore(state, action) {
            state.selectedName = action.payload;
        }
    },
    extraReducers: (builder) => {
        // create store
        builder.addCase(doCreateStore.pending, (state) => {

        });
        builder.addCase(doCreateStore.fulfilled, (state, action) => {
            state.listStore.push(action.payload)
        });
        builder.addCase(doCreateStore.rejected, (state, action) => {

        });

        // get list store
        builder.addCase(doGetListStore.fulfilled, (state, action) => {
            state.listStore = action.payload;
        });
    }
})
const {actions, reducer} = listStoreSlice;
export const {doSwitchListStore, doSwitchSelectedStore } = actions;
export default reducer;