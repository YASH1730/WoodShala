import "./App.css";
import { useState } from "react";
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


global.Buffer = Buffer;


function MyRoutes(){
  const history  = useNavigate();

  return(
    <>
    <Routes>
    <Route path="/adminpanel" element={<Home history = {history} />} />
    <Route exact path="/adminpanel?module=" element={<Home history = {history} />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blogcontent" element={<BlogContent />} />
    <Route path="/" element={<EntryPoints history = {history} />} />
    {/* <Route path="/register" element={<EntryPoints />} /> */}
  </Routes>
  </>
  )
}

function App() {

  // store 
  const {state} = Store();

  //state for the mode pot dark
  const [mode, setMode] = useState(false);

  // for alert state 
  const [Note, setNote] = useState({
    open: null,
    variant: null,
    massage: null
  })

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

  // states for the open the side form
  const [open, setOpen] = useState({
    state: false,
    formType: null,
    payload : null
  });

  return (
    <>
      <ThemeProvider theme={state.DarkMode.mode === true ? dark : light}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
                <PersistData/>
                <MyRoutes></MyRoutes>
                  <SideForm />
                  <SnackBar />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

