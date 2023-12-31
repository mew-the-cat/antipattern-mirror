import React, {useEffect, useState} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { AdvisorCard } from '../Components/AdvisorCard';
import {auth} from "../Interfaces/auth.interface";
import jwtDecode from "jwt-decode";

// Match Algo:
// Gucke die Paramter von User an
// gucke die Parameter von Advisor an
// Berechne prozentuale Übereinstimmung der Werte
// Gib Liste zurück, sortiert nach prozentualer Übereinstimmung (höchste zuerst)

// Anbindung an Google LM
// Einfach nur einen Endpoint wo man was hinschicken kann und was zurück bekommt

/*const advisors = [
    { id: 1, name: 'Berater 1', image: 'path_to_image1.jpg', description: 'Berater 1 Beschreibung' },
    { id: 2, name: 'Berater 2', image: 'path_to_image2.jpg', description: 'Berater 2 Beschreibung' },
    // Weitere Berater...
];*/

export function Match(props: auth) {
    const [currentAdvisorIndex, setCurrentAdvisorIndex] = useState(0);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [advisors, setAdvisors] = useState([]);


    useEffect(() => {
        //@ts-ignore
        const stuff = jwtDecode(props.authenticationToken.accessToken);




// Beim Start der Komponente
            //@ts-ignore
            fetch(process.env.REACT_APP_BACKEND + "/match/" + stuff.client_id, {
                method: "GET",
            })
                .then((value) => {
                    if (value.ok) {
                        return value.json();
                    }
                    throw value;
                })
                .then((value) => {
                    console.log(value);
                    setAdvisors(value);
                    setLoading(false); // Setze den Ladezustand auf false, sobald die Daten geladen sind.
                })
                .catch((reason) => {
                    setLoading(false); // Auch bei einem Fehler setze den Ladezustand auf false.
                    // Hier evtl. eine Fehlermeldung setzen oder handhaben
                });

    }, []);

    const handleAccept = (advisor: { name: any; id: any }) => {
        console.log(`Berater ${advisor.name} wurde akzeptiert.`);
        setCurrentAdvisorIndex(prevIndex => prevIndex + 1);
        setOffset(0); // Offset zurücksetzen
        //@ts-ignore
        const stuff = jwtDecode(props.authenticationToken.accessToken);
        //@ts-ignore
        fetch(process.env.REACT_APP_BACKEND + "/chat/conversation/" + stuff.client_id + "/" + advisor.id, {
            method: "POST",
        }).then((value) => {
            if (value.ok) {
                return value.json();
            }
            throw value;
        })
        .then((value) => {
            console.log(value);
        })
        .catch((reason) => {

        });

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
    if (loading) {
        return <div>Lade Daten...</div>; // Oder einen anderen Lade-Indikator Ihrer Wahl
    }
    return (
        <div className="d-flex flex-column vh-100">
            {/* Hauptinhalt */}
            <Container fluid className="flex-grow-1 d-flex justify-content-center align-items-center">
                {/* Nächste Karte (falls verfügbar) */}
                {currentAdvisorIndex + 1 < advisors.length && (
                    <AdvisorCard
                        //@ts-ignore
                        key={advisors[currentAdvisorIndex + 1].advisorData.Advisors[0].id}
                        //@ts-ignore
                        advisor={advisors[currentAdvisorIndex + 1].advisorData}
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
                    //@ts-ignore
                    key={currentAdvisor.advisorData.Advisors[0].id}
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