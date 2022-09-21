import "./App.css";
import EntryPoints from "./components/EntryPoints";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import { Auth, OpenBox, Mode, Notify } from "./context/context";
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
import Coupons from "./components/dashboard/Coupons";
import OurStaff from "./components/dashboard/OurStaff";
import Setting from "./components/dashboard/Setting";
import Banner from "./components/dashboard/Banner";
import Draft from "./components/dashboard/Draft";
import Admin from "./components/Admin";
import Gallery from "./components/dashboard/Gallery";
import StockChannel from "./components/dashboard/StockChannel";
import BlogModule from "./components/dashboard/Blog";


global.Buffer = Buffer;


function MyRoutes(){
  const history  = useNavigate();

  return(
    <>
    <Home history = {history}/>
    <Routes>
    <Route exact path="/" element={<Dashboard history = {history} />} />
    <Route exact path="/dashboard" element={<Dashboard history = {history} />} />
    <Route exact path="/products" element={<Products history = {history} />} />
    <Route exact path="/customer" element={<Customers history = {history} />} />
    <Route exact path="/order" element={<Orders history = {history} />} />
    <Route exact path="/ourStaff" element={<OurStaff history = {history} />} />
    <Route exact path="/coupons" element={<Coupons history = {history} />} />
    <Route exact path="/profile" element={<Setting history = {history} />} />
    <Route exact path="/banner" element={<Banner history = {history} />} />
    <Route exact path="/draft" element={<Draft history = {history} />} />
    <Route exact path="/stock" element={<StockChannel history = {history} />} />
    <Route exact path="/admin" element={<Admin history = {history} />} />
    <Route exact path="/gallery" element={<Gallery history = {history} />} />
    <Route exact path="/blogModule" element={<BlogModule history = {history} />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blogContent" element={<BlogContent />} />
    <Route path="/" element={<EntryPoints history = {history} />} />
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

