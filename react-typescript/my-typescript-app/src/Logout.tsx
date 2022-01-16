import { useEffect } from 'react'
import FetchAuth from './utils/fetchAuth'
import { useNavigate } from 'react-router'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Logout = () => {
    const [, setToken] = FetchAuth();
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            setToken("");
            localStorage.removeItem('token');
            navigate('/');
        }, 2000);
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
