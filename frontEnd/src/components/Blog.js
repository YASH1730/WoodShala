import React, {useEffect,useState} from "react";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button
} from "@mui/material";

import Aos from 'aos';
import 'aos/dist/aos.css'
import Footer from './Footer'
import {getBlogHome} from '../services/service'

//css
import "../assets/custom/css/blog.css";

// images
import banner from "../assets/img/Blog/blog_banner.jpg";


export default function Blog() {

  const [cardData,setCardData] = useState([]);

    useEffect(()=>{
      Aos.init({duration : 1000})

      getBlogHome().then((data) =>{
        setCardData(data.data)

      })


    },[])

  // function for rendring the cards


  function cardGenrator(card) {
    return (
    <Grid item data-aos = 'fade-up' sx = {12} md = {3} >
      <Card sx={{ maxWidth: 345 }} onClick = {()=> { localStorage.setItem('uuid',card.uuid); window.location = '/blogContent'}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height = '200'
            className = 'cardMedia'
            image= {card.card_image}
            alt={card.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.card_description}
              </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Read More
          </Button>
        </CardActions>
      </Card>
      </Grid>
    );
  }

  return (
    <>
      {/* Title  */}
      <title>Blog</title>

      {/* Top container  */}
      <Grid container className="banner">
        <Grid item xs={12} className="bannerText">
          <Typography variant="h4">Blog</Typography>
          <Typography align="left" variant="h6">
            
            WoodShala
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              backgroundPosition: "center",
              background: `linear-gradient(rgb(243 243 243 / 15%), rgb(80 39 0 / 66%)) 0% 0% / 100% 100%, url(${banner})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
            className="Blog-banner"
          />
        </Grid>
      </Grid>
      {/* Ends Top container  */}

  

      {/* Card Section */}

      <Grid container className = 'cardContainer' spacing = {8}>
      
      {
          cardData.map((card)=>{
            return  cardGenrator(card)
        })
      }
      </Grid>

      {/* Ends Card Section */}

      
      {/* Footer */}

      <Footer/>

      {/* Footer Ends*/}

      
    </>
  );
}
