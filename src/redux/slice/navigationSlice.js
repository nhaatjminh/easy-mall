import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NavigationApi } from './../../service/api/navigationApi';

export const doGetListNavigation = createAsyncThunk(
    'navigation@get/GetListNavigation',
    async (storeId) => {
        const result = await NavigationApi.getNavigation(storeId);
        return result.data;
    }
);

export const doGetCurrentMenu = createAsyncThunk(
    'navigation@get/GetCurrentMenu',
    async (menuId) => {
        const result = await NavigationApi.getMenu(menuId);
        return result.data;
    }
);

export const doCreateMenu = createAsyncThunk(
    'navigation@post/CreateMenu',
    async (menuObj) => {
        const result = await NavigationApi.createMenu(menuObj);
        return {
            ...menuObj,
            id: result.data.rows[0].id
        };
    }
);

export const doCreateMenuItem = createAsyncThunk(
    'navigation@post/CreateMenuItem',
    async (itemObj) => {
        const result = await NavigationApi.createMenuItem(itemObj);
        return {
            ...itemObj,
            id: result.data.rows[0].id
        };
    }
);

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        listNavigation: [],
        currentMenu: {}
    },
    reducers: {
        doSetCurrentMenu(state, action) {
            state.currentMenu = action.payload
        }
    },
    extraReducers: (builder) => {
        // get Navigation
        builder.addCase(doGetListNavigation.pending, (state) => {

        });
        builder.addCase(doGetListNavigation.fulfilled, (state, action) => {
            state.listNavigation = action.payload;
        });
        builder.addCase(doGetListNavigation.rejected, (state, action) => {

        });

        // get current menu
        builder.addCase(doGetCurrentMenu.fulfilled, (state, action) => {
            state.currentMenu = action.payload;
        });

        // create menu item
        builder.addCase(doCreateMenuItem.fulfilled, (state, action) => {
            const newItem = action.payload;
            state.currentMenu.listMenuItem.push(newItem);

            const index = state.listNavigation.findIndex(item => item.id === newItem.menu_id)
            if (index >= 0) {
                state.listNavigation[index].listMenuItem.push(newItem);
            }
        })

        // create menu
        builder.addCase(doCreateMenu.fulfilled, (state,action) => {
            state.listNavigation.push(action.payload)
        })
    }
})
const { actions, reducer } = navigationSlice;
export const { doSetCurrentMenu } = actions;
export default reducer;