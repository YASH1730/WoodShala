import React, { useState, useEffect, useMemo } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  Grid,
  Button,
  List,
  ListItemIcon,
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
import logo from "../assets/img/Blog/logo.webp";

// icons
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PendingIcon from "@mui/icons-material/Pending";
import ArticleIcon from "@mui/icons-material/Article";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AddIcon from "@mui/icons-material/Add";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CategoryIcon from "@mui/icons-material/Category";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import InboxIcon from "@mui/icons-material/Inbox";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DraftsIcon from "@mui/icons-material/Drafts";
import GridViewIcon from "@mui/icons-material/GridView";
import InventoryIcon from "@mui/icons-material/Inventory";
import MergeIcon from "@mui/icons-material/Merge";
import HardwareIcon from "@mui/icons-material/Hardware";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SecurityIcon from "@mui/icons-material/Security";
import PolicyIcon from "@mui/icons-material/Policy";
import ReviewsIcon from "@mui/icons-material/Reviews";
// import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import redux
import {
  setAlert,
  setAuth,
  setMode,
  setTab,
  setRefreshBox,
} from "../store/action/action";
import { useDispatch, useSelector } from "react-redux";

// refresh component
import RefreshToken from "./Utility/RefreshToken";

const Home = (props) => {
  const dispatch = useDispatch();
  const { auth, mode, tab } = useSelector((state) => state);

  const history = props.history;

  // states
  const [anchor, setAnchor] = useState(null);

  const handleMenuClose = () => {
    setAnchor(null);
  };

  const handleMenu = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = (direct = undefined) => {
    handleMenuClose();
    if (direct) history(direct);
    return dispatch(
      setTab({
        open: false,
      })
    );
  };

  // side bar for the tabs
  function SwipeableTemporaryDrawer() {
    const [type, setType] = useState({
      product: false,
      admin: false,
      order: false,
    });

    function ListTabs() {
      return (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            width: 250,
            flexDirection: "column",
          }}
          role="presentation"
        >
          {/* // heading */}
          <Grid container sx={{ p: 2.5, mb: 3 }}>
            <Grid item xs={12} sx={{ maxHeight: "1px" }}>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Woodsala
              </Typography>
            </Grid>
          </Grid>

          {/* // all routes  */}
          <Divider />
          <Grid container sx={{ p: 1 }}>
            <Grid item xs={12} sx={{ maxHeight: "1px" }}>
              <List
                dense={true}
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-label="mailbox folders"
              >
                <ListItem
                  onClick={() => {
                    handleClose("/dashboard");
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <GridViewIcon
                        color={
                          window.location.pathname === "/dashboard"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Dashboard" />
                </ListItem>

                <ListItem
                  onClick={(e) => {
                    setType({ ...type, product: !type.product });
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <ShoppingBagOutlinedIcon
                        color={
                          window.location.pathname === "/merge" ||
                            window.location.pathname === "/products"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Product" />
                  {type.product ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                {/* // product nested menu */}
                <Collapse in={type.product} timeout="auto" unmountOnExit>
                  <List dense={true} component="div" disablePadding>
                    <ListItem
                      sx={{ pl: 4 }}
                      onClick={() => {
                        handleClose("/products");
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "30px",
                            height: "30px",
                            svg: {
                              fontSize: "1rem",
                            },
                          }}
                        >
                          <ShoppingBagOutlinedIcon
                            color={
                              window.location.pathname === "/products"
                                ? "primary"
                                : ""
                            }
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Product" />
                    </ListItem>
                    <ListItem
                      sx={{ pl: 4 }}
                      onClick={() => {
                        handleClose("/merge");
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "30px",
                            height: "30px",
                            svg: {
                              fontSize: "1rem",
                            },
                          }}
                        >
                          <MergeIcon
                            color={
                              window.location.pathname === "/merge"
                                ? "primary"
                                : ""
                            }
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Merge Product" />
                    </ListItem>

                    {/* <ListItem sx={{ pl: 4 }} onClick={() => { handleClose('/variation'); }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: '30px',
                            height: '30px',
                            svg: {
                              fontSize: '1rem'
                            }
                          }}>
                          <AccountTreeIcon color={window.location.pathname === '/variation' ? 'primary' : ''} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Variation" />
                    </ListItem > */}
                  </List>
                </Collapse>

                <ListItem
                  onClick={() => {
                    handleClose("/hardware");
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <HardwareIcon
                        color={
                          window.location.pathname === "/hardware"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Hardware" />
                </ListItem>

                <ListItem
                  onClick={() => {
                    handleClose("/review");
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <ReviewsIcon
                        color={
                          window.location.pathname === "/review"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Review" />
                </ListItem>

                <ListItem
                  onClick={() => {
                    handleClose("/action");
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <DraftsIcon
                        color={
                          window.location.pathname === "/action"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Action Center" />
                </ListItem>

                <ListItem
                  onClick={(e) => {
                    setType({ ...type, order: !type.order });
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <InboxIcon
                        color={
                          window.location.pathname === "/order" ? "primary" : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Order" />
                  {type.order ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                {/* // order nested menu */}
                <Collapse in={type.order} timeout="auto" unmountOnExit>
                  <List dense={true} component="div" disablePadding>
                    <ListItem
                      sx={{ pl: 4 }}
                      onClick={() => {
                        handleClose("/abandoned_orders");
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "30px",
                            height: "30px",
                            svg: {
                              fontSize: "1rem",
                            },
                          }}
                        >
                          <PendingIcon
                            color={
                              window.location.pathname === "/abandoned_orders"
                                ? "primary"
                                : ""
                            }
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Abandoned Orders" />
                    </ListItem>
                    <ListItem
                      sx={{ pl: 4 }}
                      onClick={() => {
                        handleClose("/create_order");
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "30px",
                            height: "30px",
                            svg: {
                              fontSize: "1rem",
                            },
                          }}
                        >
                          <AddIcon
                            color={
                              window.location.pathname === "/create_order"
                                ? "primary"
                                : ""
                            }
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Create Order" />
                    </ListItem>
                    <ListItem
                      sx={{ pl: 4 }}
                      onClick={() => {
                        handleClose("/order");
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "30px",
                            height: "30px",
                            svg: {
                              fontSize: "1rem",
                            },
                          }}
                        >
                          <ShoppingBagOutlinedIcon
                            color={
                              window.location.pathname === "/order"
                                ? "primary"
                                : ""
                            }
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Orders" />
                    </ListItem>
                  </List>
                </Collapse>

                <ListItem
                  onClick={() => {
                    handleClose("/wishlist");
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1rem",
                        },
                      }}
                    >
                      <PlaylistAddCheckCircleIcon
                        color={
                          window.location.pathname === "/wishlist"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Wishlist" />
                </ListItem>

                <ListItem
                  onClick={() => {
                    handleClose("/customer");
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <PeopleAltOutlinedIcon
                        color={
                          window.location.pathname === "/customer"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Customer" />
                </ListItem>

                <ListItem
                  onClick={() => {
                    handleClose("/reward");
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <EmojiEventsIcon
                        color={
                          window.location.pathname === "/reward"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Reward" />
                </ListItem>

                <ListItem
                  onClick={() => {
                    handleClose("/blog");
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <ArticleIcon
                        color={
                          window.location.pathname === "/dashboard"
                            ? "blog"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Blog" />
                </ListItem>

                <ListItem
                  onClick={() => {
                    handleClose("/banner");
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <ViewCarouselIcon
                        color={
                          window.location.pathname === "/banner"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Banner" />
                </ListItem>

                <ListItem
                  onClick={() => {
                    handleClose("/inventory");
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <InventoryIcon
                        color={
                          window.location.pathname === "/inventory"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Inventory" />
                </ListItem>

                {/* <ListItem
                  onClick={(e) => {
                    setType({ ...type, admin: !type.admin });
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <AdminPanelSettingsIcon
                        color={
                          window.location.pathname === "/admin" ||
                          window.location.pathname === "/security" ||
                          window.location.pathname === "/suppliers" ||
                          window.location.pathname === "/settings"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Admin" />
                  {type.admin ? <ExpandLess /> : <ExpandMore />}
                </ListItem> */}
                {/* // admin nested menu */}
                {/* <Collapse in={type.admin} timeout="auto" unmountOnExit>
                  <List dense={true} component="div" disablePadding>
                    // this code shifted to the setting tab 
                    <ListItem
                      sx={{ pl: 4 }}
                      onClick={() => {
                        handleClose("/pincode");
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "30px",
                            height: "30px",
                            svg: {
                              fontSize: "1rem",
                            },
                          }}
                        >
                          <LocalShippingIcon
                            color={
                              window.location.pathname === "/pincode"
                                ? "primary"
                                : ""
                            }
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Pin Code" />
                    </ListItem>

                    <ListItem
                      sx={{ pl: 4 }}
                      onClick={() => {
                        handleClose("/security");
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "30px",
                            height: "30px",
                            svg: {
                              fontSize: "1rem",
                            },
                          }}
                        >
                          <SecurityIcon
                            color={
                              window.location.pathname === "/security"
                                ? "primary"
                                : ""
                            }
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Security" />
                    </ListItem>

                    <ListItem
                      sx={{ pl: 4 }}
                      onClick={() => {
                        handleClose("/suppliers");
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "30px",
                            height: "30px",
                            svg: {
                              fontSize: "1rem",
                            },
                          }}
                        >
                          <AssignmentIndIcon
                            color={
                              window.location.pathname === "/suppliers"
                                ? "primary"
                                : ""
                            }
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Suppliers" />
                    </ListItem>
                    
                    <ListItem
                      sx={{ pl: 4 }}
                      onClick={() => {
                        handleClose("/settings");
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "30px",
                            height: "30px",
                            svg: {
                              fontSize: "1rem",
                            },
                          }}
                        >
                          <SettingsOutlinedIcon
                            color={
                              window.location.pathname === "/settings"
                                ? "primary"
                                : ""
                            }
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Settings" />
                    </ListItem>
                  </List>
                </Collapse> */}

                <ListItem
                  onClick={() => {
                    handleClose("/settings");
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <SettingsOutlinedIcon
                        color={
                          window.location.pathname === "/settings"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Settings" />
                </ListItem>

                <ListItem
                  onClick={() => {
                    handleClose("/profile");
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: "30px",
                        height: "30px",
                        svg: {
                          fontSize: "1.1rem",
                        },
                      }}
                    >
                      <AdminPanelSettingsIcon
                        color={
                          window.location.pathname === "/profile"
                            ? "primary"
                            : ""
                        }
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Profile" />
                </ListItem>

                {/* // logout  */}
                <Divider sx={{ margin: "auto", mt: 2 }} />
                <ListItem onClick={handleLogout}>
                  <Button
                    color="primary"
                    size="small"
                    sx={{ margin: "auto", mt: 2 }}
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
    }

    return (
      <div>
        <Drawer anchor={"left"} open={tab.open} onClose={handleClose}>
          {ListTabs()}
        </Drawer>
      </div>
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
        <MenuItem sx={{ padding: 0.5 }} onClick={handleLogout}>
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
    setAnchor(null);
    handleClose();
    dispatch(
      setAuth({
        isAuth: false,
        WDToken: null,
        role: null,
      })
    );
    dispatch(
      setAlert({
        open: true,
        variant: "success",
        message: "Logging Out !!!",
      })
    );
    return history("/");
  };

  // capitalize the first letter in word
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  }

  return (
    <Box
      sx={{
        mb: 3,
        display: window.location.pathname === "/" ? "none" : "block",
      }}
    >
      {/* refresh modal  */}
      <RefreshToken />
      {/* refresh modal  */}
      {/* Top Bar  */}
      <title>{titleCase(window.location.pathname.split("/")[1])}</title>
      <Grid
        container
        p={1}
        spacing={2}
        className={mode.type === true ? "darkNav" : "topNav"}
        sx={{ boxShadow: 1 }}
      >
        <Grid item xs={4} sx={{ display: "flex" }}>
          {tab.open === false ? (
            <IconButton
              className="hamIcon"
              onClick={() => {
                dispatch(
                  setTab({
                    open: true,
                  })
                );
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
                dispatch(
                  setTab({
                    open: false,
                  })
                );
              }}
              size="small"
              color="primary"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Grid>

        <Grid item xs={4} className="logo">
          <img src={logo} alt="logo" />
        </Grid>

        <Grid item sx={{ display: "flex", justifyContent: "end" }} xs={4}>
          {mode.type === true ? (
            <IconButton
              onClick={() => {
                dispatch(
                  setMode({
                    type: false,
                  })
                );
              }}
              size="small"
              color="primary"
            >
              <WbSunnyIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                dispatch(
                  setMode({
                    type: true,
                  })
                );
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
      {/* {VerticalTabs()} */}
      <SwipeableTemporaryDrawer />
      {/* Sidenav Ends  */}
    </Box>
  );
};

export default Home;
