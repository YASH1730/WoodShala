import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";

import "../../assets/custom/css/footer.css";

// social icons
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
// import WhatsappRoundedIcon from "@mui/icons-material/WhatsappRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
export default function Footer() {
  return (
    <>
      {/* Footer  */}
      <Grid container className="footerContainer">
        {/* Top */}
        <Grid className="lableContainer" item xs={12}>
          <Grid container>
            {/* LINK */}
            {/* <Grid item xs={3} className="link">
              <Stack>
                <Typography component={'span'} variant="Button">Links</Typography>
               
                <Typography component={'span'} sx = {{lineHeight: '1.66'}} variant="overline"> <Link href="#" underline="hover">
                  Home
                </Link></Typography>
                
                <Typography component={'span'} sx = {{lineHeight: '1.66'}} variant="overline"> <Link href="#" underline="hover">
                  Home
                </Link></Typography>
                
                <Typography component={'span'} sx = {{lineHeight: '1.66'}} variant="overline"> <Link href="#" underline="hover">
                  Home
                </Link></Typography>
                

              </Stack>
            </Grid>
           */}
              {/* SOCIAL lINK */}
              <Grid item xs={6} className="socialLinks">
              
            </Grid>

            {/* ADDRESS  */}
            {/* <Grid xs={3} item className="address">
              <Typography component={'span'}  variant="Button">Address</Typography> */}
{/* <br></br> */}
                {/* <Typography component={'span'} variant = 'caption' >
                Plot no. 25 Hasti colony, Jhalamand, Jodhpur, Rajasthan 342001
                </Typography>
            </Grid> */}


                {/* SOCIAL lINK */}
                <Grid item xs={12} className="socialLinks">
              <Typography component={'span'} variant="Button">Let's Connect</Typography>
                <div>
                <IconButton aria-label="delete">
                  <FacebookRoundedIcon />
                </IconButton>

                <IconButton aria-label="delete">
                  {/* <WhatsappRoundedIcon /> */}
                </IconButton>

                <IconButton aria-label="delete">
                  <TwitterIcon />
                </IconButton>

                <IconButton aria-label="delete">
                  <AlternateEmailIcon />
                </IconButton>
                </div>
            </Grid>

          </Grid>
        </Grid>

        {/* Bottom */}
        <Grid className="bottomBox" item xs={12}>
          <Typography component={'span'} color="white" variant="button">
            WoodShala&#169;2022{" "}
          </Typography>
        </Grid>
      </Grid>
      {/* End Footer  */}
    </>
  );
}
