import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,Box
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import { OpenBox, Notify } from "../../store/Types";
import {Store } from "../../store/Context";
import { listStock, deleteStock, preview } from '../../services/service'
import '../../assets/custom/css/stock.css'

import {
  DataGrid,
// gridPageCountSelector,
  // gridPageSelector,
  // useGridApiContext,
  // useGridSelector,
} from '@mui/x-data-grid';
// import Pagination from '@mui/material/Pagination';


// function CustomPagination() {
//   const apiRef = useGridApiContext();
//   const page = useGridSelector(apiRef, gridPageSelector);
//   const pageCount = useGridSelector(apiRef, gridPageCountSelector);

//   return (
//     <Pagination
//       color="primary"
//       count={pageCount}
//       page={page + 1}
//       onChange={(event, value) => apiRef.current.setPage(value - 1)}
//     />
//   );
// }



export default function StockChannel() {

  const [search, setSearch] = useState({ warehouse: '' });
  const [pageSize, setPageSize] = useState(50);

  const [product, setProductData] = useState();

const {dispatch} = Store(); 

  const [Row, setRows] = useState()

  useEffect(() => {
    listStock()
      .then((data) => {
        //console.log(data)

        setRows(data.data.map((row, index) => {

          return ({
            id: index + 1,
            warehouse: row.warehouse,
            product_id: row.product_id,
            stock: row.stock,
            action: row
          })
        }))
      })
      .catch((err) => {
        //console.log(err)
      })
  }, []);

  // this function will get the product detail for preview

  const handlePreview = (e) => {

    if (e.target.value.length < 8) return 0;

    preview(e.target.value)
      .then((data) => {
        //console.log(data)

        setProductData(data.data)

      })
      .catch((err) => {
        //console.log(err)
      })
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50
    },
    {
      field: "warehouse",
      headerName: "Warehouse",
      width: 150,
    },
    {
      field: "product_id",
      headerName: "SKU",
      width: 150,

    },
    {
      field: "stock",
      headerName: "Stock",
      width: 150,

    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) =>
        <div className="categoryImage" >
          <IconButton onClick={() => {
           dispatch({type : OpenBox,payload : {
              state: true,
              formType: 'update_Stock',
              payload: params,
              row : Row,
              setRow : setRows
            }})
          }} aria-label="update"  >
            <CreateIcon />
          </IconButton>
          <IconButton onClick={() => {
            deleteStock(params.formattedValue._id).then((res) => {
              setRows(Row.filter((set)=>{
                return  set.action._id !== params.formattedValue._id  ;
              }))
              dispatch({type : Notify,payload : {
                open: true,
                variant: 'success',
                message: 'Category Deleted !!!',
                row : Row,
              setRow : setRows
              }})
            })
          }} aria-label="delete"  >
            <DeleteIcon />
          </IconButton>

        </div>,
    }

  ];


  // const handleSwitch = (e) => {
  //   //console.log(e.target.name)

  //   const FD = new FormData()

  //   FD.append('_id', e.target.name)
  //   FD.append('door_status', e.target.checked)

  //   const res = changeDoorStatus(FD);

  //   res.then((data) => {
  //     //console.log(data)
  //     dispatch({type : Notify,payload : {
  //       open: true,
  //       variant: 'success',
  //       message: " Door Status Updated Successfully !!!"

  //     })
  //   })
  //     .catch((err) => {
  //       //console.log(err)
  //       dispatch({type : Notify,payload : {
  //         open: true,
  //         variant: 'error',
  //         message: "Something Went Wrong !!!"

  //       })
  //     })


  // }

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


  function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [{ columnField: 'warehouse', operatorValue: 'contains', value: `${search.warehouse}` }],
          }}
          rows={Row}
          columns={columns}
          
          
          disableSelectionOnClick

        pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[25,50, 100]}
        />
      </div>
    );
  }


  return (
    <Box  sx = {{pl:4,pr:4}}>
      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
        Product Inventory
      </Typography>

      <br></br>

      {/* Section 1  */}

      <Grid
        container
        p={3}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: "center !important",
          alignItems: "center !important",
          gap: "15px",
        }}
      >
        <Grid xs={12} md={9}>
          <TextField
            fullWidth
            id="outlined-select"
            select
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


        <Grid xs={12} md={2.8}>
          <Button
            onClick={() => {
             dispatch({type : OpenBox,payload : { state: true, formType: "addStock",row : Row,
             setRow : setRows }});
            }}
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
          >
            Add Stock
          </Button>
        </Grid>
      </Grid>


      {/* Section 1 ends  */}
      <br></br>

      {/* data grid  */}

      <Grid container sx={{
        display: 'flex', justifyContent: 'space-between', alignItem: 'center'
      }}>
        <Grid item p={2} xs={12} md={6.8} sx={{ boxShadow: 2, borderRadius: 5, maxHeight : 490 }}>
          <Typography component={'span'} variant="h6"> Stock</Typography>
          <br></br>
          {DataGridView()}
        </Grid>
        {/* // product preview */}
        <Grid item p={2} xs={12} md={5} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography component={'span'} variant="h6">Product Preview</Typography>
          <br></br>
          <Grid container >
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                id="outlined-select"
                size='small'
                type="text"
                onChange={handlePreview}
                name='product_id'
                fullWidth
                label='Enter SKU....'
              />
            </Grid>
            {/* // preview box  */}
            {product &&
              <Grid sx={{ boxShadow: 2, borderRadius: 5 }} item xs={12} >
                <Grid container className='previewBox'>
                  <Grid item xs={12} sx = {{mb:2}}>
                    <center><img src={product.featured_image} alt='Product_Image' />
                    </center>
                  </Grid>

                  {/* // table  */}
                  <Grid item xs={12} >
                    <TableContainer sx={{ maxHeight: 300 }} component={Paper}>
                      <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }} >Fields</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} >Value</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>

                          {
                            Object.keys(product).map((key, index) => {

                              if (key !== 'featured_image') {
                                return <TableRow
                                  key={index}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                  <TableCell >{key}</TableCell>
                                  <TableCell >{product[key]}</TableCell>
                                </TableRow>
                              }

                            })
                          }

                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Grid>
            }

          </Grid>
        </Grid>

      </Grid>

      {/* data grid ends  */}
    </Box>
  );
}
