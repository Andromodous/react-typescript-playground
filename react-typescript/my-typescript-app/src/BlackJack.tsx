import { useState } from 'react'
import { Dealer } from './blackjack/Dealer'
// import Stack from '@mui/material/Stack'
// import Grid from '@mui/material/Grid'
// import Divider from '@mui/material/Divider'
// import Button from '@mui/material/Button'
import { User } from './blackjack/Player'
// import Logo from './cards/*.svg'

const BlackJack: React.FC = () => {
    const [blackJack, setBlackJack] = useState<Dealer>();
    return (
        <>
        <p style={{textAlign: "center"}}>under construction</p>
            {/* <Stack divider={<Divider orientation='horizontal' flexItem />}
                spacing={2} sx={{ p: 3 }}>
                <h3 style={{ textAlign: 'center' }}>Play BlackJack</h3>
                <Grid container>
                    <Grid item md={4} sx={{ border: 1 }} xs={10} sm={6}>
                        <Button variant='outlined' onClick={() => setBlackJack(new Dealer())}>Start Blackjack</Button>
                    </Grid>
                    <Grid item md={8} sm={6} xs={2} sx={{ border: 1 }}>
                        {blackJack && <PlayBlackJack Dealer={blackJack} />}
                    </Grid>
                </Grid>
            </Stack> */}
        </>
    )
}

const PlayBlackJack = ({ Dealer }: { Dealer: Dealer }) => {
    return (
        <>
        <h4 style={{ textAlign: 'center' }}>Game has started</h4>
        {Dealer.use()}
        {Dealer.Players.map((player : User) => (
            <>
            <b><p>{player.name}</p></b>
            <p>{player.current()}</p>
            <p>{player.hand.hand.map((card) => (
                <p>{card.toString()}</p>
            ))}</p>
            </>
        ))}
        </>
    )
}

export default BlackJack