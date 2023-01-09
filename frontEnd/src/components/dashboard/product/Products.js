import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  MenuItem,
  Tooltip
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
// import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import question from "../../../assets/img/question.svg";
import DifferenceIcon from '@mui/icons-material/Difference';
import {
  getListProduct,
  categoryList,
  getSubCatagories
} from '../../../services/service'
import {
  DataGrid,
  // gridPageCountSelector,
  // gridPageSelector,
  // useGridApiContext,
  // useGridSelector,
} from '@mui/x-data-grid';
// import Pagination from '@mui/material/Pagination';
import { useDispatch } from "react-redux";
import { setForm } from "../../../store/action/action";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
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
  const dispatch = useDispatch();

  // page state to controlling the pagination on server side
  const [pageState, setPageState] = useState({
    data: [],
    isLoading: false,
    page: 1,
    limit: 50,
    total: 0,
    title: "",
    category: undefined,
    SKU: undefined,
    subCategory: undefined,
    filter: false
  })

  // catalog State
  const [catalog, setCatalog] = useState({
    category: [],
    subCategory: []
  })

  const fetchData = async () => {
    setPageState(lastState => ({
      ...lastState,
      isLoading: true
    }))
    getListProduct({
      page: pageState.page,
      limit: pageState.limit,
      total: pageState.total,
      title: pageState.title,
      category: pageState.category,
      SKU: pageState.SKU,
      subCategory: pageState.subCategory
    })
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
          isLoading: false,
          total: data.data.total,
          filter: false
        }))
      })
      .catch((err) => {
      })
  }

  useMemo(() => {
    fetchData();
  }, [pageState.page, pageState.limit, pageState.filter]);

  useMemo(async () => {
    let cat = await categoryList();
    let subCat = await getSubCatagories();

    console.log(cat)
    console.log(subCat)
    setCatalog({
      category: cat.data,
      subCategory: subCat.data
    })

  }, [])



  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "SKU", headerName: "SKU", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "featured_image",
      headerName: "Featured Image",
      width: 160,
      align: 'center',
      renderCell: (params) => <div className="categoryImage" > <img src={params.formattedValue || question} alt='featured' /></div>,

    },
    {
      field: "specification_image",
      headerName: "Specification Image",
      width: 160,
      align: 'center',
      renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue || question} alt='featured' /></div>,

    },
    {
      field: "mannequin_image",
      headerName: "Mannequin Image",
      width: 160,
      align: 'center',
      renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue || question} alt='featured' /></div>,

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
      width: 250,
      renderCell: (params) =>
        <Box sx={{ display: 'flex', gap: '5px' }}>

          <Tooltip title="Update">

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
          </Tooltip>

          <Tooltip title="View">

            <IconButton onClick={() => {

              console.log(params)
              props.history(`/productDetails/${params.row.SKU}`)


            }} aria-label="update"  >
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Create Variations">
            <IconButton onClick={() => {

              dispatch(setForm({
                state: true,
                formType: 'variation',
                payload: params,
                setRow: setPageState
              }))

            }}>

              <DifferenceIcon />
            </IconButton>
          </Tooltip>
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

        </Box>,
    }

  ];

  function DataGridView() {
    return (
      <div style={{ marginTop: '2%', height: 400, width: "100%" }}>
        <DataGrid
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
          filterModel={{
            items: [
              {
                columnField: "product_title",
                operatorValue: "contains",
                value: `${pageState.title}`,
              },
            ],
          }}
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

  const handleSearch = (e) => {
    return setPageState(old => ({ ...old, [e.target.name]: e.target.value }));
  }

  const clearFilter = () => {
    return setPageState(old => ({
      ...old,
      title: '',
      category: undefined,
      SKU: undefined,
      subCategory: undefined,
      filter: !old.filter
    }))
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
        p={2}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          gap: '10px',
          alignItems: "center !important"
        }}
      >
        <Grid xs={12} md={2.5}>
          <TextField
            fullWidth
            size={"small"}
            id="demo-helper-text-aligned-no-helper"
            label="Search by Title"
            onChange={handleSearch}
            value={pageState.title}
            name='title'
            type="text"
          />
        </Grid>
        <Grid xs={12} md={2.5}>
          <TextField
            fullWidth
            size={"small"}
            id="demo-helper-text-aligned-no-helper"
            label="Search by SKU"
            value={pageState.SKU}
            onChange={handleSearch}
            name='SKU'
            type="text"
          />
        </Grid>

        <Grid xs={12} md={2.5}>
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            size='small'
            label="Category"
            name='category'
            value={pageState.category || 'None'}
            onChange={handleSearch}
          >
            {catalog.category.map((option) => (
              <MenuItem key={option.category_name} value={option.category_name}>
                {option.category_name}
              </MenuItem>
            ))}
            <MenuItem key={'None'} value={"None"}>
              None
            </MenuItem>
          </TextField>

        </Grid>
        <Grid className='flex' xs={12} md={2.5}>
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            size='small'
            label="Sub Category"
            name='subCategory'
            value={pageState.subCategory || 'None'}
            onChange={handleSearch}
          >
            {catalog.subCategory.map((option) => pageState.category === option.category_name && <MenuItem key={option.sub_category_name} value={option.sub_category_name}>
              {option.sub_category_name}
            </MenuItem>)}
            <MenuItem key={'None'} value={"None"}>
              None
            </MenuItem>
          </TextField>
        </Grid>
        <Grid sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '5px'
        }} xs={12} md={1.5}>
          <Button
            color="primary"
            fullWidth
            variant="contained"
            onClick={() => { setPageState(old => ({ ...old, filter: !old.filter })) }}
          >
            <FilterAltIcon />
          </Button>
          <Button
            color="primary"
            fullWidth
            variant="outlined"
            onClick={clearFilter}
          >
            <FilterAltOffIcon />
          </Button>
        </Grid>

      </Grid >

      {/* Section 1 ends  */}
      < br />
      {/* data grid  */}

      < Grid container scaping={2} className="overviewContainer" >
        <Grid item p={2} xs={12} md={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }} >

            <Typography component={'span'} variant="h6"> Product List </Typography>

            <Button
              color="primary"
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => { dispatch(setForm({ state: true, formType: 'product' })) }}
            >
              Add Product
            </Button>
          </div>
          {DataGridView()}
        </Grid>

      </ Grid>

      {/* data grid ends  */}
    </Box >
  );
}
