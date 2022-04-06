import { createSlice } from '@reduxjs/toolkit';

export const formProduct = createSlice({
    name: 'itemProduct',
    initialState: {
        title: "",
        description: "",
        collection: [],
    },
    reducers: {
        doSwitchTitle(state, action) {
            state.title = action.payload;
        },
        doSwitchDescription(state, action) {
            state.description = action.payload;
        },
        doSwitchCollection(state, action) {
            state.collection = action.payload;
        },
    }
})
const {actions, reducer} = formProduct;
export const {doSwitchTitle, doSwitchDescription, doSwitchCollection} = actions;
export default reducer;