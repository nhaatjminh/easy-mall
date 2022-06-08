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

export const doUpdateMenuItem = createAsyncThunk(
    'navigation@put/UpdateMenuItem',
    async (itemObj) => {
        const result = await NavigationApi.updateMenuItem(itemObj);
        return {
            ...itemObj,
            ...result.data.rows[0]
            // id: result.data.rows[0].id
        };
    }
);

export const doDeleteMenuItem = createAsyncThunk(
    'navigation@delete/DeleteMenuItem',
    async (menuItemId) => {
        const result = await NavigationApi.deleteMenuItem(menuItemId);
        return {
            id: menuItemId
        };
    }
);

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        listNavigation: [],
        currentMenu: {},
        isLoading: false
    },
    reducers: {
        doSetCurrentMenu(state, action) {
            state.currentMenu = action.payload
        }
    },
    extraReducers: (builder) => {
        // get Navigation
        builder.addCase(doGetListNavigation.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(doGetListNavigation.fulfilled, (state, action) => {
            state.listNavigation = action.payload;
            state.isLoading = false
        });
        builder.addCase(doGetListNavigation.rejected, (state, action) => {
            state.isLoading = false
        });

        // get current menu
        builder.addCase(doGetCurrentMenu.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doGetCurrentMenu.fulfilled, (state, action) => {
            state.currentMenu = action.payload;
            state.isLoading = false
        });
        builder.addCase(doGetCurrentMenu.rejected, (state, action) => {
            state.isLoading = false
        });

        // create menu
        builder.addCase(doCreateMenu.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doCreateMenu.fulfilled, (state, action) => {
            state.listNavigation.push(action.payload);
            state.isLoading = false;
        });
        builder.addCase(doCreateMenu.rejected, (state, action) => {
            state.isLoading = false
        });


        // create menu item
        builder.addCase(doCreateMenuItem.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doCreateMenuItem.fulfilled, (state, action) => {
            const newItem = action.payload;
            state.currentMenu.listMenuItem.push(newItem);

            const index = state.listNavigation.findIndex(item => item.id === newItem.menu_id)
            if (index >= 0) {
                state.listNavigation[index].listMenuItem.push(newItem);
            }
            state.isLoading = false;
        })
        builder.addCase(doCreateMenuItem.rejected, (state, action) => {
            state.isLoading = false
        });

        // update menu item
        builder.addCase(doUpdateMenuItem.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doUpdateMenuItem.fulfilled, (state, action) => {
            let updateItem = action.payload;
            const index1 = state.currentMenu.listMenuItem.findIndex((item) => item.id === updateItem.id)
            if (index1 >= 0) {
                updateItem = {
                    ...state.currentMenu.listMenuItem[index1],
                    ...updateItem
                }
                state.currentMenu.listMenuItem[index1] = updateItem
            }

            const index = state.listNavigation.findIndex(item => item.id === updateItem.menu_id)
            if (index >= 0) {
                state.listNavigation[index].listMenuItem[index1] = updateItem;
            }
            state.isLoading = false
        })
        builder.addCase(doUpdateMenuItem.rejected, (state, action) => {
            state.isLoading = false
        });

        // delete menu item
        builder.addCase(doDeleteMenuItem.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(doDeleteMenuItem.fulfilled, (state, action) => {
            const menuItemId = action.payload.id;

            const index = state.currentMenu.listMenuItem.findIndex((item) => item.id === menuItemId)
            if (index >= 0) {
                state.currentMenu.listMenuItem.splice(index, 1)
            } 

            const index2 = state.listNavigation.findIndex(item => item.id === item.menu_id)
            if (index2 >= 0) {
                state.listNavigation[index2].listMenuItem.splice(index, 1);
            }
            state.isLoading = false
        })
        builder.addCase(doDeleteMenuItem.rejected, (state, action) => {
            state.isLoading = false
        });
    }
})
const { actions, reducer } = navigationSlice;
export const { doSetCurrentMenu } = actions;
export default reducer;