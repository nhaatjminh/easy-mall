import { callAPIWithGetMethod, callAPIWithPostMethod, callAPIWithDeleteMethod } from "../../helpers/callAPI"

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
        const result = await callAPIWithPostMethod(`files/upload-image-to-s3`, data, true);
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
    getProductsOfStore: async (storeId) => {
        const result = await callAPIWithGetMethod(`stores/${storeId}/products`, true);
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
    uploadProduct: async (product) => {
        const result = await callAPIWithPostMethod(`products/${product.product.id}/update`, product, true);
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
    }
}