import React, {useEffect, useState} from 'react';
import { useSpring, animated } from 'react-spring';
import { useSwipeable } from 'react-swipeable';

interface AdvisorCardProps {
    advisor: {
        name: string;
        description: string;
        // ... andere Eigenschaften des advisors
    };
    onAccept: (advisor: any) => void;
    onReject: (advisor: any) => void;
    style: any;
    offset?: number; // Markieren Sie dies als optional mit dem '?' Zeichen
    setOffset?: (value: React.SetStateAction<number>) => void; // Markieren Sie dies als optional mit dem '?' Zeichen
}

//@ts-ignore
export function AdvisorCard({
                                advisor,
                                onAccept,
                                onReject,
                                style,
                                offset = 0,
                                setOffset = () => {},
                            }: AdvisorCardProps) {
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
        if (Math.abs(offset) > 150) {
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
                ...style,
            }}
        >
            <div className="card">
                <img src={"https://thispersondoesnotexist.com/"} alt={advisor.name} className="card-img-top" style={{zIndex: 0, maxHeight: "350px"}} />

                {/* Farbliches Overlay */}
                <div className="overlay" style={{ background: backgroundColor, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1 }}></div>

                <div className="card-body">
                    <h5 className="card-title">{advisor.name}</h5>
                    <p className="card-text">{advisor.description}</p>
                </div>
            </div>
        </animated.div>
    );
}