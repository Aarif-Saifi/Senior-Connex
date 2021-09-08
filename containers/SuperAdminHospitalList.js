import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
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




const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function SuperAdminHospitalList() {


  const [rows, setRows] = useState([]);



  function preventDefault(event) {
    event.preventDefault();
  }


  useEffect(() => {

    fetchData();
    async function fetchData() {
      // setWait(true);
      const res = await fetch(`${baseURL}/user/hospitalList`);
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
      <Title><b  style={{fontSize:"15px"}}>Organization's List</b></Title>
      <Table>
        <TableHead >
          <TableRow className={classes.theader}>
            <TableCell align="center"><b  style={{fontSize:"14px"}}>Organization Name</b></TableCell>
            <TableCell align="center"><b  style={{fontSize:"14px"}}>Location</b></TableCell>
            <TableCell align="center"><b  style={{fontSize:"14px"}}>City</b></TableCell>
            <TableCell align="center"><b  style={{fontSize:"14px"}}>State</b></TableCell>
            <TableCell align="center"><b  style={{fontSize:"14px"}}>Country</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) =>  (
            
            <TableRow key={row.id}  className={classes.row}>
             {/* <NavLink to={`/superadminhospitaldetail/${row._id}`}><TableCell style={{fontSize:"12px"}}><b>{row.hospitalName}</b></TableCell></NavLink>  */}
             <TableCell align="center" style={{fontSize:"12px"}}><NavLink to={{pathname:`/superadminhospitaldetail/${row._id}`,hospitalName:row.hospitalName}}><b style={{color:"black"}}>{row.hospitalName}</b></NavLink></TableCell>
              <TableCell align="center" style={{fontSize:"12px"}}><b>{row.location}</b></TableCell>
              <TableCell align="center" style={{fontSize:"12px"}}><b>{row.city}</b></TableCell>
              <TableCell align="center" style={{fontSize:"12px"}}><b>{row.state}</b></TableCell>
              <TableCell align="center" style={{fontSize:"12px"}}><b>{row.country}</b></TableCell>
            </TableRow>
        
          ))}
        </TableBody>
      </Table>
   


      {/* <div className={classes.seeMore}>
        <Link color="primary" to="/patientdetail" >
          view More
        </Link>
      </div> */}

    </React.Fragment>
  );
}