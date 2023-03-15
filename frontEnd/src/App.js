import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Buffer } from "buffer";
import { ConfirmProvider } from "material-ui-confirm";
import { setRefreshBox } from "../src/store/action/action";
// state store
import { useDispatch, useSelector } from "react-redux";
// json decode
import decode from "jwt-decode";
import ImageSquence from "./components/Utility/ImageSquence";
import PreviewOrder from "./components/dashboard/order/PreviewOrder";

// component
const EntryPoints = lazy(() => import("./components/EntryPoints"));
const Home = lazy(() => import("./components/Home"));
// const Blog = lazy(() => import("./components/Blog")) // these bog pages is shifted to the woodshala.in
// const BlogContent = lazy(() => import("./components/BlogContent"))
const SideForm = lazy(() => import("./components/dashboard/form/SideForm"));
const SnackBar = lazy(() => import("./components/Utility/SnackBar"));
const NotFound = lazy(() => import("./components/Utility/NotFound"));
// inner components
const Inventory = lazy(() =>
  import("./components/dashboard/inventory/Inventory")
);
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const Products = lazy(() => import("./components/dashboard/product/Products"));
const Customers = lazy(() => import("./components/dashboard/other/Customers"));
const Orders = lazy(() => import("./components/dashboard/order/Orders"));
const AbandonedOrders = lazy(() =>
  import("./components/dashboard/order/AbandonedOrders")
);
const Wishlist = lazy(() => import("./components/dashboard/order/Wishlist"));
const CreateOrder = lazy(() =>
  import("./components/dashboard/order/CreateOrder")
);
const Coupons = lazy(() => import("./components/dashboard/other/Coupons"));
const Profile = lazy(() => import("./components/dashboard/admin/Setting"));
const Banner = lazy(() => import("./components/dashboard/banner/Banner"));
const Action = lazy(() => import("./components/dashboard/inventory/Action"));
const Accessories = lazy(() => import("./components/Accessories"));
const Hardware = lazy(() => import("./components/dashboard/hardware/Hardware"));
const BlogModule = lazy(() => import("./components/dashboard/blog/Blog"));
const Merge = lazy(() => import("./components/dashboard/product/Merge"));
const Review = lazy(() => import("./components/dashboard/review/Review"));
const ProductDetails = lazy(() =>
  import("./components/Utility/ProductDetails")
);
const Variation = lazy(() =>
  import("./components/dashboard/product/Variation")
);
// const Suppliers = lazy(() => import("./components/dashboard/admin/Suppliers"));
// const Security = lazy(() => import("./components/dashboard/admin/Security"));
// const Pincode = lazy(() => import("./components/dashboard/admin/Pincode"));

global.Buffer = Buffer;

function MyRoutes() {
  const history = useNavigate();

  // store
  const { auth, form, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const permission = auth.access || [] 
  useEffect(() => {
    // for check the expire time for the JWT
    if (auth.isAuth === true) {
      const time = Date.now();
      const { exp } = decode(auth.token);
      // refresh the token from 1 minute prior
      if (exp * 1000 - 60000 <= time) {
        dispatch(
          setRefreshBox({
            state: true,
          })
        );
      }
    }
    else {
      localStorage.clear()
    }
  }, [location, form.state, alert.open]);

  return (
    <>
      {/* // main screen route */}
      <Home history={history} />

      <Routes>
        {/* All routes are in alphabetical order */}
        <Route exact path="/" element={<EntryPoints history={history} />} />
        {permission.includes("Profile") &&
        <Route exact path="/profile" element={<Profile history={history} />} />}
       {permission.includes("Settings") &&
        <Route
          exact
          path="/settings"
          element={<Accessories history={history} />}
        />}

        {permission.includes("Blog") && <Route exact path="/blog" element={<BlogModule history={history} />} />}
        {/* <Route exact path="/blog" element={<Blog />} /> */}
        {/* <Route exact path="/blogContent" element={<BlogContent />} /> */}
        {permission.includes("Banner") &&<Route exact path="/banner" element={<Banner history={history} />} />}
     {permission.includes("Customer") &&   <Route
          exact
          path="/customer"
          element={<Customers history={history} />}
        />}
       {permission.includes("Order") && <Route
          exact
          path="/create_order"
          element={<CreateOrder history={history} />}
        />}
        <Route
          exact
          path="/dashboard"
          element={<Dashboard history={history} />}
        />
       { permission.includes("Action Center")  &&<Route exact path="/action" element={<Action history={history} />} />}
        {/* <Route
          exact
          path="/suppliers"
          element={<Suppliers history={history} />}
        /> */}
      {permission.includes("Hardware") &&   <Route
          exact
          path="/hardware"
          element={<Hardware history={history} />}
        />}
       {permission.includes("Inventory") &&  <Route
          exact
          path="/inventory"
          element={<Inventory history={history} />}
        />}
       {permission.includes("Product") &&  <Route exact path="/merge" element={<Merge history={history} />} />}
        {permission.includes("Order") && <Route exact path="/order" element={<Orders history={history} />} />}
        {permission.includes("Order") &&  <Route
          exact
          path="/abandoned_orders"
          element={<AbandonedOrders history={history} />}
        />}
        {permission.includes("Order") && <Route
          exact
          path="/preview_order/:_id"
          element={<PreviewOrder history={history} />}
        />}
        {permission.includes("Wishlist") && 
        <Route
          exact
          path="/wishlist"
          element={<Wishlist history={history} />}
        />}
        {permission.includes("Product") && <Route
          exact
          path="/products"
          element={<Products history={history} />}
        />}
        {permission.includes("Product") && <Route
          exact
          path="/productDetails/:SKU"
          element={<ProductDetails history={history} />}
        />}
       {permission.includes("Reward") &&  <Route exact path="/reward" element={<Coupons history={history} />} />}
        {/* <Route
          exact
          path="/security"
          element={<Security history={history} />}
        />
        <Route exact path="/pincode" element={<Pincode history={history} />} /> */}
       {permission.includes("Product") &&  <Route
          exact
          path="/variation"
          element={<Variation history={history} />}
        />}
        {permission.includes("Review") && <Route exact path="/review" element={<Review history={history} />} />}{" "}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

function App() {
  // store
  const { mode } = useSelector((state) => state);

  const light = createTheme({
    palette: {
      primary: {
        main: "#682D2D",
      },
      secondary: {
        main: "#ef3c3c",
      },
    },
    typography: {
      fontFamily: "Work+Sans",
      fontWeightLight: 100,
      fontWeightRegular: 300,
      fontWeightMedium: 300,
      fontWeightBold: 400,
    },
  });

  const dark = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <ThemeProvider theme={mode.type === true ? dark : light}>
        <CssBaseline enableColorScheme />
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <ConfirmProvider>
              <MyRoutes />
              <SideForm />
              <SnackBar />
            </ConfirmProvider>
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
