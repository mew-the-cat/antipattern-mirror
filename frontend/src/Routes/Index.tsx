import React, { useState } from 'react';
import "../Assets/css/index.css"
import {Button, Card, Col, Container, Form, Row, Tab, Tabs} from "react-bootstrap";

export function Index() {
    const [key, setKey] = useState('login');

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
                                    <Form style={{ marginTop: '20px' }}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Email eingeben" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Passwort" />
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Login
                                        </Button>
                                    </Form>
                                </Tab>
                                <Tab eventKey="register" title="Registrieren">
                                    <Form style={{ marginTop: '20px' }}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Vollständiger Name" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Email eingeben" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Passwort</Form.Label>
                                            <Form.Control type="password" placeholder="Password" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Passwort bestätigen</Form.Label>
                                            <Form.Control type="password" placeholder="Please repeat password" />
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