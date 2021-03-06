import { useState } from 'react'
import { Product } from './cart'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import { useNavigate } from 'react-router-dom'
import fetchCart from './utils/fetchCart'
import Alert from '@mui/material/Alert'

export default function Checkout() {
    const [basket, setBasket] = fetchCart();
    const [card, setCard] = useState<number | string>('')
    const [CVC, setCVC] = useState<number | string>('')
    const [date, setDate] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    var total: number = 0.00;
    const cart = basket as Product[];
    cart.forEach((item: Product) => total += item.price * item.quantity);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        try {
            const current = new Date();
            const userYear: number = Number.parseInt(date.split('-')[0]);
            if (!card || !CVC || !date) {
                throw new Error('error : one or more fields are empty');
            }
            if (!card.toString()?.match(/[0-9]{8,16}/)) {
                throw new Error('error : The card number provided is incorrect, it must contain 16 digits');
            }
            if (!CVC.toString()?.match(/[0-9]{3}/)) {
                throw new Error('error : The CVC provided is incorrect, it must contain 3 digits');
            }
            if (userYear < current.getFullYear()) {
                throw new Error('error : The expiry date is not valid');
            }
            setCard('');
            setCVC('');
            setDate('');
            setBasket([]);
            localStorage.removeItem('cart');
            navigate('/')
        }
        catch (error: any) {
            setError(error.message);
        }
        finally {
            e.preventDefault();
        }
    }

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Checkout</h2>
            <hr style={{ backgroundColor: 'darkgrey', width: '80%', border: 'none', height: '1px' }} />
            <Grid container spacing={1} >
                <Grid item xs={12} md={8}>
                    <p style={{ textAlign: 'center' }}>This is a mock checkout, no data is saved and stored on a database, you may input fake info as you wish</p>
                    <p style={{ textAlign: 'center' }}>Data is saved to your local storage so your shopping cart persists after reloading</p>
                    <p style={{ textAlign: 'center' }}>This website was made for the purpose of learning and is supposed to reflect my learning journey</p>
                    <form
                        style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', margin: '1%', padding: '2%', flexWrap: 'wrap' }}
                        // flexWrap makes it a block field so it is on new line
                        onSubmit={(e) => handleSubmit(e)} >
                        <div style={{ display: 'flex', width: '100%' }}>
                            <p style={{ float: 'right', fontSize: 24, textAlign: 'center', width: '100%' }}>sub-total : ${total.toFixed(2)}</p>
                        </div>
                        <TextField type='number' value={card} name='card' label='card number' id='outlined-basic' sx={{ margin: '1% 0', width: '80%' }} size='small' helperText='Enter 16 digit card number'
                            onChange={(e) => setCard(Number(e.target.value))} />
                        <TextField type='number' value={CVC} name='cvc' label='cvc' id='outlined-basic' sx={{ margin: '1% 0', width: '80%' }} size='small' helperText='Enter 3 digit at the back of card'
                            onChange={(e) => setCVC(Number(e.target.value))} />
                        <TextField type='date' value={date} name='date' label='expiry date' id='outlined-basic' sx={{ margin: '1% 0', width: '80%' }} size='small' helperText='Enter the expiry date'
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => setDate(e.target.value)} />
                        <div style={{ width: '80%' }}>
                            <Alert style={{ display: error ? 'flex' : 'none' }} severity='error' sx={{ m: 1 }}>
                                {error.length > 0 ? error : ''}
                            </Alert>
                            <Button type='submit' variant='contained' color='success' endIcon={<CreditCardIcon />}>Pay Now</Button>
                        </div>
                    </form>
                </Grid>
                {cart.length !== 0 && <Grid item xs={12} md={4}>
                    <Stack sx={{ justifyContent: 'center', alignItems: 'center', p: 2 }}
                        divider={<Divider orientation='horizontal' flexItem />}
                        spacing={1}>
                        <p style={{ textAlign: 'center' }}>Your basket</p>
                        {cart.map((item: Product, index: number) => (
                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1%', width: '80%' }}>
                                <div id='item' >
                                    <p style={{ fontSize: '0.85rem' }}>{item.item}</p>
                                    <p style={{ fontSize: '0.85rem', color: 'darkgrey' }}><Chip label={item.company} /> <span id='item-meta'>| ${item.price.toFixed(2)} | Quantity : {item.quantity}</span></p>
                                </div>
                                {item.description && <p style={{ fontSize: '0.85rem', color: 'darkgrey', float: 'right' }}>${(item.price * item.quantity).toFixed(2)}</p>}
                            </li>
                        ))}
                    </Stack>
                </Grid>
                }
            </Grid>
        </>
    )
}
