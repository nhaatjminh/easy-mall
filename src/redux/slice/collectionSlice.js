import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collectionApi } from '../../service/api';

export const doGetListCollectionOfStores = createAsyncThunk(
    'collection@get/GetListCollection',
    async (id) => {
      const result = await collectionApi.getCollections(id);
      return result.data;
    }
);

// export const doCreateCollection = createAsyncThunk(
//     'collection@post/CreateCollection',
//     async (storeObj) => {
//       const result = await collectionApi.createCollections(storeObj);
//       return {
//           ...storeObj,
//           id: result.data
//         };
//     }
// );

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