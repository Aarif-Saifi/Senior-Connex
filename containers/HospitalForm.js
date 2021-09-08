import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Row,
  Col
} from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import "./Signup.css";
import { toast } from 'react-toastify';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { InfoCircle, EyeFill } from 'react-bootstrap-icons';
import Header from "./Header";
import { baseURL } from "../constants";

export default function Hospitalform(props) {
  const [relations, setRelations] = useState([]);
  const history = useHistory();
  const [wait, setWait] = useState(false);
  const [hospitalName, setHospitalName] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  // const [phone, setPhone] = useState("");
  // const [isActive, setIsActive] = useState("");
  const [createdBy, setCreatedBy] = useState("")
  const [country, setCountry] = useState("")
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [quest, setQuest] = useState("");
  // const [answer, setAnswer] = useState("");
  const { userHasAuthenticated } = useAppContext();
  const [disableSubmit, setDisableSubmit] = useState(false);


  // useEffect(() => {
  //   async function fetchData() {
  //     setWait(true);
  //     const res = await fetch("https://staging-api.seniorconnex.com/user/relationships");
  //     res.json()
  //       .then(res => {
  //         setRelations(res.result.relations);
  //         setWait(false);
  //       })
  //       .catch(err => console.error(err));
  //   }
  //   if (wait === false && relations.length === 0) {
  //     fetchData();
  //   }
  // },[]);


  // function validateForm() {
  //   return (
  //     email.length > 0 &&
  //     password.length > 0 &&
  //     password === confirmPassword
  //   );
  // }

  // function toggleShow(field, value) {
  //   if (field === "password")
  //     setShowPassword(!value)
  //   else {
  //     setShowConfirmPassword(!value)
  //   }
  // }

  function handleSubmit(event) {
    event.preventDefault();
    setDisableSubmit(false);
    // if (isValidPhoneNumber(phone)) {
      // var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[^a-zA-Z0-9])(?=.{8,})");
      // var test = strongRegex.test(password);
      // if (validateForm()) {
        fetch(`${baseURL}/hospital/createHospital`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },

          body: JSON.stringify({
            "hospitalName": hospitalName.trim(),
            "city": city.trim(),
            "state": state,
            "location": location,
            "country": country,
            "createdBy": createdBy.trim(),
          })

        }).then(response => {
          if (response.status === 200) {
            response.json().then(res => {
              // console.log(res)
              // localStorage.setItem("token", res.result.authToken);
              // localStorage.setItem("user", JSON.stringify(res.result.user));
              // localStorage.setItem("isloggedin", true);
              toast.success(res.responseMessage, { toastId: "signup_success" });
              // props.handleClose()
              // userHasAuthenticated(true);
              // history.push("/add_senior");
              history.push("/home");
            });
          }
          else {
            response.json().then(res => {
              toast.error(res.responseMessage, { toastId: "signup_error" });
              console.log(res)
              setDisableSubmit(false);
            });
          }
        }).catch((error) => { console.error(error); setDisableSubmit(false); });
      
  }

  return (
   <div>
       <Header />
    <div style={{ padding: "72px 280px" }}>
      <form onSubmit={handleSubmit}>
        <h4>Organization Form </h4>
        <br />
        <br />
        <Row>
          <Col md={6}>
            <FormGroup controlId="hospitalName" bsSize="large" >
              <ControlLabel>Organization Name<b style={{ color: "red" }}>*</b></ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={hospitalName}
                onChange={e => setHospitalName(e.target.value)}
                required={true}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup controlId="state" bsSize="large" >
              <ControlLabel>State<b style={{ color: "red" }}>*</b></ControlLabel>
              <FormControl
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                required={true}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup controlId="location" bsSize="large" >
              <ControlLabel>Location<b style={{ color: "red" }}>*</b></ControlLabel>
              <FormControl
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required={true}
              />
            </FormGroup>
          </Col>
          <Col md={6}>

            <FormGroup controlId="city" bsSize="large" >
              <ControlLabel>City<b style={{ color: "red" }}>*</b></ControlLabel>
              <FormControl
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                required={true}
              />
            </FormGroup>
          </Col>
          <Col md={6}>

            <FormGroup controlId="country" bsSize="large" >
              <ControlLabel>Country Name<b style={{ color: "red" }}>*</b></ControlLabel>
              <InputGroup>
                <FormControl
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  required={true}
                />
                <InputGroup.Addon>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="r_help">
                      Name of the Country
                    </Tooltip>}
                  >
                    <InfoCircle />
                  </OverlayTrigger>
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup controlId="createdBy" bsSize="large" >
              <ControlLabel>createdBy<b style={{ color: "red" }}>*</b></ControlLabel>
              <FormControl
                type="text"
                value={createdBy}
                onChange={e => setCreatedBy(e.target.value)}
                required={true}
              />
            </FormGroup>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <button
            bsSize="large"
            className="btn btn-danger btn-lg"
            onClick={props.handleClose}>
            Close
          </button>
          <Button
            bsSize="large"
            disabled={disableSubmit}
            type="submit" style={{ backgroundColor: "#1d75bd", color: "#ffffff", marginLeft: "5px" }}>
            Save
          </Button>
        </div>
      </form>
    </div>
  </div>
  );
}