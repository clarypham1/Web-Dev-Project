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
