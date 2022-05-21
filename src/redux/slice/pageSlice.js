import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PageApi } from '../../service/api/pageApi';

export const doGetListPages = createAsyncThunk(
    'page@get/GetListPages',
    async (storeId) => {
        const result = await PageApi.getPagesByStore(storeId);
        return result.data;
    }
);

export const doCreatePage = createAsyncThunk(
    'page@post/CreatePage',
    async (pageObj) => {
        const result = await PageApi.createPage(pageObj);
        return {
            ...pageObj,
            id: result.data.rows[0].id
        };
    }
);

export const doUpdatePage = createAsyncThunk(
    'page@put/UpdatePage',
    async (pageObj) => {
        const result = await PageApi.updatePage(pageObj);
        return {
            ...pageObj,
            ...result.data.rows[0]
        };
    }
)

export const doDeletePage = createAsyncThunk(
    'page@delete/DeletePage',
    async (pageObj) => {
        const result = await PageApi.deletePage(pageObj);
        return {
            ...pageObj
        };
    }
)

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        listPages: [],
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // get Navigation
        builder.addCase(doGetListPages.pending, (state) => {

        });
        builder.addCase(doGetListPages.fulfilled, (state, action) => {
            state.listPages = action.payload;
        });
        builder.addCase(doGetListPages.rejected, (state, action) => {

        });

        // create page
        builder.addCase(doCreatePage.fulfilled, (state, action) => {
            state.listPages.push(action.payload)
        })

        // uppate page
        builder.addCase(doUpdatePage.fulfilled, (state, action) => {
            const index = state.listPages.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) state.listPages[index] = action.payload;
        })

        // delete page
        builder.addCase(doDeletePage.fulfilled, (state, action) => {
            const index = state.listPages.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) state.listPages.splice(index, 1);
        })
    }
})
const { actions, reducer } = pageSlice;
export const { doSetCurrentMenu } = actions;
export default reducer;