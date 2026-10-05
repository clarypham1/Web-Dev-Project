import "./AuthMascot.css";

function AuthMascot({ message }) {
    return (
        <div className="auth-side" aria-hidden="true">

            <p className="mascot-bubble">{message}</p>

            <svg className="auth-mascot" viewBox="0 0 260 300">
                <ellipse cx="130" cy="284" rx="96" ry="9" fill="#2b1a07" opacity="0.15" />

                <rect x="78" y="248" width="20" height="28" rx="6" className="m-ink-fill" />
                <rect x="162" y="248" width="20" height="28" rx="6" className="m-ink-fill" />

                <rect x="50" y="40" width="160" height="214" rx="24" fill="#ffb380" className="m-ink" />

                <rect x="64" y="20" width="132" height="32" rx="13" fill="#ff6f1e" className="m-ink" />
                <rect x="98" y="25" width="64" height="22" rx="7" fill="#ffffff" className="m-ink-thin" />
                <text x="130" y="41" textAnchor="middle" className="m-label">closis</text>

                <path d="M130 56 V240" className="m-ink-thin" />
                <circle cx="121" cy="186" r="5" className="m-ink-fill" />
                <circle cx="139" cy="186" r="5" className="m-ink-fill" />

                <ellipse className="m-eye" cx="102" cy="118" rx="8" ry="11" />
                <ellipse className="m-eye" cx="158" cy="118" rx="8" ry="11" />
                <ellipse cx="84" cy="142" rx="12" ry="6" fill="#ff66cf" opacity="0.6" />
                <ellipse cx="176" cy="142" rx="12" ry="6" fill="#ff66cf" opacity="0.6" />
                <path className="m-smile m-ink" d="M112 140 q18 18 36 0" fill="none" />
                <ellipse className="m-oh m-ink" cx="130" cy="148" rx="7" ry="9" fill="#2b1a07" />

                <g className="m-hand m-hand-left">
                    <circle cx="30" cy="182" r="15" fill="#ffb380" className="m-ink" />
                </g>
                <g className="m-hand m-hand-right">
                    <circle cx="232" cy="108" r="15" fill="#ffb380" className="m-ink" />
                </g>

                <path className="m-spark" d="M226 40 l4 -12 l4 12 l12 4 l-12 4 l-4 12 l-4 -12 l-12 -4 z" fill="#22c55e" />
                <path className="m-spark m-spark-2" d="M22 70 l3 -9 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 z" fill="#3b82f6" />
            </svg>
        </div>
    );
}

export default AuthMascot;
