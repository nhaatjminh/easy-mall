import { createAsyncThunk } from '@reduxjs/toolkit';
import { dataApi } from '../../service/api/dataApi';

export const doGetCity = createAsyncThunk(
    'data@get/GetCity',
    async () => {
        const result = await dataApi.getCity();
        return result.data;
    }
);

export const doGetDistrict = createAsyncThunk(
    'data@get/GetDistrict',
    async (idCity) => {
        const result = await dataApi.getDistrict(idCity);
        return result.data;
    }
);
