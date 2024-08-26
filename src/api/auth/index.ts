import { getCookie, setCookie } from "@/utils/cookies";
import axios, { AxiosResponse, isAxiosError } from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000",
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {
            const accessTokenCookie = await getCookie('accessToken');

            const { data } = await api.post('/auth/refresh-token', {}, {
                headers: {
                    Authorization: 'Bearer ' + accessTokenCookie
                }
            });

            await setCookie('refreshToken', data.refreshToken, 1);
            
        }
    }
);

type AuthLoginResponse = {
    accessToken: string;
    refreshToken: string;
}

export async function requestLogin<E = string, T = AuthLoginResponse>(email: string, password: string): Promise<[E] | [undefined, T]> {
    try {

        const { data } = await api.post<undefined, AxiosResponse<AuthLoginResponse>>('/auth/login', {
            email,
            password
        });

        return [undefined, data as T];

    } catch (error) {
        if (isAxiosError(error)) {
            return [error.message as E];
        }

        return ['Error with login request.' as E];
    }
}

export async function requestMe(accessToken: string): Promise<[string | undefined, any | undefined]> {
    try {
        const response = await api.get('/users/me', {
            headers: {
                authorization: 'Bearer ' + accessToken
            }
        });

        return [undefined, response];
    } catch (error: any) {
        if (isAxiosError(error)) {
            console.error(error);
            return [error.message, undefined];
        }

        return ['Error with validate token.', undefined];
    }
}

export async function requestRefreshToken(accessToken: string) {
    try {
        const { data } = await api.get('/auth/refresh-token', {
            headers: {
                authorization: 'Bearer ' + accessToken
            }
        });

        return [undefined, data.refreshToken];
    } catch (error: any) {
        if (isAxiosError(error)) {
            console.error(error);
            return [error.message, undefined];
        }

        return ['Error with refresh token.', undefined];
    }
}