import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

export default function AddDevice() {
    const history = useHistory();
    const hardware = JSON.parse(localStorage.getItem("hardware"));

    function removeWatch(id) {
        fetch("https://staging-api.seniorconnex.com/health/deleteHealthWatch", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                "watchId": id
            })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(res => {
                    toast.success(res.responseMessage, { toastId: "remove_watch_success" });
                    console.log(res);
                    window.location.reload();
                    var hardware = JSON.parse(localStorage.getItem("hardware"));
                    hardware.watches = []
                    localStorage.setItem("hardware", JSON.stringify(hardware));
                });
            }
            else {
                response.json().then(res => {
                    toast.error(res.responseMessage, { toastId: "remove_watch_error" });
                    console.log(res);
                });
            }
        }).catch((error) => { console.error(error); });
    }

    return (
        <div style={{ margin: '5% auto', maxWidth: '60%' }}>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Details</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key="0">
                        <td>Apple Watch</td>
                        <td>
                            <table className="table table-bordered table-striped">
                                <tbody>
                                    {(hardware === null || hardware.length === 0) ? "" :
                                        (
                                            hardware.watches.map((watch, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{watch.modelName}</td>
                                                        <td>
                                                            <Button onClick={() => removeWatch(watch._id)}>
                                                                Remove Watch
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <Button onClick={() => history.push("/add_watch")}>
                                {(hardware === null || hardware.length === 0) ? "Add Watch" : (hardware.watches.length === 0 ? "Add Watch" : "Update Watch")}
                            </Button>
                        </td>
                    </tr>
                    <tr key="1">
                        <td>Beacon</td>
                        <td>
                            <Button disabled>
                                Coming Soon
                            </Button>
                        </td>
                        <td>
                            <Button disabled>
                                Coming Soon
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <b>Note: After Adding Watch Please Proceed On Apple Watch For View Vitals </b>
        </div>
    )
}
