import React, { useState, useEffect } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import ImageUploader from 'react-images-upload';

export default function EditProfile() {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem("user"));
    const [relations, setRelations] = useState([]);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [phone, setPhone] = useState(user.phno);
    const [aprtNo, setAprtNo] = useState(user.apartmentNumber);
    const [streetName, setStreetName] = useState(user.streetName);
    const [city, setCity] = useState(user.city);
    const [state, setState] = useState(user.state);
    const [zipCode, setZipCode] = useState(user.zipCode || "");
    const [relation, setRelation] = useState(user.relationship && user.relationship._id);
    const [landline, setLandline] = useState(user.landline || "");
    const [otherRelation, setOtherRelation] = useState(user.otherRelationship);
    const [profileImage, setProfileImage] = useState(user.profileImage);
    const [pic, setPic] = useState("");
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [disableRemovePic, setDisableRemovePic] = useState(false);

    useEffect(() => {
        if (relations.length === 0) {
            async function fetchData() {
                const res = await fetch("https://staging-api.seniorconnex.com/user/relationships");
                res
                    .json()
                    .then(res => {
                        setRelations(res.result.relations);
                    })
                    .catch(err => console.error(err));
            }
            fetchData();
        }
    });

    function onDrop(picture) {
        if (picture.length === 1) {
            let reader = new FileReader();
            reader.readAsDataURL(picture[0]);
            setTimeout(function () {
                setPic(reader.result);
            }, 1000);
        }
    };

    function removePicture(e) {
        e.preventDefault();
        setDisableRemovePic(true);
        fetch("https://staging-api.seniorconnex.com/user/deleteProfileImage", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                "id": user._id
            })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(res => {
                    toast.success(res.responseMessage, { toastId: "remove_pic_success" });
                    console.log(res);
                    user.profileImage = "";
                    localStorage.setItem("user", JSON.stringify(user));
                    setProfileImage("");
                });
            }
            else {
                response.json().then(res => {
                    toast.error(res.responseMessage, { toastId: "remove_pic_error" });
                    console.log(res);
                    setDisableRemovePic(false);
                });
            }
        }).catch((error) => { console.error(error); setDisableRemovePic(false); });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setDisableSubmit(true);
        if (zipCode.length !== 5) {
            toast.error("Zip Code should be of 5 digits", { toastId: "zip_code_error" });
            setDisableSubmit(false);
            return false;
        }
        if (landline.length > 0 && landline.length < 8) {
            toast.error("Landline should be of minimum 8 digits", { toastId: "landline_error" });
            setDisableSubmit(false);
            return false;
        }
        if (isValidPhoneNumber(phone)) {
            var urlencoded = new URLSearchParams();
            if (pic !== "") {
                urlencoded.append("imgData", pic.split(',')[1]);
            } else {
                if (user.profileImage !== undefined)
                    urlencoded.append("profileImage", user.profileImage)
                urlencoded.append("imgData", "");
            }
            urlencoded.append("_id", user._id);
            urlencoded.append("firstName", firstName);
            urlencoded.append("lastName", lastName);
            urlencoded.append("streetName", streetName);
            urlencoded.append("apartmentNumber", aprtNo === undefined ? "" : aprtNo);
            urlencoded.append("city", city);
            urlencoded.append("otherRelationship", otherRelation);
            urlencoded.append("zipCode", zipCode);
            urlencoded.append("landline", landline === undefined ? "" : landline);
            urlencoded.append("state", state);
            urlencoded.append("phno", phone);
            urlencoded.append("relationship", relation);
            fetch("https://staging-api.seniorconnex.com/user/updateProfile", {
                method: "POST",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded",
                    "Authorization": localStorage.getItem("token")
                },
                body: urlencoded
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(res => {
                        toast.success(res.responseMessage, { toastId: "update_profile_success" });
                        console.log(res);
                        localStorage.removeItem("users");
                        localStorage.setItem("user", JSON.stringify(res.result.user));
                        history.push("/profile");
                    });
                }
                else {
                    response.json().then(res => {
                        toast.error(res.responseMessage, { toastId: "update_profile_error" });
                        console.log(res);
                        setDisableSubmit(false);
                    });
                }
            }).catch((error) => { console.error(error); setDisableSubmit(false); });
        }
        else {
            toast.error("Cell Number is not valid", { toastId: "cell_number_error" });
            setDisableSubmit(false);
            return false;
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="firstName" bsSize="large" >
                    <ControlLabel>First Name<b style={{ color: "red" }}>*</b></ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required={true}
                    />
                </FormGroup>
                <FormGroup controlId="lastName" bsSize="large" >
                    <ControlLabel>Last Name<b style={{ color: "red" }}>*</b></ControlLabel>
                    <FormControl
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required={true}
                    />
                </FormGroup>
                <FormGroup controlId="phone" bsSize="large" >
                    <ControlLabel>Cell Number<b style={{ color: "red" }}>*</b></ControlLabel>
                    <PhoneInput
                        value={phone}
                        onChange={setPhone}
                        required={true}
                        defaultCountry="US"
                    />
                </FormGroup>
                <FormGroup controlId="landline" bsSize="large" >
                    <ControlLabel>Landline</ControlLabel> (optional)
                    <FormControl
                        type="text"
                        value={landline}
                        onChange={e => {
                            var numbers = /^[0-9]+$/;
                            if (e.target.value !== "" && e.target.value.match(numbers) === null)
                                toast.error("Please input numeric characters only for Landline", { toastId: "landline_numeric_error" });
                            else {
                                if (e.target.value.length > 15)
                                    toast.error("Landline should be of maximum 15 digits", { toastId: "landline_error" });
                                else
                                    setLandline(e.target.value)
                            }
                        }}
                    />
                </FormGroup>
                <b>Address</b>
                <div style={{ border: "1px dashed black", padding: "10px" }}>
                    <FormGroup controlId="streetName" bsSize="large" >
                        <ControlLabel>Street Name<b style={{ color: "red" }}>*</b></ControlLabel>
                        <FormControl
                            type="text"
                            value={streetName}
                            onChange={e => setStreetName(e.target.value)}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup controlId="aprtNo" bsSize="large" >
                        <ControlLabel>Apartment Number</ControlLabel> (optional)
                        <FormControl
                            type="text"
                            value={aprtNo}
                            onChange={e => setAprtNo(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="city" bsSize="large" >
                        <ControlLabel>City<b style={{ color: "red" }}>*</b></ControlLabel>
                        <FormControl
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup controlId="state" bsSize="large" >
                        <ControlLabel>State<b style={{ color: "red" }}>*</b></ControlLabel>
                        <FormControl
                            type="text"
                            value={state}
                            onChange={e => setState(e.target.value)}
                            required={true}
                        />
                    </FormGroup>
                    <FormGroup controlId="zipCode" bsSize="large" >
                        <ControlLabel>Zip Code<b style={{ color: "red" }}>*</b></ControlLabel>
                        <FormControl
                            type="text"
                            value={zipCode}
                            onChange={e => {
                                var numbers = /^[0-9]+$/;
                                if (e.target.value.length > 5)
                                    toast.error("Zip Code should be of 5 digits", { toastId: "zip_code_error" });
                                else if (e.target.value !== "" && e.target.value.match(numbers) === null)
                                    toast.error("Please input numeric characters only for Zip Code", { toastId: "zip_code_number_error" });
                                else {
                                    setZipCode(e.target.value)
                                }
                            }}
                            required={true}
                        />
                    </FormGroup>
                </div>
                <FormGroup controlId="relation" bsSize="large">
                    <ControlLabel>Select Relationship With Senior<b style={{ color: "red" }}>*</b></ControlLabel>
                    <FormControl
                        componentClass="select"
                        value={relation}
                        onChange={e => setRelation(e.target.value)}
                        required={true}
                    >
                        <option></option>
                        {
                            relations.map((option, index) => {
                                return (<option key={index} value={option._id}>{option.name}</option>)
                            })
                        }
                    </FormControl>
                </FormGroup>
                {
                    relation === "5e96d9d060bb6b06055b72f0" &&
                    <FormGroup controlId="otherRelation" bsSize="large" >
                        <ControlLabel>Please specify<b style={{ color: "red" }}>*</b></ControlLabel>
                        <FormControl
                            type="text"
                            value={otherRelation}
                            onChange={e => setOtherRelation(e.target.value)}
                            required={true}
                        />
                    </FormGroup>
                }
                <b>Add / Edit Profile Picture</b>
                <ImageUploader
                    withIcon={false}
                    onChange={onDrop}
                    imgExtension={[".jpg", ".gif", ".png"]}
                    maxFileSize={5242880}
                    withPreview={true}
                    singleImage={true}
                    buttonText="Choose Image"
                    withLabel={false}
                />
                <FormGroup >
                    {(profileImage === undefined || profileImage === "") ? "" :
                        <Button style={{ color: "blue", border: "none", background: "none" }} disabled={disableRemovePic} onClick={removePicture}>Remove Profile Picture</Button>
                    }
                </FormGroup>
                <Button block bsSize="large" disabled={disableSubmit} type="submit" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>
                    Update
                </Button>
                <Button block bsSize="large" onClick={() => history.push("/profile")} style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>Cancel</Button>
            </form>
        </div>
    )
}
