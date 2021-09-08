import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },

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
    row: {
      "& td": {
          fontSize: "1.0rem",
          fontWeight: 600
      },
      "& a":{
          color:theme.palette.common.black
      }
  },
  redColor: {
      background: "#f13232eb",
      color: theme.palette.common.white,
      "& a":{
          color:theme.palette.common.white
      }
  },
  yellow: {
      background: "#dfdf0da6",
      color: theme.palette.common.black,
      "& a":{
          color:theme.palette.common.black
      }
  },
  grayColor: {
    background: "#26222214",
      color: theme.palette.common.black,
      "& a":{
          color:theme.palette.common.black
      }
  }
  }));
  

function DoctorCards() {
  const [rows, setRows] = useState([]);
  // const [formSave, setFormSave]=useState(null);
  

  useEffect(() => {
    fetchData();
    async function fetchData() {   
    const userData= localStorage.getItem("userId");
            console.log(userData)
            const res = await fetch("https://staging-api.seniorconnex.com/user/patientList", {
              method: "POST",
              headers: {
                'Content-Type': "application/json",
                
              },
              body: JSON.stringify({
                networkAdmin: JSON.parse(userData)
              })
            }).then(res=>res.json())
            // const response = res.json();

            console.log("data",res);
            // setRows(res.result.reverse())
            const userList=res.result.shift()
            setRows(res.result.reverse())
        }

  }, []);





    const classes = useStyles();

    function getColorClass(type, data) {
      switch (type) {
          case "heartRate":
              return data > 100 ? classes.redColor : data > 61 ? classes.grayColor :data = "-" ? classes.grayColor: data <60 ? classes.yellow:""
          // case "ecg":
          //     return data === ECG.IRREGULAR ? classes.yellow : ""
          case "bloodPressure":
              return Number(data.split("/")[0]) > 150 ? classes.redColor : ""
          default:
              return ""
      }
  }


    return (
        <Container>
            
   <div>
    {
      rows.length>1 ? ( <div>
        <h4 style={{fontSize:"15px", marginLeft:"60px"}}><b>ADMIN DETAILS</b></h4>
        
      </div>):( <div>
          
        </div>)
    }
   </div>
              
          <Grid container spacing={3} style={{margin:"20px"}} >

          {rows.map((row, index)  =>  index   < 3 &&  (
              index >= 0 ? (
            
               <Grid item lg={4} >
                 <Paper>
                   <Box p={3}><b>
                     {/* <Typography variant="h4">Read Docs</Typography> */}
                     {/* <ButtonBase className={classes.image}> */}
                        {/* <img className={classes.img} alt="c" src={user} height="60px" width="60px" />  */}
                      <div className={classes.root}>
                        <Avatar alt="Heart" src={user} style={{height:"60px", width:"60px"}} /> <span style={{marginTop:"30px", fontSize:"12px"}} ><b> {row.firstName}</b></span>
                      </div>
                     {/* </ButtonBase> */}
                     <div className={classes.root}>
                        <Avatar  alt="Heart" src={heart} style={{height:"20px", width:"20px"}} /> <span style={{marginTop:"10px"}}> HEART RATE </span>
                        <Avatar alt="Oxygen" src={oxygen} style={{height:"20px", width:"20px", marginLeft:"2px"}} /> <span style={{marginTop:"10px"}}>BLOOD OXYGEN </span>
                    </div>
                   {/* Button of all information */}
                   <div className={classes.root}>
                        <button style={{width:"100px", height:"25px", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}} className={getColorClass("heartRate", row.heartRate)}>{row.heartRate ==null? "-":<Link to={`/adminheartrate/${row._id}`}> {row.heartRate}</Link>}</button>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#26222214", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>96</button>
                    </div>
                    {/* End Button all information */}
                              
                    <div className={classes.root}>
                        <Avatar alt="Weight" src={weight} style={{height:"20px", width:"20px"}} /> <span style={{marginTop:"10px"}}> First Name </span>
                        <Avatar alt="Medication" src={medication} style={{height:"20px", width:"20px", marginLeft:"20px"}} /><span style={{marginTop:"10px"}}> Last Name </span>
                    </div>
                   {/* Button of all information */}
                   <div className={classes.root}>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#26222214", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>{row.firstName}</button>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#26222214", color:"gray", border:"none", fontSize:"9px",marginTop:"-2px"}}>{row.lastName}</button>
                    </div>
                    {/* End Button all information */}
                    <div className={classes.root}>
                        <Avatar alt="Ecg" src={ecg} style={{height:"20px", width:"20px"}} /> <span style={{marginTop:"10px"}}> ECG</span>
                        <Avatar alt="Pressure" src={pressure} style={{height:"20px", width:"20px" , marginLeft:"30px"}} /><span style={{marginTop:"10px"}}> BLOOD PRESSURE </span>
                    </div>
                   {/* Button of all information */}
                   <div className={classes.root}>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#dfdf0da6", color:"black", border:"none", fontSize:"9px",marginTop:"-2px"}}>Irregular</button>
                        <button style={{width:"100px", height:"25px", backgroundColor:"#f13232eb", border:"none", fontSize:"9px",marginTop:"-2px"}}>155/98</button>
                    </div>
                    {/* End Button all information */}
                              
                              
                     {/* <Button>View More</Button> */}
                     </b>
                     </Box>
                 </Paper> 
               </Grid>
             ): " "
             ))}
             </Grid>
        </Container>
       
    );
    
}

export default DoctorCards;

