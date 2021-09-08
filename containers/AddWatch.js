import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import "./Signup.css";
import { toast } from 'react-toastify';

export default function UpdateNetwork() {
  const history = useHistory();
  const [code, setCode] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")));

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
        res.json().then(res => {
          localStorage.setItem("users", JSON.stringify(res.result.list));
          setUsers(res.result.list);
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
    if (code === "") {
      toast.dismiss();
      toast.error("Please Enter Unique Code", { toastId: "code_error" });
      setDisableSubmit(false);
      return false;
    }
    fetch("https://staging-api.seniorconnex.com/health/pairWatchWithSenior", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        "otp": code,
        "network": JSON.parse(localStorage.getItem("user")).network._id,
        "senior": users.find(usr => usr.userRole === 1)._id
      })
    }).then(response => {
      if (response.status === 200) {
        response.json().then(res => {
          if (localStorage.getItem("hardware") === null || JSON.parse(localStorage.getItem("hardware")).length === 0)
            localStorage.setItem("hardware", JSON.stringify({ watches: [res.result.watch] }));
          else {
            var hardware = JSON.parse(localStorage.getItem("hardware"));
            hardware.watches = [res.result.watch]
            localStorage.setItem("hardware", JSON.stringify(hardware));
          }
          toast.success(res.responseMessage, { toastId: "add_watch_success" });
          console.log(res);
          history.push("/add_device");
        });
      }
      else {
        response.json().then(res => {
          setDisableSubmit(false);
          toast.error(res.responseMessage, { toastId: "add_watch_error" });
          console.log(res)
        });
      }
    }).catch((error) => { console.error(error); setDisableSubmit(true); });
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name" bsSize="large" >
          <ControlLabel>Unique Code For Watch<b style={{ color: "red" }}>*</b></ControlLabel>
          <FormControl
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            required={true}
          />
        </FormGroup>
        <Button block bsSize="large" disabled={disableSubmit} type="submit" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>
          Submit
        </Button>
        <Button block bsSize="large" onClick={() => history.push("/add_device")} style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>Cancel</Button>
      </form>
    );
  }

  return (
    <div className="Signup">
      {renderForm()}
    </div>
  );
}