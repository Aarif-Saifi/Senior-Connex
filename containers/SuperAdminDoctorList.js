import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {baseURL} from '../constants/index';
import Grid from '@material-ui/core/Grid';
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

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';



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
export default function SuperAdminDoctorList() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [search, setSearch]  = useState("");

    useEffect(() => {
        fetchData();
        async function fetchData() {
            // setWait(true);
            try {
                const res = await fetch(`${baseURL}/superAdmin/doctorList`);
                const data = await res.json();
                const myData = transformMyData(data.result.list.reverse())
                console.log(myData)
                setRows(myData);
                // setWait(false);                            
            } catch (error) {
                console.error(error)
            }
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
            <Grid item xs={12}>
                <TableContainer component={Paper} style={{ marginTop: "0px" }}>
              
                    <Table className={classes.table}>
                        
                        <TableHead>
                        <div class="header" style={{marginTop:"0px"}}>
                            <Link to="/home"><KeyboardBackspaceIcon style={{marginTop:"70px",marginLeft:"100px", height:"40px", width:"40px"}} /></Link>
                            <h4 style={{position: "relative",marginTop:"-34px", marginLeft:"150px", width:"100%"}}><b>HOSPITAL'S DETAIL</b></h4>
                        </div>

                            <TableRow className={classes.theader}>
                                <TableCell align="center">HOSPITAL'S NAME</TableCell>
                                <TableCell align="center">ADMIN'S NAME</TableCell>
                                <TableCell align="center">TOTAL PATIENTS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.filter(i => search.length >0? i.firstName.toLowerCase().startsWith(search.toLowerCase()):i)
                                .map((row) => (
                                    <TableRow key={row._id} className={classes.row}>
                                        <TableCell align="center">{(row.hospital)? row.hospital.hospitalName: "Hospital Not Assign"}</TableCell>
                                        <TableCell align="center">{row.username}</TableCell>
                                        <TableCell align="center">{row.network.members.length-1}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
             </Grid>
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
            fontWeight: 600
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
