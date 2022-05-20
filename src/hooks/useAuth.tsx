import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

import { User, LogInDto, LoginResult } from '../types/user.type';
import { Login, Me } from '../api/auth/auth.api';


export interface AuthContextType {
    user: User;
    loading: boolean;
    error?: AxiosResponse<any>;
    login: (dto: LogInDto) => void;
    logout: () => void;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children} : { children: ReactNode }): JSX.Element {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<AxiosResponse<any> | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (error)
            setError(null);
    }, [location.pathname, error]);

    const _me = () => {
        Me().then(user => setUser(user))
            .catch(err => setError(err))
            .finally(() => setLoadingInitial(false));
    }

    useEffect(() => {
        _me();
    }, [])

    function login(dto: LogInDto) {
        setLoading(true);

        Login(dto).then((res: LoginResult) => {
            localStorage.setItem('custom-roures-key', res.token);
            _me();
            navigate('/', {replace: true});
        })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }

    function logout() {
        // todo(andrwnv): api logout
        localStorage.removeItem('custom-roures-key');
    }

    const memValue = useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            logout
        } as AuthContextType), [user, loading, error]
    )

    return (
        <AuthContext.Provider value={memValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

export default function useAuth(): AuthContextType {
    return useContext(AuthContext);
}
