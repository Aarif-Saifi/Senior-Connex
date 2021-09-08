import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Radio,
  FormControl
} from "react-bootstrap";
import "./Signup.css";
import { toast } from 'react-toastify';
import Timekeeper from 'react-timekeeper';
import moment from 'moment';

export default function EditVital() {
  const history = useHistory();
  const vitals = JSON.parse(localStorage.getItem("vitals"));
  const [heartLow, setHeartLow] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "heartRate") && vitals.find(a => a.vital === "heartRate").minValue);
  const [heartHigh, setHeartHigh] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "heartRate") && vitals.find(a => a.vital === "heartRate").maxValue);
  const [dBpLow, setDBpLow] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "diastolicBp") && vitals.find(a => a.vital === "diastolicBp").minValue);
  const [dBpHigh, setDBpHigh] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "diastolicBp") && vitals.find(a => a.vital === "diastolicBp").maxValue);
  const [sBpLow, setSBpLow] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "systolicBp") && vitals.find(a => a.vital === "systolicBp").minValue);
  const [sBpHigh, setSBpHigh] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "systolicBp") && vitals.find(a => a.vital === "systolicBp").maxValue);
  const [oxLevel, setOxLevel] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "oxygenLevel") && vitals.find(a => a.vital === "oxygenLevel").minValue);
  const [stepMin, setStepMin] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "stepCount") && vitals.find(a => a.vital === "stepCount").minValue);
  const [stepMax, setStepMax] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "stepCount") && vitals.find(a => a.vital === "stepCount").maxValue);
  const [stepStartTime, setStepStartTime] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "stepTime") && vitals.find(a => a.vital === "stepTime").minValue);
  const [stepEndTime, setStepEndTime] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "stepTime") && vitals.find(a => a.vital === "stepTime").maxValue);
  const [standMin, setStandMin] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "standHour") && vitals.find(a => a.vital === "standHour").minValue);
  const [standMax, setStandMax] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "standHour") && vitals.find(a => a.vital === "standHour").maxValue);
  const [standStartTime, setStandStartTime] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "standTime") && vitals.find(a => a.vital === "standTime").minValue);
  const [standEndTime, setStandEndTime] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "standTime") && vitals.find(a => a.vital === "standTime").maxValue);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [heart, setHeart] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "heartRate") !== undefined);
  const [dBP, setDBP] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "diastolicBp") !== undefined);
  const [sBP, setSBP] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "systolicBp") !== undefined);
  const [oxygen, setOxygen] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "oxygenLevel") !== undefined);
  const [step, setStep] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "stepCount") !== undefined);
  const [stand, setStand] = useState(vitals.length !== 0 && vitals.find(a => a.vital === "standHour") !== undefined);
  const users = JSON.parse(localStorage.getItem("users"));
  const senior = users.find(usr => usr.userRole === 1);

  function handleSubmit(event) {
    event.preventDefault();
    setDisableSubmit(true);
    var alertParam = [];
    if (heart) {
      if (heartLow < 60) {
        toast.error("Please enter above lower limit(60) of Heart Rate for Min", { toastId: "heart_rate_less_error" });
        setDisableSubmit(false);
        return false;
      }
      if (heartHigh < 60) {
        toast.error("Please enter above lower limit(60) of Heart Rate for Max", { toastId: "heart_rate_less_error" });
        setDisableSubmit(false);
        return false;
      }
      if (heartHigh < parseInt(heartLow)) {
        toast.error("Heart Max value should be greater than Heart Min value", { toastId: "max_big_min_error" });
        setDisableSubmit(false);
        return false;
      }
      alertParam.push({ vital: "heartRate", maxValue: heartHigh, minValue: heartLow });
    }
    if (step) {
      if (stepMax < parseInt(stepMin)) {
        toast.error("Steps Count Goal cannot be less than Steps Count Min value", { toastId: "max_big_min_error" });
        setDisableSubmit(false);
        return false;
      }
      var sStepTime = moment((stepStartTime === false || stepStartTime === undefined) ? "12:30 pm" : stepStartTime, "h:mm A")
      var eStepTime = moment((stepEndTime === false || stepEndTime === undefined) ? "12:30 pm" : stepEndTime, "h:mm A")
      if (eStepTime.isBefore(sStepTime)) {
        toast.error("Start Time cannot be smaller than End Time for Steps Count", { toastId: "max_big_min_error" });
        setDisableSubmit(false);
        return false;
      }
      alertParam.push({ vital: "stepCount", minValue: stepMin, maxValue: stepMax });
      alertParam.push({ vital: "stepTime", minValue: sStepTime.format("HH:mm"), maxValue: eStepTime.format("HH:mm") });
    }
    if (stand) {
      if (standMax < parseInt(standMin)) {
        toast.error("Stand Hours Goal cannot be less than Stand Hours Min value", { toastId: "max_big_min_error" });
        setDisableSubmit(false);
        return false;
      }
      var sStandTime = moment((standStartTime === false || standStartTime === undefined) ? "12:30 pm" : standStartTime, "h:mm A")
      var eStandTime = moment((standEndTime === false || standEndTime === undefined) ? "12:30 pm" : standEndTime, "h:mm A")
      if (eStandTime.isBefore(sStandTime)) {
        toast.error("Start Time cannot be smaller than End Time for Stand Hours", { toastId: "max_big_min_error" });
        setDisableSubmit(false);
        return false;
      }
      alertParam.push({ vital: "standHour", minValue: standMin, maxValue: standMax });
      alertParam.push({ vital: "standTime", minValue: sStandTime.format("HH:mm"), maxValue: eStandTime.format("HH:mm") });
    }
    if (dBP) {
      if (dBpLow < 60) {
        toast.error("Please enter above lower limit(60) of Diastolic BP", { toastId: "diastolic_less_error" });
        setDisableSubmit(false);
        return false;
      }
      if (dBpHigh < 60) {
        toast.error("Please enter above lower limit(60) of Diastolic BP", { toastId: "diastolic_less_error" });
        setDisableSubmit(false);
        return false;
      }
      if (dBpHigh < parseInt(dBpLow)) {
        toast.error("Diastolic BP Max value should be greater than Diastolic BP Min value", { toastId: "max_big_min_error" });
        setDisableSubmit(false);
        return false;
      }
      alertParam.push({ vital: "diastolicBp", maxValue: dBpHigh, minValue: dBpLow });
    }
    if (sBP) {
      if (sBpLow < 80) {
        toast.error("Please enter above lower limit(80) of Systolic BP", { toastId: "systolic_less_error" });
        setDisableSubmit(false);
        return false;
      }
      if (sBpHigh < 80) {
        toast.error("Please enter above lower limit(80) of Systolic BP", { toastId: "systolic_less_error" });
        setDisableSubmit(false);
        return false;
      }
      if (sBpHigh < parseInt(sBpLow)) {
        toast.error("Systolic BP Max value should be greater than Systolic BP Min value", { toastId: "max_big_min_error" });
        setDisableSubmit(false);
        return false;
      }
      alertParam.push({ vital: "systolicBp", maxValue: sBpHigh, minValue: sBpLow });
    }
    if (oxygen) {
      if (oxLevel < 90) {
        toast.error("Please enter above lower limit(90) of Oxygen Level", { toastId: "oxygen_less_error" });
        setDisableSubmit(false);
        return false;
      }
      alertParam.push({ vital: "oxygenLevel", minValue: oxLevel });
    }

    fetch("https://staging-api.seniorconnex.com/health/setAlertParam", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        senior: senior._id,
        healthAlertParam: alertParam
      })
    }).then(response => {
      if (response.status === 200) {
        response.json().then(res => {
          toast.success(res.responseMessage, { toastId: "vital_success" });
          console.log(res);
          history.push("/vital");
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
              <th style={{ width: "33%" }}>Vital</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr key="0">
              <td colSpan="3">
                Heart Rate<b style={{ color: "red" }}>*</b> &nbsp;&nbsp;&nbsp;&nbsp;
                <Radio
                  value={true}
                  checked={heart === true ? "checked" : ""}
                  name="heart"
                  onChange={e => setHeart(true)}
                  required={true}
                  inline
                > Enable </Radio>
                <Radio
                  value={false}
                  checked={heart === false ? "checked" : ""}
                  name="heart"
                  onChange={e => setHeart(false)}
                  required={true}
                  inline
                > Disable </Radio>
              </td>
            </tr>
            <tr key="1" style={heart === false ? { display: "none" } : {}}>
              <td></td>
              <td>Min. Value</td>
              <td>Max. Value</td>
            </tr>
            <tr key="2" style={heart === false ? { display: "none" } : {}}>
              <td></td>
              <td>
                <FormControl
                  type="number"
                  value={heartLow}
                  required={heart === true ? true : false}
                  min={0}
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else if (e.target.value > 120)
                      toast.error("Please enter below higher limit(120) of Heart Rate", { toastId: "heart_rate_more_error" });
                    else {
                      setHeartLow(e.target.value)
                    }
                  }}
                />
              </td>
              <td>
                <FormControl
                  type="number"
                  value={heartHigh}
                  required={heart === true ? true : false}
                  min={0}
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else if (e.target.value > 120)
                      toast.error("Please enter below higher limit(120) of Heart Rate", { toastId: "heart_rate_more_error" });
                    else {
                      setHeartHigh(e.target.value)
                    }
                  }}
                />
              </td>
            </tr>
            <tr key="3">
              <td colSpan="3">
                Blood Pressure (Diastolic)<b style={{ color: "red" }}>*</b> &nbsp;&nbsp;&nbsp;&nbsp;
                <Radio
                  value={true}
                  checked={dBP === true ? "checked" : ""}
                  name="dBP"
                  onChange={e => setDBP(true)}
                  required={true}
                  inline
                > Enable </Radio>
                <Radio
                  value={false}
                  checked={dBP === false ? "checked" : ""}
                  name="dBP"
                  onChange={e => setDBP(false)}
                  required={true}
                  inline
                > Disable </Radio>
              </td>
            </tr>
            <tr key="4" style={dBP === false ? { display: "none" } : {}}>
              <td></td>
              <td>Min. Value</td>
              <td>Max. Value</td>
            </tr>
            <tr key="5" style={dBP === false ? { display: "none" } : {}}>
              <td></td>
              <td>
                <FormControl
                  type="number"
                  value={dBpLow}
                  required={dBP === true ? true : false}
                  min={0}
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else if (e.target.value > 120)
                      toast.error("Please enter below higher limit(120) of Diastolic BP", { toastId: "diastolic_more_error" });
                    else {
                      setDBpLow(e.target.value)
                    }
                  }}
                />
              </td>
              <td>
                <FormControl
                  type="number"
                  value={dBpHigh}
                  required={dBP === true ? true : false}
                  min={0}
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else if (e.target.value > 120)
                      toast.error("Please enter below higher limit(120) of Diastolic BP", { toastId: "diastolic_more_error" });
                    else {
                      setDBpHigh(e.target.value)
                    }
                  }}
                />
              </td>
            </tr>
            <tr key="6">
              <td colSpan="3">
                Blood Pressure (Systolic)<b style={{ color: "red" }}>*</b> &nbsp;&nbsp;&nbsp;&nbsp;
                <Radio
                  value={true}
                  checked={sBP === true ? "checked" : ""}
                  name="sBP"
                  onChange={e => setSBP(true)}
                  required={true}
                  inline
                > Enable </Radio>
                <Radio
                  value={false}
                  checked={sBP === false ? "checked" : ""}
                  name="sBP"
                  onChange={e => setSBP(false)}
                  required={true}
                  inline
                > Disable </Radio>
              </td>
            </tr>
            <tr key="7" style={sBP === false ? { display: "none" } : {}}>
              <td></td>
              <td>Min. Value</td>
              <td>Max. Value</td>
            </tr>
            <tr key="8" style={sBP === false ? { display: "none" } : {}}>
              <td></td>
              <td>
                <FormControl
                  type="number"
                  value={sBpLow}
                  required={sBP === true ? true : false}
                  min={0}
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else if (e.target.value > 160)
                      toast.error("Please enter below higher limit(160) of Systolic BP", { toastId: "systolic_more_error" });
                    else {
                      setSBpLow(e.target.value)
                    }
                  }}
                />
              </td>
              <td>
                <FormControl
                  type="number"
                  value={sBpHigh}
                  required={sBP === true ? true : false}
                  min={0}
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else if (e.target.value > 160)
                      toast.error("Please enter below higher limit(160) of Systolic BP", { toastId: "systolic_more_error" });
                    else {
                      setSBpHigh(e.target.value)
                    }
                  }}
                />
              </td>
            </tr>
            <tr key="9">
              <td colSpan="3">
                Oxygen Level<b style={{ color: "red" }}>*</b> &nbsp;&nbsp;&nbsp;&nbsp;
                <Radio
                  value={true}
                  checked={oxygen === true ? "checked" : ""}
                  name="oxygen"
                  onChange={e => setOxygen(true)}
                  required={true}
                  inline
                > Enable </Radio>
                <Radio
                  value={false}
                  checked={oxygen === false ? "checked" : ""}
                  name="oxygen"
                  onChange={e => setOxygen(false)}
                  required={true}
                  inline
                > Disable </Radio>
              </td>
            </tr>
            <tr key="10" style={oxygen === false ? { display: "none" } : {}}>
              <td></td>
              <td>Min. Value</td>
              <td></td>
            </tr>
            <tr key="11" style={oxygen === false ? { display: "none" } : {}}>
              <td></td>
              <td>
                <FormControl
                  type="number"
                  value={oxLevel}
                  required={oxygen === true ? true : false}
                  min={0}
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else if (e.target.value > 100)
                      toast.error("Please enter below higher limit(100) of Oxygen Level", { toastId: "oxygen_more_error" });
                    else {
                      setOxLevel(e.target.value)
                    }
                  }}
                />
              </td>
              <td></td>
            </tr>
            <tr key="12">
              <td colSpan="3">
                Steps Count<b style={{ color: "red" }}>*</b> &nbsp;&nbsp;&nbsp;&nbsp;
                <Radio
                  value={true}
                  checked={step === true ? "checked" : ""}
                  name="step"
                  onChange={e => setStep(true)}
                  required={true}
                  inline
                > Enable </Radio>
                <Radio
                  value={false}
                  checked={step === false ? "checked" : ""}
                  name="step"
                  onChange={e => setStep(false)}
                  required={true}
                  inline
                > Disable </Radio>
              </td>
            </tr>
            <tr key="13" style={step === false ? { display: "none" } : {}}>
              <td></td>
              <td>Start Time</td>
              <td>End Time</td>
            </tr>
            <tr key="14" style={step === false ? { display: "none" } : {}}>
              <td></td>
              <td>
                <Timekeeper
                  time={stepStartTime || "12:30 pm"}
                  onChange={(newTime) => setStepStartTime(newTime.formatted12)}
                  switchToMinuteOnHourSelect
                />
              </td>
              <td>
                <Timekeeper
                  time={stepEndTime || "12:30 pm"}
                  onChange={(newTime) => setStepEndTime(newTime.formatted12)}
                  switchToMinuteOnHourSelect
                />
              </td>
            </tr>
            <tr key="15" style={step === false ? { display: "none" } : {}}>
              <td></td>
              <td>Min. Steps Count</td>
              <td>Steps Count Goal</td>
            </tr>
            <tr key="16" style={step === false ? { display: "none" } : {}}>
              <td></td>
              <td>
                <FormControl
                  type="number"
                  value={stepMin}
                  required={step === true ? true : false}
                  min={0}
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else if (e.target.value > 10000)
                      toast.error("Please enter below higher limit(10000) of Steps Count", { toastId: "step_more_error" });
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
                  required={step === true ? true : false}
                  min={0}
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else if (e.target.value > 10000)
                      toast.error("Please enter below higher limit(10000) of Steps Count", { toastId: "step_more_error" });
                    else {
                      setStepMax(e.target.value)
                    }
                  }}
                />
              </td>
            </tr>
            <tr key="17">
              <td colSpan="3">
                Stand Hour<b style={{ color: "red" }}>*</b> &nbsp;&nbsp;&nbsp;&nbsp;
                <Radio
                  value={true}
                  checked={stand === true ? "checked" : ""}
                  name="stand"
                  onChange={e => setStand(true)}
                  required={true}
                  inline
                > Enable </Radio>
                <Radio
                  value={false}
                  checked={stand === false ? "checked" : ""}
                  name="stand"
                  onChange={e => setStand(false)}
                  required={true}
                  inline
                > Disable </Radio>
              </td>
            </tr>
            <tr key="18" style={stand === false ? { display: "none" } : {}}>
              <td></td>
              <td>Start Time</td>
              <td>End Time</td>
            </tr>
            <tr key="19" style={stand === false ? { display: "none" } : {}}>
              <td></td>
              <td>
                <Timekeeper
                  time={standStartTime || "12:30 pm"}
                  onChange={(newTime) => setStandStartTime(newTime.formatted12)}
                  switchToMinuteOnHourSelect
                />
              </td>
              <td>
                <Timekeeper
                  time={standEndTime || "12:30 pm"}
                  onChange={(newTime) => setStandEndTime(newTime.formatted12)}
                  switchToMinuteOnHourSelect
                />
              </td>
            </tr>
            <tr key="20" style={stand === false ? { display: "none" } : {}}>
              <td></td>
              <td>Min. Stand hours</td>
              <td>Stand Hours Goal</td>
            </tr>
            <tr key="21" style={stand === false ? { display: "none" } : {}}>
              <td></td>
              <td>
                <FormControl
                  type="number"
                  value={standMin}
                  required={stand === true ? true : false}
                  min={0}
                  step="any"
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else if (e.target.value > 10)
                      toast.error("Please enter below higher limit(10) of Stand Hours", { toastId: "stand_more_error" });
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
                  required={stand === true ? true : false}
                  min={0}
                  step="any"
                  onChange={e => {
                    if (e.target.value < 0)
                      toast.error("Please enter positive value", { toastId: "neg_error" });
                    else if (e.target.value > 10)
                      toast.error("Please enter below higher limit(10) of Stand Hours", { toastId: "stand_more_error" });
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
                <Button bsSize="large" onClick={() => history.push("/vital")} style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>
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