import React, { useState, useMemo } from 'react'
import { Box, Typography, TextField, Grid, Button, Switch, IconButton } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { listPincode, statusDelivery, deleteDelivery } from '../../../services/service'
import UploadCSV from '../../Utility/UploadCSV'
import { setAlert } from '../../../store/action/action'
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
export default function Policy() {


    const dispatch = useDispatch();


    const [pageState, setPageState] = useState({
        data: [],
        isLoading: false,
        page: 1,
        limit: 50,
        total: 0,
        pincode: ''
    })
    const [check, setCheck] = useState([])

    const [uploadBox, setUploadBox] = useState(false)

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'pincode',
            headerName: 'PinCode',
            type: 'number',
            align: 'center',
            width: 100,
        },
        {
            field: 'city',
            headerName: 'City',
            width: 200,
        },
        {
            field: 'state',
            headerName: 'State',
            width: 100,
        },
        {
            field: 'delivery_status',
            headerName: 'Delivery Status',
            type: 'number',
            align: 'center',
            width: 150,
            renderCell: (params) => <Switch onChange={handleSwitch} name={`${params.row.action + ' ' + (params.row.id - 1)}`} checked={check[params.row.id - 1]}></Switch>,
        },
        {
            field: "action",
            headerName: "Actions",
            width: 100,
            renderCell: (params) =>
                <div className="categoryImage" >

                    <IconButton onClick={async () => {
                        let response = await deleteDelivery(params.formattedValue)
                            if (response) {
                                setPageState(old=>({...old,
                                    data : old.data.filter((row)=>{return row.action !== params.formattedValue} ),
                                    total : old.total-1
                                }))
                                dispatch(setAlert({
                                    open: true,
                                    variant: 'success',
                                    message: 'Delivery Deleted !!!'
                                }))
                            }
                    }} aria-label="delete"  >
                        <DeleteIcon />
                    </IconButton>

                </div>,
        }

    ];

    const handleSwitch = async (e) => {
        console.log(e.target.name)
        // //console.log(check)
        try {
            const id = e.target.name.split(' ')
            const FD = new FormData()

            FD.append('_id', id[0])
            FD.append('delivery_status', e.target.checked)

            const res = await statusDelivery(FD);

            if (res) {

                setCheck(check.map((row, index) => {
                    // //console.log(parseInt(id[1]) === index)
                    if (parseInt(id[1]) === index)
                        return !row
                    else
                        return row
                }))

                dispatch(setAlert({
                    open: true,
                    variant: 'success',
                    message: res.data.message

                }))
            }
        } catch (err) {
            //console.log(err)
            dispatch(setAlert({
                open: true,
                variant: 'error',
                message: "Something went wrong !!!"

            }))
        }
    }

    useMemo(() => {
        fetchData();
    }, [pageState.page, pageState.limit, pageState.filter]);

    // filter search
    useMemo(() => {
        if (pageState.pincode > 99999)
            fetchData();
        if (pageState.pincode === '')
            fetchData();
    }, [pageState.pincode]);


    async function fetchData() {
        try {
            setPageState(lastState => ({
                ...lastState,
                isLoading: true
            }))

            let response = await listPincode({
                page: pageState.page,
                limit: pageState.limit,
                total: pageState.total,
                pincode: pageState.pincode
            })
            if (response) {
                setCheck(response.data.data.map((row, index) => {
                    return row.delivery_status
                }))
                setPageState(lastState => ({
                    ...lastState,
                    data: response.data.data.map((row, index) => {
                        return {
                            id: index + 1,
                            pincode: row.pincode,
                            city: row.city,
                            state: row.state,
                            delivery_status: row.delivery_status,
                            action: row._id
                        }
                    }),
                    isLoading: false,
                    total: response.data.total,
                }))
            }
        }
        catch (err) {
            console.log('error>>', err);
        }
    }


    function DataGridView() {
        return (
            <div style={{ marginTop: '2%', height: 400, width: "100%" }}>
                <DataGrid
                    rows={pageState.data}
                    rowCount={pageState.total}
                    loading={pageState.isLoading}
                    rowsPerPageOptions={[10, 30, 50, 70, 100]}
                    // filterModel={{
                    //     items: [
                    //         {
                    //             columnField: "pincode",
                    //             operatorValue: "=",
                    //             value: `${pageState.pincode}`,
                    //         },
                    //     ],
                    // }}
                    pagination
                    page={pageState.page - 1}
                    limit={pageState.limit}
                    paginationMode="server"
                    onPageChange={(newPage) => {
                        setPageState(old => ({ ...old, page: newPage + 1 }))
                    }}
                    onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, limit: newPageSize }))}
                    columns={columns}
                />
            </div>

        );
    }




    return (
        <Box sx={{ pl: 4, pr: 4 }}>
            <Typography component={'span'} sx={{ display: 'block' }} variant="h5">
                Policy
            </Typography>

            <br></br>

            {/* Section 1  */}

            <Grid container p={2} sx={{
                boxShadow: 1, borderRadius: 2, justifyContent: 'center !important', alignItems: 'center !important'
                , gap: '15px'
            }}>

                <Grid item xs={12} md={9.5} >
                    <TextField fullWidth
                        size='small'
                        id="demo-helper-text-aligned-no-helper"
                        label="Search by pincode"
                        onChange={(e) => setPageState(old => ({ ...old, pincode: e.target.value }))}
                        type='number' />
                </Grid>
                <Grid item xs={12} md={2} >
                    <Button sx={{ width: '100%' }} onClick={() => { setUploadBox(true) }} size='small' color='primary' startIcon={<CloudUploadIcon />} variant='contained' >
                        Upload CSV
                    </Button>
                </Grid>
            </Grid>

            <UploadCSV uploadBox={uploadBox} setUploadBox={setUploadBox}></UploadCSV>

            {/* Section 1 ends  */}
            <br></br>
            {/* data grid  */}

            <Grid container scaping={2} className='overviewContainer' >
                <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }} >
                    <Typography component={'span'} variant='h6'> Pincode Code </Typography>
                    <br></br>
                    <br></br>
                    {DataGridView()}
                </Grid>
            </Grid>

            {/* data grid ends  */}

        </Box>
    )
}
