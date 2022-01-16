import { useContext } from 'react'
import AuthContext from '../AuthContext';

export default function FetchAuth() {
    return useContext(AuthContext);
}


