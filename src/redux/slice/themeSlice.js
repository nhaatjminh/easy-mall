import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { result } from 'lodash';
import { TemplateApi } from '../../service/api/templateApi';

export const doGetFreeTemplates = createAsyncThunk(
    'theme@get/GetFreeTemplates',
    async (storeId) => {
        const result = await TemplateApi.getFreeTemplates(storeId);
        return result.data;
    }
);

export const doGetPaidTemplates = createAsyncThunk(
    'theme@get/GetPaidTemplates',
    async (storeId) => {
        const result = await TemplateApi.getPaidTemplates(storeId);
        return result.data;
    }
);

export const doGetCurrentTemplate = createAsyncThunk(
    'theme@get/GetCurrentTemplate',
    async (storeId) => {
        const result = await TemplateApi.getCurrentTemplate(storeId);
        return result.data;
    }
);

export const doGetStoreTemplates = createAsyncThunk(
    'theme@get/GetStoreTemplates',
    async (storeId) => {
        const result = await TemplateApi.getStoreTemplates(storeId);
        return result.data;
    }
);

export const doUseTemplate = createAsyncThunk(
    'theme@post/UseTemplate',
    async (templateObj) => {
        const result = await TemplateApi.useTemplate(templateObj.template.id, templateObj.user_id, templateObj.store_id);
        return result.statusCode === 200 ? 
        { 
            ...templateObj.template, 
            home_page_id: result.data.id 
        } : { message: result.message }
    }
);

export const doBuyTemplate = createAsyncThunk(
    'theme@post/ByTemplate',
    async (templateObj) => {
        const result = await TemplateApi.buyTemplate(templateObj.template.id, templateObj.user_id, templateObj.store_id);
        return { ...templateObj.template };
    }
);

export const doPublish = createAsyncThunk(
    'theme@post/publish',
    async (store_id) => {
        const result = await TemplateApi.publish(store_id);
        return result.data;
    }
);

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        freeTemplates: [],
        paidTemplates: [],
        storeTemplates: [],
        currentTemplate: {},
        isLoading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // get free themes
        builder.addCase(doGetFreeTemplates.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(doGetFreeTemplates.fulfilled, (state, action) => {
            state.freeTemplates = action.payload;
            state.isLoading = false
        });
        builder.addCase(doGetFreeTemplates.rejected, (state, action) => {
            state.isLoading = false
        });

        // get paid themes
        builder.addCase(doGetPaidTemplates.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(doGetPaidTemplates.fulfilled, (state, action) => {
            state.paidTemplates = action.payload;
            state.isLoading = false
        });
        builder.addCase(doGetPaidTemplates.rejected, (state, action) => {
            state.isLoading = false
        });

        // get store themes
        builder.addCase(doGetStoreTemplates.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(doGetStoreTemplates.fulfilled, (state, action) => {
            state.storeTemplates = action.payload;
            state.isLoading = false
        });
        builder.addCase(doGetStoreTemplates.rejected, (state, action) => {
            state.isLoading = false
        });

        // get current theme
        builder.addCase(doGetCurrentTemplate.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(doGetCurrentTemplate.fulfilled, (state, action) => {
            state.currentTemplate = action.payload;
            state.isLoading = false
        });
        builder.addCase(doGetCurrentTemplate.rejected, (state, action) => {
            state.isLoading = false
        });

        // publish 
        builder.addCase(doPublish.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(doPublish.fulfilled, (state, action) => {
            // state.currentTemplate = action.payload;
            state.isLoading = false
        });
        builder.addCase(doPublish.rejected, (state, action) => {
            state.isLoading = false
        });

        // use theme
        builder.addCase(doUseTemplate.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(doUseTemplate.fulfilled, (state, action) => {
            state.currentTemplate = action.payload;
            state.isLoading = false
        });
        builder.addCase(doUseTemplate.rejected, (state, action) => {
            state.isLoading = false
        });

        // buy theme
        builder.addCase(doBuyTemplate.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(doBuyTemplate.fulfilled, (state, action) => {
            const index = state.paidTemplates.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                state.paidTemplates[index].owned = true;
            }

            const index2 = state.freeTemplates.findIndex((item) => item.id === action.payload.id);
            if (index2 >= 0) {
                state.freeTemplates[index2].owned = true;
            }

            state.storeTemplates.push(action.payload)
            state.isLoading = false
        });
        builder.addCase(doBuyTemplate.rejected, (state, action) => {
            state.isLoading = false
        });
    }
})
const { actions, reducer } = themeSlice;
export const { } = actions;
export default reducer;