import { callAPIWithDeleteMethod, callAPIWithGetMethod, callAPIWithPostMethod, callAPIWithPutMethod } from "../../helpers/callAPI"

export const DiscountApi = {
    getDiscounts: async (storeId) => {
        const result = await callAPIWithGetMethod(`stores/${storeId}/discounts`, true);
        return result;
    },
    getDetailDiscount: async (id) => {
        const result = await callAPIWithGetMethod(`discount/${id}`, true);
        return result;
    },
    createDiscount: async (discountObj) => {
        const result = await callAPIWithPostMethod(`stores/${discountObj.store_id}/discount`, discountObj, true);
        return result;
    },
    updateDiscount: async (discountObj) => {
        const result = await callAPIWithPutMethod(`discount/${discountObj.id}`, discountObj, true);
        return result;
    },
    deleteDiscount: async (id) => {
        const result = await callAPIWithDeleteMethod(`discount/${id}`, true);
        return result;
    },
    generateCode: async (obj) => {
        const result = await callAPIWithPostMethod(`discount/generate-code`, obj, true);
        return result;
    },
    checkCode: async (obj) => {
        const result = await callAPIWithPostMethod(`discount/check-code`, obj, true);
        return result;
    },
}