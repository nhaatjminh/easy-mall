import { callAPIWithGetMethod, callAPIWithPostMethod } from "../../helpers/callAPI"

export const collectionApi = {
    getCollections: async (id) => {
        const result = await callAPIWithGetMethod(`stores/${id}/collections/product`, true);
        return result;
    },
    createCollections: async (collectionObj) => {
        const result = await callAPIWithPostMethod('collections/product', collectionObj, true);
        return result;
    }
}