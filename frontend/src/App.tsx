import {Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import React, {useState} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Index} from "./Routes/Index";
import 'font-awesome/css/font-awesome.min.css';
import {Match} from "./Routes/Match";
import {useLocalStorage} from "./Hooks/useLocaleStorage";
import { Menu } from "./Components/Menu";

export function App() {
    const [authenticationToken, setAuthenticationToken] = useLocalStorage("authenticationToken", {
        expiresIn: 0
    });

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
                        <Index />
                    } />

                    <Route path="/match" element={
                        <Match />
                    } />

                </Routes>

                {/* Footer */}
                <footer className="py-4 bg-dark text-white text-center">
                    <Container>
                        © 2023 FinTwin. Alle Rechte vorbehalten.
                    </Container>
                </footer>
            </Container>
        </BrowserRouter>
    );
}
