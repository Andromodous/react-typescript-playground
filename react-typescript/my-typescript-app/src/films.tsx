import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'

export interface users {
    name: string,
    gender: string,
    email: string,
    username?: string,
    password?: string
}

const Films: React.FC = () => {
    const [user, setuser] = useState<users[]>([]);
    return (
        <>
            <Grid container>
                <Grid item xs={12} md={4} sx={{ border: 1 }}>
                    {/*The value of is {name}
                     <Button variant="contained" onClick={() => setname('Fiona khan da 3rd')}>click here to change name</Button> */}
                </Grid>
                <Grid item xs={12} md={8} sx={{ border: 1 }}>
                    <Showfilms update={setuser} item={user} />
                </Grid>
            </Grid>
        </>
    )
}

interface IProps {
    update: (value: React.SetStateAction<users[]>) => void;
    item: users[];
}
const Showfilms: React.FC<IProps> = ({ update, item }: IProps) => {
    //check out pokeapi.co API
    const generateUser = async () => {
        try {
            const response = await fetch("https://api.randomuser.me/?results=1");
            const json = await response.json();
            update([...item, {
                name: json.results[0].name.first,
                gender: json.results[0].gender,
                email: json.results[0].email,
                username: json.results[0].login.username,
                password: json.results[0].login.password
            }]);
        }
        catch (err) {
            console.error(`there was an error:  ${err}`);
        }
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <p>you may generate new users</p>
                <div style={{ padding: "1%", display: "flex", justifyContent: "space-between", width: "30%" }}>
                    <Button variant="contained" endIcon={<AddCircleIcon />}
                        onClick={() => {
                            generateUser();
                        }}>
                        update
                    </Button>
                    <Button endIcon={<DeleteIcon />} variant="outlined" onClick={() => update([])}>clear</Button>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                {item.length !== 0 && JSON.stringify(item)}
            </div>
        </>
    )
}
export default Films;


