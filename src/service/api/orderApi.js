import { callAPIWithGetMethod, callAPIWithPostMethod, callAPIWithDeleteMethod, callAPIWithPutMethod } from "../../helpers/callAPI"
import { Common } from '../utils'
export const orderApi = {
    getAllOrder: async (id, params) => {
        const query = Common.queryCSV(params);
        const result = await callAPIWithGetMethod(`stores/${id}/orders?${query}`, true);
        return result;
    },
    getOneOrder: async (id) => {
        const result = await callAPIWithGetMethod(`order/${id}`, true);
        return result;
    },
     createOrder: async (id, bannerObj) => {
        const result = await callAPIWithPostMethod(`stores/${id}/order`, bannerObj, true);
        return result;
    }
}