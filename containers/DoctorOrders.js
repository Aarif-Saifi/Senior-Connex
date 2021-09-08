import React, { useState, useEffect } from "react";
// import Link from '@material-ui/core/Link';
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { baseURL } from "../constants";


// Generate Order Data
// function createData(id, name,heartrate, blood, ecg, pressure,weight,medication) {
//   return { id, name, heartrate,  blood, ecg, pressure,weight,medication };
// }


// const rows = [
//   createData(0, 'MARRY SMITH', '87','96', 'Irregular', '130/95', '200','*'),
//   createData(1, 'JOHN JONES', '*','94', 'Irregular', '125/99', '220', '---'),
//   createData(2, 'RICKY BOBBY', '', '98', 'Normal', '120/80','195','---'),
//   createData(3, 'MARRY SMITH', '75','100', 'Normal', '140/89','159', '*'),
//   createData(4, 'ROMAN REIGN', '','120', 'Irregular', '120/80', '160','---'),
// ];





// function preventDefault(event) {
//   event.preventDefault();
// }

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
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
gray: {
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
}));

export default function DoctorOrders() {


  const classes = useStyles();

  const [rows, setRows] = useState([]);



  function preventDefault(event) {
    event.preventDefault();
  }


  useEffect(() => {
    fetchData();
    async function fetchData() {
    //   // setWait(true);
    //   const res = await fetch("https://staging-api.seniorconnex.com/superAdmin/userList");
    //   res.json()
    //     .then(res => {
    //       setRows(res.result.list);
    //       console.log(res.result.list)
    //       // setWait(false);
    //     })
    //     .catch(err => console.error(err));
    // }
    // // if (wait === false && relations.length === 0) {
    // //   fetchData();
    // // }
   
    const userData= localStorage.getItem("userId");
            console.log(userData)
            const res = await fetch(`${baseURL}/user/patientList`, {
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
            const userList=res.result.shift()
            setRows(res.result.reverse())
        }

  }, []);

  
function getColorClass(type, data) {
  switch (type) {
      case "heartRate":
          return data > 100 ? classes.redColor :data >60 ? classes.gray: data <60 ? classes.yellow:""
      case "bloodPressure":
          return Number(data.split("/")[0]) > 150 ? classes.redColor : ""
      default:
          return ""
  }
}


  return ( 
    <React.Fragment>
      <Title>Patient's List</Title>
      <Table size="small"  className={classes.table}>
        <TableHead >
          <TableRow>
            <TableCell align="center"><b>FIRST NAME</b></TableCell>
            <TableCell align="center"><b>LAST NAME</b></TableCell>
            <TableCell align="center"><b>HEART RATE</b></TableCell>
            <TableCell align="center"><b>BLOOD OXYGEN</b></TableCell>
            <TableCell align="center"><b>ECG</b></TableCell>
            <TableCell align="center"><b>BLOOD PRESSURE</b></TableCell>
            {/* <TableCell><b>WEIGHT</b></TableCell>
            <TableCell align="right"><b>MEDICATION</b></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index)  =>  index  <= 4 &&  (
              // index > 0 && (
            <TableRow key={row.id} className={classes.theader}>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center" className={getColorClass("heartRate", row.heartRate)}>{row.heartRate ==null? "-":<Link to={`/adminheartrate/${row._id}`}> {row.heartRate}</Link>}</TableCell>
              <TableCell align="center">89</TableCell>
              <TableCell align="center">Normal</TableCell>
              <TableCell align="center">156/98</TableCell>
              {/* <TableCell align="right">{row.zipCode}</TableCell> */}
            </TableRow>
              // )
          ))}
        </TableBody>
      </Table>
   
   
 <div>
   {
     rows.length>5 ? ( <div className={classes.seeMore} >
      <Link color="primary" to="/doctorlist" >
        view More
      </Link>
      
    </div>):( <div>
        
      </div>)
   }
   </div>
     

    </React.Fragment>
  );
}



