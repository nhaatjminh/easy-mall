
export const Common = {
    queryCSV: (params) => {
        const qs = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
        return qs;
    },
}