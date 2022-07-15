import { callAPIWithGetMethod, } from "../../helpers/callAPI"
import { Common } from '../utils'
export const analysisApi = {
    getTotal: async (id, params) => {
        const query = Common.queryCSV(params);
        const result = await callAPIWithGetMethod(`stores/${id}/average-orders-value?${query}`, true);
        return result;
    },
}