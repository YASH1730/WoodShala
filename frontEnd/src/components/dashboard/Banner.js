import React, { useEffect,useState,useContext } from "react";
import {Notify} from '../../App'
import { useDropzone } from "react-dropzone";
import {listBanner,addBanner, changeStatus} from '../../services/service'
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,Switch,FormGroup,FormControlLabel,Checkbox
} from "@mui/material";

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




export default function Banner() {

  const dispatchAlert = useContext(Notify);


  const {
    acceptedFiles,

    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/jpeg,image/png",
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const handelAddBanner = (e) =>{

    e.preventDefault()

    const FD = new FormData();

    FD.append('banner_image', acceptedFiles[0], acceptedFiles[0].name);
    FD.append('banner_title',e.target.banner_title.value);
    FD.append('banner_Status',e.target.banner_Status.checked);

    const  res = addBanner(FD)

    res.then((data)=>{
        console.log(data)
        dispatchAlert.setNote({
          open : true,
          variant : 'success',
          message : "Banner Added successfully !!!"
    
        })
      })
      .catch((err)=>{
        console.log(err)
        dispatchAlert.setNote({
          open : true,
          variant : 'error',
          message : "May be duplicate found !!!"
    
        })
      })


  }

  const [Row, setRows] = useState()

  const [search,setSearch] = useState([]);



  useEffect(() => {
    listBanner()
      .then((data) => {
        console.log(data)

        setRows(data.data.map((row,index) => {
          // setActive(row.banner_Status)
          return ({
            id: index + 1 ,
            banner_title: row.banner_title,
            banner_URL: row.banner_URL,
            banner_Status: row.banner_Status
          })
        }))
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100
    },
    {
      field: "banner_title",
      headerName: "Banner Title",
      width: 200,
    },
    {
      field: 'banner_URL',
      align: 'center',
      headerName: 'Banner Preview',
      width: 200,
      renderCell: (params) => <div className="categoryImage" ><img src={params.formattedValue} alt='category' /></div>,
    },
    {
      field: "banner_Status",
      headerName: "Banner Status",
      align : 'center',
      width: 200,
      renderCell: (params) => <Switch onChange ={handleSwitch} name = {params.row.action}   checked = {params.formattedValue}></Switch> ,
  
    },
   

  ];

  const handleSwitch = (e)=>{
    console.log(e.target.name)

    const FD = new FormData()

    FD.append('_id',e.target.name)
    FD.append('banner_Status',e.target.checked)

    const res = changeStatus(FD);

    res.then((data)=>{
      console.log(data)
      dispatchAlert.setNote({
        open : true,
        variant : 'success',
        message : "Banner Status Updated Successfully !!!"
  
      })
    })
    .catch((err)=>{
      console.log(err)
      dispatchAlert.setNote({
        open : true,
        variant : 'error',
        message : "May be duplicate found !!!"
  
      })
    })

    
  

  } 

    function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [{ columnField: 'banner_title', operatorValue: 'contains', value: `${search}` }],
          }}
          rows={Row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          components={{
            Pagination: CustomPagination,
          }}
        />
      </div>
    );
  }

  const handelSearch =  (e)=>{

    setSearch(e.target.value)

  }




  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
        Banner Panel
      </Typography>

      {/* Section 1  */}
      <Grid
        container
        p={3}
        pt={0}
        pb={0}
        sx={{
          borderRadius: 2,
          justifyContent: "center !important",
          alignItems: "center !important",
        }}
      >
        <Grid item xs={10}>
          <form method="post" onSubmit={handelAddBanner} enctype='multipart/form-data'   className="formStyle">
            <Box
              sx={{
                "& .MuiTextField-root": { mt: 2 },
                margin: "auto",
              }}
            >
              <section className="dorpContainer">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>
                    Drag & drop your staff image here, or click to select image
                  </p>
                  <em>(Only *.jpeg and *.png images will be accepted)</em>
                </div>
                <aside>
                  <h5>File Name</h5>
                  <ul>{acceptedFileItems}</ul>
                </aside>
              </section>

              <TextField
                fullWidth
                autoComplete={false}
                id="fullWidth"
                label="Banner Title"
                type="text"
                name = 'banner_title'
                variant="outlined"
              />

          
          <FormGroup  >
          <br></br>
            <FormControlLabel control={<Checkbox name = 'banner_Status' />} label="Active (checked it if you want to make it active)" />
          </FormGroup>



              <Button
                variant="contained"
                color="primary"
                type = 'submit'
                sx={{ marginTop: "5%", marginBottom: "8%", float: "right" }}
              >
                Add Banner
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
     
     
        <Grid item p={2} xs={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <Typography variant="h6"> Banner List </Typography>
     
          <br></br>
          <TextField
            fullWidth
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search by banner title"
            type="text"
            onChange={handelSearch}
          />
          <br></br>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}
    </>
  );
}
