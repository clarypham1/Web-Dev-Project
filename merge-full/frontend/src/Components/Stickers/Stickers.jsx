import { useRef, useState } from "react";
import "./Stickers.css";

const INK = "#2b1a07";

function StickerArt({ kind }) {
    if (kind === "bolt") {
        return (
            <svg viewBox="0 0 64 64">
                <path d="M36 4 10 36h18l-6 24 30-36H34z" fill="#3b82f6" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
        );
    }
    if (kind === "heart") {
        return (
            <svg viewBox="0 0 64 64">
                <path d="M32 56S6 40 6 22a13 13 0 0 1 26-4 13 13 0 0 1 26 4c0 18-26 34-26 34z" fill="#ff66cf" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
                <circle cx="24" cy="27" r="3" fill={INK} />
                <circle cx="40" cy="27" r="3" fill={INK} />
                <path d="M27 35q5 4 10 0" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        );
    }
    if (kind === "sparkle") {
        return (
            <svg viewBox="0 0 64 64">
                <path d="M32 4c3 16 8 21 24 24-16 3-21 8-24 28-3-20-8-25-24-28 16-3 21-8 24-24z" fill="#22c55e" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
        );
    }
    if (kind === "ghost") {
        return (
            <svg viewBox="0 0 64 64">
                <path d="M14 58V28a18 18 0 0 1 36 0v30l-6-5-6 5-6-5-6 5-6-5z" fill="#fdfbf9" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
                <circle cx="26" cy="28" r="3" fill={INK} />
                <circle cx="38" cy="28" r="3" fill={INK} />
            </svg>
        );
    }
    if (kind === "tee") {
        return (
            <svg viewBox="0 0 64 64">
                <path d="M22 8 6 18l7 12 6-3v29h26V27l6 3 7-12L42 8q-10 8-20 0z" fill="#ff6f1e" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
        );
    }
    if (kind === "sun") {
        return (
            <svg viewBox="0 0 64 64">
                <g stroke={INK} strokeWidth="2.5" strokeLinecap="round">
                    <path d="M32 3v9M32 52v9M3 32h9M52 32h9M11 11l6 6M47 47l6 6M53 11l-6 6M17 47l-6 6" />
                    <circle cx="32" cy="32" r="13" fill="#ffd43b" />
                </g>
            </svg>
        );
    }
    return (
        <svg viewBox="0 0 64 64">
            <path d="M32 14c0-5 7-5 7 0 0 3-3 4-5 7M32 22 6 46c-1 1 0 3 2 3h48c2 0 3-2 2-3L32 22z" fill="#3b82f6" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
    );
}

function Sticker({ sticker }) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef(null);

    const handlePointerDown = (event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        dragStart.current = {
            pointerX: event.clientX,
            pointerY: event.clientY,
            startX: offset.x,
            startY: offset.y,
        };
        setIsDragging(true);
    };

    const handlePointerMove = (event) => {
        if (!dragStart.current) {
            return;
        }
        setOffset({
            x: dragStart.current.startX + event.clientX - dragStart.current.pointerX,
            y: dragStart.current.startY + event.clientY - dragStart.current.pointerY,
        });
    };

    const handlePointerUp = () => {
        dragStart.current = null;
        setIsDragging(false);
    };

    let className = "sticker";
    if (isDragging) {
        className = "sticker is-dragging";
    }

    return (
        <div
            className={className}
            style={{
                top: sticker.top,
                left: sticker.left,
                width: `${sticker.size}px`,
                "--sticker-rotate": `${sticker.rotate}deg`,
                translate: `${offset.x}px ${offset.y}px`,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            title="Drag me!"
        >
            <StickerArt kind={sticker.kind} />
        </div>
    );
}

function Stickers({ stickers }) {
    return (
        <div className="sticker-layer" aria-hidden="true">
            {stickers.map((sticker, index) => (
                <Sticker key={`${sticker.kind}-${index}`} sticker={sticker} />
            ))}
        </div>
    );
}

export default Stickers;
