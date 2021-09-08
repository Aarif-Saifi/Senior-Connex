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
import { InfoCircle } from 'react-bootstrap-icons';

export default function UpdateNetwork() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(user.network.networkName);
  const [disableSubmit, setDisableSubmit] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setDisableSubmit(true);
    fetch("https://staging-api.seniorconnex.com/user/updateNetworkName", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        "networkName": name,
      })
    }).then(response => {
      if (response.status === 200) {
        response.json().then(res => {
          user.network = res.result.network;
          localStorage.setItem("user", JSON.stringify(user));
          toast.success(res.responseMessage, { toastId: "update_network_success" });
          console.log(res);
          history.push("/");
        });
      }
      else {
        response.json().then(res => {
          setDisableSubmit(false);
          toast.error(res.responseMessage, { toastId: "update_network_error" });
          console.log(res)
        });
      }
    }).catch((error) => { console.error(error); setDisableSubmit(true); });
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name" bsSize="large" >
          <ControlLabel>Social Connex Name<b style={{ color: "red" }}>*</b></ControlLabel>
          <InputGroup>
            <FormControl
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required={true}
            />
            <InputGroup.Addon>
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="asd">
                  Name for the senior’s personal social network
                </Tooltip>}
              >
                <InfoCircle />
              </OverlayTrigger>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Button block bsSize="large" disabled={disableSubmit} type="submit" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>
          Update
        </Button>
        <Button block bsSize="large" onClick={() => history.push("/")} style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>Cancel</Button>
      </form>
    );
  }

  return (
    <div className="Signup">
      {renderForm()}
    </div>
  );
}