import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

export default function Download() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [msg, setMsg] = useState("");
    const [email, setEmail] = useState("");
    const [disableSubmit, setDisableSubmit] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setDisableSubmit(true);
        fetch("https://staging-api.seniorconnex.com/contactUs/contactUs", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "name": name,
                "message": msg,
                "phno": phone
            })
        }).then(response => {
            if (response.status === 200) {
                response.json().then(res => {
                    toast.success(res.responseMessage, { toastId: "contact_us_success" });
                    setEmail("");
                    setName("");
                    setMsg("");
                    setDisableSubmit(false);
                    history.push("/access_beta");
                });
            }
            else {
                response.json().then(res => {
                    toast.error(res.responseMessage, { toastId: "contact_us_error" });
                    setDisableSubmit(false);
                    console.log(res);
                });
            }
        }).catch((error) => { console.error(error); setDisableSubmit(false); });
    }

    return (
        <div className="fl-row fl-row-fixed-width fl-row-bg-none fl-node-5bfcb39dbe7f0">
            <div className="fl-row-content-wrap">
                <div className="fl-row-content fl-row-fixed-width fl-node-content">
                    <div className="fl-col-group fl-node-5bfcb39f22d38">
                        <div className="fl-col fl-node-5bfcb39f2314d">
                            <div className="fl-col-content fl-node-content">
                                <div id="contactus" className="fl-module fl-module-heading fl-node-5bfcb58edf006 fl-animation fl-slide-right fl-animated">
                                    <div className="fl-module-content fl-node-content">
                                        <h1 className="fl-heading">
                                            <span className="fl-heading-text">Contact Us For Beta Access</span>
                                        </h1>
                                    </div>
                                </div>
                                <div className="fl-module fl-module-contact-form fl-node-5bfcb39dbdcfc fl-animation fl-slide-down fl-animated" id="contact_form">
                                    <div className="fl-module-content fl-node-content">
                                        <form className="fl-contact-form" onSubmit={handleSubmit}>
                                            <input type="hidden" name="fl-layout-id" value="156" />
                                            <div className="fl-input-group fl-name">
                                                <label htmlFor="fl-name">Name<b style={{ color: "red" }}>*</b></label>
                                                <span className="fl-contact-error">Please enter your name.</span>
                                                <input type="text" id="fl-name" name="fl-name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required={true} />
                                            </div>
                                            <div className="fl-input-group fl-email">
                                                <label htmlFor="fl-email">Email<b style={{ color: "red" }}>*</b></label>
                                                <span className="fl-contact-error">Please enter a valid email.</span>
                                                <input type="email" id="fl-email" name="fl-email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" required={true} />
                                            </div>
                                            <div className="fl-input-group fl-phone">
                                                <label htmlFor="fl-phone">Cell Number</label>(optional)
                                                <span className="fl-contact-error">Please enter cell number.</span>
                                                <input type="text" id="fl-phone" name="fl-phone" value={phone} onChange={e => {
                                                    var numbers = /^[0-9]+$/;
                                                    if (e.target.value !== "" && e.target.value.match(numbers) === null)
                                                        toast.error("Please input numeric characters only", { toastId: "numeric_error" });
                                                    else {
                                                        setPhone(e.target.value)
                                                    }
                                                }} placeholder="Your cell number" />
                                            </div>
                                            <div className="fl-input-group fl-message">
                                                <label htmlFor="fl-message">Your Message<b style={{ color: "red" }}>*</b></label>
                                                <span className="fl-contact-error">Please enter a message.</span>
                                                <textarea id="fl-message" name="fl-message" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Your message" required={true}></textarea>
                                            </div>
                                            <div className="fl-button-wrap fl-button-width-auto fl-button-left">
                                                <Button type="submit" disabled={disableSubmit} style={{ backgroundColor: "#1d75bd", color: "#ffffff" }}>
                                                    Send
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
