import { callAPIWithGetMethod, callAPIWithPostMethod, callAPIWithDeleteMethod, callAPIWithPutMethod } from "../../helpers/callAPI"

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
    },
    /**
     * @name deleteCollection
     * @description delete one collection with id in param
     * @param {String} id: 
     * {
     *  name: name of image to create key for image -> with product, this is uuid
     *  base64Image: data (convert image to base 64)
     * }
     * 
     * @returns {object} data have link of image on s3
     */
     deleteCollection: async (id) => {
        const result = await callAPIWithDeleteMethod(`collections/product/${id}`, true);
        return result; 
    },
    /**
     * @name UpdateCollection
     * @description Update one collection with id in param
     * @param {Object} newCollection: 
     * {
     *  collection: information of collection. Need have id of collection
     *  products: list product is assigned for this collection
     * }
     * 
     * @returns {object} data have link of image on s3
     */
    updateCollection: async (newCollection) => {
        const result = await callAPIWithPutMethod(`collections/product/${newCollection.collection.id}`, newCollection, true);
        return result; 
    }
}