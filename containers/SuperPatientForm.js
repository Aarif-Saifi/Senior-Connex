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
import { baseURL } from "../constants";

export default function SuperPatientform(props) {
//   const network = (localStorage.getItem("networkid"));
  const [relations, setRelations] = useState([]);
  const history = useHistory();
  const [wait, setWait] = useState(false);
  const [userName, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [network, setNetwork] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [quest, setQuest] = useState("");
  const [answer, setAnswer] = useState("");
//   const [doctor, setDoctor] = useState("");
  const [doctorList,setdoctorList] = useState([]);
  const { userHasAuthenticated } = useAppContext();
  const [disableSubmit, setDisableSubmit] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setWait(true);
      const res = await fetch("https://staging-api.seniorconnex.com/user/relationships");
      res.json()
        .then(res => {
          setRelations(res.result.relations);
          setWait(false);
        })
        .catch(err => console.error(err));
    }
    if (wait === false && relations.length === 0) {
      fetchData();
    }
    async function fetchData() {
        setWait(true);
        const res = await fetch("https://staging-api.seniorconnex.com/superAdmin/doctorList");
        res.json()
          .then(res => {
            setdoctorList(res.result.list);
            setWait(false);
            // console.log("result",res.result.list)
          })
          .catch(err => console.error(err));
      }
      if (wait === false && doctorList.length === 0) {
        fetchData();
      }
  },[]);


  function validateForm() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  function toggleShow(field, value) {
    if (field === "password")
      setShowPassword(!value)
    else {
      setShowConfirmPassword(!value)
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setDisableSubmit(true);
    if (isValidPhoneNumber(phone)) {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[^a-zA-Z0-9])(?=.{8,})");
      var test = strongRegex.test(password);
      if (validateForm()) {
        fetch(`${baseURL}/user/register`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          // {"userRole":"0","relationship":"5e96d8c168cf04250a88ac60","networkName":"abhay family","network":"5ea000d3f715531874a5db46","password":"qwerty"}
          body: JSON.stringify({
            "username": userName.trim(),
            "emailId": email.trim(),
            "password": password,
            "userRole": "1",
            "deviceType":"WEB",
            "firstName": firstName,
            "lastName": lastName,
            "address": address,
            // "network":JSON.parse(localStorage.getItem("networkid")),
            "network":network,
            "securityQuestion": quest,
            "answer": answer.trim(),

            "phno": phone,
          })

        }).then(response => {
          if (response.status === 200) {
            response.json().then(res => {
              // console.log(res)
              // localStorage.setItem("token", res.result.authToken);
              // localStorage.setItem("user", JSON.stringify(res.result.user));
              // localStorage.setItem("isloggedin", true);
              toast.success(res.responseMessage, { toastId: "signup_success" });
              props.handleClose()
              props.handleSave()
              // userHasAuthenticated(true);
              // history.push("/add_senior");
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
      else {
        if (!test) {
          toast.error("Password should contain min. 8 characters with 1 uppercase, 1 lowercase, 1 number and No special characters", { toastId: "password_error" });
        }
        else {
          toast.error("Password does not match", { toastId: "password_match_error" });
        }
        setDisableSubmit(false);
      }
    }
    else {
      setDisableSubmit(false);
      toast.error("Cell Number is not valid", { toastId: "cell_number_error" });
      return false;
    }
  }

  
  return (
    <div style={{ padding: "10px 30px" }}>
      <form onSubmit={handleSubmit}>
        <h4>Super Admin Patient Form </h4>
        <br />
        <br />
        <Row>
          <Col md={4}>
            <FormGroup controlId="firstName" bsSize="large" >
              <ControlLabel>Username<b style={{ color: "red" }}>*</b></ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={userName}
                onChange={e => setUsername(e.target.value)}
                required={true}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup controlId="firstName" bsSize="large" >
              <ControlLabel>First Name<b style={{ color: "red" }}>*</b></ControlLabel>
              <FormControl
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required={true}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup controlId="lastName" bsSize="large" >
              <ControlLabel>Last Name<b style={{ color: "red" }}>*</b></ControlLabel>
              <FormControl
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required={true}
              />
            </FormGroup>
          </Col>
          <Col md={4}>

            <FormGroup controlId="phone" bsSize="large" >
              <ControlLabel>Phone Number<b style={{ color: "red" }}>*</b></ControlLabel>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="ph_help">
                  You will be getting text messages for verification purposes
                </Tooltip>}
              >
                <InfoCircle className="pull-right" />
              </OverlayTrigger>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                required={true}
                defaultCountry="US"
              />
            </FormGroup>
          </Col>
          <Col md={4}>

            <FormGroup controlId="email" bsSize="large" >
              <ControlLabel>Email<b style={{ color: "red" }}>*</b></ControlLabel>
              <FormControl
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required={true}
              />
            </FormGroup>
          </Col>
          <Col md={4}>

            <FormGroup controlId="password" bsSize="large" >
              <ControlLabel>Password<b style={{ color: "red" }}>*</b></ControlLabel>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="p_help">
                  Password should contain min. 8 characters with 1 uppercase, 1 lowercase, 1 number and No special characters
                </Tooltip>}
              >
                <InfoCircle className="pull-right" />
              </OverlayTrigger>
              <InputGroup>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required={true}
                />
                <InputGroup.Addon onClick={() => { toggleShow("password", showPassword) }}>
                  <EyeFill />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={4}>

            <FormGroup controlId="confirmPassword" bsSize="large" >
              <ControlLabel>Confirm Password<b style={{ color: "red" }}>*</b></ControlLabel>
              <InputGroup>
                <FormControl
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={e => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required={true}
                />
                <InputGroup.Addon onClick={() => { toggleShow("confirm_password", showConfirmPassword) }}>
                  <EyeFill />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md={4}>

            <FormGroup controlId="address" bsSize="large" >
              <ControlLabel>Address<b style={{ color: "red" }}>*</b></ControlLabel>
              <FormControl
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required={true}
              />
            </FormGroup>
          </Col>
          {/* <Col md={4}>

            <FormGroup controlId="network" bsSize="large" >
              <ControlLabel>Network<b style={{ color: "red" }}>*</b></ControlLabel>
              <InputGroup>
                <FormControl
                  type="text"
                  value={network}
                  onChange={e => setNetwork(e.target.value)}
                  required={true}
                />
                <InputGroup.Addon>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="r_help">
                      Name for the senior’s personal social network
                    </Tooltip>}
                  >
                    <InfoCircle />
                  </OverlayTrigger>
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
          </Col> */}
          <Col md={4}>

            <FormGroup controlId="quest" bsSize="large">
              <ControlLabel>Security Question<b style={{ color: "red" }}>*</b></ControlLabel>
              <FormControl
                componentClass="select"
                value={quest}
                onChange={e => setQuest(e.target.value)}
                required={true}
              >
                <option key="0"></option>
                <option key="1" value="What city were you born in?">What city were you born in?</option>
                <option key="2" value="What is your favorite food?">What is your favorite food?</option>
                <option key="3" value="What street did you grow up on?">What street did you grow up on?</option>
                <option key="4" value="What is your mother’s maiden name?">What is your mother’s maiden name?</option>
                <option key="5" value="Where did you meet your spouse?">Where did you meet your spouse?</option>
                <option key="6" value="What Is your favorite book?">What Is your favorite book?</option>
              </FormControl>
            </FormGroup>
          </Col>


          <Col md={4}>

            <FormGroup controlId="answer" bsSize="large" >
              <ControlLabel>Security Answer<b style={{ color: "red" }}>*</b></ControlLabel>
              <FormControl
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                required={true}
              />
            </FormGroup>
          </Col>
       
          <Col md={4}>
              <FormGroup controlId="network" bsSize="large">
                <ControlLabel>Select Admin<b style={{ color: "red" }}>*</b></ControlLabel>
                <FormControl
                  componentClass="select"
                  value={network}
                  onChange={e => {
                    setNetwork(e.target.value)
                    // console.log(e.target.value)
                  } }
           
                  required={true}
                >
                  
                  <option  value="Select Admin">Select Admin</option>
                  {doctorList.map((item, index)=>{
                    return(
                      console.log(item.network._id),
                      <option key={index} value="Selelct Admin">Select Admin</option>,
                      <option key={index} value={item.network._id}>{item.username}</option>
                    )
                  })
                  }
                </FormControl>
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
  );
}