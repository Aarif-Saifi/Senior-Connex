import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Radio,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import "./Signup.css";
import { toast } from 'react-toastify';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { InfoCircle, EyeFill } from 'react-bootstrap-icons';
import 'rc-datepicker/lib/style.css';
import { DatePickerInput } from 'rc-datepicker';
import moment from 'moment';

export default function AddSenior() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [aprtNo, setAprtNo] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [specialNeeds, setSpecialNeeds] = useState("");
  const [age, setAge] = useState(new Date());
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rType, setRType] = useState("email");
  const [landline, setLandline] = useState("");
  const [quest, setQuest] = useState("");
  const [answer, setAnswer] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  function validateForm() {
    return (
      email.length > 0 &&
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
    if (phone === "" || phone === undefined || isValidPhoneNumber(phone)) {
      if (password !== "") {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[^a-zA-Z0-9])(?=.{8,})");
        var test = strongRegex.test(password);
      }
      else {
        test = true;
      }
      if (test && validateForm()) {
        fetch("https://staging-api.seniorconnex.com/user/register", {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
            "Authorization": localStorage.getItem("token")
          },
          body: JSON.stringify({
            "emailId": email.trim(),
            "username": email.trim(),
            "password": password,
            "nickName": nickName,
            "userRole": "1",
            "deviceType": "System",
            "firstName": firstName,
            "lastName": lastName,
            "apartmentNumber": aprtNo === undefined ? "" : aprtNo,
            "streetName": streetName,
            "city": city,
            "state": state,
            "zipCode": zipCode,
            "phno": phone === undefined ? "" : phone,
            "network": JSON.parse(localStorage.getItem("user")).network._id,
            "othersLivingInHome": otherNames === undefined ? "" : otherNames,
            "specialNeeds": specialNeeds === undefined ? "" : specialNeeds,
            "age": age,
            "securityQuestion": quest,
            "answer": answer.trim(),
            "landline": landline === undefined ? "" : landline
          })
        }).then(response => {
          if (response.status === 200) {
            response.json().then(res => {
              console.log(res)
              history.push("/");
              localStorage.removeItem("users");
              toast.success(res.responseMessage, { toastId: "add_senior_success" });
            });
          }
          else {
            response.json().then(res => {
              toast.error(res.responseMessage, { toastId: "add_senior_error" });
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
      toast.error("Cell Number is not valid", { toastId: "cell_number_error" });
      setDisableSubmit(false);
      return false;
    }
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <b>Senior Registration</b>
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
        <FormGroup controlId="nickName" bsSize="large" >
          <ControlLabel>Preferred Name to be called<b style={{ color: "red" }}>*</b></ControlLabel>
          <FormControl
            type="text"
            value={nickName}
            onChange={e => setNickName(e.target.value)}
            required={true}
          />
        </FormGroup>
        <FormGroup controlId="age" bsSize="large" >
          <ControlLabel>DOB<b style={{ color: "red" }}>*</b></ControlLabel>
          <DatePickerInput
            onChange={(jsDate, dateString) => {
              setAge(moment(dateString).format("MM-DD-YYYY"))
            }}
            value={age}
            maxDate={new Date()}
            required={true}
            format="MM-DD-YYYY"
            displayFormat="MM-DD-YYYY"
            readOnly={true}
          />
        </FormGroup>
        <FormGroup controlId="phone" bsSize="large" >
          <ControlLabel>Cell Number</ControlLabel> (optional)
          <PhoneInput
            value={phone}
            onChange={setPhone}
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
        <FormGroup controlId="rType" bsSize="large" >
          <ControlLabel>Choose Username or email for login<b style={{ color: "red" }}>*</b></ControlLabel>
          <br />
          <Radio
            value="email"
            checked={rType === "email" ? "checked" : ""}
            name="rType"
            onChange={e => setRType(e.target.value)}
            required={true}
            inline
          > Email </Radio>
          <Radio
            value="username"
            checked={rType === "username" ? "checked" : ""}
            name="rType"
            onChange={e => setRType(e.target.value)}
            required={true}
            inline
          > Username </Radio>
        </FormGroup>
        <FormGroup controlId="email" bsSize="large" >
          <ControlLabel>{rType === "email" ? "Email" : "Username"}<b style={{ color: "red" }}>*</b></ControlLabel>
          <FormControl
            type={rType === "email" ? "email" : "text"}
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
        <FormGroup controlId="otherNames" bsSize="large" >
          <ControlLabel>Names of others living in home</ControlLabel> (optional)
          <FormControl
            type="text"
            value={otherNames}
            onChange={e => setOtherNames(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="specialNeeds" bsSize="large" >
          <ControlLabel>Special needs or instructions</ControlLabel> (optional)
          <FormControl
            type="text"
            value={specialNeeds}
            onChange={e => setSpecialNeeds(e.target.value)}
          />
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
          Submit
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