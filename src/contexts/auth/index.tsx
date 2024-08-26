import { requestLogin, requestMe } from "@/api/auth";
import { getCookie, setCookie } from "@/utils/cookies";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthContext = {
    user: any;
    accessToken: string | undefined;
    login: (email: string, password: string) => Promise<[string] | [undefined, boolean]>;
    logout: () => void;
}

export const AuthContext = createContext({} as AuthContext);

export default function AuthProvider({ children }: React.PropsWithChildren) {
    // States
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
    const [refreshToken, setRefreshToken] = useState<string | undefined>(undefined);
    const [user, setUser] = useState(undefined);

    // Hooks
    const navigate = useNavigate();

    // Functions
    async function login(email: string, password: string): Promise<[string] | [undefined, boolean]> {
        const [err, response] = await requestLogin(email, password);

        if (err) return [err];
        if (!response) return ['Response is not defined.'];

        const { accessToken: _accessToken, refreshToken: _refreshToken } = response;

        await setCookie('_refreshToken', _refreshToken, 1);
        await setCookie('_accessToken', _accessToken, 7);

        setAccessToken(_accessToken);
        setRefreshToken(_refreshToken);

        return [undefined, true];
    }

    async function me() {
        const accessTokenCookie = await getCookie('_accessToken');
        const refreshTokenCookie = await getCookie('_refreshToken');

        if (!accessTokenCookie) {
            toast.error('Usuário não autenticado.', {
                description: 'Access token is not defined.'
            });

            logout();

            return;
        }

        if (!refreshTokenCookie) {
            toast.error('Erro ao verificar o usuário.', {
                description: 'Refresh token is not defined.'
            });

            logout();

            return;
        }

        const [err, user] = await requestMe(refreshTokenCookie);

        if (err) {
            toast.error('Houve um erro ao validar o usuário', {
                description: err
            });

            return;
        }

        setUser(user);
        navigate('/private/home');
        
        return;
    }

    function updateRefreshToken(_refreshToken: string) {
        setRefreshToken(_refreshToken);
    }

    function logout() {
        setUser(undefined);
        setAccessToken(undefined);
        setRefreshToken(undefined);
        navigate('/login');
    }

    // UseEffects
    useEffect(() => { me() }, []);

    return <AuthContext.Provider value={{ user, accessToken, login, logout }}>
        {children}
    </AuthContext.Provider>
}