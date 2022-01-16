import React, { useContext } from 'react'
import AuthContext from '../AuthContext'

interface Props {
    component: JSX.Element,
    authenticated?: boolean
}

const ProtectedRoutes: React.FC<Props> = ({ component, authenticated }: Props) => {
    const [token] = useContext(AuthContext);

    return !token ? component : <div></div>
}


export default ProtectedRoutes
