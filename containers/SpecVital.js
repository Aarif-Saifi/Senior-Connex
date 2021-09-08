import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
} from "react-bootstrap";
import "./Signup.css";
import { toast } from 'react-toastify';

export default function SpecVital() {
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
    history.push("/edit_spec_vital");
  }

  return (
    <div style={{ margin: '5% auto', maxWidth: '50%' }}>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Vital</th>
            <th>Min.</th>
            <th>Max.</th>
          </tr>
        </thead>
        <tbody>
          <tr key="0">
            <td>Step Count (Time Range)</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "stepTime") && vitals.find(a => a.vital === "stepTime").minValue}</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "stepTime") && vitals.find(a => a.vital === "stepTime").maxValue}</td>
          </tr>
          <tr key="1">
            <td>Step Count</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "stepCount") && vitals.find(a => a.vital === "stepCount").minValue}</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "stepCount") && vitals.find(a => a.vital === "stepCount").maxValue}</td>
          </tr>
          <tr key="2">
            <td>Stand Hour (Time Range)</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "standTime") && vitals.find(a => a.vital === "standTime").minValue}</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "standTime") && vitals.find(a => a.vital === "standTime").maxValue}</td>
          </tr>
          <tr key="3">
            <td>Stand Hour</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "standHour") && vitals.find(a => a.vital === "standHour").minValue}</td>
            <td>{vitals !== "" && vitals.length !== 0 && vitals.find(a => a.vital === "standHour") && vitals.find(a => a.vital === "standHour").maxValue}</td>
          </tr>
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
              <Button bsSize="large" disabled={senior === "" || senior === undefined} onClick={handleEdit} style={{ backgroundColor: "#1d75bd", color: "#ffffff", width: "20%", marginRight: "5%" }}>
                Edit
              </Button>
              <Button bsSize="large" onClick={() => history.push("/vital")} style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>
                Back
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <br></br>
      <br></br>
      <b>Note: IF alter is not configured then there will be no alert.</b>
    </div>
  );
}