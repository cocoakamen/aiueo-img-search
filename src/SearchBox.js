import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import QueryParameterURL from './QueyParameterURL';

export default function SearchBox(props) {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,  margin:"10px" }}
    >
      <SearchIcon />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Images"
        inputProps={{ 'aria-label': 'search images' }}
        value={props.searchWord}
        onChange={(event) => props.handleSearchBox(event.target.value)}
      />
      <QueryParameterURL searchWord={props.searchWord}></QueryParameterURL>
    </Paper>
  );
}