import { callAPIWithGetMethod, callAPIWithPutMethod } from "../../helpers/callAPI";

export const UserApi = {
    getInfo: async () => {
        const result = await callAPIWithGetMethod(`account/user-info`, true);
        return result;
    },
    updateInfo: async (userObj) => {
        const result = await callAPIWithPutMethod(`account/updateaccount`, userObj, true);
        return result;
    },
    changePassword: async (passwordObj) => {
        const result = await callAPIWithPutMethod(`account/change-password`, passwordObj, true);
        return result;
    }
}