import React, { useState, useEffect } from 'react';
import "./Signup.css";
import user_pic from "../images/user1.png";

export default function Profile() {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState("");
    const mainUser = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        if (user === "") {
            var lists = {};
            lists = JSON.parse(localStorage.getItem("users"))
            if (lists === null) {
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
                            setUser(res.result.list.find(usr => usr.userRole === 1));
                            setUsers(res.result.list);
                        })
                        .catch(err => console.error(err));
                }
                fetchData();
            }
            else {
                setUser(lists.find(usr => usr.userRole === 1));
                setUsers(lists);
            }
        }
    }, [user, users]);
    var primary = users && users.find(usr => usr._id === mainUser.network.primaryCaregiver)
    var secondary = users && users.find(usr => usr._id === mainUser.network.secondaryCaregiver)
    return (
        <div className="profile">
            {user &&
                <div className="row">
                    <div className="col-md-2 col-xs-2"></div>
                    <div className="col-md-8 col-xs-8">
                        <img src={user.profileImage ? user.profileImage : user_pic} width="50%" alt="Profile_Pic" />
                    </div>
                    <div className="col-md-2 col-xs-2"></div>
                </div>
            }
            <br></br>
            <div className="row">
                <div className="col-md-6 col-xs-6">
                    Name:
                </div>
                <div className="col-md-6 col-xs-6" style={{ textTransform: "capitalize", overflowWrap: "break-word" }}>
                    {user && user.firstName + " "} {user && user.lastName}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-xs-6">
                    Preferred Name to be called:
                </div>
                <div className="col-md-6 col-xs-6" style={{ textTransform: "capitalize", overflowWrap: "break-word" }}>
                    {user && user.nickName}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-xs-6">
                    DOB:
                </div>
                <div className="col-md-6 col-xs-6">
                    {user && user.age}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-xs-6">
                    Address of Service:
                </div>
                <div className="col-md-6 col-xs-6" style={{ overflowWrap: "break-word" }}>
                    {user && user.apartmentNumber && (user.apartmentNumber + ", ")}{user && user.streetName && (user.streetName + ", ")}{user && user.city && user.state && (user.city + ", " + user.state + ", ")} {user && user.zipCode}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-xs-6">
                    Email/Username:
                </div>
                <div className="col-md-6 col-xs-6">
                    {user && user.username}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-xs-6">
                    Cell Number:
                </div>
                <div className="col-md-6 col-xs-6">
                    {user && user.phno}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-xs-6">
                    Landline:
                </div>
                <div className="col-md-6 col-xs-6">
                    {user && user.landline}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-xs-6">
                    Names of others living in home:
                </div>
                <div className="col-md-6 col-xs-6" style={{ textTransform: "capitalize" }}>
                    {user && user.othersLivingInHome}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-xs-6">
                    Special needs or instructions:
                </div>
                <div className="col-md-6 col-xs-6" style={{ overflowWrap: "break-word" }}>
                    {user && user.specialNeeds}
                </div>
            </div>
            {primary &&
                <div className="row">
                    <div className="col-md-6 col-xs-6">
                        Primary Caregiver
                    </div>
                    <div className="col-md-6 col-xs-6">
                        {primary.firstName + " "} {primary.lastName}
                    </div>
                </div>
            }
            {secondary &&
                <div className="row">
                    <div className="col-md-6 col-xs-6">
                        Secondary Caregiver
                    </div>
                    <div className="col-md-6 col-xs-6">
                        {secondary.firstName + " "} {secondary.lastName}
                    </div>
                </div>
            }
            <br />
            {user ?
                <div className="row">
                    <div className="col-md-6 col-xs-6">
                        <a href={"/change_password?" + user.emailId} className="btn" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>Change Password</a>
                    </div>
                    <div className="col-md-6 col-xs-6">
                        <a href="/edit_senior_profile" className="btn" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>Edit Profile</a>
                    </div>
                </div> :
                <div className="row">
                    <div className="col-md-6 col-xs-6">
                        <a href="/add_senior" className="btn" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>Add First Senior</a>
                    </div>
                </div>
            }
        </div>
    )
}
