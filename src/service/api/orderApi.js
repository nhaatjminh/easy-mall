import { callAPIWithGetMethod, callAPIWithPostMethod, callAPIWithDeleteMethod, callAPIWithPutMethod } from "../../helpers/callAPI"
import { Common } from '../utils'
export const orderApi = {
    getAllOrder: async (id, params) => {
        const query = Common.queryCSV(params);
        const result = await callAPIWithGetMethod(`stores/${id}/orders?${query}`, true);
        return result;
    },
    getOneOrder: async (id, storeId) => {
        const result = await callAPIWithGetMethod(`stores/${storeId}/order/${id}`, true);
        return result;
    },
    createOrder: async (id, orderObj) => {
        const result = await callAPIWithPostMethod(`stores/${id}/order`, orderObj, true);
        return result;
    },
    getActiveDiscount: async (id, params) => {
        const result = await callAPIWithPostMethod(`stores/${id}/active-discounts`, params, true);
        return result;
    },
    changeStatus: async (order_id, params) => {
        const result = await callAPIWithPostMethod(`order/${order_id}/change-status`, params, true);
        return result;
    },
    restoreStatus: async (order_id, params) => {
        const result = await callAPIWithPostMethod(`order/${order_id}/restore-order`, params, true);
        return result;
    },
    deleteStatus: async (order_id, params) => {
        const result = await callAPIWithPostMethod(`order/${order_id}/delete-status`, params, true);
        return result;
    },
    removeStatus: async (order_id, params) => {
        const result = await callAPIWithDeleteMethod(`order/${order_id}`, params, true);
        return result;
    }
}