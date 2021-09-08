import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import PeopleIcon from '@material-ui/icons/People';
// import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from "react-router-dom";

export const MainListItems = () => {
  return (
    <div>
     <Link to="/home">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
       </ListItem>
      </Link>
      <Link to="/hospitalform">
      <ListItem button>
        <ListItemIcon>
          <LocalHospitalIcon />
        </ListItemIcon>
        {/* <Link color="primary" to="/hospitalform" > */}
          <ListItemText primary="Add Organization" />
        {/* </Link> */}
      </ListItem>
      </Link>
     <Link to="/doctorform">
      <ListItem button>
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        {/* <Link color="primary" to="/doctorform" > */}
           <ListItemText primary="Add Admin" />
        {/* </Link> */}
      </ListItem>
      </Link>
     <Link to="/appnetworks">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="App Networks" />
      </ListItem>
     </Link>
    </div>
  )
};
