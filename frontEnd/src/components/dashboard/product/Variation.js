import React, { useState,useEffect } from "react";
import {
Box,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  Tooltip
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
// import AddIcon from "@mui/icons-material/Add";
import {getListProduct,
  //  deleteProduct,
  //   getListMergeProduct,
  //    deleteMergeProduct
    } from '../../../services/service'
import MergeIcon from '@mui/icons-material/Merge';
import {
  DataGrid,

} from '@mui/x-data-grid';
import {setForm} from '../../../store/action/action'
import { useDispatch } from "react-redux";



export default function Products(props) {
  
  // store
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(50);


  // states
  const [selectedSKU, setSelection] = useState([]);
  const [search,setSearch] = useState('')
  const [Row, setRows] = useState([])
  const [MergeRow, setMergeRows] = useState([])
  

  useEffect(()=>{
    getListProduct()
    .then((data) => {
      //console.log(data.data)

      setRows(data.data.map((row,index) => {

        return ({
          id: index+1,
          SKU: row.SKU,
          product_title: row.product_title,
          category_name: row.category_name,
          sub_category_name: row.sub_category_name,
          product_description: row.product_description,
          specification_image : row.specification_image,
          mannequin_image : row.mannequin_image,
          seo_title: row.seo_title,
          seo_description: row.seo_description,
          seo_keyword: row.seo_keyword,
          status: row.status ? 'Activated' : 'Deactivated' ,
          featured_image: row.featured_image,
          primary_material: row.primary_material_name,
          secondary_material: row.secondary_material_name ,
          secondary_material_weight: row.secondary_material_weight,
          length: row.length_main,
          breadth: row.breadth,
          height: row.height,
          weight: row.weight,
          polish: row.polish_name,
          hinge: row.hinge_name,
          knob: row.knob_name,
          handle: row.handle_name,
          door: row.door_name,
          fitting: row.fitting_name,
          selling_points: row.selling_points,
          showroom_price: row.showroom_price,
          top_size: row.top_size,
          dial_size: row.dial_size,
          seating_size_width: row.seating_size_width,
          seating_size_depth: row.seating_size_depth,
          seating_size_height: row.seating_size_height,
          weight_capacity: row.weight_capacity,
          wall_hanging: row.wall_hanging,
          assembly_required: row.assembly_required,
          assembly_part: row.assembly_part,
          leg : row.legs,
          mirror: row.mirror,
          mirror_width: row.mirror_width,
          mirror_length: row.mirror_length,
          silver: row.silver,
          silver_weight: row.silver_weight,
          joints: row.joints,
          upholstery: row.upholstery,
          fabric: row.fabric_name,
          wheel: row.wheel,
          trolley: row.trolley,
          trolley_material: row.trolley_material,
          rotating_seats: row.rotating_seats,
          eatable_oil_polish: row.eatable_oil_polish,
          no_chemical: row.no_chemical,
          straight_back : row.straight_back,
          lean_back: row.lean_back,
          weaving: row.weaving,
          not_suitable_for_Micro_Dish: row.not_suitable_for_Micro_Dish,
          tilt_top: row.tilt_top,
          inside_compartments: row.inside_compartments,
          stackable: row.stackable,
          knife: row.knife,
          MRP: row.MRP,
          tax_rate: row.tax_rate,
          selling_price: row.selling_price,
          discount_limit: row.discount_limit,
          polish_time: row.polish_time,
          quantity : row.quantity,
          unit : row.unit,
          variation_array : row.variation_array,
          action: row
        })
      }))
    })
    .catch((err) => {
      //console.log(err)
    })


  },[])



  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "SKU", headerName: "SKU", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "featured_image",
      headerName: "Featured Image",
      width: 160,
      align : 'center',
      renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue} alt='featured' /></div>,

    },
    {
      field: "specification_image",
      headerName: "Specification Image",
      width: 160,
      align : 'center',
      renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue} alt='featured' /></div>,

    },
    {
      field: "mannequin_image",
      headerName: "Mannequin Image",
      width: 160,
      align : 'center',
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
    //   
      width: 110,
    },
    
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => 
      <div>
        <Tooltip title = 'Create Variation'>
        <IconButton onClick={() => {
          
          //console.log(params)
              
          dispatch(setForm({
                state : true,
                formType : 'variation',
                payload : params,
                row : Row,
                setRow : setRows
              })) 

            }} aria-label="update"  >
              <CreateIcon />
        </IconButton>
        </Tooltip>
        <Tooltip title = 'Preview'>

        <IconButton onClick={() => {
          
          console.log(params)
          props.history(`/productDetails?SKU=${params.row.SKU}`)
              
          // dispatch({type : OpenBox, payload :{
          //       state : true,
          //       formType : 'update_product',
          //       payload : params,
          //       row : Row,
          //       setRow : setRows
          //     }}) 

            }} aria-label="update"  >
              <RemoveRedEyeIcon />
        </IconButton>
        </Tooltip>
        
        {/* <IconButton onClick={() => { deleteProduct(params.formattedValue._id).then((res)=>{
                 setRows(Row.filter((set)=>{
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


  function DataGridView(Row,columns,select = true) {
    return (
       <div style={{ marginTop : '2%', height: 400, width: "100%" }}>
        <DataGrid
          // checkboxSelection = {select}
          rows={Row}
          columns={columns}
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[25,50, 100]}
          filterModel={{
            items: [{ columnField: 'SKU', operatorValue: 'contains', value: `${search}` }],
          }}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = Row.filter((row) =>
              selectedIDs.has(row.id),
            );
  
            setSelection(selectedRows);
          }}
        />
        </div>
     
    );
  }

  const handleSearch = (e)=>{
    // //console.log(e.target.value)
     setSearch(e.target.value)
  }

  return (
    <Box  sx = {{pl:4,pr:4}}>
      <Typography component={'span'} sx={{ display: "block" }} variant="h5">
        Variation
      </Typography>

      <br></br>

      {/* Section 1  */}

      <Grid
        container
        p={2}
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: "center !important",
          alignItems: "center !important",
          gap: "15px",
        }}
      >
        <Grid xs={12}>
          <TextField
            fullWidth
            // autoComplete={false}
            size = 'small'
            id="demo-helper-text-aligned-no-helper"
            label="Search by SKU"
            onChange = {handleSearch}
            name = 'seachQuery'
            type="search"
          />
        </Grid>

 
{/* 
        <Grid xs={12} md={2.8}>
          <Button
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            onClick = {()=>{dispatch({type : OpenBox, payload : {state : true, formType : 'product',row : Row,setRow : setRows}})}}
          >
            Add Product
          </Button>
        </Grid> */}
      </Grid>

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} md = {12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <div style= {
            {
              display  : 'flex',
              justifyContent : 'space-between',
            }
          } >

          <Typography component={'span'} variant="h6"> Product List </Typography>
          {selectedSKU.length > 1 &&  <Button startIcon = {<MergeIcon/>} variant = 'outlined' onClick = {()=>{
             dispatch(setForm({
              state : true,
              formType : 'merge_product',
              payload : selectedSKU,
              row : MergeRow,
              setRow : setMergeRows
            })) 
            
          }}>Merge</Button>}
          </div>
          {DataGridView(Row,columns)}
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
