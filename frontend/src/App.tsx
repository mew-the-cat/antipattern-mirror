import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import React, {useState} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Index} from "./Routes/Index";
import 'font-awesome/css/font-awesome.min.css';
import {Match} from "./Routes/Match";
import {useLocalStorage} from "./Hooks/useLocaleStorage";
import { Menu } from "./Components/Menu";
import {Chat} from "./Routes/Chat";
import {Logout} from "./Routes/Logout";
import {Verify} from "./Routes/Verify";

export function App() {
    const [authenticationToken, setAuthenticationToken] = useLocalStorage("authenticationToken", undefined);

    // @ts-ignore
    return (
        <BrowserRouter>
            <Container fluid>
                {/* Navigationsmenü */}
                <Navbar bg="dark" variant="dark">
                    <Container fluid className="justify-content-between">
                        <Navbar.Brand href="/">FinTwin</Navbar.Brand>
                        <Nav>
                            <Menu authenticationToken={authenticationToken}  />
                        </Nav>
                    </Container>
                </Navbar>

                <Routes>

                    <Route path="/" element={
                        <Index
                            key={"index"}
                            authenticationToken={authenticationToken}
                            setAuthenticationToken={setAuthenticationToken}
                        />
                    } />

                    <Route path="/match" element={
                        <Match
                            key={"match"}
                            authenticationToken={authenticationToken}
                            setAuthenticationToken={setAuthenticationToken}
                        />
                    } />

                    <Route path="/chat" element={
                        <Chat
                            key={"chat"}
                            authenticationToken={authenticationToken}
                            setAuthenticationToken={setAuthenticationToken}
                        />
                    } />

                    <Route path="/logout" element={
                        <Logout
                            key={"logout"}
                            authenticationToken={authenticationToken}
                            setAuthenticationToken={setAuthenticationToken}
                        />
                    } />

                    <Route path="/registration/verification" element={
                        <Verify
                            key={"verify"}
                            authenticationToken={authenticationToken}
                            setAuthenticationToken={setAuthenticationToken}
                        />
                    } />

                </Routes>

                {/* Footer */}
                <footer className="py-4 bg-dark text-white text-center">
                    <Container>
                        © 2023 Antipattern Mirror. All rights reserved.
                    </Container>
                </footer>
            </Container>
        </BrowserRouter>
    );
}
