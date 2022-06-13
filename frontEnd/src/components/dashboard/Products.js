import React, { useState, useContext,useEffect } from "react";
import {

  Typography,
  TextField,
  Grid,
  Button,
  IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from "@mui/icons-material/Add";
import { OpenBox, Notify } from "../../App";
import {getListProduct, deleteProduct} from '../../services/service'

import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}


export default function Products() {
  
  
  // useContext 

  const SideBox = useContext(OpenBox);
  const despatchAlert = useContext(Notify);


  // states

  const [search,setSearch] = useState('')
  const [Row, setRows] = useState()



  useEffect(()=>{
    getListProduct()
    .then((data) => {
      console.log(data.data)

      setRows(data.data.map((row,index) => {

        return ({
          id: index+1,
          SKU: row.SKU,
          product_title: row.product_title,
          category_name: row.category_name,
          sub_category_name: row.sub_category_name,
          product_description: row.product_description,
          specification_image : row.specification_image,
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
          MRP: row.MRP,
          tax_rate: row.tax_rate,
          selling_price: row.selling_price,
          discount_limit: row.discount_limit,
          dispatch_time: row.dispatch_time,
          action: row
        })
      }))
    })
    .catch((err) => {
      console.log(err)
    })


  },[])



  const columns = [
    { field: "id", headerName: "ID", width: 100 },
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
      field: "product_title",
      headerName: "Product Title",
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
      type: "number",
      width: 110,
    },
    {
      field: "product_description",
      headerName: "Product Description",
      width: 160,
    },
    {
      field: "seo_title",
      headerName: "SEO Title",
      width: 160,
    },
    {
      field: "seo_description",
      headerName: "SEO Description",
      width: 160,
    },
    {
      field: "seo_keyword",
      headerName: "SEO Keyword",
      width: 160,
    },
    
    {
      field: "primary_material",
      headerName: "Primary Material",
      width: 160,
    },
    {
      field: "secondary_material",
      headerName: "Secondary material",
      width: 160,
    },
    {
      field: "secondary_material_weight",
      headerName: "Secondary material Weight",
      width: 160,
    },
    {
      field: "length",
      headerName: "Length",
      width: 160,
    },
    {
      field: "breadth",
      headerName: "Breadth",
      width: 160,
    },
    {
      field: "height",
      headerName: "Height",
      width: 160,
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 160,
    },
    {
      field: "polish",
      headerName: "Polish",
      width: 160,
    },
    {
      field: "hinge",
      headerName: "Hinge",
      width: 160,
    },
    {
      field: "knob",
      headerName: "Knob",
      width: 160,
    },
    {
      field: "door",
      headerName: "Door",
      width: 160,
    },
    {
      field: "fitting",
      headerName: "Fitting",
      width: 160,
    },
    {
      field: "selling_points",
      headerName: "Selling Points",
      width: 160,
    },
    {
      field: "top_size",
      headerName: "Top Size",
      width: 160,
    },
    {
      field: "dial_size",
      headerName: "Dial Size",
      width: 160,
    },
    {
      field: "seating_size_width",
      headerName: "Seating Size Width",
      width: 160,
    },
    {
      field: "seating_size_depth",
      headerName: "Seating Size Depth",
      width: 160,
    },
    {
      field: "seating_size_height",
      headerName: "seating_size_height",
      width: 160,
    },
    {
      field: "weight_capacity",
      headerName: "Weight Capacity",
      width: 160,
    },
    {
      field: "wall_hanging",
      headerName: "Wall Hanging",
      width: 160,
    },
    {
      field: "assembly_required",
      headerName: "Assembly Required",
      width: 160,
    },
    {
      field: "assembly_part",
      headerName: "Assembly Part",
      width: 160,
    },
    {
      field: "legs",
      headerName: "Legs",
      width: 160,
    },
    {
      field: "mirror",
      headerName: "Mirror",
      width: 160,
    },
    {
      field: "mirror_width",
      headerName: "Mirror Width",
      width: 160,
    },
    {
      field: "mirror_length",
      headerName: "Mirror Height",
      width: 160,
    },
    {
      field: "silver",
      headerName: "Silver",
      width: 160,
    },
    {
      field: "silver_weight",
      headerName: "Silver weight",
      width: 160,
    },
    
    {
      field: "joints",
      headerName: "Joints",
      width: 160,
    },
    
    {
      field: "wheel",
      headerName: "Wheel",
      width: 160,
    },
    
    {
      field: "trolley",
      headerName: "Trolley",
      width: 160,
    },
    
    {
      field: "trolley_material",
      headerName: "Trolley Material",
      width: 160,
    },
    
    {
      field: "rotating_seats",
      headerName: "Rotating Seats",
      width: 160,
    },
    
    {
      field: "eatable_oil_polish",
      headerName: "Eatable Oil Polish",
      width: 160,
    },
    
    {
      field: "no_chemical",
      headerName: "No Chemical",
      width: 160,
    },
    
    {
      field: "rotating_seats",
      headerName: "Rotating Seats",
      width: 160,
    },
    
    {
      field: "straight_back",
      headerName: "Straight Back",
      width: 160,
    },
    {
      field: "lean_back",
      headerName: "Lean Back",
      width: 160,
    },
    
    {
      field: "weaving",
      headerName: "Weaving",
      width: 160,
    },
    
    {
      field: "not_suitable_for_Micro_Dish",
      headerName: "Suitable For Micro or Dish",
      width: 160,
    },
    
    {
      field: "tilt_top",
      headerName: "Tilt Top",
      width: 160,
    },
    
    {
      field: "inside_compartments",
      headerName: "Inside Compartments",
      width: 160,
    },
    
    {
      field: "stackable",
      headerName: "Stackable",
      width: 160,
    },
    
    {
      field: "MRP",
      headerName: "MRP",
      width: 160,
    },
    
    {
      field: "tax_rate",
      headerName: "Tax Rate",
      width: 160,
    },
    
    {
      field: "selling_price",
      headerName: "Selling Price",
      width: 160,
    },
    
    {
      field: "discount_limit",
      headerName: "Discount Limit",
      width: 160,
    },
    
    {
      field: "dispatch_time",
      headerName: "Dispatch Time",
      width: 160,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => 
      <div>
        
        <IconButton onClick={() => {
          
          console.log(params)
              SideBox.setOpen({
                state : true,
                formType : 'update_product',
                payload : params
              }) 
            }} aria-label="update"  >
              <CreateIcon />
        </IconButton>
        
        <IconButton onClick={() => { deleteProduct(params.formattedValue._id).then((res)=>{
              despatchAlert.setNote({
                open : true,
                variant : 'success',
                message : "Product deleted successfully !!!"
              })
            }) }} aria-label="delete"  >
              <DeleteIcon />
        </IconButton>
        
      </div>,
    }
    
  ];

 

  function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={Row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          filterModel={{
            items: [{ columnField: 'SKU', operatorValue: 'contains', value: `${search}` }],
          }}
          components={{
            Pagination: CustomPagination,
          }}
          
        />
      </div>
    );
  }

  const handleSearch = (e)=>{
    // console.log(e.target.value)
     setSearch(e.target.value)
  }

  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
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
        <Grid xs={12} md = {9}>
          <TextField
            fullWidth
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search by SKU"
            onChange = {handleSearch}
            name = 'seachQuery'
            type="search"
          />
        </Grid>

 

        <Grid xs={12} md={2.8}>
          <Button
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            onClick = {()=>{SideBox.setOpen({state : true, formType : 'product'})}}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>

      {/* Section 1 ends  */}
      <br></br>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Product List </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
