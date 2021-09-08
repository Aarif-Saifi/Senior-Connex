import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import "./Signup.css";
import { toast } from 'react-toastify';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

export default function Invite() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const users = JSON.parse(localStorage.getItem("users"));
  useEffect(() => {
    if (users === null) {
      async function fetchData() {
        const res = await fetch("https://staging-api.seniorconnex.com/user/getMemberList", {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            "Authorization": localStorage.getItem("token")
          },
        });
        res
          .json()
          .then(res => {
            localStorage.setItem("users", JSON.stringify(res.result.list));
          })
          .catch(err => console.error(err));
      }
      fetchData();
    }
  }, [users]);

  function handleSubmit(event) {
    event.preventDefault();
    setDisableSubmit(true);
    if (users.find(usr => usr.userRole === 1) === undefined) {
      toast.dismiss();
      toast.error("Please Add Senior First", { toastId: "senior_error" });
      setDisableSubmit(false);
      return false;
    }
    if (phone === "" || phone === undefined || isValidPhoneNumber(phone)) {
      fetch("https://staging-api.seniorconnex.com/user/register", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
          "emailId": email.trim(),
          "username": email.trim(),
          "firstName": name,
          "userRole": "2",
          "phno": phone === undefined ? "" : phone,
          "network": JSON.parse(localStorage.getItem("user")).network._id
        })
      }).then(response => {
        if (response.status === 200) {
          response.json().then(res => {
            toast.success(res.responseMessage, { toastId: "invite_success" });
            localStorage.removeItem("users");
            console.log(res);
            history.push("/members");
          });
        }
        else {
          response.json().then(res => {
            toast.error(res.responseMessage, { toastId: "invite_error" });
            console.log(res)
            setDisableSubmit(false);
          });
        }
      }).catch((error) => { console.error(error); setDisableSubmit(false); });
    }
    else {
      toast.dismiss();
      toast.error("Cell Number is not valid", { toastId: "cell_number_error" });
      setDisableSubmit(false);
      return false;
    }
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name<b style={{ color: "red" }}>*</b></ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required={true}
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
        <FormGroup controlId="phone" bsSize="large">
          <ControlLabel>Cell Number</ControlLabel> (optional)
          <PhoneInput
            value={phone}
            onChange={setPhone}
            defaultCountry="US"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={disableSubmit} type="submit" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>
          Add Caregiver
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