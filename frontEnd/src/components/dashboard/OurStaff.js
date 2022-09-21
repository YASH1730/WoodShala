import React, { useState } from 'react'
import { Box, FormControl, MenuItem, Typography, TextField, InputLabel, Select, Grid, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';


// importing the context 
import { OpenBox } from '../../store/Types';
import { Store } from '../../store/Context';

export default function OurStaff() {

  const [order, setOrder] = useState('');
  const [status, setStatus] = useState('');
  const { dispatch } = Store();


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];


  function DataGridView() {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    );
  }

  const handleChange = (event) => {
    setOrder(event.target.value);
  };

  const handleChangePrice = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Box  sx = {{pl:4,pr:4}}>
      <Typography component={'span'} sx={{ display: 'block' }} variant="h5">
        Our Staff
      </Typography>

      <br></br>

      {/* Section 1  */}

      <Grid container p={3} sx={{
        boxShadow: 1, borderRadius: 2, justifyContent: 'center !important', alignItems: 'center !important'
        , gap: '15px'
      }}>

        <Grid item xs={12} md={4.8} >
          <TextField fullWidth // autoComplete = {false}  
            id="demo-helper-text-aligned-no-helper" label="Search by name/email/phone" type='text' />
        </Grid>

        <Grid item xs={12} md={4.8} >
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Staff Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>


        <Grid item xs={12} md={2} >
          <Button onClick={() => { dispatch({ type: OpenBox, payload: { state: true, formType: 'staff' } }) }} sx={{ width: '100%' }} color='primary' startIcon={<AddIcon />} variant='contained' >Add Staff</Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className='overviewContainer' >
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }} >
          <Typography component={'span'} variant='h6'> Staff List </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}

    </Box>
  )
}
