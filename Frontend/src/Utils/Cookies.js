// /src/utils/cookieUtils.js

export function setSession(sname, svalue, exp) {
    var d = new Date();
    d.setTime(d.getTime() + exp * 60000); // Expiry time in minutes
    document.cookie = `${sname}=${svalue};expires=${d.toUTCString()};path=/`;
}

export function getSession(sname) {
    const nameEQ = sname + "=";
    const cookies = decodeURIComponent(document.cookie).split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
}

export function clearSession(sname) {
    document.cookie = sname + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
}