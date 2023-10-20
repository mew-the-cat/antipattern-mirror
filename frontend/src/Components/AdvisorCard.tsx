import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useSwipeable } from 'react-swipeable';
import "../Assets/css/advisorcard.css";

interface AdvisorCardProps {
    advisor: {
        name: string;
        description: string;
        // ... andere Eigenschaften des advisors
    };
    onAccept: (advisor: any) => void;
    onReject: (advisor: any) => void;
    style: any;
    offset?: number;
    setOffset?: ((value: React.SetStateAction<number>) => void) | undefined;
}

export function AdvisorCard({
                                advisor,
                                onAccept,
                                onReject,
                                style,
                                offset = 0,
                                setOffset = undefined,
                            }: AdvisorCardProps) {
    const swipeable = typeof setOffset === 'function';
    const [swipedOut, setSwipedOut] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const { x } = useSpring({
        x: swipedOut ? (offset > 0 ? window.innerWidth : -window.innerWidth) : offset,
        config: { tension: 500, friction: 30 },
        onRest: () => {
            if (swipedOut) {
                offset > 0 ? onAccept(advisor) : onReject(advisor);
            }
        }
    });

    const handleDrag = (event: { deltaX: React.SetStateAction<number>; }) => {
        setIsDragging(true);
        if (setOffset) {
            setOffset(event.deltaX);
        }
    };

    const handleEndDrag = () => {
        setIsDragging(false);
        if (Math.abs(offset) > 150) {
            setSwipedOut(true);
        } else {
            if (setOffset) {
                setOffset(0);
            }
        }
    };

    const swipeHandlers = useSwipeable({
        onSwiping: swipeable ? handleDrag : () => {},
        onSwiped: swipeable ? handleEndDrag : () => {},
        trackMouse: true
    });

    const toggleFlip = () => {
        if (!isDragging) {
            setIsFlipped(!isFlipped);
        }
    };

    const backgroundColor = offset > 0 ? `rgba(0, 255, 0, ${Math.min(Math.abs(offset) / 300, 0.7)})`
        : offset < 0 ? `rgba(255, 0, 0, ${Math.min(Math.abs(offset) / 300, 0.7)})`
            : 'transparent';

    return (
        <animated.div
            {...(swipeable ? swipeHandlers : {})}
            style={{
                transform: x.to((x: number) => `translateX(${x}px) rotateY(${isFlipped ? 180 : 0}deg) rotate(${x > 0 ? Math.min(x / 10, 30) : Math.max(x / 10, -30)}deg)`),
                position: 'relative',
                zIndex: 1,
                ...style,
            }}
            onClick={toggleFlip}
        >
            <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                <img src={"https://thispersondoesnotexist.com/"} alt={advisor.name} className="card-img-top" style={{ zIndex: 0, maxHeight: "400px" }} />

                {/* Farbliches Overlay */}
                <div className="overlay" style={{ background: backgroundColor, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1 }}></div>

                <div className="card-body">
                    <h5 className="card-title">{advisor.name}</h5>
                    <p className="card-text">{advisor.description}</p>
                </div>

                <div className={`card-back ${isFlipped ? 'visible' : ''}`}>

                    {/* Farbliches Overlay */}
                    <div className="overlay" style={{ background: backgroundColor, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1, maxHeight: "400px"  }}></div>

                    <div className="card-body" style={{transform: "rotateY(180deg)"}}>
                        <h5 className="card-title">{advisor.name}</h5>
                        <p className="card-text">{advisor.description}</p>
                    </div>
                </div>
            </div>
        </animated.div>
    );
}
