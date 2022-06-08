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
    async (id) => {
        const result = await PageApi.deletePage(id);
        return {
            id: id
        };
    }
)

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        listPages: [],
        isLoading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // get Navigation
        builder.addCase(doGetListPages.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(doGetListPages.fulfilled, (state, action) => {
            state.listPages = action.payload;
            state.isLoading = false
        });
        builder.addCase(doGetListPages.rejected, (state, action) => {
            state.isLoading = false
        });

        // create page
        builder.addCase(doCreatePage.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(doCreatePage.fulfilled, (state, action) => {
            state.listPages.push(action.payload)
            state.isLoading = false
        })
        builder.addCase(doCreatePage.rejected, (state, action) => {
            state.isLoading = false
        });

        // uppate page
        builder.addCase(doUpdatePage.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(doUpdatePage.fulfilled, (state, action) => {
            const index = state.listPages.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) state.listPages[index] = action.payload;

            state.isLoading = false
        });
        builder.addCase(doUpdatePage.rejected, (state, action) => {
            state.isLoading = false
        });

        // delete page
        builder.addCase(doDeletePage.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(doDeletePage.fulfilled, (state, action) => {
            const index = state.listPages.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) state.listPages.splice(index, 1);

            state.isLoading = false
        });
        builder.addCase(doDeletePage.rejected, (state, action) => {
            state.isLoading = false
        });
    }
})
const { actions, reducer } = pageSlice;
export const { doSetCurrentMenu } = actions;
export default reducer;