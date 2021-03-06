import { Navigate, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'
import FetchAuth from '../utils/fetchAuth'
import axios, { AxiosError } from 'axios'

interface Props {
    component: JSX.Element,
    authenticated?: boolean
}

const Privateroutes: React.FC<Props> = ({ component, authenticated }: Props) => {
    const [token, setToken] = FetchAuth();
    useEffect(() => {
        axios.post(`https://api-dot-serious-mile-336513.ts.r.appspot.com/authenticate`, {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        }).catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                setToken("");
            }
        })
    })
    const location = useLocation();
    return token ? component : <Navigate to='/login' state={{ from: location.pathname, message: "you must sign in to access checkout" }} />
}


export default Privateroutes
