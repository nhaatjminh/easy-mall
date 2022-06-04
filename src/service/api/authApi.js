import { callAPIWithPostMethod } from "../../helpers/callAPI";

export const AuthApi = {
    login: async (userObj) => {
        const result = await callAPIWithPostMethod(`auth/login`, userObj, false);
        return result;
    },
    register: async (userObj) => {
        const result = await callAPIWithPostMethod(`auth/register`, userObj, false);
        return result;
    }
}