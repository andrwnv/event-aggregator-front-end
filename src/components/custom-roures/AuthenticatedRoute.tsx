import React from 'react';
import { Route, RouteProps, Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

type AsyncRouteProps = RouteProps;

// function AsyncRoute({ importPath, ...props }: AsyncRouteProps) {
//     return <Route {...props} component={loadable(importPath)} />;
// }

export default function AuthenticatedRoute(props: AsyncRouteProps) {
    const { user } = useAuth();
    return !user ? <Navigate to="/" /> : <Route {...props} />;
}
