import React from 'react';
// import "./styles/App.css";
import Container from "@material-ui/core/Container";
import  Typography  from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import user from '../images/Avatar.png';
import oxygen from '../images/Blood-Oxygen.png';
import heart from '../images/Heart-rate.png';
import ecg from '../images/ECG.png';
import pressure from '../images/Blood-Pressure.png';
import weight from '../images/Weight.png';
import medication from '../images/Medication.png';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';

const useStyles = makeStyles((theme) => ({
    // Sixteen
    root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    // sixteen end

    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));
  

function Cards() {
    const classes = useStyles();

    return (
        <Container>
              {/* <h4 style={{fontSize:"15px", marginLeft:"60px"}}><b>PATIENT DETAILS</b></h4>
            <Grid container spacing={3} style={{margin:"20px"}}>
               <Grid item lg={4} >
                 <Paper>
                   <Box p={3}><b> */}
                     {/* <Typography variant="h4">Read Docs</Typography> */}
                     {/* <ButtonBase className={classes.image}> */}
                        {/* <img className={classes.img} alt="c" src={user} height="60px" width="60px" />  */}
                      {/* <div className={classes.root}>
                        <Avatar alt="Heart" src={user} style={{height:"60px", width:"60px"}} /> <span style={{marginTop:"30px", fontSize:"12px"}}><b> MARRY SMITH</b></span>
                      </div> */}
                     {/* </ButtonBase> */}
                     {/* <div className={classes.root}>
                        <Avatar alt="Heart" src={heart} style={{height:"20px", width:"20px"}} /> <span style={{marginTop:"10px"}}> HEART RATE </span>
                        <Avatar alt="Oxygen" src={oxygen} style={{height:"20px", width:"20px", marginLeft:"2px"}} /> <span style={{marginTop:"10px"}}>BLOOD OXYGEN </span>
                    </div> */}
                   {/* Button of all information */}
                   {/* <div className={classes.root}>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>106</button>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>96</button>
                    </div> */}
                    {/* End Button all information */}
                              
                    {/* <div className={classes.root}>
                        <Avatar alt="Ecg" src={ecg} style={{height:"20px", width:"20px"}} /> <span style={{marginTop:"10px"}}> ECG</span>
                        <Avatar alt="Pressure" src={pressure} style={{height:"20px", width:"20px" , marginLeft:"30px"}} /><span style={{marginTop:"10px"}}> BLOOD PRESSURE </span>
                    </div> */}
                   {/* Button of all information */}
                   {/* <div className={classes.root}>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#FFF962", color:"black", border:"none", fontSize:"9px",marginTop:"-2px"}}>Irregular</button>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#F63D3D", color:"black", border:"none", fontSize:"9px",marginTop:"-2px"}}>155/98</button>
                    </div> */}
                    {/* End Button all information */}
                              
                    {/* <div className={classes.root}>
                        <Avatar alt="Weight" src={weight} style={{height:"20px", width:"20px"}} /> <span style={{marginTop:"10px"}}> WEIGHT </span>
                        <Avatar alt="Medication" src={medication} style={{height:"20px", width:"20px", marginLeft:"20px"}} /><span style={{marginTop:"10px"}}> MEDICATION </span>
                    </div> */}
                   {/* Button of all information */}
                   {/* <div className={classes.root}>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>200</button>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>*</button>
                    </div>
                     */}
                    {/* End Button all information */}
                              
                     {/* <Button>View More</Button> */}
                     {/* </b>
                     </Box>
                 </Paper>
               </Grid>
               <Grid item lg={4}>
                 <Paper>
                   <Box p={3}>
                       <b> */}
                     {/* <Typography variant="h4">Read Docs</Typography> */}
                     {/* <ButtonBase className={classes.image}> */}
                        {/* <img className={classes.img} alt="c" src={user} height="60px" width="60px" />  */}
                      {/* <div className={classes.root}>
                        <Avatar alt="Heart" src={user} style={{height:"60px", width:"60px"}} /> <span style={{marginTop:"30px", fontSize:"12px"}}><b> JOHN JONES</b></span>
                      </div> */}
                     {/* </ButtonBase> */}
                     {/* <div className={classes.root}>
                        <Avatar alt="Heart" src={heart} style={{height:"20px", width:"20px"}} /> <span style={{marginTop:"10px"}}> HEART RATE </span>
                        <Avatar alt="Oxygen" src={oxygen} style={{height:"20px", width:"20px", marginLeft:"2px"}} /> <span style={{marginTop:"10px"}}>BLOOD OXYGEN </span>
                    </div> */}
                   {/* Button of all information */}
                   {/* <div className={classes.root}>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>87</button>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>94</button>
                    </div> */}
                    {/* End Button all information */}
                              
                    {/* <div className={classes.root}>
                        <Avatar alt="Ecg" src={ecg} style={{height:"20px", width:"20px"}} /> <span style={{marginTop:"10px"}}> ECG</span>
                        <Avatar alt="Pressure" src={pressure} style={{height:"20px", width:"20px" , marginLeft:"30px"}} /><span style={{marginTop:"10px"}}> BLOOD PRESSURE </span>
                    </div>
                     */}
                   {/* Button of all information */}
                   {/* <div className={classes.root}>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>Normal</button>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>130/95</button>
                    </div> */}
                    {/* End Button all information */}
                              
                    {/* <div className={classes.root}>
                        <Avatar alt="Weight" src={weight} style={{height:"20px", width:"20px"}} /> <span style={{marginTop:"10px"}}>  WEIGHT </span>
                        <Avatar alt="Medication" src={medication} style={{height:"20px", width:"20px", marginLeft:"20px"}} /><span style={{marginTop:"10px"}}> MEDICATION </span>
                    </div> */}
                   {/* Button of all information */}
                   {/* <div className={classes.root}>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>220</button>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>---</button>
                    </div>
                     </b>
                     </Box>
                 </Paper>
               </Grid> */}
               {/* <Grid item lg={4}>
                 <Paper>
                   <Box p={3}>
                       <b> */}
                     {/* <Typography variant="h4">Read Docs</Typography> */}
                     {/* <ButtonBase className={classes.image}> */}
                        {/* <img className={classes.img} alt="c" src={user} height="60px" width="60px" />  */}
                      {/* <div className={classes.root}>
                        <Avatar alt="Heart" src={user} style={{height:"60px", width:"60px"}} /> <span style={{marginTop:"30px", fontSize:"12px"}}><b> RICKY BOBBY</b></span>
                      </div>
                     */}
                     {/* </ButtonBase> */}
                     {/* <div className={classes.root}>
                        <Avatar alt="Heart" src={heart} style={{height:"20px", width:"20px"}} /> <span style={{marginTop:"10px"}}> HEART RATE </span>
                        <Avatar alt="Oxygen" src={oxygen} style={{height:"20px", width:"20px", marginLeft:"2px"}} /> <span style={{marginTop:"10px"}}>BLOOD OXYGEN </span>
                    </div> */}

                   {/* Button of all information */}
                   {/* <div className={classes.root}>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>95</button>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>98</button>
                    </div> */}
                    {/* End Button all information */}
                              
                    {/* <div className={classes.root}>
                        <Avatar alt="Ecg" src={ecg} style={{height:"20px", width:"20px"}} /> <span style={{marginTop:"10px"}}> ECG</span>
                        <Avatar alt="Pressure" src={pressure} style={{height:"20px", width:"20px" , marginLeft:"30px"}} /><span style={{marginTop:"10px"}}> BLOOD PRESSURE </span>
                    </div> */}
                   {/* Button of all information */}
                   {/* <div className={classes.root}>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>Normal</button>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>120/80</button>
                    </div>
                     */}
                    {/* End Button all information */}
                              
                    {/* <div className={classes.root}>
                        <Avatar alt="Weight" src={weight} style={{height:"20px", width:"20px"}} /> <span style={{marginTop:"10px"}}> WEIGHT </span>
                        <Avatar alt="Medication" src={medication} style={{height:"20px", width:"20px", marginLeft:"20px"}} /><span style={{marginTop:"10px"}}> MEDICATION </span>
                    </div> */}

                   {/* Button of all information */}
                   {/* <div className={classes.root}>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>195</button>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#eee", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>*</button>
                    </div>
                     </b>
                     </Box>
                 </Paper>
               </Grid>
            </Grid> */}
        </Container>
    );
}

export default Cards;






// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import user from '../images/Avatar.png';
// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });

// export default function Cards() {
//   const classes = useStyles();

//   return (
//     <Card className={classes.root}>
//       <CardActionArea>
//       <img className="size-full aligncenter" src={user} alt="" width="60" height="60" />
//         <CardMedia
//           className={classes.media}
//           image="./images/Avatar.png"
//           title="Contemplative Reptile"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             Lizard
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//             across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary">
//           Share
//         </Button>
//         <Button size="small" color="primary">
//           Learn More
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }
