// import React from 'react';
import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from "@material-ui/core/ListItem"
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import { MainListItems, secondaryListItems } from './listItems';
import { NavLink } from "react-router-dom";
// import TextField from '@material-ui/core/TextField';

import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import logo from '../images/SCLogo.png';
import Cards from './Cards';
import MyModal from './MyModal';
import Patientform from './PatientForm';
import SuperPatientform from './SuperPatientForm';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Senior Connex, 2018
      </Link>{' '}
      {/* {new Date().getFullYear()}
      {'.'} */}
      {/* <div className="fl-page-footer-text">
                        <b>Contact Us</b> <br/>
                        Email: info@seniorconnex.com <br/>
                        Phone: +1 509-521-3124
          </div> */}
    </Typography>
  );
}

const drawerWidth = 240;

export default function Header() {
  
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    try {
      if(localStorage.getItem("isloggedin"))
        userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  const history = useHistory();
  function handleLogout(){
    if(window.confirm('Are you sure?'))
    {
      userHasAuthenticated(false);
      localStorage.clear();
      history.push("/");
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="white" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          
          <img className="size-full aligncenter" src={logo} alt="" width="60" height="40" marginRight="60px" />
          <Typography component="h1" variant="h6" color="black" noWrap className={classes.title}>
            <b style={{marginLeft:"40px"}}>Super Admin Dashboard </b>
          </Typography>
         
          <div>
            <h5 style={{marginRight:"25px"}}><b>{JSON.parse(localStorage.getItem("firstName"))}</b></h5>
          </div>

          <Button variant="contained" color="primary" style={{height:"50px",marginRight:"10px"}} onClick={handleLogout}>
            Logout
          </Button>
{/* 
          <Button variant="contained" color="primary" style={{height:"50px"}} onClick={() => setOpenModal(true)}>
            + ADD NEW PATIENT
          </Button> */}
          

        </Toolbar>
      </AppBar>
      <Drawer
        color="primary"
        variant="permanent"
        style={{ position: "fixed", height: "-webkit-fill-available" }}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon} >
          <div className="fl-rich-text">
            
          </div>
         
        </div>
        <Divider />
        <List>
          <ListItem button onClick={open ? handleDrawerClose : handleDrawerOpen}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className={clsx(classes.menuButton)}>
              <MenuIcon />
            </IconButton>
          </ListItem>
          <MainListItems />
        </List>
      </Drawer>
      <MyModal open={openModal}>
        {/* <Patientform handleClose={() => setOpenModal(false)} /> */}
        <SuperPatientform handleClose={() => setOpenModal(false)} />
      </MyModal>
    </div >
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    background: theme.palette.primary.main,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "& .MuiSvgIcon-root": {
      fill: theme.palette.common.white
    },
    "& .MuiListItemText-root": {
      color: theme.palette.common.white
    }
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));