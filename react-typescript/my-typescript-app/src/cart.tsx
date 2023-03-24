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
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import fetchCart from './utils/fetchCart'
import Container from '@mui/material/Container'

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
    setCart: (cart: Product[]) => void
}

const Cart: React.FC = () => {
    const [cart, setCart] = fetchCart();
    function addToCart(item: Product): void {
        const index = cart.findIndex((value: Product) => {
            return value.productID === item.productID;
        })
        if (index !== -1) {
            const updatedCart = cart;
            updatedCart[index].quantity++;
            setCart([...updatedCart]);
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
                <Grid item xs={12} md={6} lg={3} >
                    <Card sx={{ height: '100%', position: 'relative' }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            MacBook Pro 14″
                        </CardContent>
                        <CardActions sx={{ padding: 3 }}>
                            <Container>
                                <img src='https://storage.googleapis.com/my-ecommerce-image-assets-project/31736ae561b6a66a9eaa1a9a6beceaf9' alt='macbook-pro' width='100%' />
                            </Container>
                        </CardActions>
                        <Container sx={{ textAlign: 'center', padding: 1, position: 'absolute', bottom: 0 }}>
                            <Button size='medium' endIcon={<AddShoppingCartIcon />}
                                onClick={() => {
                                    addToCart({
                                        productID: 1,
                                        item: 'MacBook Pro 14″',
                                        quantity: 1,
                                        price: 1299.99,
                                        description: 'The Apple M1 chip gives the 13‑inch MacBook Pro speed and power beyond belief. With up to 2.8x CPU performance. Up to 5x the graphics speed. Our most advanced Neural Engine for up to 11x faster machine learning. And up to 20 hours of battery life so you can go all day. It’s our most popular pro notebook, taken to a whole new level.',
                                        company: 'apple'
                                    })
                                }}>Add to Cart
                            </Button>
                        </Container>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ height: '100%', position: 'relative' }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            ASTRO A10 Gaming Headset
                        </CardContent>
                        <CardActions sx={{ padding: 3 }}>
                            <Container >
                                <img src='https://storage.googleapis.com/my-ecommerce-image-assets-project/7233db176a5a44621fb48d1db15931fd' alt='astro-a10-gaming' width='100%' />
                            </Container>
                        </CardActions>
                        <Container sx={{ textAlign: 'center', padding: 1, position: 'absolute', bottom: 0 }}>
                            <Button size='medium' endIcon={<AddShoppingCartIcon />}
                                onClick={() => {
                                    addToCart({
                                        productID: 2,
                                        item: 'ASTRO Gaming A10 Gaming Headset - Black/Blue PlayStation5, Xbox Series X|S, PC & Mac',
                                        quantity: 1,
                                        price: 77.90,
                                        description: 'A10 Headset features durable construction and extended comfort so you can play longer with no down-time. A 3.5mm jack provides compatibility with nearly any device including most mobile phones and tablets. The A10 Headset is tuned for gaming with ASTRO Audio, ensuring you hear your game and your teammates with clarity and precision.',
                                        company: 'ASTRO'
                                    })
                                }}>Add to Cart
                            </Button>
                        </Container>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ height: '100%', position: 'relative' }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            Logitech G703 Wireless Mouse
                        </CardContent>
                        <CardActions sx={{ padding: 3 }}>
                            <Container >
                                <img src='https://storage.googleapis.com/my-ecommerce-image-assets-project/bbf109fad7b887536a06e54bed166506' alt='logitech-g703' width='100%' />
                            </Container>
                        </CardActions>
                        <Container sx={{ textAlign: 'center', padding: 1, position: 'absolute', bottom: 0 }}>
                            <Button size='medium' endIcon={<AddShoppingCartIcon />}
                                onClick={() => {
                                    addToCart({
                                        productID: 3,
                                        item: 'Logitech G703 Lightspeed Pro-Grade Wireless Gaming Mouse',
                                        quantity: 1,
                                        price: 136.34,
                                        company: 'logitech',
                                        description: ' Next generation optical gaming sensor with 1:1 tracking, 400+ IPS and 100 25 600 max DPI sensitivity plus zero smoothing, filtering or acceleration, and 10x the power efficiency of previous gen'
                                    })
                                }}>Add to Cart
                            </Button>
                        </Container>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <Card sx={{ height: '100%', position: 'relative' }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            amazon alexa
                        </CardContent>
                        <CardActions sx={{ padding: 3 }}>
                            <Container>
                                <img src='https://storage.googleapis.com/my-ecommerce-image-assets-project/cd6e494570b3c3184e7603b873de53ed' alt='amazon-alexa' width='100%' />
                            </Container>
                        </CardActions>
                        <Container sx={{ textAlign: 'center', padding: 1, position: 'absolute', bottom: 0 }}>
                            <Button size='medium' endIcon={<AddShoppingCartIcon />}
                                onClick={() => {
                                    addToCart({
                                        productID: 4,
                                        item: 'Echo Dot (4th Gen) | Smart speaker with Alexa',
                                        quantity: 1,
                                        price: 89.00,
                                        company: 'amazon',
                                        description: 'Meet Echo Dot - Our most popular smart speaker with Alexa. The sleek, compact design delivers crisp vocals and balanced bass for full sound.'
                                    })
                                }}>Add to Cart
                            </Button>
                        </Container>
                    </Card>
                </Grid>
            </Grid>
            <ShoppingList remove={removeFromCart} cart={cart} setCart={setCart} />
        </>
    )
}

const ShoppingList: React.FC<IProps> = ({ remove, cart, setCart }) => {
    const navigate = useNavigate();
    var total: number = 0.00;
    cart.forEach((value) => total += value.price * value.quantity);
    return (
        <Stack
            divider={<Divider orientation='horizontal' flexItem />}
            spacing={2} sx={{ p: 3 }}>
            {cart.map((item: Product, index: number) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                    <div id='item' >
                        <p style={{ fontSize: '0.9rem' }}>{item.item}</p>
                        <p style={{ fontSize: '0.85rem', color: 'darkgrey' }}><Chip label={item.company} id='chip' /> | ${item.price.toFixed(2)} | Quantity : {item.quantity}</p>
                    </div>
                    {item.description && <p id='text-description' style={{ fontSize: '10px', color: 'darkgrey', width: '40%' }}>{item.description}</p>}
                    <div>
                        <Button size='small' endIcon={<DeleteIcon />} variant='outlined' onClick={() => remove(index)}>delete</Button>
                        <p style={{ fontSize: '0.85rem', color: 'darkgrey' }}>Total : ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </li>
            ))}
            {cart.length !== 0 &&
                <div id='total' style={{ display: 'flex', justifyContent: 'space-evenly', margin: '1% auto' }}>
                    <p>Total : <b>${total.toFixed(2)}</b></p>
                    <div id='user-control'>
                        <Button sx={{ color: 'green', border: '1px solid green', m: 1 }} variant='outlined'
                            onClick={() => {
                                setCart([...cart]);
                                navigate('/cart/buy');
                            }} endIcon={<ShoppingBasketIcon />}>purchase </Button>
                        <Button sx={{ color: 'red', border: '1px solid red', m: 1 }} variant='outlined'
                            onClick={() => setCart([])}
                            endIcon={<DeleteIcon />}>Clear </Button>
                    </div>
                </div>
            }
        </Stack>
    )
}

export default Cart;

