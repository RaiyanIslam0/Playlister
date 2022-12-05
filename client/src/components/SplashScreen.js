import { Button, createTheme, Grid, Stack, ThemeProvider } from "@mui/material";
 import { Box } from "@mui/system";
 import { useContext } from "react";
 import { Link, useHistory } from "react-router-dom";
 import GlobalStoreContext from "../store";
 export default function SplashScreen() {
   const { store } = useContext(GlobalStoreContext);
   const history = useHistory();

   function handleRegister() {
     history.push("/register/");
   }

   function handleLogIn() {
     history.push("/login/");
   }

   function handleGuest() {
     history.push("/");
   }

   return (
     <div id="splash-screen">
       <img
         id="playlister-icon-img"
         src="https://piazza.com/redirect/s3?bucket=uploads&prefix=paste%2Fk0ejaa6849h7ke%2F22c8d90eaf4003c2c24ca0fad72a1df99841f1b617601341110fbb45df72547a%2FScreen_Shot_2022-11-08_at_5.00.49_PM-removebg-preview.png"
       />

       <p class="bigText">
         <b>Welcome</b>
       </p>
       <p class="eText">
         <b>Millions of Songs</b>
       </p>
       <p class="eText">
         <b>Free on Playlister</b>
       </p>

       <p class="playlistText">We play the music, you enjoy it</p>
       <p class="playlistText">
         The site will allow users to create, edit, and play playlists as well
         as share playlists so that others may then play and comment on them.
       </p>

       <div class="loginbutton">
         <Button
           id="extra1"
           variant="contained"
           color="secondary"
           onClick={handleRegister}
         >
           Create Account
         </Button>
         <Button
           path="/login/"
           id="extra2"
           variant="outlined"
           color="secondary"
           onClick={handleLogIn}
         >
           Login
         </Button>
         <Button
           id="extra3"
           variant="contained"
           sx={{
             color: "grey",
             backgroundColor: "lightgrey",
             borderColor: "deepgrey",
           }}
           onClick={handleGuest}
         >
           Continue as Guest
         </Button>
       </div>
       <p id="creditText">By Raiyan Islam for CSE 316</p>
     </div>
   );
 }