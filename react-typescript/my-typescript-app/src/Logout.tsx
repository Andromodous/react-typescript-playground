import { useEffect } from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { signOut } from 'firebase/auth'
import { auth } from './utils/firebase'
import { useState } from 'react'
import { AuthError } from 'firebase/auth'

const Logout = () => {
    const [error, setError] = useState<string>('');
    useEffect(() => {
        signOut(auth).catch((error: AuthError) => {
            setError(error.message);
        });
    }, [])
    return (
        <>
            <p style={{ textAlign: "center", fontSize: '32px' }}>You are being logged out!</p>
            <Box sx={{ width: '80%', margin: "1% auto" }}>
                {!error ? error : <LinearProgress />}
            </Box>
        </>
    )
}

export default Logout
