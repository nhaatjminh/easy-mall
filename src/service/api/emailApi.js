import { callAPIWithGetMethod, callAPIWithPostMethod, callAPIWithPutMethod } from "../../helpers/callAPI";

export const EmailApi = {
    getEmail: async (storeId) => {
        const result = await callAPIWithGetMethod(`mail/${storeId}`, true);
        return result;
    },
    config: async (emailObj) => {
        const result = await callAPIWithPostMethod(`mail/config-email`, emailObj, true);
        return result;
    },
    update: async (emailObj) => {
        const result = await callAPIWithPutMethod(`mail/config-email`, emailObj, true);
        return result;
    },
    reset: async (emailObj) => {
        const result = await callAPIWithPostMethod(`mail/reset-email`, emailObj, true);
        return result;
    },
    resendVerifyEmail: async (email) => {
        const result = await callAPIWithPostMethod('mail/resend-verify-email', {email: email}, false);
        return result;
    }
}