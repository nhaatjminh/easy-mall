import { createSlice } from '@reduxjs/toolkit';

export const keySelectedSlice = createSlice({
    name: 'keySelected',
    initialState: {
        key: 1
    },
    reducers: {
        doSwitchKeySelected(state, action) {
            
            state.key = action.payload;
        }
    }
})
const {actions, reducer} = keySelectedSlice;
export const {doSwitchKeySelected} = actions;
export default reducer;