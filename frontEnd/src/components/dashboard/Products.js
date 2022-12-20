import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import {
  getListProduct,
  //  deleteProduct,
  //   getListMergeProduct,
  //    deleteMergeProduct
} from '../../services/service'
import MergeIcon from '@mui/icons-material/Merge';
import {
  DataGrid,
  // gridPageCountSelector,
  // gridPageSelector,
  // useGridApiContext,
  // useGridSelector,
} from '@mui/x-data-grid';
// import Pagination from '@mui/material/Pagination';
import { useDispatch } from "react-redux";
import { setForm } from "../../store/action/action";

// this is commented because needs a custom per page size 
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


export default function Products(props) {

  // store
  const dispatch  = useDispatch();
  // const [pageSize, setPageSize] = useState(50);


  // states
  const [selectedSKU, setSelection] = useState([]);
  const [search, setSearch] = useState('')
  // const [Row, //setRows] = useState()
  const [MergeRow, setMergeRows] = useState([])

  // page state to controlling the pagination on server side
  const [pageState, setPageState] = useState({
    data: [],
    isLoading: false,
    page: 1,
    pageSize: 50,
    total : 0
  })

  useEffect(() => {

    const fetchData = async () => {
      setPageState(lastState => ({
        ...lastState,
        isLoading: true
      }))
      getListProduct({ page: pageState.page, limit: pageState.pageSize })
        .then((data) => {
          setPageState(lastState => ({
            ...lastState,
            data: data.data.data.map((row, index) => {
              return {
                id: index + 1,
                SKU: row.SKU,
                product_title: row.product_title,
                category_name: row.category_name,
                sub_category_name: row.sub_category_name,
                specification_image: row.specification_image,
                mannequin_image: row.mannequin_image,
                status: row.status ? 'Activated' : 'Deactivated',
                featured_image: row.featured_image,
                action: row
              }
            }),
            isLoading : false,
            total  : data.data.total
          }))
      })
    .catch((err) => {
    })
}

fetchData();

  }, [pageState.page, pageState.pageSize])



const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "SKU", headerName: "SKU", width: 100 },
  { field: "status", headerName: "Status", width: 100 },
  {
    field: "featured_image",
    headerName: "Featured Image",
    width: 160,
    align: 'center',
    renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue} alt='featured' /></div>,

  },
  {
    field: "specification_image",
    headerName: "Specification Image",
    width: 160,
    align: 'center',
    renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue} alt='featured' /></div>,

  },
  {
    field: "mannequin_image",
    headerName: "Mannequin Image",
    width: 160,
    align: 'center',
    renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue} alt='featured' /></div>,

  },
  {
    field: "product_title",
    headerName: "Title",
    width: 150,

  },
  {
    field: "category_name",
    headerName: "Category Name",
    width: 150,

  },
  {
    field: "sub_category_name",
    headerName: "Sub Category Name",

    width: 110,
  },

  {
    field: "action",
    headerName: "Actions",
    width: 200,
    renderCell: (params) =>
      <div>

        <IconButton onClick={() => {

          //console.log(params)

          dispatch(setForm({
              state: true,
              formType: 'update_product',
              payload: params
          }))

        }} aria-label="update"  >
          <CreateIcon />
        </IconButton>
        <IconButton onClick={() => {

          console.log(params)
          props.history(`/productDetails?SKU=${params.row.SKU}`)

          // dispatch({type : OpenBox, payload :{
          //       state : true,
          //       formType : 'update_product',
          //       payload : params,
          //       row : Row,
          //       setRow : //setRows
          //     }}) 

        }} aria-label="update"  >
          <RemoveRedEyeIcon />
        </IconButton>

        {/* <IconButton onClick={() => { deleteProduct(params.formattedValue._id).then((res)=>{
                 //setRows(Row.filter((set)=>{
                  return  set.action._id !== params.formattedValue._id  ;
                }))
              dispatch({type: Notify,payload:{
                open : true,
                variant : 'success',
                message : "Product deleted successfully !!!"
              }})
            }
            
            )}} >
              <DeleteIcon />
        </IconButton> */}

      </div>,
  }

];
// const mergeColumns = [
//   { field: "id", headerName: "ID", width: 50 },
//   { field: "MS", headerName: "MS", width: 100 },
//   { field: "status", headerName: "Status", width: 100 },
//   {
//     field: "product_array",
//     headerName: "Merged Products",
//     width: 160,
//   },
//   {
//     field: "featured_image",
//     headerName: "Featured Image",
//     width: 160,
//     align : 'center',
//     renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue} alt='featured' /></div>,

//   },
//   {
//     field: "specification_image",
//     headerName: "Specification Image",
//     width: 160,
//     align : 'center',
//     renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue} alt='featured' /></div>,

//   },
//   {
//     field: "product_title",
//     headerName: "Product Title",
//     width: 150,

//   },
//   {
//     field: "category_name",
//     headerName: "Category Name",
//     width: 150,

//   },
//   {
//     field: "sub_category_name",
//     headerName: "Sub Category Name",
//     
//     width: 110,
//   },
//   {
//     field: "product_description",
//     headerName: "Product Description",
//     width: 160,
//   },
//   {
//     field: "seo_title",
//     headerName: "SEO Title",
//     width: 160,
//   },
//   {
//     field: "seo_description",
//     headerName: "SEO Description",
//     width: 160,
//   },
//   {
//     field: "seo_keyword",
//     headerName: "SEO Keyword",
//     width: 160,
//   },

