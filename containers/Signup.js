import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import "./Signup.css";
import { toast } from 'react-toastify';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { InfoCircle, EyeFill } from 'react-bootstrap-icons';
import { baseURL } from "../constants";

export default function Signup() {
  const [relations, setRelations] = useState([]);
  const history = useHistory();
  const [wait, setWait] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aprtNo, setAprtNo] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [landline, setLandline] = useState("");
  const [network, setNetwork] = useState("");
  const [relation, setRelation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [quest, setQuest] = useState("");
  const [answer, setAnswer] = useState("");
  const [otherRelation, setOtherRelation] = useState("");
  const { userHasAuthenticated } = useAppContext();
  const [disableSubmit, setDisableSubmit] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setWait(true);
      const res = await fetch(`${baseURL}/user/relationships`);
      res
        .json()
        .then(res => {
          setRelations(res.result.relations);
          setWait(false);
        })
        .catch(err => console.error(err));
    }
    if (wait === false && relations.length === 0) {
      fetchData();
    }
  });


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
    if (zipCode.length !== 5) {
      toast.error("Zip Code should be of 5 digits", { toastId: "zip_code_error" });
      setDisableSubmit(false);
      return false;
    }
    if (landline.length > 0 && landline.length < 8) {
      toast.error("Landline should be of minimum 8 digits", { toastId: "landline_error" });
      setDisableSubmit(false);
      return false;
    }
    if (isValidPhoneNumber(phone)) {
      var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[^a-zA-Z0-9])(?=.{8,})");
      var test = strongRegex.test(password);
      if (test && validateForm()) {
        fetch(`${baseURL}/user/register`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            "emailId": email.trim(),
            "username": email.trim(),
            "password": password,
            "userRole": "0",
            "deviceType": "System",
            "firstName": firstName,
            "lastName": lastName,
            "apartmentNumber": aprtNo === undefined ? "" : aprtNo,
            "streetName": streetName,
            "city": city,
            "state": state,
            "zipCode": zipCode,
            "phno": phone,
            "relationship": relation,
            "networkName": network,
            "securityQuestion": quest,
            "answer": answer.trim(),
            "landline": landline === undefined ? "" : landline,
            "otherRelationship": otherRelation
          })
        }).then(response => {
          if (response.status === 200) {
            response.json().then(res => {
              console.log(res)
              localStorage.setItem("token", res.result.authToken);
              localStorage.setItem("user", JSON.stringify(res.result.user));
              localStorage.setItem("isloggedin", true);
              toast.success(res.responseMessage, { toastId: "signup_success" });
              userHasAuthenticated(true);
              history.push("/add_senior");
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

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <b>Admin Registration </b>
        <br />
        <br />
        <FormGroup controlId="firstName" bsSize="large" >
          <ControlLabel>First Name<b style={{ color: "red" }}>*</b></ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required={true}
          />
        </FormGroup>
        <FormGroup controlId="lastName" bsSize="large" >
          <ControlLabel>Last Name<b style={{ color: "red" }}>*</b></ControlLabel>
          <FormControl
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required={true}
          />
        </FormGroup>
        <FormGroup controlId="phone" bsSize="large" >
          <ControlLabel>Cell Number<b style={{ color: "red" }}>*</b></ControlLabel>
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
        <FormGroup controlId="landline" bsSize="large" >
          <ControlLabel>Landline</ControlLabel> (optional)
          <FormControl
            type="text"
            value={landline}
            onChange={e => {
              var numbers = /^[0-9]+$/;
              if (e.target.value !== "" && e.target.value.match(numbers) === null)
                toast.error("Please input numeric characters only for Landline", { toastId: "landline_numeric_error" });
              else {
                if (e.target.value.length > 15)
                  toast.error("Landline should be of maximum 15 digits", { toastId: "landline_error" });
                else
                  setLandline(e.target.value)
              }
            }}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large" >
          <ControlLabel>Email<b style={{ color: "red" }}>*</b></ControlLabel>
          <FormControl
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required={true}
          />
        </FormGroup>
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
        <b>Address</b>
        <div style={{ border: "1px dashed black", padding: "10px" }}>
          <FormGroup controlId="streetName" bsSize="large" >
            <ControlLabel>Street Name<b style={{ color: "red" }}>*</b></ControlLabel>
            <FormControl
              type="text"
              value={streetName}
              onChange={e => setStreetName(e.target.value)}
              required={true}
            />
          </FormGroup>
          <FormGroup controlId="aprtNo" bsSize="large" >
            <ControlLabel>Apartment Number</ControlLabel> (optional)
            <FormControl
              type="text"
              value={aprtNo}
              onChange={e => setAprtNo(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="city" bsSize="large" >
            <ControlLabel>City<b style={{ color: "red" }}>*</b></ControlLabel>
            <FormControl
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              required={true}
            />
          </FormGroup>
          <FormGroup controlId="state" bsSize="large" >
            <ControlLabel>State<b style={{ color: "red" }}>*</b></ControlLabel>
            <FormControl
              type="text"
              value={state}
              onChange={e => setState(e.target.value)}
              required={true}
            />
          </FormGroup>
          <FormGroup controlId="zipCode" bsSize="large" >
            <ControlLabel>Zip Code<b style={{ color: "red" }}>*</b></ControlLabel>
            <FormControl
              type="text"
              value={zipCode}
              onChange={e => {
                var numbers = /^[0-9]+$/;
                if (e.target.value.length > 5)
                  toast.error("Zip Code should be of 5 digits", { toastId: "zip_code_error" });
                else if (e.target.value !== "" && e.target.value.match(numbers) === null)
                  toast.error("Please input numeric characters only for Zip Code", { toastId: "zip_code_number_error" });
                else {
                  setZipCode(e.target.value)
                }
              }}
              required={true}
            />
          </FormGroup>
        </div>
        <FormGroup controlId="relation" bsSize="large">
          <ControlLabel>Select Relationship With Senior<b style={{ color: "red" }}>*</b></ControlLabel>
          <FormControl
            componentClass="select"
            value={relation}
            onChange={e => setRelation(e.target.value)}
            required={true}
          >
            <option></option>
            {
              relations.map((option, index) => {
                return (<option key={index} value={option._id}>{option.name}</option>)
              })
            }
          </FormControl>
        </FormGroup>
        {
          relation === "5e96d9d060bb6b06055b72f0" &&
          <FormGroup controlId="otherRelation" bsSize="large" >
            <ControlLabel>Please specify<b style={{ color: "red" }}>*</b></ControlLabel>
            <FormControl
              type="text"
              value={otherRelation}
              onChange={e => setOtherRelation(e.target.value)}
              required={true}
            />
          </FormGroup>
        }
        <FormGroup controlId="network" bsSize="large" >
          <ControlLabel>Social Connex Name<b style={{ color: "red" }}>*</b></ControlLabel>
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
        <FormGroup controlId="answer" bsSize="large" >
          <ControlLabel>Security Answer<b style={{ color: "red" }}>*</b></ControlLabel>
          <FormControl
            type="text"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            required={true}
          />
        </FormGroup>
        <Button block bsSize="large" disabled={disableSubmit} type="submit" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>
          Create Network
        </Button>
      </form>
    );
  }

  return (
    <div className="Signup">
      {renderForm()}
    </div>
  );
}