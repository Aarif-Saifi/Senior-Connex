import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';
import './Login.css';
import { useAppContext } from '../libs/contextLib';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import eye from '../images/eye.png';
import { FormatColorReset } from '@material-ui/icons';
import {baseURL} from '../constants/index';

export default function Login() {
    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);

    function toggleShow(field, value) {
        if (field === "password")
            setShowPassword(!value)
    }

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setDisableSubmit(true);
        // fetch("http://staging-staging-api.seniorconnex.com/user/login",
        fetch(`${baseURL}/user/login`,
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                "username": email.trim(),
                "password": password
            })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(res => {
                    console.log(res);
                    localStorage.setItem("token", res.result.authToken);
                    localStorage.setItem("user", JSON.stringify(res.result.user));
                    localStorage.setItem("userRole", JSON.stringify(res.result.user.userRole));
                    localStorage.setItem("hardware", JSON.stringify(res.result.hardware));
                    localStorage.setItem("networkid", JSON.stringify(res.result.user.network._id));
                    localStorage.setItem("userId", JSON.stringify(res.result.user._id));
                    localStorage.setItem("firstName", JSON.stringify(res.result.user.firstName));
                    
                    res.result.user.hospital && localStorage.setItem("hospital", JSON.stringify(res.result.user.hospital.hospitalName));
                    localStorage.setItem("isloggedin", true);
                    userHasAuthenticated(true);
                    
                    if(res.result.user.userRole === 0){
                        history.push("/doctorhome");
                        
                    toast.success(res.responseMessage, { toastId: "login_success" });
                    // fetch("https://staging-api.seniorconnex.com/user/getMemberList", 
                    fetch(`${baseURL}/user/getMemberList`,{
                        method: "GET",
                        headers: {
                            'Content-Type': "application/json",
                            "Authorization": localStorage.getItem("token")
                        },
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(res => {
                                localStorage.setItem("users", JSON.stringify(res.result.list));
                            });
                        }
                    }).catch(err => console.error(err));
                    }else if(res.result.user.userRole === 3) {
                        history.push("/home")
                        
                    toast.success(res.responseMessage, { toastId: "login_success" });
                    // fetch("https://staging-api.seniorconnex.com/user/getMemberList", 
                    fetch(`${baseURL}/user/getMemberList`,{
                        method: "GET",
                        headers: {
                            'Content-Type': "application/json",
                            "Authorization": localStorage.getItem("token")
                        },
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(res => {
                                localStorage.setItem("users", JSON.stringify(res.result.list));
                            });
                        }
                    }).catch(err => console.error(err));
                    }else{
                        toast.error("You are not a Authenticate User", { toastId: "login_error" });
                    setDisableSubmit(false);
                    }
                });
            }
            else {
                response.json().then(res => {
                    toast.error(res.responseMessage, { toastId: "login_error" });
                    console.log(res);
                    setDisableSubmit(false);
                });
            }
        }).catch((error) => { console.error(error); setDisableSubmit(false); });
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required={true}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large" >
                    <ControlLabel>Password</ControlLabel>
                    <InputGroup>
                        <FormControl
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required={true}
                        />
                        <InputGroup.Addon style={{ width: "10%", padding: '6px' }} onClick={() => { toggleShow("password", showPassword) }}>
                            <img src={eye} alt="eye" />
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <Button block bsSize="large" disabled={disableSubmit || !validateForm()} type="submit" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>
                    Login
                </Button>
                <a href="/forgot_password" className="btn btn-lg btn-default btn-block" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>Forgot Password</a>
            </form>
        </div>
    )
}
