const fashionDoodles = [
    { kind: "hanger", left: 3, top: 1, color: "#91b2c4", size: 40, rotate: -12 },
    { kind: "skirt", left: 13, top: 5, color: "#a4bbc7", size: 43, rotate: 5 },
    { kind: "skirt", left: 29, top: 2, color: "#edc66e", size: 37, rotate: -4 },
    { kind: "hanger", left: 77, top: 2, color: "#edc66e", size: 42, rotate: 7 },
    { kind: "skirt", left: 89, top: 7, color: "#c9a1d7", size: 34, rotate: -5 },
    { kind: "skirt", left: 5, top: 27, color: "#e8a48f", size: 35, rotate: 8 },
    { kind: "hanger", left: 17, top: 28, color: "#d998ae", size: 36, rotate: -8 },
    { kind: "skirt", left: 78, top: 28, color: "#d99cb0", size: 44, rotate: -7 },
    { kind: "skirt", left: 91, top: 25, color: "#df9c85", size: 38, rotate: 8 },
    { kind: "hanger", left: 3, top: 54, color: "#9db9c9", size: 34, rotate: 6 },
    { kind: "skirt", left: 13, top: 56, color: "#c5a0d6", size: 38, rotate: -9 },
    { kind: "skirt", left: 80, top: 54, color: "#9fb99b", size: 35, rotate: 9 },
    { kind: "skirt", left: 92, top: 53, color: "#e09680", size: 40, rotate: -6 },
    { kind: "skirt", left: 4, top: 78, color: "#d894aa", size: 42, rotate: -7 },
    { kind: "skirt", left: 88, top: 78, color: "#b7c6a5", size: 44, rotate: 8 },
    { kind: "hanger", left: 4, top: 92, color: "#c3a0d5", size: 36, rotate: -8 },
    { kind: "skirt", left: 31, top: 92, color: "#edc66e", size: 38, rotate: 6 },
    { kind: "hanger", left: 65, top: 91, color: "#e59c83", size: 38, rotate: -7 },
    { kind: "skirt", left: 80, top: 91, color: "#a9bfcc", size: 42, rotate: 4 },
];

export function FashionDoodles() {
    return (
        <div className="signup-doodles" aria-hidden="true">
            {fashionDoodles.map((doodle, index) => (
                <svg
                    key={`${doodle.kind}-${index}`}
                    className={`signup-doodle signup-doodle--${doodle.kind}`}
                    viewBox="0 0 48 48"
                    style={{
                        left: `${doodle.left}%`,
                        top: `${doodle.top}%`,
                        color: doodle.color,
                        width: `${doodle.size * 1.2}px`,
                        transform: `rotate(${doodle.rotate}deg)`,
                    }}
                >
                    {doodle.kind === "hanger" ? (
                        <>
                            <path d="M24 10c0-3.4 5.3-3.4 5.3 0 0 2.4-2.2 3.1-3.2 5.1" />
                            <path d="M24 16 5 35.5c-.9 1-.2 2.5 1.2 2.5h35.6c1.4 0 2.1-1.5 1.2-2.5L24 16Z" />
                        </>
                    ) : (
                        <>
                            <path d="M16 16.5c4.7 2.1 11.3 2.1 16 0" />
                            <path d="M16 17c-1.4 7.3-5.2 12.3-11 19.2-.8 1-.2 2.3 1.1 2.3h35.8c1.3 0 1.9-1.3 1.1-2.3C37.2 29.3 33.4 24.3 32 17c-4.8 2.2-11.2 2.2-16 0Z" />
                        </>
                    )}
                </svg>
            ))}
        </div>
    );
}

export function FieldIcon({ kind }) {
    if (kind === "name") {
        return (
            <svg className="signup-field-icon" viewBox="0 0 28 28" aria-hidden="true">
                <circle cx="14" cy="7" r="5" />
                <path d="M3 25v-3.1c0-5 4.1-9 9.1-9h3.8c5 0 9.1 4 9.1 9V25H3Z" />
            </svg>
        );
    }

    if (kind === "email") {
        return (
            <svg className="signup-field-icon" viewBox="0 0 28 28" aria-hidden="true">
                <rect x="1.5" y="4" width="25" height="20" rx="4" />
                <path className="signup-field-icon__cutout" d="m3 7 11 8 11-8M3 21l7.5-6M25 21l-7.5-6" />
            </svg>
        );
    }

    return (
        <svg className="signup-field-icon" viewBox="0 0 28 28" aria-hidden="true">
            <path d="M7 12V8a7 7 0 0 1 14 0v4h1.3c1.5 0 2.7 1.2 2.7 2.7v9.6c0 1.5-1.2 2.7-2.7 2.7H5.7C4.2 27 3 25.8 3 24.3v-9.6C3 13.2 4.2 12 5.7 12H7Zm3 0h8V8a4 4 0 0 0-8 0v4Z" />
            <circle className="signup-field-icon__cutout" cx="14" cy="18" r="2" />
            <path className="signup-field-icon__cutout" d="M14 19v3" />
        </svg>
    );
}
