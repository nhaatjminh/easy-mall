import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bannerApi } from '../../service/api';

export const doGetListBannerOfStores = createAsyncThunk(
    'banner@get/GetListBanner',
    async (object) => {
      const result = await bannerApi.getBanners(object.id, object.params);
      return result.data;
    }
);
export const doGetOneBanner = createAsyncThunk(
    'banner@get/doGetOneBanner',
    async (id) => {
      const result = await bannerApi.getOneBanner(id);
      return result.data;
    }
);
export const doUploadImageBanner = createAsyncThunk(
    'banner@post/doUploadImageBanner',
    async ({data}) => {
      const result = await bannerApi.uploadImageBannerCollection(data);
      return result.data
    }
);
export const doCreateCollectionBanner = createAsyncThunk(
    'banner@post/doCreateCollection',
    async ({storeId,collectionObj}) => {
      const result = await bannerApi.createBanners(storeId,collectionObj);
      return {
          ...collectionObj,
          id: result.data
        };
    }
);
export const doDeleteImageCollectionBanner = createAsyncThunk(
    'store@post/doDeleteImageCollection',
    async ({data}) => {
      const result = await bannerApi.deleteImageBanner(data);
      return result.data
    }
);
export const doDeleteCollectionBanner = createAsyncThunk(
    'banner@delete/doDeleteBanner',
    async ({id}) => {
      const result = await bannerApi.deleteBanner(id);
      return result.data
    }
);
export const doUpdateCollectionBanner = createAsyncThunk(
    'banner@put/doUpdateBanner',
    async ({newCollection}) => {
      const result = await bannerApi.updateBanner(newCollection);
      return result.data
    }
);

export const collectionStore = createSlice({
    name: 'collectionBanner',
    initialState:  {
        listCollection: []
    },
    reducers: {
        doSwitchCollectionStore(state, action) {
            state.listCollection = action.payload;
        }
    }
})
const {actions, reducer} = collectionStore;
export const {doSwitchCollectionStore } = actions;
export default reducer;