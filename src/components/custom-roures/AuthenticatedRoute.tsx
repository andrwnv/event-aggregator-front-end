import React from 'react'
import { Navigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

export default function AuthenticatedRoute({children}: any) {
    const { user } = useAuth()
    if (user === undefined)
        return <Navigate to='/' />

    return children
}
