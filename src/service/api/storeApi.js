import { callAPIWithGetMethod, callAPIWithPostMethod } from "../../helpers/callAPI"

export const StoreApi = {
    getStores: async () => {
        const result = await callAPIWithGetMethod('stores', true);
        return result;
    },
    createStore: async (storeObj) => {
        const result = await callAPIWithPostMethod('stores', storeObj, true);
        return result;
    }
}