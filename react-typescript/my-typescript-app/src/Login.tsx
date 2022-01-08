
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useState, useContext } from 'react'
import AuthContext from './AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Login = () => {
    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [, setToken] = useContext(AuthContext);
    const navigate = useNavigate();


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/signin", { username: user, password }, {
            headers: {
                'content-type': 'application/json'
            }
        });
        try {
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            setToken(response.data.token);
            setSuccess("You have been signed in");
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        catch (e: any) {
            console.log(e.message);
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
            </div>
        </form>
    )
}
