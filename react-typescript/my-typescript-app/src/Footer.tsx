import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Button from '@mui/material/Button'

const Footer: React.FC = () => {
    return (
        <footer style={{ width: '100%' }} >
            <p style={{ textAlign: 'center', fontSize: 14 }}>
                this website is not intended to be serious, use this website at your discretion without any malicious intent
            </p>
            <p style={{ textAlign: 'center', fontSize: 14 }}>
                The purpose of this site is to showcase my technical skills, photoshop services are legitimate and real
            </p>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button variant="text" href='https://www.linkedin.com/in/berat-appak-ab99b7197/'><LinkedInIcon /></Button>
                <Button variant="text" href='https://github.com/Andromodous'><GitHubIcon /></Button>
            </div>
        </footer>
    )
}

export default Footer
