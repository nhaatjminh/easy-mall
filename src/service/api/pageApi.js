import { callAPIWithDeleteMethod, callAPIWithGetMethod, callAPIWithPostMethod, callAPIWithPutMethod } from "../../helpers/callAPI"

export const PageApi = {
    getPagesByStore: async (storeId) => {
        const result = await callAPIWithGetMethod(`stores/${storeId}/pages`, true);
        return result;
    },
    checkExistName: async (name, storeId) => {
        const result = await callAPIWithGetMethod(`stores/${storeId}/page/${name}`, false);
        return result;
    },
    createPage: async (pageObj) => {
        const result = await callAPIWithPostMethod('pages', pageObj, true);
        return result;
    },
    updatePage: async (pageObj) => {
        const result = await callAPIWithPutMethod('pages', pageObj, true);
        return result;
    },
    deletePage: async (id) => {
        const result = await callAPIWithDeleteMethod(`pages/${id}`, true);
        return result;
    }
}