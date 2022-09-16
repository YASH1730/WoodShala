import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  CardMedia,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Switch,
  Modal,
  Backdrop,
  Fade,
  Box,
  Stack,
  styled,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import { OpenBox, Notify } from "../../store/Types";
import { Store } from "../../store/Context";
import {
  getDraft,
  changeProductStatus,
  deleteProduct,
} from "../../services/service";

import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";

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

  const {dispatch} = Store()
  // states

  const [search, setSearch] = useState("");
  const [Row, setRows] = useState();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "content-fit",
    height: "content-fit",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    getDraft()
      .then((data) => {
        console.log(data.data);

        setRows(
          data.data.map((row, index) => {
            return {
              id: index + 1,
              SKU: row.SKU,
              product_title: row.product_title,
              category_name: row.category_name,
              sub_category_name: row.sub_category_name,
              product_description: row.product_description,
              specification_image: row.specification_image,
              seo_title: row.seo_title,
              seo_description: row.seo_description,
              seo_keyword: row.seo_keyword,
              status: row.status,
              featured_image: row.featured_image,
              primary_material: row.primary_material_name,
              secondary_material: row.secondary_material_name,
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
              leg: row.legs,
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
              straight_back: row.straight_back,
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
              action: row,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "SKU", headerName: "SKU", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <Switch
          onChange={handleSwitch}
          name={JSON.stringify(params.row)}
          checked={params.row.status}
        ></Switch>
      ),
    },
    {
      field: "featured_image",
      headerName: "Featured Image",
      width: 160,
      align: "center",
      renderCell: (params) => (
        <div className="categoryImage">
          <img src={params.formattedValue} alt="featured" />
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
          <img src={params.formattedValue} alt="featured" />
        </div>
      ),
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
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => {
              console.log(params);
              dispatch({type : OpenBox,payload : {
                state: true,
                formType: "update_product",
                payload: params,
              }});
            }}
            aria-label="update"
          >
            <CreateIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              deleteProduct(params.formattedValue._id).then((res) => {
                dispatch({type : Notify,payload : {
                  open: true,
                  variant: "success",
                  message: "Product deleted successfully !!!",
                }});
              });
            }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const [open, setOpen] = React.useState({ status: false, data: null });
  const handleOpen = (data, value) =>
    setOpen({ status: true, data: data, value });
  const handleClose = () => setOpen({ status: false, data: null });

  function SpringModal() {
    const data = JSON.parse(open.data);
    return (
      <div>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={true}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={true}>
            <Box sx={style}>
              <Card sx={{ maxWidth: 1000, maxHeight: 700 }}>
                <Grid container sx={{ height: 450, overflowY: "scroll" }}>
                  <Grid item xs={12} md={6}>
                    {" "}
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="350"
                      width="400"
                      sx={{ padding: 2 }}
                      image={
                        data.featured_image
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Product Details
                      </Typography>
                      <Stack
                        sx={{ overflowY: "scroll", height: "300px" }}
                        spacing={1}
                      >
                        <Item>
                          <Typography variant="button">SKU :: </Typography>
                          {data.SKU}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            product_title ::{" "}
                          </Typography>
                          {data.product_title}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            category_name ::{" "}
                          </Typography>
                          {data.category_name}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            sub_category_name ::{" "}
                          </Typography>
                          {data.sub_category_name}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            product_description ::{" "}
                          </Typography>
                          {data.product_description}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            seo_title ::{" "}
                          </Typography>
                          {data.seo_title}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            seo_description ::{" "}
                          </Typography>
                          {data.seo_description}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            seo_keyword ::{" "}
                          </Typography>
                          {data.seo_keyword}
                        </Item>
                        <Item>
                          <Typography variant="button">status :: </Typography>
                          {data.status ? "Activated" : "Deactivated"}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            primary_material_name ::{" "}
                          </Typography>
                          {data.primary_material_name}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            secondary_material_name ::{" "}
                          </Typography>
                          {data.secondary_material_name}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            secondary_material_weight ::{" "}
                          </Typography>
                          {data.secondary_material_weight}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            length_main ::{" "}
                          </Typography>
                          {data.length_main}
                        </Item>
                        <Item>
                          <Typography variant="button">breadth :: </Typography>
                          {data.breadth}
                        </Item>
                        <Item>
                          <Typography variant="button">height :: </Typography>
                          {data.height}
                        </Item>
                        <Item>
                          <Typography variant="button">weight :: </Typography>
                          {data.weight}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            polish_name ::{" "}
                          </Typography>
                          {data.polish_name}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            hinge_name ::{" "}
                          </Typography>
                          {data.hinge_name}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            knob_name ::{" "}
                          </Typography>
                          {data.knob_name}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            handle_name ::{" "}
                          </Typography>
                          {data.handle_name}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            door_name ::{" "}
                          </Typography>
                          {data.door_name}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            fitting_name ::{" "}
                          </Typography>
                          {data.fitting_name}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            selling_points ::{" "}
                          </Typography>
                          {data.selling_points}
                        </Item>
                        <Item>
                          <Typography variant="button">top_size :: </Typography>
                          {data.top_size}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            dial_size ::{" "}
                          </Typography>
                          {data.dial_size}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            seating_size_width ::{" "}
                          </Typography>
                          {data.seating_size_width}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            seating_size_depth ::{" "}
                          </Typography>
                          {data.seating_size_depth}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            seating_size_height ::{" "}
                          </Typography>
                          {data.seating_size_height}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            weight_capacity ::{" "}
                          </Typography>
                          {data.weight_capacity}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            wall_hanging ::{" "}
                          </Typography>
                          {data.wall_hanging}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            assembly_required ::{" "}
                          </Typography>
                          {data.assembly_required}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            assembly_part ::{" "}
                          </Typography>
                          {data.assembly_part}
                        </Item>
                        <Item>
                          <Typography variant="button">legs :: </Typography>
                          {data.legs}
                        </Item>
                        <Item>
                          <Typography variant="button">mirror :: </Typography>
                          {data.mirror}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            mirror_width ::{" "}
                          </Typography>
                          {data.mirror_width}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            mirror_length ::{" "}
                          </Typography>
                          {data.mirror_length}
                        </Item>
                        <Item>
                          <Typography variant="button">silver :: </Typography>
                          {data.silver}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            silver_weight ::{" "}
                          </Typography>
                          {data.silver_weight}
                        </Item>
                        <Item>
                          <Typography variant="button">joints :: </Typography>
                          {data.joints}
                        </Item>
                        <Item>
                          <Typography variant="button">wheel :: </Typography>
                          {data.wheel}
                        </Item>
                        <Item>
                          <Typography variant="button">trolley :: </Typography>
                          {data.trolley}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            trolley_material ::{" "}
                          </Typography>
                          {data.trolley_material}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            rotating_seats ::{" "}
                          </Typography>
                          {data.rotating_seats}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            eatable_oil_polish ::{" "}
                          </Typography>
                          {data.eatable_oil_polish}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            no_chemical ::{" "}
                          </Typography>
                          {data.no_chemical}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            straight_back ::{" "}
                          </Typography>
                          {data.straight_back}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            lean_back ::{" "}
                          </Typography>
                          {data.lean_back}
                        </Item>
                        <Item>
                          <Typography variant="button">weaving :: </Typography>
                          {data.weaving}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            not_suitable_for_Micro_Dish ::{" "}
                          </Typography>
                          {data.not_suitable_for_Micro_Dish}
                        </Item>
                        <Item>
                          <Typography variant="button">tilt_top :: </Typography>
                          {data.tilt_top}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            inside_compartments ::{" "}
                          </Typography>
                          {data.inside_compartments}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            stackable ::{" "}
                          </Typography>
                          {data.stackable}
                        </Item>
                        <Item>
                          <Typography variant="button">MRP :: </Typography>
                          {data.MRP}
                        </Item>
                        <Item>
                          <Typography variant="button">tax_rate :: </Typography>
                          {data.tax_rate}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            selling_price ::{" "}
                          </Typography>
                          {data.selling_price}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            discount_limit ::{" "}
                          </Typography>
                          {data.discount_limit}
                        </Item>
                        <Item>
                          <Typography variant="button">
                            dispatch_time ::{" "}
                          </Typography>
                          {data.dispatch_time}
                        </Item>
                      </Stack>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12}>
                    <CardActions>
                      <Button size="small" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button
                        size="small"
                        onClick={() => {
                          const FD = new FormData();

                          console.log(data)

                          FD.append("_id", data.action._id);
                          FD.append("status", open.value);

                          const res = changeProductStatus(FD);

                          res
                            .then((data) => {
                              console.log(data);
                              dispatch({type : Notify,payload : {
                                open: true,
                                variant: "success",
                                message:
                                  " Product Status Updated Successfully !!!",
                             } });
                            })
                            .catch((err) => {
                              console.log(err);
                              dispatch({type : Notify,payload : {
                                open: true,
                                variant: "error",
                                message: "Something Went Wrong !!!",
                            }});
                            });
                        }}
                      >
                        Apply
                      </Button>
                    </CardActions>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }

  const handleSwitch = (e) => {
    console.log(e.target.name);

    handleOpen(e.target.name, e.target.checked);
  };

  function DataGridView() {
    return (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={Row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          filterModel={{
            items: [
              {
                columnField: "SKU",
                operatorValue: "contains",
                value: `${search}`,
              },
            ],
          }}
          components={{
            Pagination: CustomPagination,
          }}
        />
      </div>
    );
  }

  const handleSearch = (e) => {
    // console.log(e.target.value)
    setSearch(e.target.value);
  };

  return (
    <>
      <Typography sx={{ display: "block" }} variant="h5">
        Products Draft
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
            autoComplete={false}
            id="demo-helper-text-aligned-no-helper"
            label="Search by SKU"
            onChange={handleSearch}
            name="seachQuery"
            type="search"
          />
        </Grid>

        <Grid xs={12} md={2.8}>
          <Button
            sx={{ width: "100%" }}
            color="primary"
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() => {
              dispatch({type : OpenBox,payload : { state: true, formType: "product"} });
            }}
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
          <Typography variant="h6"> Draft Product List </Typography>
          <br></br>
          {DataGridView()}
        </Grid>
      </Grid>

      {open.status && SpringModal()}

      {/* data grid ends  */}
    </>
  );
}
