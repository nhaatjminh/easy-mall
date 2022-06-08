import { callAPIWithGetMethod, callAPIWithPostMethod, callAPIWithDeleteMethod, callAPIWithPutMethod } from "../../helpers/callAPI"
import { Common } from '../utils'
export const bannerApi = {
    getBanners: async (id, params) => {
        const query = Common.queryCSV(params);
        const result = await callAPIWithGetMethod(`stores/${id}/collections/banner?${query}`, true);
        return result;
    },
    getOneBanner: async (id) => {
        const result = await callAPIWithGetMethod(`collections/banner/${id}`, true);
        return result;
    },
    /**
     * @name createBanners
     * @description send data Banner from client to api -> create Banner
     * @param {string} id: storeId
     * @param {object} bannerObj: data of Banner
     * 
     * @returns {object} data of Collection
     */
     createBanners: async (id, bannerObj) => {
        const result = await callAPIWithPostMethod(`stores/${id}/bannercollections`, bannerObj, true);
        return result;
    },
    /**
     * @name uploadImageBannerCollection
     * @description upload image to s3 from api
     * @param {object} data: 
     * {
     *  name: name of image to create key for image -> with product, this is uuid
     *  base64Image: data (convert image to base 64)
     * }
     * 
     * @returns {object} data have link of image on s3
     */
     uploadImageBannerCollection: async (data) => {
        const result = await callAPIWithPostMethod(`files/upload-product-image`, data, true);
        return result; 
    },
    /**
     * @name deleteBanner
     * @description delete one collection with id in param
     * @param {String} id: 
     * {
     *  name: name of image to create key for image -> with product, this is uuid
     *  base64Image: data (convert image to base 64)
     * }
     * 
     * @returns {object} data have link of image on s3
     */
     deleteBanner: async (id) => {
        const result = await callAPIWithDeleteMethod(`collections/banner/${id}`, true);
        return result; 
    },
    /**
     * @name UpdateBanner
     * @description Update one banner with id in param
     * @param {Object} newBanner: 
     * {
     *  collection: information of collection. Need have id of collection
     *  products: list product is assigned for this collection
     * }
     * 
     * @returns {object} data have link of image on s3
     */
    updateBanner: async (newBanner) => {
        const result = await callAPIWithPutMethod(`collections/product/${newBanner.collection.id}`, newBanner, true);
        return result; 
    },
    /**
     * @name deleteThumbnail
     * @description delete thumbnail 
     * @param {url} : 
     * {
     *  name: name of image to create key for image -> with product, this is uuid
     *  base64Image: data (convert image to base 64)
     * }
     * 
     * @returns {} data have link of image on s3
     */
     uploadImageProduct: async (data) => {
        const result = await callAPIWithPostMethod(`files/upload-image-to-s3`, data, true);
        return result; 
    },
    /**
     * @name deleteImageBanner
     * @description delete image to s3 from api
     * @param {object} : body with url
     * {
     *  url: url of image on s3
     * }
     * 
     * @returns {object} 
     */
     deleteImageBanner: async (data) => {
        const result = await callAPIWithPutMethod(`files/object`, data, true);
        return result; 
    },
}