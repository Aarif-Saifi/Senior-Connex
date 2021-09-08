import React from 'react';
import { useTheme } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import heart from '../images/Heart-rate.png';
import { Link } from "react-router-dom";
import bloodpressure from '../images/Blood-Pressure.png';
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

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00', undefined),
// ];

const data = [
  {
    name: "12:00:00",
    heart: 91,
    // qwe: 4300,
    // amt: 2100
  },
  {
    name: "12:00:01",
    heart: 990,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:02",
    heart: 1190,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:03",
    heart: 600,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:04",
    heart: 800,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:05",
    heart: 2990,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:06",
    heart: 190,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:07",
    heart: 700,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:08",
    heart: 750,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:09",
    heart: 200,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:10",
    heart: 120,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:11",
    heart: 2000,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:12",
    heart: 1110,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:13",
    heart: 190,
    // pv: 4000,
    // amt: 4100
  },
  {
    name: "12:00:14",
    heart: 190,
    // pv: 4000,
    // amt: 4100
  },
];


export default function AdminBlood() {
  const theme = useTheme();


  return (
    <React.Fragment>
      <Header />
      {/* <Title>HEART RATE</Title> */}
      {/* <h4 style={{marginLeft:"85px", marginTop:"100px"}} src={heart}><b>Heart Rate</b></h4> */}
          {/* </ButtonBase> */}
          {/* <div>
                        <Avatar alt="Heart" src={heart} style={{height:"20px", width:"20px",marginTop:"100px", marginLeft:"100px"}} /> <span style={{marginLeft:"200px"}} > HEART RATE </span> */}
                        {/* <Avatar alt="Oxygen" src={oxygen} style={{height:"20px", width:"20px", marginLeft:"2px"}} /> <span style={{marginTop:"10px"}}>BLOOD OXYGEN </span> */}
          {/* </div> */}
          <div class="header" style={{marginTop:"40px"}}>
            <Link to="/doctorlist"><KeyboardBackspaceIcon style={{marginTop:"70px",marginLeft:"100px", height:"40px", width:"40px"}} /></Link>
            <img src={bloodpressure} alt="logo" style={{  marginLeft:"8px", marginTop:"-32px"}} />
            <h4 style={{position: "relative",marginTop:"-34px", marginLeft:"202px"}}><b>BLOOD PRESSURE</b></h4>
          </div>

      {/* <ResponsiveContainer> */}
        {/* <LineChart
          data={data}
          width={100}
          height={100}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Patients (+)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart> */}


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