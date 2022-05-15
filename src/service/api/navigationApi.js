import { callAPIWithGetMethod, callAPIWithPostMethod } from "../../helpers/callAPI"

export const NavigationApi = {
    getNavigation: async (storeId) => {
        const result = await callAPIWithGetMethod(`stores/${storeId}/list-menu-items`, true);
        return result;
    },
    getMenu: async (menuId) => {
        const result = await callAPIWithGetMethod(`menu/${menuId}`, false);
        return result;
    },
    // createStore: async (storeObj) => {
    //     const result = await callAPIWithPostMethod('stores', storeObj, true);
    //     return result;
    // },
}