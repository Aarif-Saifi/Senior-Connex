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
import {baseURL} from '../constants/index';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function SuperAdminDoctorOrders() {


  const [rows, setRows] = useState([]);



  function preventDefault(event) {
    event.preventDefault();
  }


  useEffect(() => {
    fetchData();
    async function fetchData() {
      // setWait(true);
      const res = await fetch(`${baseURL}/superAdmin/doctorList`);
      res.json()
        .then(res => {
          setRows(res.result.list.reverse());
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
      <Title>Doctor's List</Title>
      <Table size="small">
        <TableHead >
          <TableRow>
            <TableCell><b>HOSPITAL'S NAME</b></TableCell>
            <TableCell><b>ADMIN'S NAME</b></TableCell>
            <TableCell><b>TOTAL PATIENTS</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => index + 1 <= 4 && (
            <TableRow key={row.id}>
              <TableCell>{(row.hospital)? row.hospital.hospitalName: "Organization Not Assign"}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.network.members.length-1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
   


      <div className={classes.seeMore}>
        <Link color="primary" to="/superadmindoctorlist" >
          view More
        </Link>
      </div>

    </React.Fragment>
  );
}