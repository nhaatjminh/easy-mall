export const removeSpace = (s) => {
    return s.trim().replace(/\s+/g, ' ');
}

export const checkValidURL = (data) => {
    const check = data.match(/^\/[/.a-zA-Z0-9-]+$/gm)
    return check;
}

export const getDateTime = (date, time) => {
    const __date = new Date(new Date(date) - 7 * 3600000)
    const __time = new Date(new Date(time) - 7 * 3600000)
    return __date.toISOString().split('T')[0] + ' ' + __time.toLocaleTimeString();
}

export const getBase64 = (file) => {
    return new Promise(resolve => {
        let reader = new FileReader();

        // Convert the file to base64 text
        reader.readAsDataURL(file);

        // on reader load something...
        reader.onload = () => {
            resolve(reader.result);
        };
    });
};