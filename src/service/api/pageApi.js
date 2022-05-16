import { callAPIWithGetMethod, callAPIWithPostMethod } from "../../helpers/callAPI"

export const PageApi = {
    getPagesByStore: async (storeId) => {
        const result = await callAPIWithGetMethod(`stores/${storeId}/pages`, true);
        return result;
    },
    createPage: async (pageObj) => {
        const result = await callAPIWithPostMethod('pages', pageObj, true);
        return result;
    },
}