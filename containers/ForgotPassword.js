import React from "react";
import { Redirect } from "react-router-dom";
import {
    Button,
    FormGroup,
    FormControl,
    Radio,
    ControlLabel,
    InputGroup,
    OverlayTrigger,
    Tooltip
} from "react-bootstrap";
import "./Signup.css";
import { toast } from 'react-toastify';
import { InfoCircle, EyeFill } from 'react-bootstrap-icons';
import { baseURL } from "../constants";

export default class ForgotPassword extends React.Component {
    state = { email: "", show: false, otp: "", password: "", c_password: "", redirect: false, rType: "otp", quest: "", showPassword: false, showConfPassword: false, disableSubmit: false };

    toggleShow = (field, value) => {
        if (field === "password")
            this.setState({ showPassword: !value });
        else
            this.setState({ showConfPassword: !value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ disableSubmit: true });
        if (this.state.email === "") {
            toast.error("Email or Username can't br empty", { toastId: "blank_error" });
            this.setState({ disableSubmit: false });
            return false;
        }
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[^a-zA-Z0-9])(?=.{8,})");
        var test = strongRegex.test(this.state.password);
        if (this.state.rType === "quest") {
            if (this.state.show) {
                if (this.state.password !== this.state.c_password) {
                    toast.error("Password does not match", { toastId: "password_not_macth_error" });
                    this.setState({ disableSubmit: false });
                }
                else if (test) {
                    fetch(`${baseURL}/user/updatePasswordWithSecurityQuestion`, {
                        method: "POST",
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            "username": this.state.email.trim(),
                            "emailId": this.state.email.trim(),
                            "answer": this.state.otp.trim(),
                            "password": this.state.password
                        })
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(res => {
                                toast.success(res.responseMessage, { toastId: "forgot_password_success" });
                                console.log(res);
                            });
                            this.setState({ redirect: true });
                        }
                        else {
                            response.json().then(res => {
                                toast.error(res.responseMessage, { toastId: "forgot_password_error" });
                                console.log(res);
                                this.setState({ disableSubmit: false });
                            });
                        }
                    }).catch((error) => { console.error(error); this.setState({ disableSubmit: false }); });
                }
                else {
                    toast.error("New Password should contain min. 8 characters with 1 uppercase, 1 lowercase, 1 number and No special characters", { toastId: "password_error" });
                    this.setState({ disableSubmit: false });
                }
            }
            else {
                fetch(`${baseURL}/user/getSecurityQuestion`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        "username": this.state.email.trim(),
                        "emailId": this.state.email.trim(),
                    })
                }).then(response => {
                    if (response.status === 200) {
                        response.json().then(res => {
                            if (res.result.question === undefined) {
                                toast.error("You can't use security question option. As it's not available for you", { toastId: "no_otp_option_error" });
                                this.setState({ rType: "otp", show: false });
                            }
                            else
                                this.setState({ quest: res.result.question, show: true });
                            console.log(res);
                            this.setState({ disableSubmit: false });
                        });
                    }
                    else {
                        response.json().then(res => {
                            toast.error(res.responseMessage, { toastId: "get_quest_error" });
                            console.log(res);
                            this.setState({ disableSubmit: false });
                        });
                    }
                }).catch((error) => { console.error(error); this.setState({ disableSubmit: false }); });
            }
        }
        else {
            if (this.state.show) {
                if (this.state.password !== this.state.c_password) {
                    toast.error("Password does not match", { toastId: "password_not_macth_error" });
                    this.setState({ disableSubmit: false });
                }
                else if (test) {
                    fetch(`${baseURL}/user/resetPassword`, {
                        method: "POST",
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify({
                            "username": this.state.email.trim(),
                            "emailId": this.state.email.trim(),
                            "otp": this.state.otp.trim(),
                            "password": this.state.password
                        })
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(res => {
                                toast.success(res.responseMessage, { toastId: "forgot_password_success" });
                                console.log(res);
                            });
                            this.setState({ redirect: true });
                        }
                        else {
                            response.json().then(res => {
                                toast.error(res.responseMessage, { toastId: "forgot_password_error" });
                                console.log(res);
                                this.setState({ disableSubmit: false });
                            });
                        }
                    }).catch((error) => { console.error(error); this.setState({ disableSubmit: false }); });
                }
                else {
                    toast.error("New Password should contain min. 8 characters with 1 uppercase, 1 lowercase, 1 number and No special characters", { toastId: "password_error" });
                    this.setState({ disableSubmit: false });
                }
            }
            else {
                fetch(`${baseURL}/user/forgetPassword `, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        "username": this.state.email.trim(),
                        "emailId": this.state.email.trim()
                    })
                }).then(response => {
                    if (response.status === 200) {
                        response.json().then(res => {
                            toast.success(res.responseMessage, { toastId: "get_otp_success" });
                            console.log(res);
                            this.setState({ disableSubmit: false });
                        });
                    }
                    else {
                        response.json().then(res => {
                            toast.error(res.responseMessage, { toastId: "get_otp_error" });
                            console.log(res);
                            this.setState({ disableSubmit: false });
                        });
                    }
                }).catch((error) => { console.error(error); this.setState({ disableSubmit: false }); });
            }
        }
    }
    showField = () => {
        this.setState({ show: true });
    }
    storeValue = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/login' />;
        }
        return (
            <div className="Signup">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large" >
                        <ControlLabel>Username<b style={{ color: "red" }}>*</b></ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.email}
                            onChange={(event) => this.storeValue(event)}
                        />
                    </FormGroup>
                    {!this.state.show &&
                        <FormGroup controlId="rType" bsSize="large" >
                            <ControlLabel>Choose Change Password Option<b style={{ color: "red" }}>*</b></ControlLabel>
                            <br />
                            <Radio
                                name="rtype"
                                checked={this.state.rType === "otp" ? "checked" : ""}
                                value="otp"
                                id="rType"
                                onChange={(event) => this.storeValue(event)}
                                required={true}
                                inline
                            > One Time Password </Radio>
                            <Radio
                                name="rtype"
                                checked={this.state.rType === "quest" ? "checked" : ""}
                                value="quest"
                                id="rType"
                                onChange={(event) => this.storeValue(event)}
                                required={true}
                                inline
                            > Security Question </Radio>

                        </FormGroup>
                    }
                    {this.state.show &&
                        <>
                            <FormGroup controlId="otp" bsSize="large" >
                                <ControlLabel>{this.state.rType === "otp" ? "One TIme Password" : this.state.quest}<b style={{ color: "red" }}>*</b></ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.otp}
                                    onChange={(event) => this.storeValue(event)}
                                    required={true}
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large" >
                                <ControlLabel>New Password<b style={{ color: "red" }}>*</b></ControlLabel>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip id="p_help">
                                        Password should contain min. 8 characters with 1 uppercase, 1 lowercase, 1 number and No special characters
                                    </Tooltip>}
                                >
                                    <InfoCircle className="pull-right" />
                                </OverlayTrigger>
                                <InputGroup>
                                    <FormControl
                                        type={this.state.showPassword ? "text" : "password"}
                                        value={this.state.password}
                                        onChange={(event) => this.storeValue(event)}
                                        required={true}
                                    />
                                    <InputGroup.Addon onClick={() => { this.toggleShow("password", this.state.showPassword) }}>
                                        <EyeFill />
                                    </InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup controlId="c_password" bsSize="large" >
                                <ControlLabel>Confirm Password<b style={{ color: "red" }}>*</b></ControlLabel>
                                <InputGroup>
                                    <FormControl
                                        type={this.state.showConfPassword ? "text" : "password"}
                                        value={this.state.confPassword}
                                        onChange={(event) => this.storeValue(event)}
                                        required={true}
                                    />
                                    <InputGroup.Addon onClick={() => { this.toggleShow("ConfPassword", this.state.showConfPassword) }}>
                                        <EyeFill />
                                    </InputGroup.Addon>
                                </InputGroup>
                            </FormGroup>
                        </>}
                    <Button block bsSize="large" disabled={this.state.disableSubmit} type="submit" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>
                        Submit
                    </Button>
                    <a href="/" className="btn btn-lg btn-default btn-block" style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>Cancel</a>
                    <br />
                    {this.state.rType === "otp" && !this.state.show &&
                        <Button onClick={this.showField}>
                            Click Here if you already have One Time Password
                        </Button>
                    }
                </form>
            </div>
        );
    }
}