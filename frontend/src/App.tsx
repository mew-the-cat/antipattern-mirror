import {Col, Container, Row} from "react-bootstrap";
import React, {useState} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Index} from "./Routes/Index";
//import "../src/Assets/css/theme.css";

export function App() {

    // @ts-ignore
    return (
        <BrowserRouter>
            <Container fluid className="mb-3 p-4">
                <Row style={{marginTop: "-20px"}}>
                    <Col xl={8} md={12} className="g-3">
                        Hello World
                    </Col>
                </Row>

                <Routes>

                    <Route path="/" element={
                        <Index />
                    } />

                </Routes>
            </Container>
        </BrowserRouter>
    );
}
