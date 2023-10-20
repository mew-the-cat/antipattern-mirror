import {Col, Container, Row} from "react-bootstrap";
import React, {useState} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Index} from "./Routes/Index";
import 'font-awesome/css/font-awesome.min.css';
//import "../src/Assets/css/theme.css";

export function App() {

    // @ts-ignore
    return (
        <BrowserRouter>
            <Container fluid>
                <Routes>

                    <Route path="/" element={
                        <Index />
                    } />

                </Routes>
            </Container>
        </BrowserRouter>
    );
}
