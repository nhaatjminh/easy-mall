export const removeSpace = (s) => {
    return s.trim().replace(/\s+/g, ' ');
}

export const checkValidURL = (data) => {
    const check = data.match(/^\/[/.a-zA-Z0-9-]+$/gm)
    return check;
}