import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import heart from '../images/Heart-rate.png';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import Title from './Title';
import Header from './Header';
import {baseURL} from '../constants/index';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}


export default function AdminChart() {
  const theme = useTheme();

  const [rows, setRows] = useState([]);

  const [data, setData] = useState([]);
  
  const { id } = useParams();
  
    useEffect(() => {
  
      fetchData();
      async function fetchData() {
     
      const userData= localStorage.getItem("userId");
              console.log(userData)
              const res = await fetch(`${baseURL}/health/getHeartRate`, {
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
              
              let Arr = response.result.heartRate.map((item)=>(
                {
                name:new Date(item.createdAt).toLocaleString('en-IN', { day:'2-digit',month:'2-digit',hour: '2-digit', minute: '2-digit' }),   // second: '2-digit'
                heart:item.heartRate
              }))
              console.log(Arr)
              setData(Arr)
          }
  
    }, []);
  

  return (
    <React.Fragment>
      <Header />
          <div class="header" style={{marginTop:"40px"}}>
            <Link to="/doctorlist"><KeyboardBackspaceIcon style={{marginTop:"70px",marginLeft:"100px", height:"40px", width:"40px"}} /></Link>
            <img src={heart} alt="logo" style={{  marginLeft:"8px", marginTop:"-32px"}} />
            <h4 style={{position: "relative",marginTop:"-34px", marginLeft:"202px"}}><b>HEART RATE</b></h4>
          </div>


<LineChart
      width={1240}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 100,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="heart"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
    </LineChart>

      {/* </ResponsiveContainer> */}
    </React.Fragment>
  );
}