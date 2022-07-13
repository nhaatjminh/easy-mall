import { createAsyncThunk } from '@reduxjs/toolkit';
import { analysisApi } from '../../service/api';

export const doGetAnalysis = createAsyncThunk(
    'stores@get/GetListBanner',
    async (object) => {
      const result = await analysisApi.getTotal(object.id, object.params);
      return result.data;
    }
);
