import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Alert from '@mui/material/Alert'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import FetchAuth from './utils/fetchAuth'
import FormHelperText from '@mui/material/FormHelperText'

const Register = () => {
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [age, setAge] = useState<number | string>('');
    const [gender, setGender] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [, setToken] = FetchAuth();
    const location = useLocation();
    const navigate = useNavigate();

    //this was extremely awkward to deal with
    var { state } = location as any;
    state = state?.from ? state?.from : '/';

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await axios.post('https://api-dot-serious-mile-336513.ts.r.appspot.com//register', { username: user, password, age, gender }, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json'
            }
        });
        try {
            if (!user || !password || !gender || !age) {
                throw new Error('some fields are empty, please fill them in');
            }
            if (gender === 'select') {
                throw new Error('you must select a gender');
            }
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            setSuccess('You have been signed in');
            setTimeout(() => {
                setToken(response.data.token);
                navigate(state, { replace: true });
            }, 1000);
        }
        catch (e: any) {
            setError(e.message);
            setSuccess('');
        }
        finally {
            setUser('');
            setPassword('');
            setAge('');
            setGender('')
        }
    }

    return (
        <form
            style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', margin: '1%', padding: '2%', flexWrap: 'wrap' }} onSubmit={(e) => handleSubmit(e)}>
            <TextField label='enter username' value={user} sx={{ margin: '1% 0', width: '80%' }} size='small' helperText='username'
                onChange={(e) => setUser(e.target.value)} onClick={() => setError('')} />
            <TextField label='enter password' value={password} sx={{ margin: '1% 0', width: '80%' }} size='small' type='password' helperText='password'
                onChange={(e) => setPassword(e.target.value)} onClick={() => setError('')} />
            <TextField label='enter age' value={age} sx={{ margin: '1% 0', width: '80%' }} size='small' type='number' helperText='age'
                onChange={(e) => setAge(parseInt(e.target.value))} onClick={() => setError('')} />
            <FormControl fullWidth sx={{ margin: '1% 0', width: '80%' }}>
                <InputLabel id='gender'>gender</InputLabel>
                <Select
                    value={gender}
                    label='gender'
                    id='gender'
                    onChange={(e) => setGender(e.target.value)}
                    onClick={() => setError('')}
                >
                    <MenuItem value='select'>Select</MenuItem>
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                    <MenuItem value='other/ anonymous'>Other</MenuItem>
                </Select>
                <FormHelperText>gender</FormHelperText>
            </FormControl>
            <div style={{ width: '80%' }}>
                <Alert style={{ display: error ? 'flex' : 'none' }} severity='error' sx={{ m: 1 }}>
                    {error.length > 0 ? error : ''}
                </Alert>
                <Alert style={{ display: success ? 'flex' : 'none' }} severity='success' sx={{ m: 1 }}>
                    {success.length > 0 ? success : ''}
                </Alert>
            </div>
            <div style={{ width: '80%' }}>
                <Button type='submit' variant='contained' color='info' endIcon={<AccountCircleIcon />}>signup now</Button>
                <span style={{ margin: '2%' }}>already have an account? <Link to='/login'>Login here</Link></span>
            </div>
        </form>

    )
}

export default Register
