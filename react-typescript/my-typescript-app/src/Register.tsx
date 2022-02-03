import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './utils/firebase'

const Register = () => {
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [disable, setDisable] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const location = useLocation();
    const navigate = useNavigate();

    //this was extremely awkward to deal with
    var { state } = location as any;
    state = state?.from ? state?.from : '/';

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setDisable(true);
        try {
            if (!user || !password || !confirmPassword) {
                throw new Error('some fields are empty, please fill them in');
            }
            if (password !== confirmPassword) {
                throw new Error('your passwords do not match');
            }
            await createUserWithEmailAndPassword(auth, user, password);
            setSuccess('You have been signed in');
            setTimeout(() => {
                navigate(state, { replace: true });
            }, 1000);
        }
        catch (e: any) {
            console.log(e)
            setError(e.message);
            setSuccess('');
        }
        finally {
            setUser('');
            setPassword('');
            setConfirmPassword('');
            setDisable(false);
        }
    }

    return (
        <form
            style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', margin: '1%', padding: '2%', flexWrap: 'wrap' }} onSubmit={(e) => handleSubmit(e)}>
            <TextField label='enter username' value={user} sx={{ margin: '1% 0', width: '80%' }} size='small' helperText='username'
                onChange={(e) => setUser(e.target.value)} onClick={() => setError('')} />
            <TextField label='enter password' value={password} sx={{ margin: '1% 0', width: '80%' }} size='small' type='password' helperText='password'
                onChange={(e) => setPassword(e.target.value)} onClick={() => setError('')} />
            <TextField label='confirm password' value={confirmPassword} sx={{ margin: '1% 0', width: '80%' }} size='small' type='password' helperText='confirm password'
                onChange={(e) => setConfirmPassword(e.target.value)} onClick={() => setError('')} />
            <div style={{ width: '80%' }}>
                <Alert style={{ display: error ? 'flex' : 'none' }} severity='error' sx={{ m: 1 }}>
                    {error.length > 0 ? error : ''}
                </Alert>
                <Alert style={{ display: success ? 'flex' : 'none' }} severity='success' sx={{ m: 1 }}>
                    {success.length > 0 ? success : ''}
                </Alert>
            </div>
            <div style={{ width: '80%' }}>
                <Button type='submit' variant='contained' color='info' endIcon={<AccountCircleIcon />} disabled={disable}>signup now</Button>
                <span style={{ margin: '2%' }}>already have an account? <Link to='/login'>Login here</Link></span>
            </div>
        </form>

    )
}

export default Register
