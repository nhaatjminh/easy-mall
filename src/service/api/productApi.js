import { callAPIWithGetMethod, callAPIWithPostMethod, callAPIWithDeleteMethod, callAPIWithPutMethod } from "../../helpers/callAPI"
import { Common } from '../utils'
export const ProductApi = {
    /**
     * @name createProduct
     * @description send data product from client to api -> create product
     * @param {string} id: storeId
     * @param {object} productObj: data of product
     * 
     * @returns {object} data of product
     */
    createProduct: async (id, productObj) => {
        const result = await callAPIWithPostMethod(`stores/${id}/products`, productObj, true);
        return result;
    },
    /**
     * @name uploadImageProduct
     * @description upload image to s3 from api
     * @param {object} data: 
     * {
     *  name: name of image to create key for image -> with product, this is uuid
     *  base64Image: data (convert image to base 64)
     * }
     * 
     * @returns {object} data have link of image on s3
     */
    uploadImageProduct: async (data) => {
        console.log(data);
        const result = await callAPIWithPostMethod(`files/upload-product-image`, data, true);
        return result; 
    },
    /**
     * @name deleteImageProduct
     * @description delete image to s3 from api
     * @param {object} : body with url
     * {
     *  url: url of image on s3
     * }
     * 
     * @returns {object} 
     */
    deleteImageProduct: async (data) => {
        const result = await callAPIWithPutMethod(`files/object`, data, true);
        return result; 
    },
    /**
     * @name getProductsOfStore
     * @description get allProduct of store
     * 
     * @param {string} storeId: 
     * 
     * @returns {object} data 
     */
    getProductsOfStore: async (storeId, params) => {
        const query = Common.queryCSV(params);
        const result = await callAPIWithGetMethod(`stores/${storeId}/products?${query}`, true);
        return result; 
    },
    /**
     * @name getProductsOfStoreScopeFull
     * @description get allProduct of store with have variant
     * 
     * @param {string} storeId: 
     * 
     * @returns {object} data 
     */
    getProductsOfStoreScopeFull: async (storeId, params) => {
        const query = Common.queryCSV(params);
        const result = await callAPIWithGetMethod(`stores/${storeId}/products-variant?${query}`, true);
        return result; 
    },
    /**
     * @name getOneProduct
     * @description get one Product of store
     * 
     * @param {string} productId: 
     * @returns {object} data 
     */
    getOneProduct: async (productId) => {
        const result = await callAPIWithGetMethod(`products/${productId}`, true);
        return result; 
    },
    /**
     * @name uploadProduct
     * @description update one Product of store
     * 
     * @param {object} product: 
     * @returns {object} data 
     */
    uploadProduct: async (product, id) => {
        const result = await callAPIWithPutMethod(`products/${id}`, product, true);
        return result; 
    },
    /**
     * @name deleteProduct
     * @description delete one Product of store
     * 
     * @param {string} id: 
     * @returns {object} data 
     */
    deleteProduct: async (id) => {
        const result = await callAPIWithDeleteMethod(`products/${id}`, true);
        return result; 
    },
    /**
     * @name getAllType
     * @description Get all Custom Type
     * @param {id} : id of store
     * 
     * @returns {object} 
     */
    getAllType: async (id) => {
        const result = await callAPIWithGetMethod(`stores/${id}/products/custom-type`, true);
        return result; 
    },
    /**
     * @name getAllVendor
     * @description Get all Custom Vendor
     * @param {id} : id of store
     * 
     * @returns {object} 
     */
    getAllVendor: async (id) => {
        const result = await callAPIWithGetMethod(`stores/${id}/products/vendor`, true);
        return result; 
    },
    /**
     * @name getDescription
     * @description Get description of product from s3
     * @param {url}
     * 
     * @returns {object} 
     */
     getDescription: async (url) => {
        let result = '';
        await fetch(url)
        .then(res => res.json())
        .then(out => result = out)
        .catch(err => console.log(err));
        return result; 
    }
}