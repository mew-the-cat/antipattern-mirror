import React, { useState } from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { AdvisorCard } from '../Components/AdvisorCard';

// Match Algo:
// Gucke die Paramter von User an
// gucke die Parameter von Advisor an
// Berechne prozentuale Übereinstimmung der Werte
// Gib Liste zurück, sortiert nach prozentualer Übereinstimmung (höchste zuerst)

// Anbindung an Google LM
// Einfach nur einen Endpoint wo man was hinschicken kann und was zurück bekommt

const advisors = [
    { id: 1, name: 'Berater 1', image: 'path_to_image1.jpg', description: 'Berater 1 Beschreibung' },
    { id: 2, name: 'Berater 2', image: 'path_to_image2.jpg', description: 'Berater 2 Beschreibung' },
    // Weitere Berater...
];

export function Match() {
    const [currentAdvisorIndex, setCurrentAdvisorIndex] = useState(0);
    const [offset, setOffset] = useState(0);

    const handleAccept = (advisor: { name: any; }) => {
        console.log(`Berater ${advisor.name} wurde akzeptiert.`);
        setCurrentAdvisorIndex(prevIndex => prevIndex + 1);
        setOffset(0); // Offset zurücksetzen
    };

    const handleReject = (advisor: { name: any; }) => {
        console.log(`Berater ${advisor.name} wurde abgelehnt.`);
        setCurrentAdvisorIndex(prevIndex => prevIndex + 1);
        setOffset(0); // Offset zurücksetzen
    };

    if (currentAdvisorIndex >= advisors.length) {
        return <div>Keine weiteren Berater verfügbar.</div>;
    }

    const currentAdvisor = advisors[currentAdvisorIndex];

    return (
        <div className="d-flex flex-column vh-100">
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
        </div>
    );
}