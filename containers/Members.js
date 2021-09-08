import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function Members() {
    const [users, setUsers] = useState("");
    useEffect(() => {
        if (users === "") {
            if (JSON.parse(localStorage.getItem("users")) === null) {
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
                            setUsers(res.result.list);
                        })
                        .catch(err => console.error(err));
                }
                fetchData();
            }
            else {
                setUsers(JSON.parse(localStorage.getItem("users")));
            }
        }
    }, [users]);

    function handleClick(id, access) {
        fetch("https://staging-api.seniorconnex.com/user/grantAccess", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                "id": id,
                "access": access === 1 ? 0 : 1,
            })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(res => {
                    localStorage.removeItem("users");
                    toast.success(res.responseMessage, { toastId: "member_success" });
                    console.log(res);
                    window.location.reload();
                });
            }
            else {
                response.json().then(res => {
                    toast.error(res.responseMessage, { toastId: "member_error" });
                    console.log(res);
                });
            }
        }).catch((error) => { console.error(error); });
    }


    return (
        <table className="table table-bordered table-striped" style={{ margin: '5% auto', maxWidth: '80%' }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email/Username</th>
                    <th>Invitation Status</th>
                    <th>Member Access</th>
                </tr>
            </thead>
            <tbody>
                {
                    users === "" ? (<tr></tr>) :
                        (
                            users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{ textTransform: "capitalize" }}>{(user.firstName ? user.firstName : "") + " " + (user.lastName ? user.lastName : "")}</td>
                                        <td>{user.userRole === 0 ? "Admin" : (user.userRole === 1 ? "Senior" : "Caregiver")}</td>
                                        <td>{user.emailId ? user.emailId : user.username}</td>
                                        <td>{user.isFirstTimeUser ? "Pending" : "Accepted"}</td>
                                        <td>
                                            {user.userRole === 0 ? "" :
                                                <Button onClick={() => handleClick(user._id, user.status)} >
                                                    {user.status === 1 ? "Revoke" : "Grant"}
                                                </Button>}
                                        </td>
                                    </tr>
                                )
                            })
                        )

                }
            </tbody>
        </table>
    )
}
