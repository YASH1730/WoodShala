import React, { useState, useEffect } from "react";
import {
  // Tabs,
  // Tab,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Grid,
  Button,
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
  Typography,
  Drawer,
  Divider,
  ListItemAvatar,
  Avatar,
  Collapse,

} from "@mui/material";
import "../assets/custom/css/home.css";
// import Slide from "@mui/material/Slide";
// import Backdrop from "@mui/material/Backdrop";
import logo from "../assets/img/Blog/logo.webp";

// icons
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
// import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
// import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import AddIcon from '@mui/icons-material/Add';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import InboxIcon from '@mui/icons-material/Inbox';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import CollectionsIcon from "@mui/icons-material/Collections";
// import DraftsIcon from '@mui/icons-material/Drafts';
import GridViewIcon from '@mui/icons-material/GridView';
import InventoryIcon from '@mui/icons-material/Inventory';
import MergeIcon from '@mui/icons-material/Merge';
import HardwareIcon from '@mui/icons-material/Hardware';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
// import state 
import { Store } from '../store/Context'
import { DarkMode, SideTabs, Auth } from '../store/Types'

const Home = (props) => {

  const { state, dispatch } = Store()

  // const ModuleName = {
  //   0: '/dashboard',
  //   1: '/products',
  //   2: '/merge',
  //   3: '/gallery',
  //   4: '/banner',
  //   5: '/customer',
  //   6: '/order',
  //   7: '/coupons',
  //   8: '/blogModule',
  //   9: '/hardware',
  //   10: '/draft',
  //   11: '/stock',
  //   12: '/profile'
  // }
  // const ModuleNumber = {
  //   '/dashboard': 0,
  //   '/products': 1,
  //   '/merge': 2,
  //   '/gallery': 3,
  //   '/banner': 4,
  //   '/customer': 5,
  //   '/order': 6,
  //   '/coupons': 7,
  //   '/blogModule': 8,
  //   '/hardware': 9,
  //   '/draft': 10,
  //   '/stock': 11,
  //   '/profile': 12,
  // }


  // const [value, setValue] = useState(ModuleNumber[window.location.pathname]);

  const history = props.history;


  // states
  const [anchor, setAnchor] = useState(null);
  const [type, setType] = useState({
    product: false,
    admin: false,
    order : false
  });

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
      type: SideTabs,
      payload: {
        open: false
      }
    })
    handleMenuClose();
  };



  // function a11yProps(index) {
  //   return {
  //     id: `vertical-tab-${index}`,
  //     "aria-controls": `vertical-tabpanel-${index}`,
  //   };
  // }

