import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import "./Signup.css";
import { toast } from 'react-toastify';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import ImageUploader from 'react-images-upload';
import 'rc-datepicker/lib/style.css';
import { DatePickerInput } from 'rc-datepicker';
import moment from 'moment';

export default function EditSeniorProfile() {
  const history = useHistory();
  const mainUser = JSON.parse(localStorage.getItem("user"))
  const user = mainUser.userRole === 1 ? mainUser : JSON.parse(localStorage.getItem("users")).find(usr => usr.userRole === 1);
  const users = mainUser.userRole === 0 ? JSON.parse(localStorage.getItem("users")).filter(usr => usr.userRole !== 1) : [];
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [nickName, setNickName] = useState(user.nickName);
  const [aprtNo, setAprtNo] = useState(user.apartmentNumber);
  const [streetName, setStreetName] = useState(user.streetName);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [zipCode, setZipCode] = useState(user.zipCode || "");
  const [phone, setPhone] = useState(user.phno);
  const [otherNames, setOtherNames] = useState(user.othersLivingInHome);
  const [specialNeeds, setSpecialNeeds] = useState(user.specialNeeds);
  const [age, setAge] = useState(user.age);
  const [landline, setLandline] = useState(user.landline || "");
  const [primaryCaregiver, setPrimaryCaregiver] = useState(mainUser.network.primaryCaregiver);
  const [secondaryCaregiver, setSecondaryCaregiver] = useState(mainUser.network.secondaryCaregiver);
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const [pic, setPic] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [disableRemovePic, setDisableRemovePic] = useState(false);

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
          if (mainUser.userRole === 1) {
            localStorage.setItem("user", JSON.stringify(user));
          }
          else {
            users.push(user)
            localStorage.setItem("users", JSON.stringify(users));
          }
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
    if (phone === "" || phone === undefined || isValidPhoneNumber(phone)) {
      if (users.length > 1 && primaryCaregiver === secondaryCaregiver) {
        setDisableSubmit(false);
        toast.error("Primary and Secondary caregiver can't be same.", { toastId: "caregiver_error" });
      }
      else {
        var urlencoded = new URLSearchParams();
        if (pic !== "")
          urlencoded.append("imgData", pic.split(',')[1]);
        else {
          if (user.profileImage !== undefined)
            urlencoded.append("profileImage", user.profileImage)
          urlencoded.append("imgData", "");
        }
        urlencoded.append("_id", user._id);
        urlencoded.append("firstName", firstName);
        urlencoded.append("nickName", nickName);
        urlencoded.append("lastName", lastName);
        urlencoded.append("age", age);
        urlencoded.append("streetName", streetName);
        urlencoded.append("apartmentNumber", aprtNo === undefined ? "" : aprtNo);
        urlencoded.append("city", city);
        urlencoded.append("zipCode", zipCode);
        urlencoded.append("landline", landline === undefined ? "" : landline);
        urlencoded.append("state", state);
        urlencoded.append("phno", phone === undefined ? "" : phone);
        urlencoded.append("othersLivingInHome", otherNames === undefined ? "" : otherNames);
        urlencoded.append("specialNeeds", specialNeeds === undefined ? "" : specialNeeds);
        if (primaryCaregiver !== undefined)
          urlencoded.append("primaryCaregiver", primaryCaregiver);
        if (secondaryCaregiver !== undefined)
          urlencoded.append("secondaryCaregiver", secondaryCaregiver);
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
              console.log(res)
              mainUser.network = res.result.user.network
              localStorage.setItem("user", JSON.stringify(mainUser));
              localStorage.removeItem("users");
              toast.success(res.responseMessage, { toastId: "update_senior_profile_success" });
              if (mainUser.userRole !== 1)
                history.push("/senior_profile");
              else {
                localStorage.setItem("user", JSON.stringify(res.result.user));
                history.push("/profile");
              }
            });
          }
          else {
            response.json().then(res => {
              toast.error(res.responseMessage, { toastId: "update_senior_profile_error" });
              console.log(res)
              setDisableSubmit(false);
            });
          }
        }).catch((error) => { console.error(error); setDisableSubmit(false); });
      }
    }
    else {
      toast.error("Cell Number is not valid", { toastId: "cell_number_error" });
      setDisableSubmit(false);
      return false;
    }
  }

  function renderForm() {
    return (
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
        <FormGroup controlId="nickName" bsSize="large" >
          <ControlLabel>Preferred Name to be called<b style={{ color: "red" }}>*</b></ControlLabel>
          <FormControl
            type="text"
            value={nickName}
            onChange={e => setNickName(e.target.value)}
            required={true}
          />
        </FormGroup>
        <FormGroup controlId="age" bsSize="large" >
          <ControlLabel>DOB<b style={{ color: "red" }}>*</b></ControlLabel>
          <DatePickerInput
            onChange={(jsDate, dateString) => {
              setAge(moment(dateString).format("MM-DD-YYYY"))
            }}
            value={age}
            maxDate={new Date()}
            required={true}
            format="MM-DD-YYYY"
            displayFormat="MM-DD-YYYY"
            readOnly={true}
          />
        </FormGroup>
        <FormGroup controlId="phone" bsSize="large" >
          <ControlLabel>Cell Number</ControlLabel> (optional)
          <PhoneInput
            value={phone}
            onChange={setPhone}
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
                  toast.error("Please input numeric characters only Zip Code", { toastId: "zip_code_number_error" });
                else {
                  setZipCode(e.target.value)
                }
              }}
              required={true}
            />
          </FormGroup>
        </div>
        <FormGroup controlId="otherNames" bsSize="large" >
          <ControlLabel>Names of others living in home</ControlLabel> (optional)
          <FormControl
            type="text"
            value={otherNames}
            onChange={e => setOtherNames(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="specialNeeds" bsSize="large" >
          <ControlLabel>Special needs or instructions</ControlLabel> (optional)
          <FormControl
            type="text"
            value={specialNeeds}
            onChange={e => setSpecialNeeds(e.target.value)}
          />
        </FormGroup>
        {users.length > 1 &&
          <>
            <FormGroup controlId="primaryCaregiver" bsSize="large">
              <ControlLabel>Primary Caregiver</ControlLabel>
              <FormControl
                componentClass="select"
                value={primaryCaregiver}
                onChange={e => setPrimaryCaregiver(e.target.value)}
                required={true}
              >
                <option></option>
                {
                  users.map((option, index) => {
                    return (<option key={index} value={option._id}>{option.firstName + " "} {option.lastName}</option>)
                  })
                }
              </FormControl>
            </FormGroup>
            <FormGroup controlId="secondaryCaregiver" bsSize="large">
              <ControlLabel>Secondary Caregiver</ControlLabel>
              <FormControl
                componentClass="select"
                value={secondaryCaregiver}
                onChange={e => setSecondaryCaregiver(e.target.value)}
                required={true}
              >
                <option></option>
                {
                  users.map((option, index) => {
                    return (<option key={index} value={option._id}>{option.firstName + " "} {option.lastName}</option>)
                  })
                }
              </FormControl>
            </FormGroup>
          </>
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
          Update Profile
        </Button>
        <Button block bsSize="large" onClick={() => history.goBack()} style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>Cancel</Button>
      </form>
    );
  }

  return (
    <div className="Signup">
      {renderForm()}
    </div>
  );
}