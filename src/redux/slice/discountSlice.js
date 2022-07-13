import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DiscountApi } from './../../service/api/discountApi';

export const doGetDiscounts = createAsyncThunk(
    'discount@get/GetDiscounts',
    async (storeId) => {
        const result = await DiscountApi.getDiscounts(storeId);
        return result.data;
    }
);

export const doGetDetailDiscount = createAsyncThunk(
    'discount@get/GetDetialDiscount',
    async (id) => {
        const result = await DiscountApi.getDetailDiscount(id);
        return result.data[0];
    }
);

export const doCreateDiscount = createAsyncThunk(
    'discount@post/CreateDiscount',
    async (discountObj) => {
        const result = await DiscountApi.createDiscount(discountObj);
        return {
            ...discountObj,
            id: result.data.rows[0].id
        }
    }
);

export const doUpdateDiscount = createAsyncThunk(
    'discount@put/UpdateDiscount',
    async (discountObj) => {
        const result = await DiscountApi.updateDiscount(discountObj);
        return discountObj
    }
);

export const doDeleteDiscount = createAsyncThunk(
    'discount@delete/DeleteDiscount',
    async (id) => {
        const result = await DiscountApi.deleteDiscount(id);
        return id
    }
);

export const doDeleteSelectedDiscounts = createAsyncThunk(
    'discount@deleteSelected/DeleteSelectedDiscounts',
    async (selected) => {
        const arr = selected.map((id) => {
            return DiscountApi.deleteDiscount(id)
        });
        const result = await Promise.all(arr)
        return selected
    }
);

export const discountSlice = createSlice({
    name: 'discount',
    initialState: {
        listDiscounts: [],
        currentDiscount: {},
        isLoading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // get discounts
        builder.addCase(doGetDiscounts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doGetDiscounts.fulfilled, (state, action) => {
            state.listDiscounts = action.payload;
            state.isLoading = false;
        });
        builder.addCase(doGetDiscounts.rejected, (state, action) => {
            state.isLoading = false;
        });

        // get detail discount
        builder.addCase(doGetDetailDiscount.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doGetDetailDiscount.fulfilled, (state, action) => {
            state.currentDiscount = action.payload;
            state.isLoading = false;
        });
        builder.addCase(doGetDetailDiscount.rejected, (state, action) => {
            state.isLoading = false;
        });

        // create
        builder.addCase(doCreateDiscount.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doCreateDiscount.fulfilled, (state, action) => {
            state.listDiscounts.push(action.payload);
            state.isLoading = false;
        });
        builder.addCase(doCreateDiscount.rejected, (state, action) => {
            state.isLoading = false;
        });

        // update 
        builder.addCase(doUpdateDiscount.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doUpdateDiscount.fulfilled, (state, action) => {
            const index = state.listDiscounts.findIndex((item) => item.id === action.payload.id)
            if (index >= 0) {
                state.listDiscounts[index] = action.payload
            }
            state.isLoading = false;
        });
        builder.addCase(doUpdateDiscount.rejected, (state, action) => {
            state.isLoading = false;
        });

        // delete 
        builder.addCase(doDeleteDiscount.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doDeleteDiscount.fulfilled, (state, action) => {
            const index = state.listDiscounts.findIndex((item) => item.id === action.payload)
            if (index >= 0) {
                state.listDiscounts.splice(index, 1)
            }
            state.isLoading = false;
        });
        builder.addCase(doDeleteDiscount.rejected, (state, action) => {
            state.isLoading = false;
        });

        // delete many
        builder.addCase(doDeleteSelectedDiscounts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doDeleteSelectedDiscounts.fulfilled, (state, action) => {
            const listDelete = action.payload;
            let dataList = [...state.listDiscounts];

            listDelete.forEach((id) => {
                const index = dataList.findIndex((item) => item.id === id)
                if (index >= 0) dataList.splice(index, 1)
            });
            
            state.listDiscounts = [...dataList]
            state.isLoading = false;
        });
        builder.addCase(doDeleteSelectedDiscounts.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
})
const { actions, reducer } = discountSlice;
export const { } = actions;
export default reducer;