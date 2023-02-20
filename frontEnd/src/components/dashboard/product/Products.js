import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  MenuItem,
  Tooltip,
  Modal,
  Fade,
  Backdrop,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
// import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import question from "../../../assets/img/question.svg";
import DifferenceIcon from "@mui/icons-material/Difference";
import {
  getListProduct,
  categoryList,
  getSubCatagories,
} from "../../../services/service";
import {
  DataGrid,
  // gridPageCountSelector,
  // gridPageSelector,
  // useGridApiContext,
  // useGridSelector,
} from "@mui/x-data-grid";
// import Pagination from '@mui/material/Pagination';
import { useDispatch } from "react-redux";
import { setForm } from "../../../store/action/action";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CopyrightIcon from "@mui/icons-material/Copyright";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
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
    filter: false,
  });

  const [open, setModelBox] = useState({
    open: false,
    data: null,
    setRow: setPageState,
  });

  // catalog State
  const [catalog, setCatalog] = useState({
    category: [],
    subCategory: [],
  });

  const fetchData = async () => {
    setPageState((lastState) => ({
      ...lastState,
      isLoading: true,
    }));
    getListProduct({
      page: pageState.page,
      limit: pageState.limit,
      total: pageState.total,
      title: pageState.title,
      category: pageState.category,
      SKU: pageState.SKU,
      subCategory: pageState.subCategory,
    })
      .then((data) => {
        setPageState((lastState) => ({
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
              status: row.status ? "Activated" : "Deactivated",
              featured_image: row.featured_image,
              action: row,
            };
          }),
          isLoading: false,
          total: data.data.total,
          filter: false,
        }));
      })
      .catch((err) => {});
  };

  useMemo(() => {
    fetchData();
  }, [pageState.page, pageState.limit, pageState.filter]);

  useMemo(async () => {
    let cat = await categoryList();
    let subCat = await getSubCatagories();

    console.log(cat);
    console.log(subCat);
    setCatalog({
      category: cat.data,
      subCategory: subCat.data,
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "SKU", headerName: "SKU", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "featured_image",
      headerName: "Featured Image",
      width: 160,
      align: "center",
      renderCell: (params) => (
        <div className="categoryImage">
          {" "}
          <img src={params.formattedValue || question} alt="featured" />
        </div>
      ),
    },
    {
      field: "specification_image",
      headerName: "Specification Image",
      width: 160,
      align: "center",
      renderCell: (params) => (
        <div className="categoryImage">
          <img src={params.formattedValue || question} alt="featured" />
        </div>
      ),
    },
    {
      field: "mannequin_image",
      headerName: "Mannequin Image",
      width: 160,
      align: "center",
      renderCell: (params) => (
        <div className="categoryImage">
          <img src={params.formattedValue || question} alt="featured" />
        </div>
      ),
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
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Tooltip title="Update">
            <IconButton
              onClick={() => {
                //console.log(params)

                dispatch(
                  setForm({
                    state: true,
                    formType: "update_product",
                    payload: params,
                  })
                );
              }}
              aria-label="update"
            >
              <CreateIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Create Variations">
            <IconButton
              onClick={() => {
                dispatch(
                  setForm({
                    state: true,
                    formType: "variation",
                    payload: params,
                    setRow: setPageState,
                  })
                );
              }}
            >
              <DifferenceIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Duplicate">
            <IconButton
              onClick={() =>
                setModelBox({
                  open: true,
                  data: params.formattedValue,
                  setRow: setPageState,
                })
              }
            >
              <CopyrightIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="View">
            <IconButton
              onClick={() => {
                console.log(params);
                props.history(`/productDetails/${params.row.SKU}`);
              }}
              aria-label="update"
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>
          {/* // ============== delete product */}
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
        </Box>
      ),
    },
  ];

  function DataGridView() {
    return (
      <div style={{ marginTop: "2%", height: 400, width: "100%" }}>
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
            setPageState((old) => ({ ...old, page: newPage + 1 }));
          }}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, limit: newPageSize }))
          }
          columns={columns}
        />
      </div>
    );
  }

  const handleSearch = (e) => {
    return setPageState((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  const clearFilter = () => {
    return setPageState((old) => ({
      ...old,
      title: "",
      category: undefined,
      SKU: undefined,
      subCategory: undefined,
      filter: !old.filter,
    }));
  };

  return (
    <Box sx={{ pl: 4, pr: 4 }}>
      <Typography component={"span"} sx={{ display: "block" }} variant="h5">
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
          gap: "10px",
          alignItems: "center !important",
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
            name="title"
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
            inputProps={{ style: { textTransform: "uppercase" } }}
            onChange={handleSearch}
            name="SKU"
            type="text"
          />
        </Grid>

        <Grid xs={12} md={2.5}>
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            size="small"
            label="Category"
            name="category"
            value={pageState.category || "None"}
            onChange={handleSearch}
          >
            {catalog.category.map((option) => (
              <MenuItem key={option.category_name} value={option.category_name}>
                {option.category_name}
              </MenuItem>
            ))}
            <MenuItem key={"None"} value={"None"}>
              None
            </MenuItem>
          </TextField>
        </Grid>
        <Grid className="flex" xs={12} md={2.5}>
          <TextField
            id="outlined-select-currency"
            select
            fullWidth
            size="small"
            label="Sub Category"
            name="subCategory"
            value={pageState.subCategory || "None"}
            onChange={handleSearch}
          >
            {catalog.subCategory.map(
              (option) =>
                pageState.category === option.category_name && (
                  <MenuItem
                    key={option.sub_category_name}
                    value={option.sub_category_name}
                  >
                    {option.sub_category_name}
                  </MenuItem>
                )
            )}
            <MenuItem key={"None"} value={"None"}>
              None
            </MenuItem>
          </TextField>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "5px",
          }}
          xs={12}
          md={1.5}
        >
          <Button
            color="primary"
            fullWidth
            variant="contained"
            onClick={() => {
              setPageState((old) => ({ ...old, filter: !old.filter }));
            }}
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
      </Grid>

      {/* Section 1 ends  */}
      <br />
      {/* data grid  */}

      <Grid container scaping={2} className="overviewContainer">
        <Grid item p={2} xs={12} md={12} sx={{ boxShadow: 2, borderRadius: 5 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography component={"span"} variant="h6">
              {" "}
              Product List{" "}
            </Typography>

            <Button
              color="primary"
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => {
                dispatch(setForm({ state: true, formType: "product" }));
              }}
            >
              Add Product
            </Button>
          </div>
          {DataGridView()}
        </Grid>
      </Grid>

      {/* data grid ends  */}

      {/* make duplicate product */}
      <DuplicateProduct open={open} setOpen={setModelBox} dispatch={dispatch} />
    </Box>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

function DuplicateProduct({ open, setOpen, dispatch }) {
  const [checked, setChecked] = useState({
    Specification: false,
    Images: false,
    Features: false,
    Miscellaneous: false,
    Inventory_Shipping: false,
    SEO: false,
    Extra_Details: false,
  });

  const Specifications = [
    "product_title",
    "category_name",
    "category_id",
    "sub_category_name",
    "sub_category_id",
    "primary_material",
    "primary_material_name",
    "length_main",
    "breadth",
    "height",
    "polish",
    "polish_name",
    "assembly_required",
    "assembly_part",
    "MRP",
    "selling_price",
    "showroom_price",
    "discount_limit",
    "mobile_store",
    "online_store",
    "range",
    "assembly_level",
    "continue_selling",
  ];

  const Images = [
    "product_image",
    "featured_image",
    "mannequin_image",
    "specification_image",
  ];

  const Features = [
    "rotating_seats",
    "eatable_oil_polish",
    "no_chemical",
    "straight_back",
    "lean_back",
    "weaving",
    "knife",
    "not_suitable_for_Micro_Dish",
    "tilt_top",
    "inside_compartments",
    "stackable",
    "ceramic_tiles",
    "ceramic_tiles_qty",
    "ceramic_tiles_included",
    "ceramic_tiles_name",
    "ceramic_drawers",
    "ceramic_drawers_included",
    "ceramic_drawers_name",
  ];

  const Miscellaneous = [
    "weight_capacity",
    "joints",
    "drawer",
    "drawer_count",
    "back_style",
  ];

  const Inventory = [
    "warehouse",
    "warehouse_name",
    "polish_time",
    "manufacturing_time",
    "returnDays",
    "COD",
    "returnable",
    "package_length",
    "package_height",
    "package_breadth",
    "quantity",
    "unit",
    "bangalore_stock",
    "jodhpur_stock",
    "package_weight",
  ];

  const SEO = [
    "product_description",
    "seo_title",
    "seo_description",
    "seo_keyword",
    "selling_points",
  ];

  const Extra = [
    "CVW",
    "hinge",
    "hinge_qty",
    "hinge_name",
    "knob",
    "knob_qty",
    "knob_name",
    "handle",
    "handle_qty",
    "handle_name",
    "door",
    "door_qty",
    "door_name",
    "fitting",
    "fitting_name",
    "dial_size",
    "seating_size_width",
    "seating_size_depth",
    "seating_size_height",
    "fabric",
    "fabric_qty",
    "fabric_name",
    "wall_hanging",
    "legs",
    "mirror",
    "mirror_length",
    "mirror_width",
    "silver",
    "silver_weight",
    "upholstery",
    "trolley",
    "trolley_material",
    "tax_rate",
    "status",
    "wheel",
    "wheel_included",
    "wheel_qty",
    "wheel_name",
    "mattress",
    "mattress_length",
    "mattress_breadth",
    "plywood",
    "top_size_breadth",
    "top_size_length",
    "ceramic_drawers_qty",
    "variations",
    "parent_SKU",
    "amazon_url",
    "flipkart_url",
    "jiomart_url",
    "wood_weight",
    "metal_weight",
  ];

  function handleClose() {
    console.log(open.data);
    setOpen((old) => ({ ...old, open: false }));
    setChecked({
      Specification: false,
      Images: false,
      Features: false,
      Miscellaneous: false,
      Inventory_Shipping: false,
      SEO: false,
      Extra_Details: false,
    });
  }
  function handleChange(e) {
    setChecked((old) => ({ ...old, [e.target.name]: e.target.checked }));
  }
  function handleSubmit(e) {
    e.preventDefault();

    let finalCopyObj = {};

    // for separation of copyable fields

    if (checked.Specification) {
      Specifications.map((field) => {
        if (field === "category_id" || field === "category_name")
          finalCopyObj = { ...finalCopyObj, [field]: open.data.category_id };
        else if (field === "sub_category_id" || field === "sub_category_name")
          finalCopyObj = {
            ...finalCopyObj,
            [field]: open.data.sub_category_id,
          };
        else finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };

        return { [field]: open.data[field] };
      });
    }
    if (checked.Images) {
      Images.map((field) => {
        finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };
        return { [field]: open.data[field] };
      });
    }
    if (checked.Features) {
      Features.map((field) => {
        finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };
        return { [field]: open.data[field] };
      });
    }
    if (checked.Miscellaneous) {
      Miscellaneous.map((field) => {
        finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };
        return { [field]: open.data[field] };
      });
    }
    if (checked.Inventory_Shipping) {
      Inventory.map((field) => {
        finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };
        return { [field]: open.data[field] };
      });
    }
    if (checked.SEO) {
      SEO.map((field) => {
        finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };
        return { [field]: open.data[field] };
      });
    }
    if (checked.Extra_Details) {
      Extra.map((field) => {
        finalCopyObj = { ...finalCopyObj, [field]: open.data[field] };
        return { [field]: open.data[field] };
      });
    }

    dispatch(
      setForm({
        state: true,
        formType: "product",
        payload: finalCopyObj,
      })
    );
    handleClose();
  }
  return (
    <>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open.open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open.open}>
            <Box sx={style}>
              <Typography variant="h6">Duplicate Product</Typography>
              <Typography variant="body1">
                Product SKU :: {open.data && open.data.SKU}
              </Typography>
              <form method="post" onSubmit={handleSubmit}>
                <FormGroup sx={{ p: 1 }}>
                  <FormControlLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    control={
                      <Checkbox
                        size={"small"}
                        name="Specification"
                        onChange={handleChange}
                        checked={checked.Specification}
                      />
                    }
                    label="Specification"
                  />
                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        size={"small"}
                        name="Images"
                        onChange={handleChange}
                        checked={checked.Images}
                      />
                    }
                    label="Images"
                  /> */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        size={"small"}
                        name="Features"
                        onChange={handleChange}
                        checked={checked.Features}
                      />
                    }
                    label="Features"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size={"small"}
                        name="Miscellaneous"
                        checked={checked.Miscellaneous}
                        onChange={handleChange}
                      />
                    }
                    label="Miscellaneous"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size={"small"}
                        name="Inventory_Shipping"
                        onChange={handleChange}
                        checked={checked.Inventory_Shipping}
                      />
                    }
                    label="Inventory & Shipping"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size={"small"}
                        name="SEO"
                        checked={checked.SEO}
                        onChange={handleChange}
                      />
                    }
                    label="SEO"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        size={"small"}
                        name="Extra_Details"
                        checked={checked.Extra_Details}
                        onChange={handleChange}
                      />
                    }
                    label="Extra Details"
                  />
                </FormGroup>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button size="small" variant="outlined" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" size="small" variant="contained">
                    Create Duplicate
                  </Button>
                </Box>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
