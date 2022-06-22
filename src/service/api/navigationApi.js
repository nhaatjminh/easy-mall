import { callAPIWithDeleteMethod, callAPIWithGetMethod, callAPIWithPostMethod, callAPIWithPutMethod } from "../../helpers/callAPI"

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
    updateMenu: async (menuObj) => {
        const result = await callAPIWithPutMethod('menu', menuObj, true);
        return result;
    },
    deleteMenu: async (menuId) => {
        const result = await callAPIWithDeleteMethod(`menu/${menuId}`, true);
        return result;
    },
    createMenuItem: async (itemObj) => {
        const result = await callAPIWithPostMethod('menu-item', itemObj, true);
        return result;
    },
    updateMenuItem: async (itemObj) => {
        const result = await callAPIWithPutMethod('menu-item', itemObj, true);
        return result;
    },
    deleteMenuItem: async (menuItemId) => {
        const result = await callAPIWithDeleteMethod(`menu-item/${menuItemId}`, true);
        return result;
    },
}