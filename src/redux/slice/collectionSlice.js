import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collectionApi } from '../../service/api';

export const doGetListCollectionOfStores = createAsyncThunk(
    'collection@get/GetListCollection',
    async (object) => {
      const result = await collectionApi.getCollections(object.id, object.params);
      return result.data;
    }
);
export const doGetOneCollections = createAsyncThunk(
    'collection@get/GetOneCollection',
    async (id) => {
      const result = await collectionApi.getOneCollection(id);
      return result.data;
    }
);
export const doUploadImageCollection = createAsyncThunk(
    'collection@post/UploadImageCollection',
    async ({data}) => {
      const result = await collectionApi.uploadImageCollection(data);
      return result.data
    }
);
export const doCreateCollection = createAsyncThunk(
    'collection@post/CreateCollection',
    async ({storeId,collectionObj}) => {
      const result = await collectionApi.createCollections(storeId,collectionObj);
      return {
          ...collectionObj,
          id: result.data
        };
    }
);
export const doDeleteImageCollection = createAsyncThunk(
    'store@post/UploadImageProduct',
    async ({data}) => {
      const result = await collectionApi.deleteImageProduct(data);
      return result.data
    }
);
export const doDeleteCollection = createAsyncThunk(
    'collection@delete/DeleteCollection',
    async ({id}) => {
      const result = await collectionApi.deleteCollection(id);
      return result.data
    }
);
export const doUpdateCollection = createAsyncThunk(
    'collection@put/UpdateCollection',
    async ({newCollection}) => {
      const result = await collectionApi.updateCollection(newCollection);
      return result.data
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