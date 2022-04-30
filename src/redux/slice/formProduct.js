import { createSlice } from '@reduxjs/toolkit';

export const formProduct = createSlice({
    name: 'itemProduct',
    initialState: {
        form: {}
    },
    reducers: {
        doSwitchForm(state, action) {
            state.form = action.payload;
        }
    }
})
const {actions, reducer} = formProduct;
export const {doSwitchForm} = actions;
export default reducer;