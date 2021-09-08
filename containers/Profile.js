import React from 'react';
import "./Signup.css";
import user_pic from "../images/user1.png";

export default function Profile() {
    const user = JSON.parse(localStorage.getItem("user"));
    return(
        <div className="profile">
            <div className="row">
                <div className="col-md-2 col-xs-2"></div>
                <div className="col-md-8 col-xs-8">
                    <img src={user.profileImage ? user.profileImage : user_pic} width="40%" alt="Profile_Pic" />
                </div>
                <div className="col-md-2 col-xs-2"></div>
            </div>
            <br></br>
            <div className="row">
                <div className="col-md-4 col-xs-4">
                    Name: 
                </div>
                <div className="col-md-8 col-xs-8" style={{textTransform: "capitalize",overflowWrap: "break-word"}}>
                    {user.firstName + " "} {user.lastName}
                </div>
            </div>
            {user.userRole === 1 &&
            <>
                <div className="row">
                    <div className="col-md-4 col-xs-4">
                        Preferred Name to be called: 
                    </div>
                    <div className="col-md-8 col-xs-8" style={{textTransform: "capitalize",overflowWrap: "break-word"}}>
                        {user.nickName}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-xs-4">
                        Age: 
                    </div>
                    <div className="col-md-8 col-xs-8">
                        {user.age}
                    </div>
                </div>
            </>
            }
            <div className="row">
                <div className="col-md-4 col-xs-4">
                    Address: 
                </div>
                <div className="col-md-8 col-xs-8" style={{overflowWrap: "break-word"}}>
                    {user.apartmentNumber && (user.apartmentNumber + ", ")}{ user.streetName && (user.streetName + ", ")}{ user.city && user.state && (user.city + ", " + user.state + ", ")} {user.zipCode}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-xs-4">
                    Email: 
                </div>
                <div className="col-md-8 col-xs-8">
                    {user.username}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-xs-4">
                    Cell Number: 
                </div>
                <div className="col-md-8 col-xs-8">
                    {user.phno}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-xs-4">
                    Landline: 
                </div>
                <div className="col-md-8 col-xs-8">
                    {user.landline}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-xs-4">
                    Social Connex Name: 
                </div>
                <div className="col-md-8 col-xs-8" style={{overflowWrap: "break-word"}}>
                    {user.network.networkName}
                </div>
            </div>
            { user.userRole !== 1 &&
            <div className="row">
                <div className="col-md-4 col-xs-4">
                    Relation: 
                </div>
                <div className="col-md-8 col-xs-8">
                    {user.relationship && (user.relationship.name === "Other" ? user.otherRelationship : user.relationship.name)}
                </div>
            </div>
            }
            {user.userRole === 1 &&
            <>
                <div className="row">
                    <div className="col-md-4 col-xs-4">
                        Names of others living in home:
                    </div>
                    <div className="col-md-8 col-xs-8" style={{textTransform: "capitalize",overflowWrap: "break-word"}}>
                        {user && user.othersLivingInHome}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-xs-4">
                        Special needs or instructions:
                    </div>
                    <div className="col-md-8 col-xs-8" style={{overflowWrap: "break-word"}}>
                        {user && user.specialNeeds}
                    </div>
                </div>
            </>
            }
            <br />
            <div className="row">
                <div className="col-md-4 col-xs-4">
                    <a href="/change_password" className="btn" style={{backgroundColor: "#1d75bd", color: "#ffffff"}}>Change Password</a>
                </div>
                {user.userRole === 1 ?
                <div className="col-md-8 col-xs-8">
                    <a href="/edit_senior_profile" className="btn" style={{backgroundColor: "#1d75bd", color: "#ffffff"}}>Edit Profile</a>
                </div> :
                <div className="col-md-6 col-xs-6">
                    <a href="/edit_profile" className="btn" style={{backgroundColor: "#1d75bd", color: "#ffffff"}}>Edit Profile</a>
                </div>
                }
            </div>
        </div>
    )
}
