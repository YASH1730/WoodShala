import "./App.css";
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Buffer } from 'buffer';
import { ConfirmProvider } from "material-ui-confirm";

// state store
import { useSelector } from 'react-redux'

// component 
const EntryPoints = lazy(() => import("./components/EntryPoints"))
const Home = lazy(() => import("./components/Home"))
const Blog = lazy(() => import("./components/Blog"))
const BlogContent = lazy(() => import("./components/BlogContent"))
const SideForm = lazy(() => import("./components/dashboard/SideForm"))
const SnackBar = lazy(() => import("./components/SnackBar"))
const NotFound = lazy(() => import("./components/Utility/NotFound"))
// inner components

const Inventory = lazy(() => import('./components/dashboard/Inventory'));

const Dashboard = lazy(() => import('./components/dashboard/Dashboard'))
const Products = lazy(() => import('./components/dashboard/Products'))
const Customers = lazy(() => import('./components/dashboard/Customers'))
const Orders = lazy(() => import('./components/dashboard/Orders'))
const CreateOrder = lazy(() => import('./components/dashboard/CreateOrder'))
const Coupons = lazy(() => import('./components/dashboard/Coupons'))
const OurStaff = lazy(() => import('./components/dashboard/OurStaff'))
const Setting = lazy(() => import('./components/dashboard/Setting'))
const Banner = lazy(() => import('./components/dashboard/Banner'))
const Action = lazy(() => import('./components/dashboard/Action'))
const Accessories = lazy(() => import('./components/Accessories'))
const Hardware = lazy(() => import('./components/dashboard/Hardware'))
const BlogModule = lazy(() => import('./components/dashboard/Blog'))
const Merge = lazy(() => import('./components/dashboard/Merge'))
const ProductDetails = lazy(() => import('./components/Utility/ProductDetails'))
const Variation = lazy(() => import('./components/dashboard/Variation'))
const Suppliers = lazy(() => import('./components/dashboard/Suppliers'))


global.Buffer = Buffer;


function MyRoutes() {
  const history = useNavigate();

  return (
    <>
      {/* // main screen route */}
      <Home history={history} />

      <Routes>
        {/* All routes are in alphabetical order */}
        <Route exact path="/" element={<EntryPoints history={history} />} />
        <Route exact path="/settings" element={<Setting history={history} />} />
        <Route exact path="/accessories" element={<Accessories history={history} />} />
        <Route exact path="/blogs" element={<BlogModule history={history} />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/blogContent" element={<BlogContent />} />
        <Route exact path="/banner" element={<Banner history={history} />} />
        <Route exact path="/customer" element={<Customers history={history} />} />
        <Route exact path="/create_order" element={<CreateOrder history={history} />} />
        <Route exact path="/dashboard" element={<Dashboard history={history} />} />
        <Route exact path="/action" element={<Action history={history} />} />
        <Route exact path="/suppliers" element={<Suppliers history={history} />} />
        <Route exact path="/hardware" element={<Hardware history={history} />} />
        <Route exact path="/inventory" element={<Inventory history={history} />} />
        <Route exact path="/merge" element={<Merge history={history} />} />
        <Route exact path="/order" element={<Orders history={history} />} />
        <Route exact path="/products" element={<Products history={history} />} />
        <Route exact path="/productDetails" element={<ProductDetails history={history} />} />
        <Route exact path="/reward" element={<Coupons history={history} />} />
        <Route exact path="/user" element={<OurStaff history={history} />} />
        <Route exact path="/variation" element={<Variation history={history} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

function App() {

  // store 
  const { mode } = useSelector(state => state);


  const light = createTheme({
    palette: {
      primary: {
        main: "#91441f",
      },
      secondary: {
        main: '#ef3c3c'
      }
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

