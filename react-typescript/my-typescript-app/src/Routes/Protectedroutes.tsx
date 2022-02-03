import React from 'react'
import FetchAuth from '../utils/fetchAuth'

interface Props {
    component: JSX.Element,
    authenticated?: boolean
}

const ProtectedRoutes: React.FC<Props> = ({ component }: Props) => {
    const user = FetchAuth();

    return !user ? component
        :
        <div></div>
}


export default ProtectedRoutes
