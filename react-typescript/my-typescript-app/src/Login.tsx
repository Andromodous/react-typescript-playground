
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import fetchAuth from './utils/fetchAuth'

interface Props {
    from?: string,
    message?: string
}
export const Login: React.FC<Props> = ({ from }) => {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [, setToken] = fetchAuth();
    const location = useLocation();
    const navigate = useNavigate();

    //this was extremely awkward to deal with
    const state = location.state as Props;
    const to = state?.from ? state.from : '/';
    const message = state?.message ? state.message : '';

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/signin", { username: user, password }, {
            headers: {
                'content-type': 'application/json'
            }
        });
        try {
            if (!user || !password) {
                throw new Error("some fields are empty, please fill them in");
            }
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            setToken(response.data.token);
            setSuccess("You have been signed in");
            setTimeout(() => {
                navigate(to as string, { replace: true });
            }, 1000);
        }
        catch (e: any) {
            setError(e.message);
            setSuccess("");
        }
        finally {
            setUser("");
            setPassword("");
        }
    }

    return (
        <form
            style={{ display: "flex", alignContent: "center", justifyContent: "center", margin: "1%", padding: "2%", flexWrap: "wrap" }} onSubmit={(e) => handleSubmit(e)}>
            <p style={{ textAlign: "center", fontSize: 24 }}>{message}</p>
            <TextField label="enter username" value={user} sx={{ margin: "1% 0", width: "80%" }} size="small" helperText="username"
                onChange={(e) => setUser(e.target.value)} onClick={() => setError("")} />
            <TextField label="enter password" value={password} sx={{ margin: "1% 0", width: "80%" }} size="small" helperText="password" type="password"
                onChange={(e) => setPassword(e.target.value)} onClick={() => setError("")} />
            <div style={{ width: "80%" }}>
                <Alert style={{ display: error ? "flex" : "none" }} severity="error" sx={{ m: 1 }}>
                    {error.length > 0 ? error : ""}
                </Alert>
                <Alert style={{ display: success ? "flex" : "none" }} severity="success" sx={{ m: 1 }}>
                    {success.length > 0 ? success : ""}
                </Alert>
            </div>
            <div style={{ width: "80%" }}>
                <Button type="submit" variant="contained" color="info" endIcon={<AccountCircleIcon />}>Login</Button>
                <span style={{ margin: "2%" }}>dont have an account? <Link to="/register">Register here</Link></span>
            </div>
        </form>
    )
}
