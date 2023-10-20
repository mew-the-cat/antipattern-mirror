import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useSwipeable } from 'react-swipeable';

//@ts-ignore
export function AdvisorCard({ advisor, onAccept, onReject, style, offset, setOffset }) {
    const [swipedOut, setSwipedOut] = useState(false);

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
        setOffset(event.deltaX);
    };

    const handleEndDrag = () => {
        if (Math.abs(offset) > 150) {  // Sensibilität des Swipens.
            setSwipedOut(true);
        } else {
            setOffset(0);
        }
    };

    const swipeHandlers = useSwipeable({
        onSwiping: handleDrag,
        onSwiped: handleEndDrag,
        trackMouse: true
    });

    // Dynamische Hintergrundfarbe basierend auf der Richtung des Swipens
    const backgroundColor = offset > 0 ? `rgba(0, 255, 0, ${Math.min(Math.abs(offset) / 300, 0.7)})`
        : offset < 0 ? `rgba(255, 0, 0, ${Math.min(Math.abs(offset) / 300, 0.7)})`
            : 'transparent';

    return (
        <animated.div
            {...swipeHandlers}
            style={{
                transform: x.to((x: number) => `translateX(${x}px) rotate(${x > 0 ? Math.min(x / 10, 30) : Math.max(x / 10, -30)}deg)`),
                position: 'relative',
                zIndex: 1,
                ...style,  // Fügen Sie den style-Prop hinzu
            }}
        >
            <div className="card" style={{ background: backgroundColor }}>
                <img src={"https://thispersondoesnotexist.com/"} alt={advisor.name} className="card-img-top" style={{zIndex: -1, maxHeight: "350px"}} />
                <div className="card-body">
                    <h5 className="card-title">{advisor.name}</h5>
                    <p className="card-text">{advisor.description}</p>
                    {/* Add more details if needed */}
                </div>
            </div>
        </animated.div>
    );
}
