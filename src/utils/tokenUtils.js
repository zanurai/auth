const TOKEN_KEY = 'jwt';

export const storeToken = (token) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    document.cookie = `${TOKEN_KEY}=${token};expires=${expirationDate.toUTCString()}; path=/`
    //localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith(`${TOKEN_KEY}=`)) {
            const token = cookie.substring(`${TOKEN_KEY}=`.length, cookie.length);
            console.log('TToken', token)
            return token;
        }
    }
    return null
};
export const removeToken = () => {
    document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    //localStorage.removeItem(TOKEN_KEY)
}