import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Button from '@mui/material/Button'

const Footer: React.FC = () => {
    return (
        <footer style={{ display: "flex", justifyContent: "space-evenly", width: '100%' }} >
            <Button variant="text" href='https://www.linkedin.com/in/berat-appak-ab99b7197/'><LinkedInIcon /></Button>
            <Button variant="text" href='https://twitter.com/Dromodous'><TwitterIcon /></Button>
            <Button variant="text" href='https://github.com/Andromodous'><GitHubIcon /></Button>
        </footer>
    )
}

export default Footer
