import axios, { AxiosError } from 'axios'
import FetchAuth from './fetchAuth'

const RequireAuth = async () => {
    const [token, setToken] = FetchAuth();
    axios.post('http://localhost:5000/authenticate', {}, {
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
}

export default RequireAuth
