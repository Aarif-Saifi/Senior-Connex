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

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import {baseURL} from '../constants/index';


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
export default function PatientDetail() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [search, setSearch]  = useState("");

    useEffect(() => {
        fetchData();
        async function fetchData() {
            // setWait(true);
            try {
                const res = await fetch(`${baseURL}/superAdmin/userList`);
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
                <TableContainer component={Paper} style={{ marginTop: "0px" }}>
              
                    <Table className={classes.table}>
                        
                        <TableHead>
                        <div class="header" style={{marginTop:"0px"}}>
                            <Link to="/home"><KeyboardBackspaceIcon style={{marginTop:"70px",marginLeft:"100px", height:"40px", width:"40px"}} /></Link>
                            <h4 style={{position: "relative",marginTop:"-34px", marginLeft:"150px", width:"100%"}}><b>PATIENT'S DETAIL</b></h4>
                        </div>

                            <TableRow className={classes.theader}>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Heart Rate</TableCell>
                                <TableCell align="right">Blood Oxygen</TableCell>
                                <TableCell align="right">ECG</TableCell>
                                <TableCell align="right">Blood Pressure</TableCell>
                                <TableCell align="right">Weight</TableCell>
                                <TableCell align="right">Medication</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.filter(i => search.length >0? i.firstName.toLowerCase().startsWith(search.toLowerCase()):i)
                                .map((row) => (
                                    <TableRow key={row._id} className={classes.row}>
                                        <TableCell align="right">{row.firstName}</TableCell>
                                        <TableCell align="right" className={getColorClass("heartRate", row.heartRate)}><Link to="/chart">{row.heartRate}</Link></TableCell>
                                        <TableCell align="right"><Link to="bloodoxygen">96</Link></TableCell>
                                        <TableCell align="right" className={getColorClass("ecg", row.ecg)}><Link to="/ecg">{row.ecg}</Link></TableCell>
                                        <TableCell align="right" className={getColorClass("bloodPressure", row.bloodPressure)}><Link to="/bloodpressure">{row.bloodPressure}</Link></TableCell>
                                        <TableCell align="right">65</TableCell>
                                        <TableCell align="right">*</TableCell>
                                    </TableRow>
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