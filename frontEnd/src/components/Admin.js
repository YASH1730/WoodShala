import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
} from "@mui/material";
import { OpenBox, Notify } from "../App"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../assets/custom/css/admin.css'
// icons 
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

import ForestIcon from "@mui/icons-material/Forest";
import FilterListIcon from "@mui/icons-material/FilterList";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ConstructionIcon from "@mui/icons-material/Construction";
import AdjustIcon from "@mui/icons-material/Adjust";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import DoorSlidingIcon from "@mui/icons-material/DoorSliding";
import DragHandleIcon from "@mui/icons-material/DragHandle";

// conponents
import Category from "./dashboard/Category";
import SubCategory from "./dashboard/SubCategory";
import PrimaryMaterial from "./dashboard/PrimaryMaterial";
import SecondaryMaterial from "./dashboard/SecondaryMaterial";
import Polish from "./dashboard/Polish";
import Hinge from "./dashboard/Hinge";
import Fitting from "./dashboard/Fitting";
import Knob from "./dashboard/Knob";
import Door from "./dashboard/Door";
import Handle from "./dashboard/Handle";

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





export default function Admin() {

const [value, setValue] = useState(localStorage.getItem('tab') !== null ? parseInt(localStorage.getItem('tab'))  : 0);

const handleChange = (event, newValue) => {
  localStorage.setItem('tab',newValue)
  setValue(newValue);
};

function BasicTabs() {


  return (
    <Box sx={{ width: '100%' }} >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className = 'tabContainer'>
         
        <Tabs   variant="scrollable" value={value} onChange={handleChange} aria-label="basic tabs example">
           <Tab
                  wrapped
                  icon={<FormatListBulletedOutlinedIcon />}
                  label="Category"
                  {...a11yProps(0)}
                />
                <Tab
                  wrapped
                  icon={<ViewCarouselIcon />}
                  label="Sub Category"
                  {...a11yProps(1)}
                />
                <Tab
                  wrapped
                  icon={<ForestIcon />}
                  label="Primary Material"
                  {...a11yProps(2)}
                />
                <Tab
                  wrapped
                  icon={<FilterListIcon />}
                  label="Secondary Material"
                  {...a11yProps(3)}
                />
                <Tab
                  wrapped
                  icon={<AutoAwesomeIcon />}
                  label="Polish"
                  {...a11yProps(4)}
                />
                <Tab
                  wrapped
                  icon={<ConstructionIcon />}
                  label="Fitting"
                  {...a11yProps(5)}
                />
                <Tab
                  wrapped
                  icon={<InsertLinkIcon />}
                  label="Hinge"
                  {...a11yProps(6)}
                />
                <Tab
                  wrapped
                  icon={<AdjustIcon />}
                  label="Knob"
                  {...a11yProps(7)}
                />
                <Tab
                  wrapped
                  icon={<DoorSlidingIcon />}
                  label="Door"
                  {...a11yProps(8)}
                />
                <Tab
                  wrapped
                  icon={<DragHandleIcon />}
                  label="Handle Material"
                  {...a11yProps(9)}
                />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <Category />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <SubCategory />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <PrimaryMaterial />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <SecondaryMaterial />
        </TabPanel>

        <TabPanel value={value} index={4}>
          <Polish />
        </TabPanel>

        <TabPanel value={value} index={5}>
          <Fitting />
        </TabPanel>

        <TabPanel value={value} index={6}>
          <Hinge />
        </TabPanel>

        <TabPanel value={value} index={7}>
          <Knob />
        </TabPanel>

        <TabPanel value={value} index={8}>
          <Door />
        </TabPanel>

        <TabPanel value={value} index={9}>
          <Handle />
        </TabPanel> 

    </Box>
  );
}

  return (
    <>
 
      <Typography sx={{ display: "block" }} variant="h5">
      Admin Tab
      </Typography>

    <br />
    {BasicTabs()}

    </>
  );
}
