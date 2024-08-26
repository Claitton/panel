
export async function getCookie(cname: string): Promise<string | null> {
    return await new Promise((resolve, reject) => {
        try {
            const nameEQ = cname + "=";
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1, cookie.length);
                }
                if (cookie.indexOf(nameEQ) === 0) {
                    resolve(cookie.substring(nameEQ.length, cookie.length));
                    return;
                }
            }
            resolve(null); // Cookie not found
        } catch (error) {
            reject(error);
        }
    });
}

export async function setCookie(cname: string, cvalue: string, days: number) {
    return await new Promise((resolve, reject) => {
        try {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = cname + "=" + (cvalue || "") + expires + "; path=/";
            resolve(document.cookie);
        } catch (error) {
            reject(error);
        }
    });
}
