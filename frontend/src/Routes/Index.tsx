import React, { useState } from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { AdvisorCard } from '../Components/AdvisorCard';

const advisors = [
    { id: 1, name: 'Berater 1', image: 'path_to_image1.jpg', description: 'Berater 1 Beschreibung' },
    { id: 2, name: 'Berater 2', image: 'path_to_image2.jpg', description: 'Berater 2 Beschreibung' },
    // Weitere Berater...
];

export function Index() {
    const [currentAdvisorIndex, setCurrentAdvisorIndex] = useState(0);

    const handleAccept = (advisor: { name: any; }) => {
        console.log(`Berater ${advisor.name} wurde akzeptiert.`);
        setCurrentAdvisorIndex(prevIndex => prevIndex + 1);
    };

    const handleReject = (advisor: { name: any; }) => {
        console.log(`Berater ${advisor.name} wurde abgelehnt.`);
        setCurrentAdvisorIndex(prevIndex => prevIndex + 1);
    };

    if (currentAdvisorIndex >= advisors.length) {
        return <div>Keine weiteren Berater verfügbar.</div>;
    }

    const currentAdvisor = advisors[currentAdvisorIndex];

    return (
        <div className="d-flex flex-column vh-100">
            {/* Navigationsmenü */}
            <Navbar bg="dark" variant="dark" expand="lg" className="flex-row float-right">
                <Container >
                    <Navbar.Brand href="#"></Navbar.Brand>
                    <Nav className="m-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link1">Link 1</Nav.Link>
                        <Nav.Link href="#link2">Link 2</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* Hauptinhalt */}
            <Container fluid className="flex-grow-1 d-flex justify-content-center align-items-center">
                <AdvisorCard
                    key={currentAdvisor.id}
                    advisor={currentAdvisor}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            </Container>

            {/* Footer */}
            <footer className="py-4 bg-dark text-white text-center">
                <Container>
                    © 2023 FinTwin. Alle Rechte vorbehalten.
                </Container>
            </footer>
        </div>
    );
}