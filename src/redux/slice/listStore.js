import { createSlice } from '@reduxjs/toolkit';

export const listStoreSlice = createSlice({
    name: 'listStore',
    initialState:  {
        listStore: [],
        selectedName: ''
    },
    reducers: {
        doSwitchListStore(state, action) {
            state.listStore = action.payload;
        },
        doSwitchSelectedStore(state, action) {
            state.selectedName = action.payload;
        }
    }
})
const {actions, reducer} = listStoreSlice;
export const {doSwitchListStore, doSwitchSelectedStore} = actions;
export default reducer;