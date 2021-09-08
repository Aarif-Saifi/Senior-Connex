import React from 'react';
import ReactPlayer from 'react-player';
import './Home.css';
import logo from '../images/SCLogo.png';
import video from '../video/SCVideo2.mp4';
// import Header from './Header';
// import Dashboard from './Dashboard';
import DoctorDashboard from './DoctorDashboard';

export default function DoctorHome(){
    return(
        <>
        
              
        <div>
            <DoctorDashboard />

        </div>
       </>
    )
}