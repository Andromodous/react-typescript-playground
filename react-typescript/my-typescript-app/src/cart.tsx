import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Context from './CartContext'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// use fake mock data API
// https://jsonplaceholder.typicode.com/

export interface Product {
    productID: number,
    item: string,
    description?: string,
    quantity: number,
    price: number,
    company?: string
}

interface IProps {
    cart: Product[],
    remove: (index: number) => void,
    clear: (cart: Product[]) => void
}

const Cart: React.FC = () => {
    const [cart, setCart] = React.useState<Product[]>([]);

    function addToCart(item: Product): void {
        const index = cart.findIndex((value: Product) => {
            return value.productID === item.productID;
        })
        if (index !== -1) {
            const updatedCart = cart;
            updatedCart[index].quantity++;
            const [item1, ...item2] = updatedCart;
            console.log(item1, item2);
            setCart([...updatedCart]); //how does this even make sense
        }
        else {
            setCart([...cart, item]);
        }
    }

    function removeFromCart(index: number): void {
        const updatedCart = cart.filter((item: Product) => cart.indexOf(item) !== index);
        setCart(updatedCart)
    }
    return (
        <>
            <Grid container sx={{ p: 2 }} spacing={2} >
                <Grid item xs={12} md={6} lg={3}>
                    <Card raised >
                        <CardContent sx={{ textAlign: "center" }}>
                            MacBook Pro 14″
                        </CardContent>
                        <CardActions>
                            <Button size="small" style={{ margin: "0 auto" }} endIcon={<AddShoppingCartIcon />}
                                onClick={() => {
                                    addToCart({
                                        productID: 1,
                                        item: "MacBook Pro 14″",
                                        quantity: 1,
                                        price: 1299.99,
                                        description: "The Apple M1 chip gives the 13‑inch MacBook Pro speed and power beyond belief. With up to 2.8x CPU performance. Up to 5x the graphics speed. Our most advanced Neural Engine for up to 11x faster machine learning. And up to 20 hours of battery life so you can go all day. It’s our most popular pro notebook, taken to a whole new level.",
                                        company: "apple"
                                    })
                                }}>Add to Cart</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card raised >
                        <CardContent sx={{ textAlign: "center" }}>
                            ASTRO A10 Gaming Headset
                        </CardContent>
                        <CardActions>
                            <Button size="small" style={{ margin: "0 auto" }} endIcon={<AddShoppingCartIcon />}
                                onClick={() => {
                                    addToCart({
                                        productID: 2,
                                        item: "ASTRO Gaming A10 Gaming Headset - Black/Blue PlayStation5, Xbox Series X|S, PC & Mac",
                                        quantity: 1,
                                        price: 77.90,
                                        description: 'A10 Headset features durable construction and extended comfort so you can play longer with no down-time. A 3.5mm jack provides compatibility with nearly any device including most mobile phones and tablets. The A10 Headset is tuned for gaming with ASTRO Audio, ensuring you hear your game and your teammates with clarity and precision.',
                                        company: "ASTRO"
                                    })
                                }}>Add to Cart</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card raised >
                        <CardContent sx={{ textAlign: "center" }}>
                            Logitech G703 Wireless Mouse
                        </CardContent>
                        <CardActions>
                            <Button size="small" style={{ margin: "0 auto" }} endIcon={<AddShoppingCartIcon />}
                                onClick={() => {
                                    addToCart({
                                        productID: 3,
                                        item: "Logitech G703 Lightspeed Pro-Grade Wireless Gaming Mouse",
                                        quantity: 1,
                                        price: 136.34,
                                        company: "logitech",
                                        description: " Next generation optical gaming sensor with 1:1 tracking, 400+ IPS and 100 25 600 max DPI sensitivity plus zero smoothing, filtering or acceleration, and 10x the power efficiency of previous gen"
                                    })
                                }}>Add to Cart</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card raised >
                        <CardContent sx={{ textAlign: "center" }}>
                            amazon alexa
                        </CardContent>
                        <CardActions>
                            <Button size="small" style={{ margin: "0 auto" }} endIcon={<AddShoppingCartIcon />}
                                onClick={() => {
                                    addToCart({
                                        productID: 4,
                                        item: "Echo Dot (4th Gen) | Smart speaker with Alexa",
                                        quantity: 1,
                                        price: 89.00,
                                        company: "amazon",
                                        description: "Meet Echo Dot - Our most popular smart speaker with Alexa. The sleek, compact design delivers crisp vocals and balanced bass for full sound."
                                    })
                                }}>Add to Cart</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <ShoppingList remove={removeFromCart} cart={cart} clear={setCart} />
        </>
    )
}

const ShoppingList: React.FC<IProps> = ({ remove, cart, clear }) => {
    const navigate = useNavigate();
    const [, setBasket] = useContext(Context);
    var total: number = 0.00;
    cart.forEach((value) => total += value.price * value.quantity);
    //try putting the total calc logic in parent component as that might update the child component 
    return (
        <Stack
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={1} sx={{ p: 5 }}>
            {cart.map((item: Product, index: number) => (
                <li key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div id="item" >
                        <p>{item.item}</p>
                        <p style={{ fontSize: "0.85rem", color: "darkgrey" }}><Chip label={item.company} /> | ${item.price.toFixed(2)} | Quantity : {item.quantity}</p>
                    </div>
                    {item.description && <p id="text-description" style={{ fontSize: "10px", color: "darkgrey", width: "40%" }}>{item.description}</p>}
                    <div>
                        <Button size="small" endIcon={<DeleteIcon />} variant="outlined" onClick={() => remove(index)}>delete</Button>
                        <p style={{ fontSize: "0.85rem", color: "darkgrey" }}>Total : ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </li>
            ))}
            {cart.length !== 0 &&
                <div id="total" style={{ display: "flex", justifyContent: "space-evenly", margin: "1% auto" }}>
                    <p>Total : <b>${total.toFixed(2)}</b></p>
                    <Button sx={{ color: "green", border: "1px solid green", m: 1 }} variant="outlined"
                        onClick={() => {
                            setBasket([...cart]);
                            clear([]);
                            navigate('/cart/buy');
                        }} endIcon={<ShoppingBasketIcon />}>Pay Now </Button>
                    <Button sx={{ color: "red", border: "1px solid red", m: 1 }} variant="outlined" onClick={() => clear([])} endIcon={<DeleteIcon />}>Clear </Button>
                </div>
            }
        </Stack>
    )
}

export default Cart;

