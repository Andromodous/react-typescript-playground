import React from 'react'
import FetchAuth from '../utils/fetchAuth';

interface Props {
    component: JSX.Element,
    authenticated?: boolean
}

const ProtectedRoutes: React.FC<Props> = ({ component, authenticated }: Props) => {
    const [token] = FetchAuth();
    return !token ?
        component
        :
        <div style={{ textAlign: 'center', padding: 3, fontSize: 24 }}>Please sign out and sign in again</div>
}


export default ProtectedRoutes
