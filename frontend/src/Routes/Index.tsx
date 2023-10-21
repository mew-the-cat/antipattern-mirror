import React, { useState } from 'react';
import "../Assets/css/index.css"
import {Button, Card, Col, Container, Form, Row, Tab, Tabs} from "react-bootstrap";
import {auth} from "../Interfaces/auth.interface";

// Need:
// Liste der Parameter zum Anlegen eines Nutzer als Client / Advisor

export function Index(props: auth) {
    const [key, setKey] = useState('login');

    const [validated, setValidated] = useState(false);

    const handleLoginSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            const formData = new URLSearchParams({
                "email": form["email"].value,
                "password": form["password"].value,
            });

            fetch(process.env.REACT_APP_BACKEND + "/user/login", {
                method: "POST",
                body: formData,
            })
                .then((value) => {
                    if (value.ok) {
                        return value.json();
                    }
                    throw value;
                })
                .then((value) => {
                    console.log("Response:", value);

                    if(props.setAuthenticationToken !== undefined) {
                        props.setAuthenticationToken(value);
                    }

                    // Weitere Aktionen basierend auf der Serverantwort
                })
                .catch((reason) => {
                    console.error("Error:", reason);
                })
        }
        setValidated(true);
    };


    const handleRegisterSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            const formData = new URLSearchParams({
                "firstname": form["firstname"].value,
                "lastname": form["lastname"].value,
                "location": form["location"].value,
                "street": form["street"].value,
                "zip": form["zip"].value,
                "email": form["email"].value,
                "password": form["password"].value,
                "role": form["role"].value,
            });

            fetch(process.env.REACT_APP_BACKEND + "/user", {
                method: "POST",
                body: formData,
            })
                .then((value) => {
                    if (value.ok) {
                        return value.json();
                    }
                    throw value;
                })
                .then((value) => {
                    console.log("Response:", value);
                    // Weitere Aktionen basierend auf der Serverantwort
                })
                .catch((reason) => {
                    console.error("Error:", reason);
                })
        }
        setValidated(true);
    };

    return (
        <>
            <div className="video-wrapper">
                <div className="video-container">
                    <iframe
                        src="https://www.youtube.com/embed/0RpdPzJgaBw?controls=0&autoplay=1&mute=1&loop=1&playlist=0RpdPzJgaBw"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
            <Row className={"mb-3"}>
                <Col md="6" xs="12" className={"mt-3"}>
                    <Card>
                        <Card.Body>
                            <Card.Title>FinTwin</Card.Title>
                            <Card.Text>
                                Imagine finding your perfect financial partner, tailored to your needs, goals, and even hobbies – all with just a few clicks. Welcome to FinTwin. Instead of thrusting you into the vast world of banking, our app guides you directly to advisors who match you not just professionally, but personally. And the best part? You're in control. By actively choosing, you value the relationship with your advisor more and achieve better outcomes. With FinTwin, we're making finance personal and effective. Support an innovation in banking that's revolutionizing the customer experience.

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="6" xs="12" className={"mt-3"}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Join us</Card.Title>
                            <Tabs
                                id="controlled-tab"
                                activeKey={key}
                                onSelect={(k) => k && setKey(k)}
                            >
                                <Tab eventKey="login" title="Login">
                                    <Form style={{ marginTop: '20px' }} onSubmit={handleLoginSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" name="email" placeholder="Email eingeben" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" name="password" placeholder="Passwort" />
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Login
                                        </Button>
                                    </Form>
                                </Tab>
                                <Tab eventKey="register" title="Registrieren">
                                    <Form style={{ marginTop: '20px' }} onSubmit={handleRegisterSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Firstname</Form.Label>
                                            <Form.Control type="text" name="firstname" placeholder="" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Lastname</Form.Label>
                                            <Form.Control type="text" name="lastname" placeholder="" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Location</Form.Label>
                                            <Form.Control type="text" name="location" placeholder="" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Street</Form.Label>
                                            <Form.Control type="text" name="street" placeholder="" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control type="text" name="zip" placeholder="" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" name="email" placeholder="" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" name="password" placeholder="" />
                                        </Form.Group>

                                        {/* Hinzugefügte Radiobuttons zur Auswahl zwischen Client und Advisor */}
                                        <Form.Group className="mb-3">
                                            <Form.Label>Role</Form.Label>
                                            <Form.Check
                                                type="radio"
                                                label="Client"
                                                name="role"
                                                value="client"
                                                id="clientRadio"
                                                defaultChecked
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Advisor"
                                                name="role"
                                                value="advisor"
                                                id="advisorRadio"
                                            />
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Registration
                                        </Button>
                                    </Form>

                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </>


    );
}