import { callAPIWithGetMethod, callAPIWithPostMethod } from "../../helpers/callAPI";

export const TemplateApi = {
    getFreeTemplates: async (storeId) => {
        const result = await callAPIWithGetMethod(`stores/${storeId}/free-templates`, true);
        return result;
    },
    getPaidTemplates: async (storeId) => {
        const result = await callAPIWithGetMethod(`stores/${storeId}/paid-templates`, true);
        return result;
    },
    getCurrentTemplate: async (storeId) => {
        const result = await callAPIWithGetMethod(`stores/${storeId}/current-template`, true);
        return result;
    },
    getStoreTemplates: async (storeId) => {
        const result = await callAPIWithGetMethod(`stores/${storeId}/stores-templates`, true);
        return result;
    },
    useTemplate: async (template_id, user_id, store_id) => {
        const result = await callAPIWithPostMethod(`template/${template_id}/use-template`, { user_id, store_id }, true);
        return result;
    },
    buyTemplate: async (template_id, user_id, store_id) => {
        const result = await callAPIWithPostMethod(`template/${template_id}/buy-template`, { user_id, store_id }, true);
        return result;
    },
    publish: async (store_id) => {
        const result = await callAPIWithPostMethod(`stores/${store_id}/publish`, { }, true);
        return result;
    },
}