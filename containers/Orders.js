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
}));

export default function Orders() {


  const [rows, setRows] = useState([]);



  function preventDefault(event) {
    event.preventDefault();
  }


  useEffect(() => {
    fetchData();
    async function fetchData() {
      // setWait(true);
      const res = await fetch(`${baseURL}/superAdmin/userList`);
      res.json()
        .then(res => {
          setRows(res.result.list);
          console.log(res.result.list)
          // setWait(false);
        })
        .catch(err => console.error(err));
    }
    // if (wait === false && relations.length === 0) {
    //   fetchData();
    // }


  }, []);

  const classes = useStyles();
  return ( 
    <React.Fragment>
      <Title>Patient's List</Title>
      <Table size="small">
        <TableHead >
          <TableRow>
            <TableCell><b>NAME</b></TableCell>
            <TableCell><b>HEART RATE</b></TableCell>
            <TableCell><b>BLOOD OXYGEN</b></TableCell>
            <TableCell><b>ECG</b></TableCell>
            <TableCell><b>BLOOD PRESSURE</b></TableCell>
            <TableCell><b>WEIGHT</b></TableCell>
            <TableCell align="right"><b>MEDICATION</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => index + 1 <= 4 && (
            <TableRow key={row.id}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.password}</TableCell>
              <TableCell>{row.phno}</TableCell>
              <TableCell>{row.streetName}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell align="right">{row.zipCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
   


      <div className={classes.seeMore}>
        <Link color="primary" to="/patientdetail" >
          view More
        </Link>
      </div>

    </React.Fragment>
  );
}