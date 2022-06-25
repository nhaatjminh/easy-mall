import { callAPIWithGetMethod, callAPIWithPostMethod, callAPIWithPutMethod } from "../../helpers/callAPI"

export const StoreApi = {
    getStores: async () => {
        const result = await callAPIWithGetMethod('stores', true);
        return result;
    },
    getStoreByName: async (name) => {
        const result = await callAPIWithGetMethod(`stores/is-exist/${name}`, false);
        return result;
    },
    createStore: async (storeObj) => {
        const result = await callAPIWithPostMethod('stores', storeObj, true);
        return result;
    },
    getPagesByStoreId: async (id, query) => {
        let list_query = '';
        let url = `stores/${id}/pages`
        for (let key in query) {
            list_query = list_query + '&' + key + '=' + query[key];
        }
        if (list_query.length > 0) {
            list_query = list_query.slice(1);
            url = url + '?' + list_query;
        }
        const result = await callAPIWithGetMethod(url, true);
        return result;
    },
    getStoreById: async (storeId) => {
        const result = await callAPIWithGetMethod(`stores/${storeId}`, true);
        return result;
    },
    updateStoreInfo: async (storeObj) => {
        const result = await callAPIWithPutMethod(`stores`, storeObj,true);
        return result;
    },
}