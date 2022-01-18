import { useEffect } from 'react'
import FetchAuth from './utils/fetchAuth'
import { useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import axios from 'axios'

const Logout = () => {
    const [token, setToken] = FetchAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axios.post('http://localhost:5000/logout', {}, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            }
        }).then(() => {
            setTimeout(() => {
                setToken("");
                localStorage.removeItem('token');
                navigate('/');
            }, 2000);
        });
    })
    return (
        <>
            <p style={{ textAlign: "center", fontSize: '32px' }}>You are being logged out!</p>
            <Box sx={{ width: '80%', margin: "1% auto" }}>
                <LinearProgress />
            </Box>
        </>
    )
}

export default Logout
