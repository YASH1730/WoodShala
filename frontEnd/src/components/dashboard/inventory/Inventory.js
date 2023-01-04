import React, { useState, useMemo } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  MenuItem,
  Box
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
// import CreateIcon from '@mui/icons-material/Create';
import RepeatIcon from '@mui/icons-material/Repeat';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import { setForm } from "../../../store/action/action";
import { listEntires, totalEntries } from '../../../services/service'
import '../../../assets/custom/css/stock.css'
import '../../../assets/custom/css/action.css'

import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from "react-redux";



export default function Inventory() {

  const dispatch = useDispatch()

  const [search, setSearch] = useState({ warehouse: '' });
  const [columns, setColumns] = useState([])
  const [meta, setMeta] = useState({
    inward: 0,
    outward: 0,
    transfer: 0
  })
  const [pageState, setPageState] = useState({
    data: [],
    isLoading: true,
    page: 1,
    pageSize: 50,
    total: 0,
    entires: 'Inward'
  })


  const [Row, setRows] = useState([])

  useMemo(() => {
    setPageState(old => ({ ...old, isLoading: true }))
    fetchEntires()
  }, [pageState.page, pageState.pageSize, Row]);

  useMemo(() => {
    setPageState(old => ({ ...old, isLoading: true, data: [] }));
    fetchEntires();
  }, [pageState.entires]);

  useMemo(() => { entires() }, [Row])

  async function entires() {
    const res = await totalEntries()
    if (res.status === 200) {
      setMeta({
        inward: res.data.inward,
        outward: res.data.outward,
        transfer: res.data.transfer,
      })
    }
  }

  async function fetchEntires() {
    let res = ''
    switch (pageState.entires) {
      case 'Inward':
        setColumns([
          { field: "id", headerName: "ID", width: 50 },
          { field: "inward_id", headerName: "Inward Id", width: 100 },
          { field: "order_no", headerName: "Order Number", width: 150 },
          { field: "driver_name", headerName: "Driver Name", width: 150 },
          { field: "driver_no", headerName: "Driver Number", width: 150 },
          { field: "vehicle_no", headerName: "Vehicle Number", width: 150 },
          { field: "supplier", headerName: "Supplier", width: 150 },
          { field: "product_articles", headerName: "Product", width: 200 },
          { field: "hardware_articles", headerName: "Hardware", width: 200 },
          { field: "quantity", headerName: "Quantity", width: 100 },
          { field: "date", headerName: "Time", width: 150 },
        ])
        res = await listEntires(pageState)
        if (res.status === 200) {
          setPageState(lastState => ({
            ...lastState,
            data: res.data.data.map((row, index) => {
              return {
                id: index + 1,
                product_articles: row.product_articles,
                hardware_articles: row.hardware_articles,
                supplier: row.supplier,
                vehicle_no: row.vehicle_no,
                driver_name: row.driver_name,
                driver_no: row.driver_no,
                quantity: row.quantity,
                order_no: row.order_no,
                inward_id: row.inward_id,
                date: row.date
              }
            }),
            total: res.data.total,
            isLoading: false
          }))
        }
        break;
      case 'Outward':
        setColumns([
          { field: "id", headerName: "ID", width: 50 },
          { field: "outward_id", headerName: "Outward Id", width: 100 },
          { field: "order_no", headerName: "Order Number", width: 150 },
          { field: "driver_name", headerName: "Driver Name", width: 150 },
          { field: "driver_no", headerName: "Driver Number", width: 150 },
          { field: "vehicle_no", headerName: "Vehicle Number", width: 150 },
          { field: "supplier", headerName: "Supplier", width: 150 },
          { field: "product_articles", headerName: "Product", width: 200 },
          { field: "hardware_articles", headerName: "Hardware", width: 200 },
          { field: "quantity", headerName: "Quantity", width: 100 },
          { field: "purpose", headerName: "Purpose", width: 150 },
          { field: "reason", headerName: "Reason", width: 150 },
          { field: "date", headerName: "Time", width: 150 },
        ])
        res = await listEntires(pageState)
        if (res.status === 200) {
          setPageState(lastState => ({
            ...lastState,
            data: res.data.data.map((row, index) => {
              return {
                id: index + 1,
                product_articles: row.product_articles,
                hardware_articles: row.hardware_articles,
                supplier: row.supplier,
                vehicle_no: row.vehicle_no,
                driver_name: row.driver_name,
                driver_no: row.driver_no,
                quantity: row.quantity,
                order_no: row.order_no,
                outward_id: row.outward_id,
                purpose: row.purpose,
                reason: row.reason,
                date: row.date
              }
            }),
            total: res.data.total,
            isLoading: false
          }))
        }
        break;
      case 'Transfer':
        setColumns([
          { field: "id", headerName: "ID", width: 50 },
          { field: "transfer_id", headerName: "Transfer Id", width: 150 },
          { field: "order_no", headerName: "Order Number", width: 150 },
          { field: "warehouse", headerName: "Warehouse", width: 150 },
          { field: "product_articles", headerName: "Product", width: 200 },
          { field: "hardware_articles", headerName: "Hardware", width: 200 },
          { field: "quantity", headerName: "Quantity", width: 100 },
          { field: "purpose", headerName: "Purpose", width: 150 },
          { field: "reason", headerName: "Reason", width: 150 },
          { field: "date", headerName: "Time", width: 150 },
        ])
        res = await listEntires(pageState)
        if (res.status === 200) {
          setPageState(lastState => ({
            ...lastState,
            data: res.data.data.map((row, index) => {
              return {
                id: index + 1,
                product_articles: row.product_articles,
                hardware_articles: row.hardware_articles,
                quantity: row.quantity,
                order_no: row.order_no,
                transfer_id: row.transfer_id,
                purpose: row.purpose,
                reason: row.reason,
                warehouse: row.warehouse,
                date: row.date
              }
            }),
            total: res.data.total,
            isLoading: false
          }))
        }
        break;
      default:
        break
    }

  }


  const handelSearch = (e) => {
    //console.log(e)
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }

  const warehouse = [
    {
      value: "Bangalore (Karnataka)",
      label: "Bangalore (Karnataka)",
    },
    {
      value: "Jodhpur (Rajasthan)",
      label: "Jodhpur (Rajasthan)",
    },
  ];
  const Entires = ['Inward', 'Outward', 'Transfer'];


  function DataGridView() {
    return (
      <div style={{ marginTop: '1%', height: 400, width: "100%" }}>
        <DataGrid
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[5, 10, 30, 50, 70, 100]}
          pagination
          page={pageState.page - 1}
          pageSize={pageState.pageSize}
          paginationMode="server"
          onPageChange={(newPage) => {
            setPageState(old => ({ ...old, page: newPage + 1 }))
          }}
          onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
          columns={columns}
        />
      </div>
    );
  }


  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
        Inventory
      </Typography>
      <br></br>

      <Grid className='actionDash' container>
        <Grid sx={{ backgroundColor: '#40b13e' }} item xs={12} className='card' md={3.8}>
          <AddIcon fontSize={'large'} />
          <Typography variant='h6'>Inward Entires</Typography>
          <Typography variant='h4'>{meta.inward}</Typography>
        </Grid>
        <Grid sx={{ backgroundColor: '#ff0000b3' }} className='card' item xs={12} md={3.8}>
          <RemoveIcon fontSize={'large'} />
          <Typography variant='h6'>Outward Entires</Typography>
          <Typography variant='h4'>{meta.outward}</Typography>

        </Grid>
        <Grid sx={{ backgroundColor: '#ffbd29' }} item xs={12} className='card' md={3.8}>
          <RepeatIcon fontSize={'large'} />
          <Typography variant='h6'>Transfer Entires</Typography>
          <Typography variant='h4'>{meta.transfer}</Typography>

        </Grid>
      </Grid>

      {/* Section 1  */}

      <Grid
        container
        mt={2}
        p={3}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: "center !important",
          alignItems: "center !important",
          gap: "15px",
        }}
      >
        <Grid xs={11} md={7}>
          <TextField
            fullWidth
            id="outlined-select"
            select
            size='small'
            name="warehouse"
            label="Select Warehouse..."
            value={search.warehouse || ''}
            onChange={handelSearch}
            multiple
          >
            {warehouse.map(
              (option) =>
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.value}
                </MenuItem>
            )}
            <MenuItem key={"none"} value={''}>
              {"None"}
            </MenuItem>
          </TextField>
        </Grid>


        <Grid xs={12} md={1.5}>
          <Button
            onClick={() => {
              dispatch(setForm({
                state: true, formType: "inward", row: Row,
                setRow: setRows
              }
              ));
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Inward
          </Button>
        </Grid>

        <Grid xs={12} md={1.5}>
          <Button
            onClick={() => {
              dispatch(setForm({
                state: true, formType: "outward", row: Row,
                setRow: setRows
              }));
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<RemoveIcon />}
            variant="contained"
          >
            Outward
          </Button>
        </Grid>

        <Grid xs={12} md={1.5}>
          <Button
            onClick={() => {
              dispatch(setForm({
                state: true, formType: "transfer", row: Row,
                setRow: setRows
              }));
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<RepeatIcon />}
            variant="contained"
          >
            Transfer
          </Button>
        </Grid>
      </Grid>


      {/* Section 1 ends  */}
      <br></br>

      {/* data grid  */}

      <Grid container sx={{
        display: 'flex', justifyContent: 'space-between', alignItem: 'center'
      }}>
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5, maxHeight: 500 }}>
          <Box p={1} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItem: 'center'
          }}>
            <Typography component={'span'} variant="h6">{pageState.entires} Entries</Typography>
            <TextField
              id="outlined-select"
              sx={{ width: '15%' }}
              select
              size='small'
              name="warehouse"
              label="Select Entries..."
              value={pageState.entires || ''}
              onChange={(e) => { setPageState(old => ({ ...old, entires: e.target.value })) }}
              multiple
            >
              {Entires.map(
                (option) =>
                  <MenuItem
                    key={option}
                    value={option}
                  >
                    {option}
                  </MenuItem>
              )}
            </TextField>
          </Box>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </Box>
  );
}
