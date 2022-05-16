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
    createMenu: async (menuObj) => {
        const result = await callAPIWithPostMethod('menu', menuObj, true);
        return result;
    },
    createMenuItem: async (itemObj) => {
        const result = await callAPIWithPostMethod('menu-item', itemObj, true);
        return result;
    },
}