import { Navigate, useLocation } from 'react-router-dom'
import React from 'react'
import FetchAuth from '../utils/fetchAuth'
import { User } from 'firebase/auth'
interface Props {
    component: JSX.Element
}

const Privateroutes: React.FC<Props> = ({ component }: Props) => {
    const user = FetchAuth();
    const location = useLocation();
    return user as User ? component : <Navigate to='/login' state={{ from: location.pathname, message: "you must sign in to access checkout" }} />
}


export default Privateroutes
