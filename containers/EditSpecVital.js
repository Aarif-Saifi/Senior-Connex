import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Timekeeper from 'react-timekeeper';
import {
  Button,
  FormControl
} from "react-bootstrap";
import "./Signup.css";
import { toast } from 'react-toastify';

export default function EditSpecVital() {
  const history = useHistory();
  const vitals = JSON.parse(localStorage.getItem("vitals"));
  const [stepMin, setStepMin] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "stepCount") && vitals.find(a => a.vital === "stepCount").minValue);
  const [stepMax, setStepMax] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "stepCount") && vitals.find(a => a.vital === "stepCount").maxValue);
  const [stepStartTime, setStepStartTime] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "stepTime") && vitals.find(a => a.vital === "stepTime").minValue);
  const [stepEndTime, setStepEndTime] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "stepTime") && vitals.find(a => a.vital === "stepTime").maxValue);
  const [standMin, setStandMin] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "standHour") && vitals.find(a => a.vital === "standHour").minValue);
  const [standMax, setStandMax] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "standHour") && vitals.find(a => a.vital === "standHour").maxValue);
  const [standStartTime, setStandStartTime] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "standTime") && vitals.find(a => a.vital === "standTime").minValue);
  const [standEndTime, setStandEndTime] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "standTime") && vitals.find(a => a.vital === "standTime").maxValue);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const users = JSON.parse(localStorage.getItem("users"));
  const senior = users.find(usr => usr.userRole === 1);

  function handleSubmit(event) {
    event.preventDefault();
    setDisableSubmit(true);
    fetch("https://staging-api.seniorconnex.com/health/setAlertParam", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        senior: senior._id,
        healthAlertParam: [
          { vital: "stepCount", minValue: stepMin, maxValue: stepMax },
          { vital: "standHour", minValue: standMin, maxValue: standMax },
          { vital: "stepTime", minValue: stepStartTime, maxValue: stepEndTime },
          { vital: "standTime", minValue: standStartTime, maxValue: standEndTime }
        ]
      })
    }).then(response => {
      if (response.status === 200) {
        response.json().then(res => {
          toast.success(res.responseMessage, { toastId: "vital_success" });
          console.log(res);
          history.push("/spec_vitals");
        });
      }
      else {
        response.json().then(res => {
          setDisableSubmit(false);
          toast.error(res.responseMessage, { toastId: "vital_error" });
          console.log(res)
        });
      }
    }).catch((error) => { console.error(error); setDisableSubmit(true); });
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered table-striped" style={{ margin: '5% auto', maxWidth: '50%' }}>
          <thead>
            <tr>
              <th>Vital</th>
              <th>Min. Value</th>
              <th>Max. Value</th>
            </tr>
          </thead>
          <tbody>
            <tr key="0">
              <td>Step Count (Time Range)<b style={{ color: "red" }}>*</b></td>
              <td>
                <Timekeeper
                  time={stepStartTime}
                  onChange={(newTime) => setStepStartTime(newTime.formatted12)}
                  switchToMinuteOnHourSelect
                />
              </td>
              <td>
                <Timekeeper
                  time={stepEndTime}
                  onChange={(newTime) => setStepEndTime(newTime.formatted12)}
                  switchToMinuteOnHourSelect
                />
              </td>
            </tr>
            <tr key="1">
              <td>Step Count<b style={{ color: "red" }}>*</b></td>
              <td>
                <FormControl
                  type="number"
                  value={stepMin}
                  required={true}
                  min={0}
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else {
                      setStepMin(e.target.value)
                    }
                  }}
                />
              </td>
              <td>
                <FormControl
                  type="number"
                  value={stepMax}
                  required={true}
                  min={0}
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else {
                      setStepMax(e.target.value)
                    }
                  }}
                />
              </td>
            </tr>
            <tr key="2">
              <td>Stand Hour (Time Range)<b style={{ color: "red" }}>*</b></td>
              <td>
                <Timekeeper
                  time={standStartTime}
                  onChange={(newTime) => setStandStartTime(newTime.formatted12)}
                  switchToMinuteOnHourSelect
                />
              </td>
              <td>
                <Timekeeper
                  time={standEndTime}
                  onChange={(newTime) => setStandEndTime(newTime.formatted12)}
                  switchToMinuteOnHourSelect
                />
              </td>
            </tr>
            <tr key="3">
              <td>Stand Hour<b style={{ color: "red" }}>*</b></td>
              <td>
                <FormControl
                  type="number"
                  value={standMin}
                  required={true}
                  min={0}
                  step="any"
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else {
                      setStandMin(e.target.value)
                    }
                  }}
                />
              </td>
              <td>
                <FormControl
                  type="number"
                  value={standMax}
                  required={true}
                  min={0}
                  step="any"
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else {
                      setStandMax(e.target.value)
                    }
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                <Button bsSize="large" disabled={disableSubmit} type="submit" style={{ backgroundColor: "#1d75bd", color: "#ffffff", width: "25%", marginRight: "5%" }}>
                  Submit
                </Button>
                <Button bsSize="large" onClick={() => history.push("/spec_vitals")} style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>
                  Cancel
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }

  return (
    <div>
      {renderForm()}
    </div>
  );
}