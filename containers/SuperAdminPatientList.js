import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Container } from '@material-ui/core';
import Header from "./Header.js";
import TextField from '@material-ui/core/TextField';
import MyModal from './MyModal';
// import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// import DoctorHeader from "./DoctorHeader.js";
import Button from '@material-ui/core/Button';

import { useParams } from 'react-router-dom';
import SuperPatientform from "./SuperPatientForm.js";
import { baseURL } from "../constants/index.js";

const ECG = {
    NORMAL: "Normal",
    IRREGULAR: 'Irregular'
}

function randomNumberBetweenRange(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}

function transformMyData(data) {
    return data.map((item, index) => ({
        ...item,
        ecg: index % 3 ? ECG.NORMAL : ECG.IRREGULAR,
        heartRate: index % 4 === 0 ? 106 : randomNumberBetweenRange(70, 100),
        bloodPressure: index % 4 === 0 ? `${randomNumberBetweenRange(155, 181)}/${randomNumberBetweenRange(80, 90)}` : `${randomNumberBetweenRange(120, 155)}/${randomNumberBetweenRange(80, 90)}`
    }))
}
export default function SuperAdminPatientList() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [search, setSearch]  = useState("");
    const [networkAdmin, setNetworkAdmin] = useState("");
    const [openModal, setOpenModal] = React.useState(false)

    const [formSave, setFormSave]=useState(null);
    
    const { id } = useParams();
    console.log(id)
    
    useEffect(() => {
        fetchData();
        async function fetchData() {
            
            
            // setWait(true);
            // try {
            //     const res = await fetch("https://staging-api.seniorconnex.com/user/patientList");
            //     const data = await res.json();
            //     const myData = transformMyData(data.result.list.reverse())
            //     console.log(myData)
            //     setRows(myData);
            //     // setWait(false);                            
            // } catch (error) {
            //     console.error(error)
            // }

            const userData= localStorage.getItem("userId");
            console.log(userData)
            const res = await fetch(`${baseURL}/user/patientList`, {
              method: "POST",
              headers: {
                'Content-Type': "application/json",
              },
              body: JSON.stringify({
                networkAdmin: id
              })
            })
            
            const response = await res.json();
            console.log("data",response);
            const myData = response.result.reverse();
            // res.result.pop(res.result.length-1)
            myData.pop(myData.length-1)
            setRows(myData)

        }
        // if (wait === false && relations.length === 0) {
        //   fetchData();
        // }

    }, [formSave]);
     

    

    function getColorClass(type, data) {
        switch (type) {
            case "heartRate":
                return data > 100 ? classes.redColor : data <60 ? classes.yellow:""
            case "ecg":
                return data === ECG.IRREGULAR ? classes.yellow : ""
            case "bloodPressure":
                return Number(data.split("/")[0]) > 150 ? classes.redColor : ""
            default:
                return ""
        }
    }

    function handleSearch(e){
        const {value} = e.target;
        setSearch(value);        
    }

    return (
        <>
            <Header />
              
          <div>
            <h5 style={{marginRight:"25px"}}><b>{JSON.parse(localStorage.getItem("row.hospitalName"))}</b></h5>
          </div>

            <div style={{ marginLeft: "0px" }}>

        {/* <Link to="/video1">
          <Button variant="contained" color="primary" style={{float:"right", marginTop:"100px",height:"50px",marginRight:"100px"}}>
            Video Connect
          </Button>      
        </Link> */}

        
          <Button variant="contained" color="primary" style={{float:"right", marginTop:"100px",height:"50px",marginRight:"100px"}} onClick={() => setOpenModal(true)}>
            + ADD NEW PATIENT
          </Button>

          <TextField 
                // style={{marginRight:"10px"}}
                variant="outlined"
                label="Search Here"
                name="search"
                value={search}
                onChange={handleSearch}
                style={{float:"right", marginTop:"100px", marginRight:"50px"}}
          />           
                <TableContainer component={Paper}>
              
                    <Table className={classes.table}>
                        
                        <TableHead>
                        <div class="header" style={{marginTop:"0px"}}>
                            <KeyboardBackspaceIcon onClick={()=>window.history.back()} style={{marginTop:"70px",marginLeft:"100px", height:"40px", width:"40px"}} />
                            <h4 style={{position: "relative",marginTop:"-34px", marginLeft:"150px", width:"100%"}}><b>PATIENT'S DETAIL</b></h4>
                        </div>

                            <TableRow className={classes.theader}>
                                <TableCell align="center">User Name</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Heart Rate</TableCell>
                                <TableCell align="center">Blood Oxygen</TableCell>
                                <TableCell align="center">Blood Pressure</TableCell>
                                <TableCell align="center">ECG</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                // rows.filter(i => i.hospital == localStorage.getItem("user").hospital._id)
                                
                                rows.filter(i => search.length >0? i.firstName.toLowerCase().startsWith(search.toLowerCase()):i)
                                .map((row) => (
                                    // index > 0 && (
                                    <TableRow key={row._id} className={classes.row} style={{height:"10px"}}>
                                        <TableCell align="center">{row.username}</TableCell>
                                        <TableCell align="center">{row.firstName}</TableCell>
                                        <TableCell align="center">{row.lastName}</TableCell>
                                        <TableCell align="center" className={getColorClass("heartRate", row.heartRate)}>{row.heartRate ==null? "-":<Link to={`/superadminheartrate/${row._id}`}> {row.heartRate}</Link>}</TableCell>
                                        <TableCell align="center">96</TableCell>
                                        <TableCell align="center" className={getColorClass("bloodPressure", "156/98")}>156/98</TableCell>
                                        <TableCell align="center" className={getColorClass("ecg", "Normal")}>Normal</TableCell>
                                    </TableRow>
                                    // )
                                 ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                 

                 
                
                <MyModal open={openModal}>
                    <SuperPatientform handleClose={() => setOpenModal(false)} handleSave={()=> setFormSave(true)} />
                </MyModal>
            </div>
        </>
    );
}


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    theader: {
        "& th": {
            fontSize: "1.4rem",
            fontWeight: "bold"
        }
    },
    row: {
        "& td": {
            fontSize: "1.0rem",
            fontWeight: 600,
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
    }
}))