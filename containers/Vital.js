import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
} from "react-bootstrap";
import "./Signup.css";
import { toast } from 'react-toastify';
import moment from 'moment';

export default function Vital() {
  const history = useHistory();
  const [vitals, setVitals] = useState("");
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")));
  const [senior, setSenior] = useState("");

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
          setSenior(res.result.list.find(usr => usr.userRole === 1))
        })
          .catch(err => console.error(err));
      }
      fetchData();
    }
    else {
      if (senior === "")
        setSenior(users.find(usr => usr.userRole === 1))
      if (vitals === "" && senior !== "") {
        if (senior === undefined) {
          toast.dismiss();
          toast.error("Please Add Senior First", { toastId: "senior_error" });
        }
        else {
          async function fetchData() {
            const res = await fetch("https://staging-api.seniorconnex.com/health/getAlertParam", {
              method: "POST",
              headers: {
                'Content-Type': "application/json",
                "Authorization": localStorage.getItem("token")
              },
              body: JSON.stringify({
                senior: senior._id
              })
            });
            res.json().then(res => {
              localStorage.setItem("vitals", JSON.stringify(res.result.alertParam));
              setVitals(res.result.alertParam);
            })
              .catch(err => console.error(err));
          }
          fetchData();
        }
      }
    }
  }, [users, vitals, senior]);

  function handleEdit(event) {
    event.preventDefault();
    history.push("/edit_vital");
  }

  return (
    <div style={{ margin: '5% auto', maxWidth: '50%' }}>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Vital</th>
            <th>Min. Value</th>
            <th>Max. Value</th>
          </tr>
        </thead>
        <tbody>
          <tr key="0">
            <td>Heart Rate</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "heartRate") && vitals.find(a => a.vital === "heartRate").minValue}</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "heartRate") && vitals.find(a => a.vital === "heartRate").maxValue}</td>
          </tr>
          <tr key="1">
            <td>Blood Pressure (Diastolic)</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "diastolicBp") && vitals.find(a => a.vital === "diastolicBp").minValue}</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "diastolicBp") && vitals.find(a => a.vital === "diastolicBp").maxValue}</td>
          </tr>
          <tr key="2">
            <td>Blood Pressure (Systolic)</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "systolicBp") && vitals.find(a => a.vital === "systolicBp").minValue}</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "systolicBp") && vitals.find(a => a.vital === "systolicBp").maxValue}</td>
          </tr>
          <tr key="3">
            <td>Oxygen Level</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "oxygenLevel") && vitals.find(a => a.vital === "oxygenLevel").minValue}</td>
            <td></td>
          </tr>
          <tr key="4">
            <td>Step Count (Time Range)</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "stepTime") && moment(vitals.find(a => a.vital === "stepTime").minValue, "HH:mm").format("h:mm A")}</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "stepTime") && moment(vitals.find(a => a.vital === "stepTime").maxValue, "HH:mm").format("h:mm A")}</td>
          </tr>
          <tr key="5">
            <td>Step Count</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "stepCount") && vitals.find(a => a.vital === "stepCount").minValue}</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "stepCount") && vitals.find(a => a.vital === "stepCount").maxValue}</td>
          </tr>
          <tr key="6">
            <td>Stand Hour (Time Range)</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "standTime") && moment(vitals.find(a => a.vital === "standTime").minValue, "HH:mm").format("h:mm A")}</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "standTime") && moment(vitals.find(a => a.vital === "standTime").maxValue, "HH:mm").format("h:mm A")}</td>
          </tr>
          <tr key="7">
            <td>Stand Hour</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "standHour") && vitals.find(a => a.vital === "standHour").minValue}</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "standHour") && vitals.find(a => a.vital === "standHour").maxValue}</td>
          </tr>
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
              <Button bsSize="large" disabled={senior === "" || senior === undefined} onClick={handleEdit} style={{ backgroundColor: "#1d75bd", color: "#ffffff", width: "20%", marginRight: "5%" }}>
                Edit
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <br></br>
      <br></br>
      <b>Note: if alter is not configured then there will be no alert.</b>
    </div>
  );
}