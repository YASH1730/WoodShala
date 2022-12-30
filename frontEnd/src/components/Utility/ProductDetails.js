import React, { useState, useMemo } from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
// demo images
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// css
import "../../assets/custom/css/productDetails.css";

// mui
import {
  Grid,
  Typography,
  // Rating,
  Box,
  Divider,
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
  Stack,
  Tabs,
  Tab,
  IconButton,
  CircularProgress
} from "@mui/material";

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
// APis function 
import { getProductDetails } from '../../services/service'



export default function ProductDetails(props) {


  // state
  const [imageIndex, setIndex] = useState(0); // use for updating the images
  // const [ratting, setRatting] = useState(2);
  // const [expanded, setExpanded] = useState("panel1");
  const [value, setValue] = useState(0);

  // get query parameter for product 😀
  const SKU = useParams().SKU;

  // state for data 
  const [data, setData] = useState(undefined)

  //   for getting the product 
  useMemo(() => {
    getProductDetails(SKU)
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [SKU]);

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };


  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  // const sizeCart = [
  //   {
  //     name: "King Size",
  //     price: 44000,
  //   },
  //   {
  //     name: "Queen Size",
  //     price: 35000,
  //   },
  //   {
  //     name: "Kid Size",
  //     price: 20000,
  //   },
  // ];


  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const specification = [
    'product_title',
    'category_name',
    'sub_category_name',
    'primary_material',
    'length_main',
    'breadth',
    'height',
    'weight',
    'polish_name',
    'assembly_required',
    'assembly_part',
    'selling_price',
    'showroom_price',
    'discount_limit',
    'show_on_mobile',
    'range',
  ]

  const image = [
    'featured_image',
    'mannequin_image',
    'specification_image',
  ]

  const feature = [
    "rotating_seats",
    "eatable_oil_polish",
    "no_chemical",
    "weaving",
    "knife",
    "not_suitable_for_Micro_Dish",
    "tilt_top",
    "inside_compartments",
    "stackable",
    "ceramic_drawers",
    "ceramic_tiles",
  ]

  const miscellanous = [
    "weight_capacity",
    "joints",
    "drawer",
    "drawer_count",
    "back_style",
  ]

  const inventory = [
    'warehouse',
    'bangalore_stock',
    'jodhpur_stock',
    'selling_points',
    'polish_time',
    'manufacturing_time',
    'returnDays',
    'COD',
    'returnable',
    'package_length',
    'package_height',
    'package_breadth',
    'quantity',
    'unit',
  ]

  const seo = [
    'product_description',
    'seo_title',
    'seo_description',
    'seo_keyword',
  ]

  const extra = [
    'hinge_name',
    'knob_name',
    'textile_name',
    'textile_type',
    'door_name',
    'fitting_name',
    'top_size',
    'dial_size',
    'seating_size_width',
    'seating_size_depth',
    'seating_size_height',
    'fabric',
    'fabric_name',
    'mirror',
    'mirror_length',
    'mirror_width',
    'silver',
    'silver_weight',
    'wheel',
    'trolley',
    'trolley_material',
    'tax_rate',
    'legs'
  ]


  return (
    <>
      {/* // navigation buttons  */}
      <Box className='navigation' p={1}>
        <IconButton disabled={parseInt(SKU.split('-')[1]) < 1002 && true} onClick={() => props.history("productDetails/P-0" + (parseInt(SKU.split('-')[1]) - 1))} variant='contained' color='primary'><ArrowCircleLeftIcon /></IconButton>
        <IconButton onClick={() => props.history("productDetails/P-0" + (parseInt(SKU.split('-')[1]) + 1))} variant='contained' color='primary'><ArrowCircleRightIcon /></IconButton>
      </Box>
      {/* // navigation buttons ends */}


      {data === undefined ? <center style={{ marginTop: '20%' }}><Typography variant='h4'>Product Loading....</Typography><CircularProgress color='primary'></CircularProgress></center> : <>
        {/* main section  */}
        <Grid container className="mainSec">
          {/* Image sec */}
          <Grid item xs={12} >
            <Typography component={'span'} sx={{ display: "block", mb: 3 }} variant="h5">
              Product Details
            </Typography>

          </Grid>

          <Grid item className="imageSec" xs={12} md={6}>
            <Grid container>
              <Grid item xs={12} sx={{
                maxWidth: '400px',
                maxHeight: '450px'
              }}>
                <img
                  className="showImage"
                  src={data.product_image[imageIndex]}
                  alt="image2"
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container className="preview" spacing={2}>
                  {data.product_image.map((item, index) => {
                    return (
                      <Grid
                        item
                        xs={3}
                        key={index}
                        onClick={() => {
                          setIndex(index);
                        }}
                      >
                        <img src={item} className="showImage" alt="images" />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Image sec ends */}
          {/* details sec  */}
          <Grid item xs={12} className="contentSec" md={6}>
            <Grid container>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 350 }} variant="h4">
                  {/* product title */}
                  {data.product_title}
                </Typography>
              </Grid>

            </Grid>
            <Grid className="pd" item xs={12}>
              <Typography sx={{ fontWeight: 400 }} variant="body2">
                Product Details
              </Typography>
              <Divider />
              <Stack sx={{ paddingTop: "2%" }}>
                <Typography variant="caption">
                  SKU
                  <Typography sx={{ float: "right" }} variant="caption">{data.SKU}</Typography>
                </Typography>
                <Typography variant="caption">
                  Category
                  <Typography sx={{ float: "right" }} variant="caption">{data.category_name}</Typography>
                </Typography>
                <Typography variant="caption">
                  Sub Category
                  <Typography sx={{ float: "right" }} variant="caption">{data.sub_category_name}</Typography>
                </Typography>
                <Typography variant="caption">
                  SEO Title
                  <Typography sx={{ float: "right" }} variant="caption">{data.seo_title}</Typography>
                </Typography>
                <Typography variant="caption">
                  SEO Keyword
                  <Typography sx={{ float: "right" }} variant="caption">{data.seo_keyword}</Typography>
                </Typography>
                <Typography variant="caption">
                  Matrial
                  <Typography sx={{ float: "right" }} variant="caption">{data.primary_material}</Typography>
                </Typography>
                <Typography variant="caption">
                  Weight Capacity<Typography sx={{ float: "right" }} variant="caption">{data.weight_capacity}</Typography>
                </Typography>
                <Typography variant="caption">
                  Manufacturing Time<Typography sx={{ float: "right" }} variant="caption">{data.manufacturing_time}</Typography>
                </Typography>
                <Typography variant="caption">
                  Polish Time<Typography sx={{ float: "right" }} variant="caption">{data.polish_time}</Typography>
                </Typography>
                <Typography variant="caption">
                  Range<Typography sx={{ float: "right" }} variant="caption">{data.range}</Typography>
                </Typography>
              </Stack>
              <Typography sx={{ fontWeight: 400, mt: 1 }} variant="body2">
                Price Details
              </Typography>
              <Divider />
              <Stack sx={{ paddingTop: "2%" }}>
                <Typography variant="caption">
                  Selling Price
                  <Typography sx={{ float: "right" }} variant="caption">{data.selling_price}</Typography>
                </Typography>
                <Typography variant="caption">
                  Showroom Price<Typography sx={{ float: "right" }} variant="caption">{data.showroom_price}</Typography>
                </Typography>
                <Typography variant="caption">
                  Discount <Typography sx={{ float: "right" }} variant="caption">{data.discount_limit}%</Typography>
                </Typography>
                <Typography variant="caption">
                  Tax <Typography sx={{ float: "right" }} variant="caption">{data.tax_rate}%</Typography>
                </Typography>
                <Typography variant="caption">
                  MRP <Typography sx={{ float: "right" }} variant="caption">{(data.selling_price) - (data.selling_price / 100 * data.discount_limit)}</Typography>
                </Typography>
              </Stack>
              <Typography sx={{ fontWeight: 400, mt: 1 }} variant="body2">
                Dimesion Details
              </Typography>
              <Divider />
              <Stack sx={{ paddingTop: "2%" }}>
                <Typography variant="caption">
                  Dimensions (Inch)
                  <Typography sx={{ float: "right" }} variant="caption">{data.length_main} L x {data.height} H x {data.breadth} B</Typography>
                </Typography>
                <Typography variant="caption">
                  Package Length (Inch)<Typography sx={{ float: "right" }} variant="caption">{data.package_length}</Typography>
                </Typography>
                <Typography variant="caption">
                  Package Height (Inch)<Typography sx={{ float: "right" }} variant="caption">{data.package_height}</Typography>
                </Typography>
                <Typography variant="caption">
                  Package Breadth (Inch)<Typography sx={{ float: "right" }} variant="caption">{data.package_breadth}</Typography>
                </Typography>
              </Stack>

            </Grid>
          </Grid>
          {/* details sec ends */}
        </Grid>
        {/* main section Ends */}

        {/* More Information */}

        <Grid container className="moreInfo" >
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 500 }} variant="h5">
              MORE INFORMATION
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 100, padding: "1% 0%" }} component='span' variant="caption">
              Explore full product details here !!!
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                  <Tab label="Specification" {...a11yProps(0)} />
                  <Tab label="Image" {...a11yProps(1)} />
                  <Tab label="Features" {...a11yProps(2)} />
                  <Tab label="Miscellaneous" {...a11yProps(3)} />
                  <Tab label="Inventory & Shipping" {...a11yProps(4)} />
                  <Tab label="SEO" {...a11yProps(5)} />
                  <Tab label="Extra Details" {...a11yProps(6)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
                  {specification.map((item) => {
                    return <>
                      <Typography variant="button">
                        {item}<Typography sx={{ float: "right" }} variant="button">{data[item]}</Typography>
                      </Typography>
                      <Divider />
                    </>
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
                  {image.map((item) => {
                    return <>
                      <Typography variant="h6">
                        {item.toUpperCase()}<img alt='images' src={data[item]} sx={{ float: "right" }} />
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                    </>
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
                  {feature.map((item) => {
                    return <>
                      <Typography variant="button">
                        {item}<Typography sx={{ float: "right", color: data[item] ? 'green' : 'red' }}
                          variant="button">{data[item] ? 'true' : 'false'}</Typography>
                      </Typography>
                      <Divider />
                    </>
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
                  {miscellanous.map((item) => {
                    return <>
                      <Typography variant="button">
                        {item}<Typography sx={{ float: "right" }}
                          variant="button">{data[item]}</Typography>
                      </Typography>
                      <Divider />
                    </>
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
                  {inventory.map((item) => {
                    return <>
                      <Typography variant="button">
                        {item}<Typography sx={{ float: "right" }}
                          variant="button">{data[item]}</Typography>
                      </Typography>
                      <Divider />
                    </>
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={5}>
                <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
                  {seo.map((item) => {
                    return <>
                      <Typography variant="button">
                        {item}<Typography sx={{ float: "right" }}
                          variant="button">{data[item]}</Typography>
                      </Typography>
                      <Divider />
                    </>
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={6}>
                <Stack sx={{ padding: "5%", paddingTop: '1%' }}>
                  {extra.map((item) => {
                    return <>
                      <Typography variant="button">
                        {item}<Typography sx={{ float: "right" }}
                          variant="button">{data[item]}</Typography>
                      </Typography>
                      <Divider />
                    </>
                  })}
                </Stack>
              </TabPanel>
            </Box>
          </Grid>

        </Grid>

        {/* More Information ends */}

      </>}
    </>
  );
}