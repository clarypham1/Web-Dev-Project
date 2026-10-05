import { useState } from "react";
import "./CartoonCloset.css";


function hangerPath(x) {
    return `M${x} 104 q0 -10 7 -10 q6 0 6 6 M${x} 104 L${x - 24} 122 L${x + 24} 122 Z`;
}

function teePath(x) {
    return `M${x - 18} 120 L${x - 36} 132 L${x - 28} 148 L${x - 20} 144 L${x - 20} 196 L${x + 20} 196 L${x + 20} 144 L${x + 28} 148 L${x + 36} 132 L${x + 18} 120 Q${x} 132 ${x - 18} 120 Z`;
}

function dressPath(x) {
    return `M${x - 14} 120 L${x - 18} 150 L${x - 34} 214 Q${x} 224 ${x + 34} 214 L${x + 18} 150 L${x + 14} 120 Q${x} 128 ${x - 14} 120 Z`;
}

function hoodiePath(x) {
    return `M${x - 18} 120 L${x - 34} 128 L${x - 40} 196 L${x - 30} 198 L${x - 24} 150 L${x - 24} 204 L${x + 24} 204 L${x + 24} 150 L${x + 30} 198 L${x + 40} 196 L${x + 34} 128 L${x + 18} 120 Q${x} 136 ${x - 18} 120 Z`;
}

function jacketPath(x) {
    return `M${x - 18} 120 L${x - 34} 130 L${x - 38} 200 L${x - 28} 202 L${x - 24} 156 L${x - 24} 210 L${x - 3} 210 L${x - 3} 136 Z M${x + 18} 120 L${x + 34} 130 L${x + 38} 200 L${x + 28} 202 L${x + 24} 156 L${x + 24} 210 L${x + 3} 210 L${x + 3} 136 Z`;
}

const CLOTHES = [
    { x: 104, path: teePath, fill: "#3b82f6", label: "t-shirt" },
    { x: 164, path: dressPath, fill: "#ff66cf", label: "dress" },
    { x: 230, path: hoodiePath, fill: "#22c55e", label: "hoodie" },
    { x: 298, path: jacketPath, fill: "#ffd43b", label: "jacket" },
];

function CartoonCloset() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen(!isOpen);
        }
    };

    let closetClass = "cartoon-closet";
    if (isOpen) {
        closetClass = "cartoon-closet is-open";
    }

    let caption = "Psst... open me!";
    if (isOpen) {
        caption = "Ta-da! Your whole closet";
    }

    return (
        <div className="cartoon-closet-wrap">
            <div
                className={closetClass}
                role="button"
                tabIndex={0}
                aria-pressed={isOpen}
                aria-label="Cartoon closet, press to open the doors"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
            >
                <svg viewBox="0 0 400 500" aria-hidden="true">
                    <ellipse cx="200" cy="476" rx="170" ry="12" fill="#bebcbb" opacity="0.45" />

                    <rect x="72" y="440" width="22" height="30" rx="6" className="ink-fill" />
                    <rect x="306" y="440" width="22" height="30" rx="6" className="ink-fill" />

                    <rect x="40" y="56" width="320" height="392" rx="22" fill="#f9c89b" className="ink-line" />

                    <rect x="68" y="26" width="264" height="40" rx="16" fill="#ff6f1e" className="ink-line" />
                    <g className="closet-label">
                        <rect x="146" y="32" width="108" height="28" rx="8" fill="#ffffff" className="ink-thin" />
                        <text x="200" y="52" textAnchor="middle">closis</text>
                    </g>

                    <rect x="58" y="76" width="284" height="352" rx="12" fill="#fff5ea" className="ink-line" />

                    <path d="M70 104 H330" className="ink-line rail" />

                    {CLOTHES.map((cloth, index) => (
                        <g
                            key={cloth.label}
                            className="closet-cloth"
                            style={{
                                transformOrigin: `${cloth.x}px 104px`,
                                animationDelay: `${index * 0.12}s`,
                            }}
                        >
                            <path d={hangerPath(cloth.x)} fill="none" className="ink-thin" />
                            <path d={cloth.path(cloth.x)} fill={cloth.fill} className="ink-line" />
                        </g>
                    ))}

                    <path d="M58 300 H342" className="ink-line" />

                    <rect x="74" y="270" width="70" height="14" rx="5" fill="#ff66cf" className="ink-thin" />
                    <rect x="78" y="284" width="64" height="14" rx="5" fill="#3b82f6" className="ink-thin" />

                    <rect x="264" y="252" width="62" height="46" rx="8" fill="#f7efe9" className="ink-line" />
                    <path d="M295 284 c-12 -8 -12 -18 -4 -18 c3 0 4 2 4 4 c0 -2 1 -4 4 -4 c8 0 8 10 -4 18 z" fill="#ff6f1e" className="ink-thin" />

                    <path d="M80 410 q0 -22 16 -22 l6 10 h22 q14 0 14 12 z" fill="#ff6f1e" className="ink-line" />
                    <path d="M150 410 q0 -22 16 -22 l6 10 h22 q14 0 14 12 z" fill="#ff6f1e" className="ink-line" />
                    <path d="M248 410 v-34 q0 -6 6 -6 h10 q6 0 6 6 v18 l20 6 q8 2 8 10 z" fill="#2b1a07" className="ink-line" />

                    <g className="closet-door closet-door-left">
                        <rect x="40" y="56" width="160" height="392" rx="22" fill="#ffb380" className="ink-line" />
                        <rect x="58" y="80" width="124" height="344" rx="12" fill="none" className="ink-thin" />
                        <circle cx="184" cy="260" r="7" className="ink-fill" />
                        <ellipse className="closet-eye" cx="140" cy="190" rx="9" ry="13" />
                        <ellipse cx="116" cy="222" rx="14" ry="7" fill="#ff66cf" opacity="0.55" />
                        <path d="M160 226 q20 22 40 0" fill="none" className="ink-line" />
                    </g>

                    <g className="closet-door closet-door-right">
                        <rect x="200" y="56" width="160" height="392" rx="22" fill="#ffb380" className="ink-line" />
                        <rect x="218" y="80" width="124" height="344" rx="12" fill="none" className="ink-thin" />
                        <circle cx="216" cy="260" r="7" className="ink-fill" />
                        <ellipse className="closet-eye" cx="260" cy="190" rx="9" ry="13" />
                        <ellipse cx="284" cy="222" rx="14" ry="7" fill="#ff66cf" opacity="0.55" />
                        <path d="M200 226 q20 22 40 0" fill="none" className="ink-line" />
                    </g>

                    <g className="closet-sparkles">
                        <path d="M20 120 l6 -18 l6 18 l18 6 l-18 6 l-6 18 l-6 -18 l-18 -6 z" fill="#22c55e" className="ink-thin" />
                        <path d="M372 60 l5 -14 l5 14 l14 5 l-14 5 l-5 14 l-5 -14 l-14 -5 z" fill="#3b82f6" className="ink-thin" />
                        <path d="M378 330 l4 -12 l4 12 l12 4 l-12 4 l-4 12 l-4 -12 l-12 -4 z" fill="#ff66cf" className="ink-thin" />
                    </g>
                </svg>
            </div>

            <p className="closet-caption" aria-live="polite">
                <svg className="closet-arrow" viewBox="0 0 90 60" aria-hidden="true">
                    <path d="M84 52 C60 56 26 46 18 14 M8 24 L18 10 L30 20" />
                </svg>
                {caption}
            </p>
        </div>
    );
}

export default CartoonCloset;
