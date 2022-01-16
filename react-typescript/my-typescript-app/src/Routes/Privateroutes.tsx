import { Navigate, useLocation } from 'react-router-dom'
import React from 'react'
import FetchAuth from '../utils/fetchAuth'
import RequireAuth from '../utils/RequireAuth'

interface Props {
    component: JSX.Element,
    authenticated?: boolean
}

const Privateroutes: React.FC<Props> = ({ component, authenticated }: Props) => {
    RequireAuth();
    const [token] = FetchAuth();
    // console.log(`the token is ${token}`);
    const location = useLocation();
    return token ? component : <Navigate to='/login' state={{ from: location.pathname, message: "you must sign in to look at cart" }} />
}


export default Privateroutes