// this tab commented because client demand something new and compact to show   
  // function VerticalTabs() {

  //   const handleChange = (event, newValue) => {
  //     history(`${ModuleName[newValue]}`)
  //     setValue(newValue);
  //   };

  //   return (
  //     <Box sx={{ flexGrow: 1, display: "flex", width: "100%" }}>
  //       {state.SideTabs.open && (
  //         <Slide direction="right" in={state.SideTabs.open} mountOnEnter unmountOnExit>
  //           <Backdrop
  //             sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //             open={state.SideTabs.open}
  //             onClick={handleClose}
  //           >
  //             <Tabs
  //               orientation="vertical"
  //               value={value}
  //               variant="scrollable"
  //               onChange={handleChange}
  //               indicatorColor="primary"
  //               textColor="primary"
  //               aria-label="Vertical tabs example"
  //               className={state.DarkMode.mode === true ? "darkTabs2" : "tabs2"}
  //               sx={{
  //                 borderRight: 1,
  //                 borderColor: "divider",
  //                 ".MuiTabs-indicator": {
  //                   left: 0,
  //                   width: "5px",
  //                 },
  //               }}
  //             >


  //               <Tab
  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<GridViewIcon />}
  //                 label="DashBoard"
  //                 {...a11yProps(0)}
  //               />

  //               <Accordion>
  //                 <AccordionSummary
  //                   expandIcon={<ExpandMoreIcon />}
  //                   aria-controls="panel1a-content"
  //                   id="panel1a-header"
  //                 >
  //                   <Typography>Accordion 1</Typography>
  //                 </AccordionSummary>
  //                 <AccordionDetails>
  //                   <Typography>
  //                     Product
  //                   </Typography>
  //                 </AccordionDetails>
  //               </Accordion>
  //               <Tab

  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<ShoppingBagOutlinedIcon />}
  //                 label="Product"
  //                 {...a11yProps(1)}
  //               />
  //               <Tab

  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<MergeIcon />}
  //                 label="Merge Product"
  //                 {...a11yProps(2)}
  //               />

  //               <Tab

  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<CollectionsIcon />}
  //                 label="Gallery"
  //                 {...a11yProps(3)}
  //               />
  //               <Tab

  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<ViewCarouselIcon />}
  //                 label="Banner"
  //                 {...a11yProps(4)}
  //               />
  //               <Tab

  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<PeopleAltOutlinedIcon />}
  //                 label="Customer"
  //                 {...a11yProps(5)}
  //               />
  //               <Tab

  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<ExploreOutlinedIcon />}
  //                 label="Order"
  //                 {...a11yProps(6)}
  //               />
  //               <Tab

  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<CardGiftcardOutlinedIcon />}
  //                 label="Coupons"
  //                 {...a11yProps(7)}
  //               />
  //               <Tab

  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<ArticleIcon />}
  //                 label="Blog"
  //                 {...a11yProps(8)}
  //               />
  //               <Tab

  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<AdminPanelSettingsIcon />}
  //                 label="Hardware"
  //                 {...a11yProps(9)}
  //               />
  //               {localStorage.getItem('role') === 'Super Admin' && <Tab

  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<DraftsIcon />}
  //                 label="Draft"
  //                 {...a11yProps(10)}
  //               />}
  //               <Tab

  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<InventoryIcon />}
  //                 label="Stock Channel"
  //                 {...a11yProps(11)}
  //               />
  //               <Tab

  //                 sx={{ justifyContent: 'left !important' }}
  //                 iconPosition="start"
  //                 icon={<SettingsOutlinedIcon />}
  //                 label="Profile"
  //                 {...a11yProps(12)}
  //               />
  //               <Button
  //                 color="primary"
  //                 sx={{ margin: "auto" }}
  //                 startIcon={<LogoutIcon />}
  //                 variant="contained"
  //               >
  //                 Log Out
  //               </Button>
  //             </Tabs>
  //           </Backdrop>
  //         </Slide>
  //       )}



  //     </Box>
  //   );
  // }


  // side bar for the tabs 
  function SwipeableTemporaryDrawer() {

    const list = () => (
      <Box
        sx={{ flexGrow: 1, display: "flex", width: 250, flexDirection: 'column' }}
        role="presentation"
      >

        {/* // heading */}
        <Grid container sx={{ p: 2.5, mb: 3 }}>
          <Grid item xs={12} sx={{ maxHeight: '1px' }}  >
            <Typography variant='h5' sx={{ textAlign: 'center' }}>Woodsala</Typography>
          </Grid>
        </Grid>

        {/* // all routes  */}
        <Divider />
        <Grid container sx={{ p: 1 }}>
          <Grid item xs={12} sx={{ maxHeight: '1px' }}  >
            <List dense = {true} sx={{
              width: '100%',
              bgcolor: 'background.paper',
            }} component="nav" aria-label="mailbox folders">

              <ListItem button onClick={() => { history('/dashboard'); handleClose(); }}>
                <ListItemAvatar >
                  <Avatar
                    sx={{
                      width: '30px',
                      height: '30px',
                      svg: {
                        fontSize: '1.1rem'
                      }
                    }}>
                    <GridViewIcon color={window.location.pathname === '/dashboard' ? 'primary' : ''} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Dashboard" />
              </ListItem>

              <ListItem onClick={(e) => { setType({ ...type, product: !type.product }) }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: '30px',
                      height: '30px',
                      svg: {
                        fontSize: '1.1rem'
                      }
                    }}>
                    <ShoppingBagOutlinedIcon color={window.location.pathname === '/merge' || window.location.pathname === '/products' ? 'primary' : ''} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Product" />
                {type.product ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              {/* // product nested menu */}
              <Collapse in={type.product} timeout="auto" unmountOnExit>
                <List dense = {true} component="div" disablePadding>

                  <ListItem sx={{ pl: 4 }} button onClick={() => { history('/products'); handleClose(); }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: '30px',
                          height: '30px',
                          svg: {
                            fontSize: '1rem'
                          }
                        }}>
                        <ShoppingBagOutlinedIcon color={window.location.pathname === '/products' ? 'primary' : ''} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Product" />
                  </ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { history('/merge'); handleClose(); }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: '30px',
                          height: '30px',
                          svg: {
                            fontSize: '1rem'
                          }
                        }}>
                        <MergeIcon color={window.location.pathname === '/merge' ? 'primary' : ''} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Merge Product" />
                  </ListItem >

                  <ListItem button sx={{ pl: 4 }} onClick={() => { history('/dashboard'); handleClose(); }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: '30px',
                          height: '30px',
                          svg: {
                            fontSize: '1rem'
                          }
                        }}>
                        <GridViewIcon color={window.location.pathname === '/dashboard' ? 'primary' : ''} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Variation" />
                  </ListItem >
                </List>
              </Collapse>

              <ListItem button onClick={(e) => { setType({ ...type, order: !type.order }) }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: '30px',
                      height: '30px',
                      svg: {
                        fontSize: '1.1rem'
                      }
                    }}>
                    <InboxIcon color={window.location.pathname === '/order' ? 'primary' : ''} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Order" />
                {type.order ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              {/* // order nested menu */}
              <Collapse in={type.order} timeout="auto" unmountOnExit>
                <List dense = {true} component="div" disablePadding>

                  <ListItem sx={{ pl: 4 }} button  onClick={() => { history('/order'); handleClose(); }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: '30px',
                          height: '30px',
                          svg: {
                            fontSize: '1rem'
                          }
                        }}>
                        <ShoppingBagOutlinedIcon color={window.location.pathname === '/order' ? 'primary' : ''} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Orders" />
                  </ListItem>
                  <ListItem button sx={{ pl: 4 }} onClick={() => { history('/create_order'); handleClose(); }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: '30px',
                          height: '30px',
                          svg: {
                            fontSize: '1rem'
                          }
                        }}>
                        <AddIcon color={window.location.pathname === '/create_order' ? 'primary' : ''} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Create Order" />
                  </ListItem >
                </List>
              </Collapse>

              <ListItem button onClick={() => { history('/customer'); handleClose(); }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: '30px',
                      height: '30px',
                      svg: {
                        fontSize: '1.1rem'
                      }
                    }}>
                    <PeopleAltOutlinedIcon color={window.location.pathname === '/customer' ? 'primary' : ''} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Customer" />
              </ListItem>

              <ListItem button onClick={() => { history('/reward'); handleClose(); }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: '30px',
                      height: '30px',
                      svg: {
                        fontSize: '1.1rem'
                      }
                    }}>
                    <EmojiEventsIcon color={window.location.pathname === '/reward' ? 'primary' : ''} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Reward" />
              </ListItem>

              <ListItem button onClick={() => { history('/blogs'); handleClose(); }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: '30px',
                      height: '30px',
                      svg: {
                        fontSize: '1.1rem'
                      }
                    }}>
                    <ArticleIcon color={window.location.pathname === '/dashboard' ? 'blogs' : ''} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Blog" />
              </ListItem>

              <ListItem button onClick={() => { history('/banner'); handleClose(); }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: '30px',
                      height: '30px',
                      svg: {
                        fontSize: '1.1rem'
                      }
                    }}>
                    <ViewCarouselIcon color={window.location.pathname === '/banner' ? 'primary' : ''} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Banner" />
              </ListItem>

              <ListItem button onClick={() => { history('/inventory'); handleClose(); }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: '30px',
                      height: '30px',
                      svg: {
                        fontSize: '1.1rem'
                      }
                    }}>
                    <InventoryIcon color={window.location.pathname === '/inventory' ? 'primary' : ''} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Inventory" />
              </ListItem>


              <ListItem button onClick={(e) => { setType({ ...type, admin: !type.admin }) }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: '30px',
                      height: '30px',
                      svg: {
                        fontSize: '1.1rem'
                      }
                    }}>
                    <AdminPanelSettingsIcon color={window.location.pathname === '/admin' || window.location.pathname === '/user' ? 'primary' : ''} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Admin" />
                {type.admin ? <ExpandLess /> : <ExpandMore />}

              </ListItem>
              {/* // admin nested menu */}
              <Collapse in={type.admin} timeout="auto" unmountOnExit>
                <List dense = {true} component="div" disablePadding>

                  <ListItem sx={{ pl: 4 }} button onClick={() => { history('/user'); handleClose(); }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: '30px',
                          height: '30px',
                          svg: {
                            fontSize: '1rem'
                          }
                        }}>
                        <AssignmentIndIcon color={window.location.pathname === '/user' ? 'primary' : ''} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="User" />
                  </ListItem>


                  <ListItem button sx={{ pl: 4 }} onClick={() => { history('/admin'); handleClose(); }}>
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: '30px',
                          height: '30px',
                          svg: {
                            fontSize: '1rem'
                          }
                        }}>
                        <SettingsOutlinedIcon color={window.location.pathname === '/admin' ? 'primary' : ''} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Settings" />
                  </ListItem >
                </List>
              </Collapse>

              <ListItem button onClick={() => { history('/hardware'); handleClose(); }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: '30px',
                      height: '30px',
                      svg: {
                        fontSize: '1.1rem'
                      }
                    }}>
                    <HardwareIcon color={window.location.pathname === '/hardware' ? 'primary' : ''} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Hardware" />
              </ListItem>


              <ListItem button onClick={() => { history('/accessories'); handleClose(); }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: '30px',
                      height: '30px',
                      svg: {
                        fontSize: '1.1rem'
                      }
                    }}>
                    <CategoryIcon color={window.location.pathname === '/accessories' ? 'primary' : ''} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Accessories" />
              </ListItem>

              {/* // logout  */}
              <Divider sx={{ margin: "auto", mt : 2 }}/>
              <ListItem onClick={handleLogout}>
                <Button
                  color="primary"
                  sx={{ margin: "auto", mt : 2 }}
                  startIcon={<LogoutIcon />}
                  variant="contained"
                >
                  Log Out
                </Button>
              </ListItem>

            </List>
          </Grid>
        </Grid>
      </Box>
    );

    return (
      <div>
        <Drawer
          anchor={'left'}
          open={state.SideTabs.open}
          onClose={handleClose}
        >
          {list()}
        </Drawer>
      </div>
    );
  }

  function MenuBox(type) {
    return (
      <Menu
        id={"menu"}
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleMenuClose}
      >
        <MenuItem sx={{ padding: 0.5 }} onClick={handleLogout} >

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
    dispatch({
      type: Auth, payload: {
        isLogin: false,
        WDToken: null,
        role: null
      }
    })
    handleMenuClose()
    handleClose();
    history("/");

  };

  // capitalize the first letter in word 
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  return (
    <Box sx={{
      mb: 3,
      display: window.location.pathname === '/blog' || window.location.pathname === '/blogContent' || window.location.pathname === '/' ? "none" : 'block'
    }}>
      {/* Top Bar  */}
      <title>{titleCase(window.location.pathname.split('/')[1])}</title>
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
                  type: SideTabs,
                  payload: {
                    open: true
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
                  type: SideTabs,
                  payload: {
                    open: false
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

        <Grid item xs={4} className='logo'>
          <img src={logo} alt="logo" />

        </Grid>

        <Grid item sx={{ display: "flex", justifyContent: "end" }} xs={4}>
          {state.DarkMode.mode === true ? (
            <IconButton
              onClick={() => {
                dispatch({
                  type: DarkMode,
                  payload: {
                    mode: false
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
                  type: DarkMode,
                  payload: {
                    mode: true
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

          {MenuBox(type)}

          <IconButton onClick={(e) => { handleMenu(e); setType('profile') }} size="small" color="primary">
            <PersonIcon />
          </IconButton>
        </Grid>
      </Grid>
      {/* Top Bar Ends */}

      {/* Sidenav  */}
      {/* {VerticalTabs()} */}
      {SwipeableTemporaryDrawer()}
      {/* Sidenav Ends  */}
    </Box>
  );
};

export default Home;
