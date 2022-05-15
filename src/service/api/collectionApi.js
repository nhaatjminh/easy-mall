import { callAPIWithGetMethod, callAPIWithPostMethod } from "../../helpers/callAPI"

export const collectionApi = {
    getCollections: async (id) => {
        const result = await callAPIWithGetMethod(`stores/${id}/collections/product`, true);
        return result;
    },
    getOneCollection: async (id) => {
        const result = await callAPIWithGetMethod(`collections/product/${id}`, true);
        return result;
    },
    /**
     * @name createCollections
     * @description send data Collection from client to api -> create Collection
     * @param {string} id: storeId
     * @param {object} collectionObj: data of Collection
     * 
     * @returns {object} data of Collection
     */
     createCollections: async (id, collectionObj) => {
        const result = await callAPIWithPostMethod(`stores/${id}/collections`, collectionObj, true);
        return result;
    },
    /**
     * @name uploadImageCollection
     * @description upload image to s3 from api
     * @param {object} data: 
     * {
     *  name: name of image to create key for image -> with product, this is uuid
     *  base64Image: data (convert image to base 64)
     * }
     * 
     * @returns {object} data have link of image on s3
     */
    uploadImageCollection: async (data) => {
        const result = await callAPIWithPostMethod(`files/upload-image-to-s3`, data, true);
        return result; 
    }
}