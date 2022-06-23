import { callAPIWithGetMethod } from "../../helpers/callAPI"
export const dataApi = {
    getCity: async () => {
        const result = await callAPIWithGetMethod(`data/city`, true);
        return result;
    },
    getDistrict: async (idCity) => {
        const result = await callAPIWithGetMethod(`data/city/${idCity}/district`, true);
        return result;
    }
}