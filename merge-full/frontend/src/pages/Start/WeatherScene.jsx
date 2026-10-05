import "./WeatherScene.css";

const INK = "#2b1a07";

const CLOUD_PATH = "M30 70 a22 22 0 0 1 4 -43.6 a30 30 0 0 1 56 -6 a24 24 0 0 1 36 22 a21 21 0 0 1 -6 27.6 z";

const CLOUD_SETS = {
    sunny: [
        { top: 14, size: 120, duration: 46, delay: -10 },
        { top: 52, size: 90, duration: 60, delay: -38 },
    ],
    cloudy: [
        { top: 4, size: 190, duration: 38, delay: -5 },
        { top: 30, size: 140, duration: 52, delay: -30 },
        { top: 58, size: 170, duration: 44, delay: -20 },
        { top: 16, size: 110, duration: 64, delay: -48 },
        { top: 70, size: 120, duration: 58, delay: -12 },
    ],
    rainy: [
        { top: -4, size: 200, duration: 40, delay: -8, dark: true },
        { top: 6, size: 160, duration: 54, delay: -30, dark: true },
        { top: -2, size: 180, duration: 48, delay: -18, dark: true },
    ],
    stormy: [
        { top: -6, size: 220, duration: 30, delay: -6, dark: true },
        { top: 4, size: 180, duration: 36, delay: -22, dark: true },
        { top: -4, size: 200, duration: 33, delay: -14, dark: true },
    ],
    snowy: [
        { top: -2, size: 180, duration: 56, delay: -10 },
        { top: 8, size: 140, duration: 70, delay: -40 },
    ],
    foggy: [
        { top: 10, size: 160, duration: 70, delay: -20 },
    ],
};

function makeList(count) {
    const list = [];
    for (let i = 0; i < count; i++) {
        list.push(i);
    }
    return list;
}

function Cloud({ cloud }) {
    let className = "ws-cloud";
    if (cloud.dark) {
        className = "ws-cloud ws-cloud-dark";
    }
    return (
        <svg
            className={className}
            viewBox="0 0 150 80"
            style={{
                top: `${cloud.top}%`,
                width: `${cloud.size}px`,
                animationDuration: `${cloud.duration}s`,
                animationDelay: `${cloud.delay}s`,
            }}
        >
            <path d={CLOUD_PATH} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        </svg>
    );
}

function Sun() {
    return (
        <svg className="ws-sun" viewBox="0 0 200 200">
            <g className="ws-sun-rays" stroke={INK} strokeWidth="6" strokeLinecap="round">
                <path d="M100 8 v26 M100 166 v26 M8 100 h26 M166 100 h26 M35 35 l18 18 M147 147 l18 18 M165 35 l-18 18 M53 147 l-18 18" />
            </g>
            <circle cx="100" cy="100" r="46" fill="#ffd43b" stroke={INK} strokeWidth="5" />
            <circle cx="84" cy="94" r="5" fill={INK} />
            <circle cx="116" cy="94" r="5" fill={INK} />
            <ellipse cx="74" cy="110" rx="8" ry="4" fill="#ff66cf" opacity="0.6" />
            <ellipse cx="126" cy="110" rx="8" ry="4" fill="#ff66cf" opacity="0.6" />
            <path d="M88 110 q12 12 24 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        </svg>
    );
}

function Rain({ count }) {
    return (
        <>
            {makeList(count).map((i) => (
                <span
                    key={i}
                    className="ws-drop"
                    style={{
                        left: `${(i * 37) % 100}%`,
                        animationDelay: `${((i * 13) % 20) / 10 - 2}s`,
                        animationDuration: `${0.7 + ((i * 7) % 5) / 10}s`,
                    }}
                ></span>
            ))}
        </>
    );
}

function Snow() {
    return (
        <>
            {makeList(36).map((i) => (
                <span
                    key={i}
                    className="ws-flake"
                    style={{
                        left: `${(i * 29) % 100}%`,
                        width: `${8 + (i % 4) * 3}px`,
                        height: `${8 + (i % 4) * 3}px`,
                        animationDelay: `${-((i * 11) % 80) / 10}s`,
                        animationDuration: `${5 + (i % 5)}s`,
                    }}
                ></span>
            ))}
        </>
    );
}

function Lightning() {
    return (
        <>
            <span className="ws-flash"></span>
            <svg className="ws-bolt" viewBox="0 0 60 110">
                <path d="M34 2 L8 60 h18 l-8 48 l36 -66 h-20 l14 -40 z" fill="#ffd43b" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
            </svg>
            <svg className="ws-bolt ws-bolt-2" viewBox="0 0 60 110">
                <path d="M34 2 L8 60 h18 l-8 48 l36 -66 h-20 l14 -40 z" fill="#ffd43b" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
            </svg>
        </>
    );
}

function Fog() {
    return (
        <>
            {makeList(5).map((i) => (
                <span
                    key={i}
                    className="ws-fog"
                    style={{
                        top: `${18 + i * 16}%`,
                        animationDuration: `${14 + i * 4}s`,
                        animationDelay: `${-i * 3}s`,
                    }}
                ></span>
            ))}
        </>
    );
}

function WeatherScene({ condition }) {
    let clouds = CLOUD_SETS[condition];
    if (!clouds) {
        clouds = [];
    }

    return (
        <div className={`weather-scene ws-${condition || "none"}`} aria-hidden="true">
            {condition === "sunny" && <Sun />}
            {condition === "stormy" && <Lightning />}
            {condition === "foggy" && <Fog />}
            {clouds.map((cloud, index) => (
                <Cloud key={index} cloud={cloud} />
            ))}
            {condition === "rainy" && <Rain count={40} />}
            {condition === "stormy" && <Rain count={55} />}
            {condition === "snowy" && <Snow />}
        </div>
    );
}

export default WeatherScene;
