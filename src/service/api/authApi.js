import { callAPIWithPostMethod, callAPIWithPutMethod } from "../../helpers/callAPI";

export const AuthApi = {
    login: async (userObj) => {
        const result = await callAPIWithPostMethod(`auth/login`, userObj, false);
        return result;
    },
    register: async (userObj) => {
        const result = await callAPIWithPostMethod(`auth/register`, userObj, false);
        return result;
    },
    requestPasswordReset: async (email) => {
        const result = await callAPIWithPostMethod('auth/request-reset-password', { email }, false);
        return result;
    },
    resetPassword: async (obj) => {
        const result = await callAPIWithPutMethod('auth/reset-password', obj, true);
        return result;
    }
}