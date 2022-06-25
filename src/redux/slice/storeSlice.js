import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StoreApi } from '../../service/api';

export const doGetListStore = createAsyncThunk(
    'store@get/GetListStore',
    async () => {
        const result = await StoreApi.getStores();
        return result.data;
    }
);

export const doCreateStore = createAsyncThunk(
    'store@post/CreateStore',
    async (storeObj) => {
        const result = await StoreApi.createStore(storeObj);
        return {
            ...storeObj,
            id: result.data.rows[0].id
        };
    }
);

export const doGetCurrentStore = createAsyncThunk(
    'store@get/GetCurrentStore',
    async (storeId) => {
        const result = await StoreApi.getStoreById(storeId);
        return result.data;
    }
);

export const doUpdateStoreInfo = createAsyncThunk(
    'store@put/UpdateStore',
    async (storeObj) => {
        const result = await StoreApi.updateStoreInfo(storeObj);
        return { ...storeObj };
    }
);

export const listStoreSlice = createSlice({
    name: 'listStore',
    initialState: {
        listStore: [],
        isLoading: false,
        isCreating: false,
        selectedName: '',
        baseStoreUrl: '',
        currentStore: {}
    },
    reducers: {
        doSwitchListStore(state, action) {
            state.listStore = action.payload;
        },
        doSwitchSelectedStore(state, action) {
            state.selectedName = action.payload;
        },
        doSwitchBaseUrl(state, action) {
            state.baseStoreUrl = action.payload;
        }
    },
    extraReducers: (builder) => {
        // create store
        builder.addCase(doCreateStore.pending, (state) => {
            state.isCreating = true
        });
        builder.addCase(doCreateStore.fulfilled, (state, action) => {
            state.listStore.push(action.payload)
            state.isCreating = false
        });
        builder.addCase(doCreateStore.rejected, (state, action) => {
            state.isCreating = false
        });

        // get list store
        builder.addCase(doGetListStore.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doGetListStore.fulfilled, (state, action) => {
            state.listStore = action.payload;
            state.isLoading = false;
        });
        builder.addCase(doGetListStore.rejected, (state, action) => {
            state.isLoading = false;
        });

        // get current store
        builder.addCase(doGetCurrentStore.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doGetCurrentStore.fulfilled, (state, action) => {
            state.currentStore = action.payload;
            state.isLoading = false;
        });
        builder.addCase(doGetCurrentStore.rejected, (state, action) => {
            state.isLoading = false;
        });

        // update store
        builder.addCase(doUpdateStoreInfo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doUpdateStoreInfo.fulfilled, (state, action) => {
            state.currentStore = {
                ...state.currentStore,
                ...action.payload
            };
            state.isLoading = false;
        });
        builder.addCase(doUpdateStoreInfo.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
})
const { actions, reducer } = listStoreSlice;
export const { doSwitchListStore, doSwitchSelectedStore, doSwitchBaseUrl } = actions;
export default reducer;