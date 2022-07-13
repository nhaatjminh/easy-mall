import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StoreApi } from '../../service/api';
import { EmailApi } from '../../service/api/emailApi';

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
        let configEmail = {
            smtp: '',
            email: '',
            password: ''
        }
        if (result.data.custom_mail) {
            const mailRes = await EmailApi.getEmail(storeId)
            configEmail = mailRes.data[0]
        }

        result.data.emailConfig = configEmail
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

export const doConfigEmail = createAsyncThunk(
    'store@post/ConfigEmail',
    async (emailObj) => {
        const result = await EmailApi.config(emailObj);
        return { ...emailObj };
    }
);

export const doUpdateEmail = createAsyncThunk(
    'store@put/UpdateEmail',
    async (emailObj) => {
        const result = await EmailApi.update(emailObj);
        return { ...emailObj };
    }
);

export const doResetEmail = createAsyncThunk(
    'store@post/ResetEmail',
    async (emailObj) => {
        const result = await EmailApi.reset(emailObj);
        return { ...emailObj };
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

        // config email
        builder.addCase(doConfigEmail.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doConfigEmail.fulfilled, (state, action) => {
            state.currentStore = {
                ...state.currentStore,
                emailConfig: action.payload,
                mail_link: action.payload.email,
                custom_mail: false
            }
            state.isLoading = false;
        });
        builder.addCase(doConfigEmail.rejected, (state, action) => {
            state.isLoading = false;
        });

        // update email
        builder.addCase(doUpdateEmail.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doUpdateEmail.fulfilled, (state, action) => {
            state.currentStore = {
                ...state.currentStore,
                emailConfig: action.payload,
                mail_link: action.payload.email
            }
            state.isLoading = false;
        });
        builder.addCase(doUpdateEmail.rejected, (state, action) => {
            state.isLoading = false;
        });

        // reset email
        builder.addCase(doResetEmail.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doResetEmail.fulfilled, (state, action) => {
            state.currentStore.mail_link = state.currentStore.original_mail
            state.currentStore.custom_mail = false
            state.currentStore.emailConfig = {
                email: '',
                smtp: '',
                password: ''
            }
            state.isLoading = false;
        });
        builder.addCase(doResetEmail.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
})
const { actions, reducer } = listStoreSlice;
export const { doSwitchListStore, doSwitchSelectedStore, doSwitchBaseUrl } = actions;
export default reducer;