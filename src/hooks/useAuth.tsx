import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

import { AxiosResponse } from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

import { User, LogInDto, LoginResult } from '../types/user.type'
import { Login, Me } from '../api/auth/auth.api'


export interface AuthContextType {
    user?: User;
    loading: boolean;
    error?: AxiosResponse;
    login: (dto: LogInDto) => void;
    logout: () => void;
    me: () => void;
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
    const [user, setUser] = useState<User | undefined>()
    const [error, setError] = useState<AxiosResponse | undefined>()
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (error)
            setError(undefined)
    }, [location.pathname])

    useEffect(() => {
        if (user === undefined)
            me()
    }, [])

    function me() {
        Me().then(updated => {
            setUser(updated)
        }).catch(err => {
            setError(err.response)
        }).finally(() => setLoadingInitial(false))
    }

    function login(dto: LogInDto) {
        setLoading(true)

        Login(dto).then((res: LoginResult) => {
            localStorage.setItem('api-key', res.token)
            me()
            navigate('/', { replace: true })
        }).catch(err => setError(err.response)).finally(() => setLoading(false))
    }

    function logout() {
        localStorage.removeItem('api-key')
        setUser(undefined)
        setError(undefined)

        navigate('/', { replace: true })
    }

    const memValue = useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            logout,
            me,
        } as AuthContextType), [user, loading, error],
    )

    return (
        <AuthContext.Provider value={memValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    )
}

export default function useAuth(): AuthContextType {
    return useContext(AuthContext)
}
