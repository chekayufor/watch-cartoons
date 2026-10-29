import React, { useContext } from 'react';
import { Paper, TextField, Chip } from '@material-ui/core'
import styled from "styled-components";
import { Context } from "./ContextProvider";
import { shows } from '../data/videos';

const SearchBar = () => {
    const { handleSubmit, searchTerm, setSearchTerm } = useContext(Context);

    const onFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(searchTerm);
    }
    const onShowClick = (name) => {
        setSearchTerm(name);
        handleSubmit(name);
    }
    return(
        <Paper elevation={6} style={{padding:'15px 25px'}}>
            <form onSubmit={onFormSubmit}>
                <TextField
                    fullWidth
                    label='Search cartoons...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    inputProps={{ style: { fontSize: '1.8rem' } }}
                />
            </form>
            <Shows>
                {shows.map(show => (
                    <Chip
                        key={show.name}
                        label={show.name}
                        title={show.about}
                        clickable
                        color={show.name === searchTerm ? 'primary' : 'default'}
                        onClick={() => onShowClick(show.name)}
                    />
                ))}
            </Shows>
        </Paper>
    )
}
export default SearchBar;

const Shows = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
`
