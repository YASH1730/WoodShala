import "./App.css";
import EntryPoints from "./components/EntryPoints";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Blog from "./components/Blog";
import BlogContent from "./components/BlogContent";
import SideForm from "./components/dashboard/SideForm";
import SnackBar from "./components/SnackBar";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Buffer } from 'buffer';
import {Store} from './store/Context';
import PersistData from './components/Utility/PersistData'
import { ConfirmProvider } from "material-ui-confirm";
// inner components
import Dashboard from "./components/dashboard/Dashboard";
import Products from "./components/dashboard/Products";
import Customers from "./components/dashboard/Customers";
import Orders from "./components/dashboard/Orders";
import CreateOrder from "./components/dashboard/CreateOrder";
import Coupons from "./components/dashboard/Coupons";
import OurStaff from "./components/dashboard/OurStaff";
import Setting from "./components/dashboard/Setting";
import Banner from "./components/dashboard/Banner";
import Draft from "./components/dashboard/Draft";
import Accessories from "./components/Accessories";
// import Gallery from "./components/dashboard/Gallery";
import Hardware from "./components/dashboard/Hardware";
import StockChannel from "./components/dashboard/StockChannel";
import BlogModule from "./components/dashboard/Blog";
import Merge from "./components/dashboard/Merge"
import ProductDetails from "./components/Utility/ProductDetails"

global.Buffer = Buffer;


function MyRoutes(){
  const history  = useNavigate();

  return(
    <>
    <Home history = {history}/>
    <Routes>
    <Route exact path="/dashboard" element={<Dashboard history = {history} />} />
    <Route exact path="/products" element={<Products history = {history} />} />
    <Route exact path="/customer" element={<Customers history = {history} />} />
    <Route exact path="/order" element={<Orders history = {history} />} />
    <Route exact path="/create_order" element={<CreateOrder history = {history} />} />
    <Route exact path="/user" element={<OurStaff history = {history} />} />
    <Route exact path="/reward" element={<Coupons history = {history} />} />
    <Route exact path="/admin" element={<Setting history = {history} />} />
    <Route exact path="/banner" element={<Banner history = {history} />} />
    <Route exact path="/draft" element={<Draft history = {history} />} />
    <Route exact path="/inventory" element={<StockChannel history = {history} />} />
    <Route exact path="/accessories" element={<Accessories history = {history} />} />
    <Route exact path="/hardware" element={<Hardware history = {history} />} />
    <Route exact path="/productDetails" element={<ProductDetails history = {history} />} />
    {/* <Route exact path="/gallery" element={<Gallery history = {history} />} /> */}
    <Route exact path="/blogs" element={<BlogModule history = {history} />} />
    <Route exact path="/blog" element={<Blog />} />
    <Route exact path="/blogContent" element={<BlogContent />} />
    <Route exact path="/merge" element={<Merge />} />
    <Route exact path="/" element={<EntryPoints history = {history} />} />
  </Routes>
  </>
  )
}

function App() {

  // store 
  const {state} = Store();


  const light = createTheme({
    palette: {
      primary: {
        main: "#91441f",
      },
      secondary : {
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
      <ThemeProvider theme={state.DarkMode.mode === true ? dark : light}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
        <ConfirmProvider  >
                <PersistData/>
                <MyRoutes></MyRoutes>
                  <SideForm />
                  <SnackBar />
                </ConfirmProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

