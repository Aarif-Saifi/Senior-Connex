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
// import Header from "./Header.js";
import TextField from '@material-ui/core/TextField';

import { useParams } from 'react-router-dom'
// import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// import DoctorHeader from "./DoctorHeader.js";
import Header from "./Header.js";
import DoctorHeader from "./DoctorHeader.js";
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
export default function DoctorList() {
    const classes = useStyles();
    
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [search, setSearch]  = useState("");
    const { id } = useParams();
    const [networkAdmin, setNetworkAdmin] = useState("");

    useEffect(() => {
        fetchData();
        async function fetchData() {
           

            const userData= localStorage.getItem("userId");
            console.log(userData)
            const res = await fetch(`${baseURL}/health/getHeartRate`,
             {
              method: "POST",
              headers: {
                'Content-Type': "application/json",
              },
              body: JSON.stringify({
                   _id: id
              })
            })
            const response = await res.json();
            
            console.log("data",response);
            // const response = res.json();

            console.log("data",res);
            
            const myData = response.result.heartRate.reverse();
            setRows(response.result.heartRate)
            
            // console.log(res.result.heartRate)
            


            // const myData = res.result;
            // res.result.pop(res.result.length-1)
            // setRows(myData)
        }

    }, []);
     

    

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
            <DoctorHeader />
              

            <div style={{ marginLeft: "0px" }}>     
                <TableContainer component={Paper} style={{ marginTop: "0px" }}>
              
                    <Table className={classes.table}>
                        
                        <TableHead>
                        <div class="header" style={{marginTop:"0px"}}>
                            <KeyboardBackspaceIcon  onClick={()=>window.history.back()} style={{marginTop:"70px",marginLeft:"100px", height:"40px", width:"40px"}} />
                            <h4 style={{position: "relative",marginTop:"-34px", marginLeft:"150px", width:"100%"}}><b>Heart Rate</b></h4>
                        </div>

                            <TableRow className={classes.theader}>
                                <TableCell align="center">Date and Time</TableCell>
                                <TableCell align="center">Heart Rate</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                //  rows.filter(i => search.length >0? i.firstName.toLowerCase().startsWith(search.toLowerCase()):i)
                                // rows.filter(i => i.hospital == localStorage.getItem("user").hospital._id)
                                // rows.map((row) => (
                                    rows.map((row) => (
                                    // index > 0 && (
                                    <TableRow key={row._id} className={classes.row}>
                                       <TableCell align="center">{ new Date(row.createdAt).toLocaleString('en-IN', { day:'2-digit',month:'2-digit',year:'numeric', hour: '2-digit', minute: '2-digit',second: '2-digit' })}</TableCell>
                                       <TableCell align="center" className={getColorClass("heartRate", row.heartRate)}>{row.heartRate ==null? "-":<Link> {row.heartRate}</Link>}</TableCell>
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















// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import { Paper, Container } from '@material-ui/core';
// // import Header from "./Header.js";
// import TextField from '@material-ui/core/TextField';

// import { useParams } from 'react-router-dom'
// // import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

// import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// import DoctorHeader from "./DoctorHeader.js";



// const ECG = {
//     NORMAL: "Normal",
//     IRREGULAR: 'Irregular'
// }

// function randomNumberBetweenRange(min, max) {
//     return Math.floor(Math.random() * (max - min) + 1) + min;
// }

// function transformMyData(data) {
//     return data.map((item, index) => ({
//         ...item,
//         ecg: index % 3 ? ECG.NORMAL : ECG.IRREGULAR,
//         heartRate: index % 4 === 0 ? 106 : randomNumberBetweenRange(70, 100),
//         bloodPressure: index % 4 === 0 ? `${randomNumberBetweenRange(155, 181)}/${randomNumberBetweenRange(80, 90)}` : `${randomNumberBetweenRange(120, 155)}/${randomNumberBetweenRange(80, 90)}`
//     }))
// }
// export default function AdminHeartRate() {
//     const classes = useStyles();
    
//     const [data, setData] = useState([]);
//     const [rows, setRows] = useState([]);
//     const [search, setSearch]  = useState("");
//     const { id } = useParams();
//     const [networkAdmin, setNetworkAdmin] = useState("");

//     useEffect(() => {
//         fetchData();
//         async function fetchData() {
           

//             const userData= localStorage.getItem("userId");
//             console.log(userData)
//             const res = await fetch("https://staging-api.seniorconnex.com/health/getHeartRate",
//              {
//               method: "POST",
//               headers: {
//                 'Content-Type': "application/json",
//               },
//               body: JSON.stringify({
//                    _id: localStorage.getItem("userId")
//               })
//             })
//             const response = await res.json();
            
//             console.log("data",response);
//             // const response = res.json();

//             console.log("data",res);

//             setRows(response.result.heartRate)
            
//             // console.log(res.result.heartRate)
            


//             // const myData = response.result.shift();
//             // res.result.pop(response.result.length-1)
//             // setRows(myData)
//         }

//     }, []);
     

    

//     function getColorClass(type, data) {
//         switch (type) {
//             case "heartRate":
//                 return data > 100 ? classes.redColor : data <60 ? classes.yellow:""
//             case "ecg":
//                 return data === ECG.IRREGULAR ? classes.yellow : ""
//             case "bloodPressure":
//                 return Number(data.split("/")[0]) > 150 ? classes.redColor : ""
//             default:
//                 return ""
//         }
//     }

//     function handleSearch(e){
//         const {value} = e.target;
//         setSearch(value);        
//     }

//     return (
//         <>
//             <DoctorHeader />
              

//             <div style={{ marginLeft: "0px" }}>     
//                 <TableContainer component={Paper} style={{ marginTop: "0px" }}>
              
//                     <Table className={classes.table}>
                        
//                         <TableHead>
//                         <div class="header" style={{marginTop:"0px"}}>
//                             <KeyboardBackspaceIcon  onClick={()=>window.history.back()} style={{marginTop:"70px",marginLeft:"100px", height:"40px", width:"40px"}} />
//                             <h4 style={{position: "relative",marginTop:"-34px", marginLeft:"150px", width:"100%"}}><b>Heart Rate Calculation</b></h4>
//                         </div>

//                             <TableRow className={classes.theader}>
//                                 <TableCell align="center">Date and Time</TableCell>
//                                 <TableCell align="center">Heart Rate</TableCell>
                                
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {
//                                 //  rows.filter(i => search.length >0? i.firstName.toLowerCase().startsWith(search.toLowerCase()):i)
//                                 // rows.filter(i => i.hospital == localStorage.getItem("user").hospital._id)
//                                 // rows.map((row) => (
//                                     rows.map((row) => (
//                                     // index > 0 && (
//                                     <TableRow key={row._id} className={classes.row}>
//                                        <TableCell align="center">{ new Date(row.createdAt).toLocaleString('en-IN', { day:'2-digit',month:'2-digit',year:'numeric', hour: '2-digit', minute: '2-digit',second: '2-digit' })}</TableCell>
//                                        <TableCell align="center" className={getColorClass("heartRate", row.heartRate)}>{row.heartRate ==null? "-":<Link> {row.heartRate}</Link>}</TableCell>
//                                     </TableRow>
//                                     // )
//                                  ))
//                             }
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </div>
//         </>
//     );
// }

// const useStyles = makeStyles(theme => ({
//     table: {
//         minWidth: 650,
//     },
//     theader: {
//         "& th": {
//             fontSize: "1.4rem",
//             fontWeight: "bold"
//         }
//     },
//     row: {
//         "& td": {
//             fontSize: "1.2rem",
//             fontWeight: 600
//         },
//         "& a":{
//             color:theme.palette.common.black
//         }
//     },
//     redColor: {
//         background: "red",
//         color: theme.palette.common.white,
//         "& a":{
//             color:theme.palette.common.white
//         }
//     },
//     yellow: {
//         background: "yellow",
//         color: theme.palette.common.black,
//         "& a":{
//             color:theme.palette.common.black
//         }
//     }
// }))