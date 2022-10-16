import canvas from './utils/ps-canvas.png'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import BurstModeIcon from '@mui/icons-material/BurstMode'
import Alert from '@mui/material/Alert'
import PaidIcon from '@mui/icons-material/Paid'

export function Photopop() {
    return (<>
        <Grid container width="100%" spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
                <h3 style={{ fontSize: 32, textAlign: "center" }}>NOW OFFERING PHOTOSHOP SERVICES</h3>
                <Chip label="photo retouching" variant='outlined' color='primary' style={{ fontSize: 16, margin: 4 }} />
                <Chip label="image manipulation " variant='outlined' color='primary' style={{ fontSize: 16, margin: 4 }} />
                <Chip label="background replacements " variant='outlined' color='primary' style={{ fontSize: 16, margin: 4 }} />
                <Chip label="blemish removals " variant='outlined' color='primary' style={{ fontSize: 16, margin: 4 }} />
                <Chip label="dark-circle removals " variant='outlined' color='primary' style={{ fontSize: 16, margin: 4 }} />
                <Chip label="pigmentation removals " variant='outlined' color='primary' style={{ fontSize: 16, margin: 4 }} />
                <Chip label="teeth whitening" variant='outlined' color='primary' style={{ fontSize: 16, margin: 4 }} />
                <Chip label="special requests" variant='outlined' color='primary' style={{ fontSize: 16, margin: 4 }} />
                <Stack direction="row" divider={<Divider orientation='vertical' flexItem />} spacing={2} sx={{ p: 1 }}>
                    <BurstModeIcon color="success" />
                    <p >
                        1 OR MORE PICTURES
                    </p>
                </Stack>
                <Stack direction="row" divider={<Divider orientation='vertical' flexItem />} spacing={2} sx={{ p: 1 }}>
                    <FileDownloadDoneIcon color="success" />
                    <p>
                        1 - 2 DAY DELIVERY
                    </p>
                </Stack>
                <Stack direction="row" divider={<Divider orientation='vertical' flexItem />} spacing={2} sx={{ p: 1 }}>
                    <FileDownloadDoneIcon color="success" />
                    <p >
                        FAMILY, GRADUATION, PARTY, WEDDING, FORMAL and other photo's
                    </p>
                </Stack>
                <Stack direction="row" divider={<Divider orientation='vertical' flexItem />} spacing={2} sx={{ p: 1 }}>
                    <PaidIcon color="success" />
                    <p >
                        $10 / picture produced. price is negotiable
                    </p>
                </Stack>
                <Stack spacing={2}>
                    <Alert severity="info"><b>Information: </b> you may ask for a enquiry, quote or consultation. For requests attach photo file(s) thanks! :)</Alert>
                    <Alert severity="error">Payment methods wil be discussed.</Alert>
                </Stack>
                <div style={{ display: "flex", alignItems: "center", padding: 5 }}>
                    <Button size="small" variant="contained" color="warning" href="mailto:appak1234@gmail.com" style={{ margin: "auto" }}>
                        MAKE ENQUIRY NOW
                    </Button>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <img src={canvas} alt='my-ps-canvas' width="100%" />
            </Grid>
        </Grid>
    </>
    )
}
