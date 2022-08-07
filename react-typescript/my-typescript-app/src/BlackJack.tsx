import { useState } from 'react'
import { Game } from './blackjack/Game'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Logo from './cards/*.svg'

const BlackJack: React.FC = () => {
    const [blackJack, setBlackJack] = useState<Game>();
    return (
        <>
            <Stack divider={<Divider orientation='horizontal' flexItem />}
                spacing={2} sx={{ p: 3 }}>
                <h3 style={{ textAlign: 'center' }}>Play BlackJack</h3>
                <Grid container>
                    <Grid item md={4} sx={{ border: 1 }} xs={10} sm={6}>
                        <Button variant='outlined' onClick={() => setBlackJack(new Game())}>Start Blackjack</Button>
                    </Grid>
                    {'the logo is ' + Logo}
                    <Grid item md={8} sm={6} xs={2} sx={{ border: 1 }}>
                        {blackJack && <PlayBlackJack Game={blackJack} />}
                    </Grid>
                </Grid>
            </Stack>
        </>
    )
}

const PlayBlackJack = ({ Game }: { Game: Game }) => {
    return (
        <h4 style={{ textAlign: 'center' }}>Game has started</h4>
    )
}

export default BlackJack