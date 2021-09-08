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
// import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { useHistory, NavLink } from "react-router-dom";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// import DoctorHeader from "./DoctorHeader.js";
import { useParams, useLocation } from 'react-router-dom';
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
export default function SuperAdminHospitalDetail(props) {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [search, setSearch]  = useState("");
    const [networkAdmin, setNetworkAdmin] = useState("");
    const location = useLocation();
    // console.log(props)
    // const id = props;
    // console.log(id)

    
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
            const res = await fetch(`${baseURL}/superAdmin/adminList`, {
              method: "POST",
              headers: {
                'Content-Type': "application/json",
              },
              body: JSON.stringify({
                // hospital: JSON.parse(userData)
                hospital_id: id
              })
            }).then(res=>res.json())
            
            // const response = res.json();

            console.log("data",res);
            const myData = res.result.doctors.reverse();
            // res.result.pop(res.result.doctors.length-1)
            setRows(myData)
        }
        // if (wait === false && relations.length === 0) {
        //   fetchData();
        // }

    }, []);
     

    

    function getColorClass(type, data) {
        switch (type) {
            case "heartRate":
                return data > 100 ? classes.redColor : ""
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
              
            {console.log("Aarif",location)}

            <div style={{ marginLeft: "0px" }}>
               
          <TextField 
                // style={{marginRight:"10px"}}
                variant="outlined"
                label="Search Here"
                name="search"
                value={search}
                onChange={handleSearch}
                style={{float:"right", marginTop:"100px", marginRight:"50px"}}
          />           
                <TableContainer component={Paper} style={{ marginTop: "0px" }}>
              
                    <Table className={classes.table}>
                        
                        <TableHead>
                        <div class="header" style={{marginTop:"0px"}}>
                            <KeyboardBackspaceIcon onClick={()=>window.history.back()} style={{marginTop:"70px",marginLeft:"100px", height:"40px", width:"40px"}} />
                            <h4 style={{position: "relative",marginTop:"-34px", marginLeft:"150px", width:"100%"}}><b>{location.hospitalName}</b></h4>
                        </div>

                            <TableRow className={classes.theader}>
                                <TableCell align="center">Admin Name</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last name</TableCell>
                                <TableCell align="center">Phone Number</TableCell>
                                <TableCell align="center">Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                // rows.filter(i => i.hospital == localStorage.getItem("user").hospital._id)
                                
                                rows.filter(i => search.length >0? i.firstName.toLowerCase().startsWith(search.toLowerCase()):i)
                                .map((row) => (
                                    // index > 0 && (
                                    <TableRow key={row._id} className={classes.row}>
                                      
                                       <NavLink to={`/superadminpatientlist/${row.network.networkAdmin}`}   style={{marginLeft:"200px"}}>
                                        <TableCell align="center">{row.username}</TableCell>
                                       </NavLink>
                                        <TableCell align="center">{row.firstName}</TableCell>
                                        <TableCell align="center">{row.lastName}</TableCell>
                                        <TableCell align="center">{row.phno}</TableCell>
                                        <TableCell align="center">{row.emailId}</TableCell>
                                    </TableRow>
                                    // )
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
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
            fontSize: "1.2rem",
            fontWeight: 600,
            padding:"6px"
        },
        "& a":{
            color:theme.palette.common.black
        }
    },
    redColor: {
        background: "red",
        color: theme.palette.common.white,
        "& a":{
            color:theme.palette.common.white
        }
    },
    yellow: {
        background: "yellow",
        color: theme.palette.common.black,
        "& a":{
            color:theme.palette.common.black
        }
    }
}))