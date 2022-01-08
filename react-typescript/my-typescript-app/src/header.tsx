import { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Context from './CartContext'
import { Link } from 'react-router-dom'

export default function Header() {
    const [cart] = useContext(Context);
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                        My App
                    </Typography>
                    {cart.length !== 0 &&
                        <Badge badgeContent={cart.length} color="error" sx={{ m: 1 }}>
                            <Link to="/cart/buy" style={{ color: "white", textDecoration: "none" }}><ShoppingCartIcon /></Link>
                        </Badge>
                    }
                    <Button color="inherit" ><Link style={{ color: "white", textDecoration: "none" }} to="/">Home</Link></Button>
                    <Button color="inherit" ><Link style={{ color: "white", textDecoration: "none" }} to="/cart">cart</Link></Button>
                    <Button color="inherit" ><Link style={{ color: "white", textDecoration: "none" }} to="/login">login</Link></Button>
                    <Button color="inherit" ><Link style={{ color: "white", textDecoration: "none" }} to="/register">register</Link></Button>
                    {/* <Button color="inherit" ><Link style={{color : "white", textDecoration: "none"}} to="/cart/buy">buy</Link></Button> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