//   {
//     field: "selling_points",
//     headerName: "Selling Points",
//     width: 160,
//   },
//   {
//     field: "showroom_price",
//     headerName: "Showroom Price",
//     width: 160,
//   },

//   {
//     field: "rotating_seats",
//     headerName: "Rotating Seats",
//     width: 160,
//   },

//   {
//     field: "eatable_oil_polish",
//     headerName: "Eatable Oil Polish",
//     width: 160,
//   },

//   {
//     field: "no_chemical",
//     headerName: "No Chemical",
//     width: 160,
//   },

//   {
//     field: "rotating_seats",
//     headerName: "Rotating Seats",
//     width: 160,
//   },

//   {
//     field: "straight_back",
//     headerName: "Straight Back",
//     width: 160,
//   },
//   {
//     field: "lean_back",
//     headerName: "Lean Back",
//     width: 160,
//   },

//   {
//     field: "weaving",
//     headerName: "Weaving",
//     width: 160,
//   },

//   {
//     field: "not_suitable_for_Micro_Dish",
//     headerName: "Suitable For Micro or Dish",
//     width: 160,
//   },

//   {
//     field: "tilt_top",
//     headerName: "Tilt Top",
//     width: 160,
//   },

//   {
//     field: "inside_compartments",
//     headerName: "Inside Compartments",
//     width: 160,
//   },

//   {
//     field: "stackable",
//     headerName: "Stackable",
//     width: 160,
//   },

//   {
//     field: "MRP",
//     headerName: "MRP",
//     width: 160,
//   },

//   {
//     field: "tax_rate",
//     headerName: "Tax Rate",
//     width: 160,
//   },

//   {
//     field: "selling_price",
//     headerName: "Selling Price",
//     width: 160,
//   },

//   {
//     field: "discount_limit",
//     headerName: "Discount Limit",
//     width: 160,
//   },

//   {
//     field: "polish_time",
//     headerName: "Polish Time",
//     width: 160,
//   },
//   {
//     field: "action",
//     headerName: "Actions",
//     width: 200,
//     renderCell: (params) => 
//     <div>

//       <IconButton onClick={() => {

//             dispatch({type : OpenBox, payload :{
//               state : true,
//               formType : 'update_merge',
//               payload : params,
//               row : MergeRow,
//               setRow : setMergeRows
//             }}) 

//           }} aria-label="update"  >
//             <CreateIcon />
//       </IconButton>

//       <IconButton onClick={() => { deleteMergeProduct(params.formattedValue._id).then((res)=>{
//       setMergeRows(MergeRow.filter((set)=>{
//         return  set.action._id !== params.formattedValue._id  ;
//       }))

//             dispatch({type: Notify,payload:{
//               open : true,
//               variant : 'success',
//               message : "Merged Product deleted successfully !!!"
//             }})
//           }) }} aria-label="delete"  >
//             <DeleteIcon />
//       </IconButton>

//     </div>,
//   }

// ];



function DataGridView() {
  return (
    <div style={{ marginTop: '2%', height: 400, width: "100%" }}>
      <DataGrid
        rows={pageState.data}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        rowsPerPageOptions={[10, 30, 50, 70, 100]}
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

const handleSearch = (e) => {
  // //console.log(e.target.value)
  setSearch(e.target.value)
}

return (
  <Box sx={{ pl: 4, pr: 4 }}>
    <Typography component={'span'} sx={{ display: "block" }} variant="h5">
      Products
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
          // autoComplete={false}
          id="demo-helper-text-aligned-no-helper"
          label="Search by SKU"
          onChange={handleSearch}
          name='seachQuery'
          type="search"
        />
      </Grid>



      <Grid xs={12} md={2.8}>
        <Button
          sx={{ width: "100%" }}
          color="primary"
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => { dispatch(setForm({ state: true, formType: 'product'} )) }}
        >
          Add Product
        </Button>
      </Grid>
    </Grid>

    {/* Section 1 ends  */}
    <br></br>
    {/* data grid  */}

    <Grid container scaping={2} className="overviewContainer">
      <Grid item p={2} xs={12} md={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
        <div style={
          {
            display: 'flex',
            justifyContent: 'space-between',
          }
        } >

          <Typography component={'span'} variant="h6"> Product List </Typography>
          {selectedSKU.length > 1 && <Button startIcon={<MergeIcon />} variant='outlined' onClick={() => {
            dispatch(setForm({
                state: true,
                formType: 'merge_product',
                payload: selectedSKU,
                row: MergeRow,
                setRow: setMergeRows
              }
            ))

          }}>Merge</Button>}
        </div>
        {DataGridView()}
      </Grid>
      {/* <Grid item p={2} xs={12} md= {5.9} sx={{ boxShadow: 2, borderRadius: 5 }}>

          <Typography component={'span'} variant="h6"> Merge Product List </Typography>
        <br></br>
          <br></br>
          {DataGridView(MergeRow,mergeColumns,false)}
        </Grid> */}
    </Grid>

    {/* data grid ends  */}
  </Box>
);
}
