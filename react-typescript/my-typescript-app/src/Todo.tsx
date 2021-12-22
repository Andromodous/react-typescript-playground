import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import DeleteIcon from '@mui/icons-material/Delete'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

interface Props {
    name: string,
    age: number
}

interface ListProps {
    todo: string[],
    remove: (item: string) => void,
    person?: Props
}

export default function Todo() {
    const [Todo, setTodo] = useState<string[]>([]);
    const [item, setItem] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        item.length !== 0 && setTodo([...Todo, item]);
        //setItem((prevItem : string)=>`${item} ville, batman is gay`);
        //the prevItemm does work and the string interpolation and concat works in updating state
        setItem("");
    }
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    return (
        <>
            <Grid container>
                <Grid item xs={12} sx={{ p: 2 }} justifyContent="center">
                    <form onSubmit={(e) => handleSubmit(e)} style={{ width: '100%' }}>
                        <TextField fullWidth label="What do you want to do" id="outlined-basic" style={{ margin: "1% 0" }} value={item} onChange={(e) => { setItem(e.target.value) }} size="small" />
                        <Button variant="contained" type="submit">Submit Item here</Button>
                    </form>
                    <List todo={Todo} remove={(item) => setTodo(Todo.filter((todo: string) => todo !== item))} />
                </Grid>
            </Grid>
        </>
    )
}
const List: React.FC<ListProps> = ({ todo, remove }: ListProps) => {
    return (
        <Stack spacing={2} style={{ width: "100%" }}>
            {todo.length !== 0 ?
                todo.map((item: string, index: number) => (
                    <li key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                        <p >{item}</p>
                        <Button size="small" endIcon={<DeleteIcon />} variant="outlined" onClick={() => remove(item)}>delete</Button>
                    </li>
                ))
                :
                <p style={{ display: "flex", justifyContent: "center" }}>List is empty <DriveFileRenameOutlineOutlinedIcon /></p>}
        </Stack>
    );
}

