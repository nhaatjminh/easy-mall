import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StoreApi } from '../../service/api';
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

// export const doCreateStore = createAsyncThunk(
//     'store@post/CreateStore',
//     async (storeObj) => {
//       const result = await StoreApi.createStore(storeObj);
//       return {
//           ...storeObj,
//           id: result.data.rows[0].id
//         };
//     }
// );

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState:  {
        listNavigation: [],
        currentMenu: null
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

        builder.addCase(doGetCurrentMenu.fulfilled, (state, action) => {
            state.currentMenu = action.payload;
        });
    }
})
const {actions, reducer} = navigationSlice;
export const {doSetCurrentMenu} = actions;
export default reducer;