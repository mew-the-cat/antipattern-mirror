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
    const [offset, setOffset] = useState(0);

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
            <Navbar bg="dark" variant="dark">
                <Container fluid className="justify-content-between">
                    <Navbar.Brand href="#">FinTwin</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="#home"><i className="fa fa-handshake-o fa-2x"></i></Nav.Link>
                        <Nav.Link href="#link1"><i className="fa fa-comment-o fa-2x"></i></Nav.Link>
                        <Nav.Link href="#link2"><i className="fa fa-user-o fa-2x"></i></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>


            {/* Hauptinhalt */}
            <Container fluid className="flex-grow-1 d-flex justify-content-center align-items-center">
                {/* Nächste Karte (falls verfügbar) */}
                {currentAdvisorIndex + 1 < advisors.length && (
                    <AdvisorCard
                        key={advisors[currentAdvisorIndex + 1].id}
                        advisor={advisors[currentAdvisorIndex + 1]}
                        onAccept={() => {}}
                        onReject={() => {}}
                        style={{
                            position: 'absolute',
                            zIndex: 0,
                            transform: 'scale(0.95)',
                            opacity: Math.abs(offset) / window.innerWidth, // Entfernen Sie diese Zeile, um den Opazitätseffekt zu verhindern
                        }}
                    />
                )}

                {/* Aktuelle Karte */}
                <AdvisorCard
                    key={currentAdvisor.id}
                    advisor={currentAdvisor}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    offset={offset}
                    setOffset={setOffset}
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                    }}
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