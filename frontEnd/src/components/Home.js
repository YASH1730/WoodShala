import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Grid,
  Button,
  ListItemIcon,
} from "@mui/material";
import "../assets/custom/css/home.css";
import Slide from "@mui/material/Slide";
import Backdrop from "@mui/material/Backdrop";
import logo from "../assets/img/Blog/logo.webp";

// icons
import ArticleIcon from '@mui/icons-material/Article';
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CollectionsIcon from "@mui/icons-material/Collections";
import DraftsIcon from '@mui/icons-material/Drafts';
import GridViewIcon from '@mui/icons-material/GridView';
import InventoryIcon from '@mui/icons-material/Inventory';
import MergeIcon from '@mui/icons-material/Merge';

// import state 
import {Store} from '../store/Context' 
import {DarkMode, SideTabs, Auth} from '../store/Types' 

const Home = (props) => {

  const {state,dispatch} = Store()
  
  const ModuleName = {
    0 : '/dashboard',
    1 : '/products',
    2 : '/merge',
    3 : '/gallery', 
    4 : '/banner', 
    5 : '/customer', 
    6 : '/order', 
    7 : '/coupons', 
    8 : '/blogModule', 
    9 : '/hardware', 
    10 : '/draft'  ,
    11 : '/stock'  ,
    12 : '/profile' 
  }
  const ModuleNumber = {
     '/dashboard': 0,
     '/products': 1,
     '/merge': 2,
     '/gallery': 3,
     '/banner': 4,
     '/customer': 5,
     '/order': 6,
     '/coupons': 7,
     '/blogModule': 8,
     '/hardware': 9,
     '/draft': 10,
     '/stock': 11,
     '/profile': 12,
  }

  
  const [value, setValue] = useState(ModuleNumber[window.location.pathname]);

  const history = props.history;

 
  // states
  const [anchor, setAnchor] = useState(null);

  useEffect(() => {
    // console.log(state.Auth.isLogin)
    if (state.Auth.isLogin === false)
      history("/");
  }, [state.Auth.isLogin]);

  const handleMenuClose = () => {
    setAnchor(null);
  };

  const handleMenu = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    dispatch({
      type : SideTabs,
      payload : {
        open : false
      }
    })
  };

 

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }


  function VerticalTabs() {
  
    const handleChange = (event, newValue) => 
  {
      history(`${ModuleName[newValue]}`)
      setValue(newValue);
    };

    return (
      <Box sx={{ flexGrow: 1, display: "flex", width: "100%" }}>
        {state.SideTabs.open && (
          <Slide direction="right" in={state.SideTabs.open} mountOnEnter unmountOnExit>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={state.SideTabs.open}
              onClick={handleClose}
            >
              <Tabs
                orientation="vertical"
                value={value}
                variant="scrollable"
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                aria-label="Vertical tabs example"
                className={state.DarkMode.mode === true ? "darkTabs2" : "tabs2"}
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  ".MuiTabs-indicator": {
                    left: 0,
                    width: "5px",
                  },
                }}
              >
      
                <Tab
                  wrapped
                  icon={<GridViewIcon />}
                  label="DashBoard"
                  {...a11yProps(0)}
                />
                <Tab
                  wrapped
                  icon={<ShoppingBagOutlinedIcon />}
                  label="Product"
                  {...a11yProps(1)}
                />
                <Tab
                  wrapped
                  icon={<MergeIcon />}
                  label="Merge Product"
                  {...a11yProps(2)}
                />
                
                <Tab
                  wrapped
                  icon={<CollectionsIcon />}
                  label="Gallery"
                  {...a11yProps(3)}
                />
                <Tab
                  wrapped
                  icon={<ViewCarouselIcon />}
                  label="Banner"
                  {...a11yProps(4)}
                />
                <Tab
                  wrapped
                  icon={<PeopleAltOutlinedIcon />}
                  label="Customer"
                  {...a11yProps(5)}
                />
                <Tab
                  wrapped
                  icon={<ExploreOutlinedIcon />}
                  label="Order"
                  {...a11yProps(6)}
                />
                <Tab
                  wrapped
                  icon={<CardGiftcardOutlinedIcon />}
                  label="Coupons"
                  {...a11yProps(7)}
                />
                <Tab
                  wrapped
                  icon={<ArticleIcon />}
                  label="Blog"
                  {...a11yProps(8)}
                />
                <Tab
                  wrapped
                  icon={<AdminPanelSettingsIcon />}
                  label="Hardware"
                  {...a11yProps(9)}
                />
                {localStorage.getItem('role') === 'Super Admin' && <Tab
                  wrapped
                  icon={<DraftsIcon />}
                  label="Draft"
                  {...a11yProps(10)}
                />}
                <Tab
                  wrapped
                  icon={<InventoryIcon />}
                  label="Stock Channel"
                  {...a11yProps(11)}
                />
                <Tab
                  wrapped
                  icon={<SettingsOutlinedIcon />}
                  label="Profile"
                  {...a11yProps(12)}
                />
                <Button
                  color="primary"
                  sx={{ margin: "auto" }}
                  startIcon={<LogoutIcon />}
                  variant="contained"
                >
                  Log Out
                </Button>
              </Tabs>
            </Backdrop>
          </Slide>
        )}
      

        {/* <TabPanel value={value} index={0}>
          <Dashboard />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Products />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Gallery />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Banner />
        </TabPanel>

        <TabPanel value={value} index={4}>
          <Customers />
        </TabPanel>

        <TabPanel value={value} index={5}>
          <Orders />
        </TabPanel>

        <TabPanel value={value} index={6}>
          <Coupons />
        </TabPanel>

        <TabPanel value={value} index={7}>
          <OurStaff />
        </TabPanel>

        <TabPanel value={value} index={8}>
          <Blog />
        </TabPanel>
        

        <TabPanel value={value} index={9}>
          <Admin />
        </TabPanel>
        
        <TabPanel value={value} index={10}>
          <Draft />
        </TabPanel>
        
        <TabPanel value={value} index={11}>
          <StockChannel />
        </TabPanel>
        
        <TabPanel value={value} index={12}>
          <Setting />
        </TabPanel> */}
      </Box>
    );
  }

  function MenuBox() {
    return (
      <Menu
        id={"menu"}
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemIcon>Logout</ListItemIcon>
        </MenuItem>
      </Menu>
    );
  }

  const handleLogout = () => {
    localStorage.clear();
    dispatch({type : Auth,payload : {
      isLogin : false,
      WDToken : null,
      role : null
    }})
    history("/");
  };

  return (
    <Box  sx = {{mb : 10,
    display : window.location.pathname === '/blog' || window.location.pathname === '/blogContent' || window.location.pathname === '/' ? "none":'block' 
    }}>
      {/* Top Bar  */}
      <title>Dashboard</title>
      <Grid
        container
        p={1}
        spacing={2}
        className={state.DarkMode.mode === true ? "darkNav" : "topNav"}
        sx={{ boxShadow: 1 }}
      >
        <Grid item xs={4} sx={{ display: "flex" }}>
          {state.SideTabs.open === false ? (
            <IconButton
              className="hamIcon"
              onClick={() => {
                localStorage.setItem("mode", false);
                dispatch({
                  type : SideTabs,
                  payload : {
                    open : true
                  }
                })
              }}
              size="small"
              color="primary"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              className="hamIcon"
              onClick={() => {
                localStorage.setItem("mode", true);
                dispatch({
                  type : SideTabs,
                  payload : {
                    open : false
                  }
                })
              }}
              size="small"
              color="primary"
            >
              <CloseIcon />
            </IconButton>
          )}

        </Grid>

        <Grid item xs={4} className = 'logo'>
        <img src={logo} alt="logo" />

        </Grid>

        <Grid item sx={{ display: "flex", justifyContent: "end" }} xs={4}>
          {state.DarkMode.mode === true ? (
            <IconButton
              onClick={() => {
                dispatch({
                  type : DarkMode,
                  payload : {
                    mode : false
                  }
                });
              }}
              size="small"
              color="primary"
            >
              <WbSunnyIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                dispatch({
                  type : DarkMode,
                  payload : {
                    mode : true
                  }
                });
              }}
              size="small"
              color="primary"
            >
              <DarkModeIcon />
            </IconButton>
          )}

          <IconButton size="small" color="primary">
            <NotificationsIcon />
          </IconButton>

          {MenuBox()}

          <IconButton onClick={handleMenu} size="small" color="primary">
            <PersonIcon />
          </IconButton>
        </Grid>
      </Grid>
      {/* Top Bar Ends */}

      {/* Sidenav  */}
      {VerticalTabs()}
      {/* Sidenav Ends  */}
    </Box>
  );
};

export default Home;
