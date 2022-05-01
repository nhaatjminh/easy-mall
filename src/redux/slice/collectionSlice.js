import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collectionApi } from '../../service/api';

export const doGetListCollectionOfStores = createAsyncThunk(
    'collection@get/GetListCollection',
    async (id) => {
      const result = await collectionApi.getCollections(id);
      return result.data;
    }
);

export const doUploadImageCollection = createAsyncThunk(
    'store@post/UploadImageCollection',
    async ({data}) => {
      const result = await collectionApi.uploadImageCollection(data);
      return result.data
    }
);
export const doCreateCollection = createAsyncThunk(
    'store@post/CreateCollection',
    async ({storeId,collectionObj}) => {
      const result = await collectionApi.createCollections(storeId,collectionObj);
      return {
          ...collectionObj,
          id: result.data
        };
    }
);

export const collectionStore = createSlice({
    name: 'collectionStore',
    initialState:  {
        listCollection: []
    },
    reducers: {
        doSwitchCollectionStore(state, action) {
            state.listCollection = action.payload;
        }
    },
    extraReducers: (builder) => {

        // get list store
        builder.addCase(doGetListCollectionOfStores.fulfilled, (state, action) => {
            state.listCollection = action.payload;
        });
    }
})
const {actions, reducer} = collectionStore;
export const {doSwitchCollectionStore } = actions;
export default reducer;