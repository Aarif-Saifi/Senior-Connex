import React, { useState } from "react";
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
import "./Signup.css";
import { toast } from 'react-toastify';
import { InfoCircle, EyeFill } from 'react-bootstrap-icons';
import { baseURL } from "../constants";

export default function ChangePassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  function validateForm() {
    return (
      oldPassword.length > 0 && newPassword.length > 0
    );
  }

  function toggleShow(field, value) {
    if (field === "password")
      setShowPassword(!value)
    else
      setShowNewPassword(!value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    setDisableSubmit(true);
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[^a-zA-Z0-9])(?=.{8,})");
    var test = strongRegex.test(newPassword);
    if (test && validateForm()) {
      fetch(`${baseURL}/user/changePassword`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
          "username": email.trim(),
          "oldPassword": oldPassword,
          "newPassword": newPassword
        })
      }).then(response => {
        if (response.status === 200) {
          response.json().then(res => {
            toast.success(res.responseMessage, { toastId: "change_password_success" });
            console.log(res);
          });
          history.push("/");
        }
        else {
          response.json().then(res => {
            toast.error(res.responseMessage, { toastId: "change_password_error" });
            console.log(res)
            setDisableSubmit(false);
          });
        }
      }).catch((error) => { console.error(error); setDisableSubmit(false); });
    }
    else {
      if (!test) {
        toast.error("New Password should contain min. 8 characters with 1 uppercase, 1 lowercase, 1 number and No special characters", { toastId: "password_error" });
      }
      else {
        toast.error("Old Password and New Password can't be blank.", { toastId: "password_blank_error" });
      }
      setDisableSubmit(false);
    }
  }

  function renderForm() {
    if (email === "") {
      if (window.location.search === "")
        setEmail(JSON.parse(localStorage.getItem("user")).username);
      else
        setEmail(window.location.search.split("?")[1]);
    }
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="oldPassword" bsSize="large" >
          <ControlLabel>Current Password<b style={{ color: "red" }}>*</b></ControlLabel>
          <InputGroup>
            <FormControl
              type={showPassword ? "text" : "password"}
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              required={true}
            />
            <InputGroup.Addon onClick={() => { toggleShow("password", showPassword) }}>
              <EyeFill />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup controlId="newPassword" bsSize="large" >
          <ControlLabel>New Password<b style={{ color: "red" }}>*</b></ControlLabel>
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
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required={true}
            />
            <InputGroup.Addon onClick={() => { toggleShow("new_password", showNewPassword) }}>
              <EyeFill />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Button block bsSize="large" disabled={disableSubmit} type="submit" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>
          Submit
        </Button>
        <Button block bsSize="large" onClick={() => history.goBack()} style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>Cancel</Button>
      </form>
    );
  }

  return (
    <div className="Signup">
      {renderForm()}
    </div>
  );
}