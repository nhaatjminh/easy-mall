import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserApi } from '../../service/api/userApi';

export const doGetUserInfo = createAsyncThunk(
    'user@put/GetUserInfo',
    async () => {
        const result = await UserApi.getInfo();
        return result.data;
    }
);

export const doUpdateUserInfo = createAsyncThunk(
    'user@put/UpdateUserInfo',
    async (userObj) => {
        const result = await UserApi.updateInfo(userObj);
        return userObj
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        info: {
            email: '',
            fullname: '',
            phone: '',
            gender: '',
            dob: ''
        },
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // get user info
        builder.addCase(doGetUserInfo.pending, (state) => {

        });
        builder.addCase(doGetUserInfo.fulfilled, (state, action) => {
            state.info = action.payload;
        });
        builder.addCase(doGetUserInfo.rejected, (state, action) => {

        });

        // uppate user info
        builder.addCase(doUpdateUserInfo.fulfilled, (state, action) => {
            state.info = {
                ...state.info,
                ...action.payload
            }
        })
    }
})
const { actions, reducer } = userSlice;
export const { } = actions;
export default reducer;