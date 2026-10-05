import { useId } from "react";


const INK = "#2b1a07";

function AccountScene() {
    return (
        <svg viewBox="0 0 240 200" className="scene scene-account">
            <rect x="30" y="40" width="180" height="120" rx="14" fill="#fff" stroke={INK} strokeWidth="3" />
            <rect x="30" y="40" width="180" height="32" rx="14" fill="#ff6f1e" stroke={INK} strokeWidth="3" />
            <text x="120" y="62" textAnchor="middle" className="scene-label-title">HELLO my name is</text>
            <circle cx="70" cy="110" r="20" fill="#a9d4ff" stroke={INK} strokeWidth="3" />
            <circle cx="70" cy="104" r="7" fill={INK} />
            <path d="M58 124 q12 -14 24 0" fill={INK} />
            <path className="scene-write" d="M104 104 q8 -10 14 0 t14 0 t14 0 t14 0 t14 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <path className="scene-write scene-write-2" d="M104 126 h50" fill="none" stroke="#bebcbb" strokeWidth="3" strokeLinecap="round" />
            <g className="scene-badge">
                <circle cx="196" cy="150" r="22" fill="#22c55e" stroke={INK} strokeWidth="3" />
                <path d="M185 150 l8 8 l15 -16" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    );
}

function ClothesScene() {
    return (
        <svg viewBox="0 0 240 200" className="scene scene-clothes">
            <path d="M20 46 H220" stroke={INK} strokeWidth="5" strokeLinecap="round" />
            <path d="M70 46 q0 -10 7 -10 q6 0 6 6 M70 46 L50 62 L90 62 Z" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M54 62 L36 74 L44 90 L52 86 L52 136 L88 136 L88 86 L96 90 L104 74 L86 62 Q70 72 54 62 Z" fill="#ffb3d9" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <g className="scene-drop">
                <path d="M160 46 q0 -10 7 -10 q6 0 6 6 M160 46 L140 62 L180 62 Z" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M144 62 L126 74 L134 90 L142 86 L142 136 L178 136 L178 86 L186 90 L194 74 L176 62 Q160 72 144 62 Z" fill="#3b82f6" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            </g>
            <g className="scene-plus">
                <circle cx="206" cy="160" r="18" fill="#ffe27a" stroke={INK} strokeWidth="3" />
                <path d="M206 151 v18 M197 160 h18" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
            </g>
        </svg>
    );
}

function PlaceScene() {
    return (
        <svg viewBox="0 0 240 200" className="scene scene-place">
            <path d="M20 150 L80 120 L140 150 L220 118 L220 182 L140 196 L80 170 L20 196 Z" fill="#b8efc4" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <path d="M80 120 V170 M140 150 V196" stroke={INK} strokeWidth="2" strokeDasharray="5 6" />
            <path className="scene-route" d="M40 176 Q90 130 120 158 T190 150" fill="none" stroke="#ff6f1e" strokeWidth="3" strokeDasharray="8 7" strokeLinecap="round" />
            <ellipse className="scene-pin-shadow" cx="190" cy="152" rx="14" ry="5" fill={INK} opacity="0.25" />
            <g className="scene-pin">
                <path d="M190 148 C170 120 166 108 166 98 a24 24 0 0 1 48 0 c0 10 -4 22 -24 50 z" fill="#ff66cf" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
                <circle cx="190" cy="98" r="9" fill="#fff" stroke={INK} strokeWidth="2.5" />
            </g>
            <g className="scene-tags">
                <rect x="24" y="30" width="62" height="28" rx="14" fill="#fff" stroke={INK} strokeWidth="2.5" />
                <text x="55" y="49" textAnchor="middle" className="scene-tag-text">school</text>
                <rect x="94" y="48" width="52" height="28" rx="14" fill="#ffe27a" stroke={INK} strokeWidth="2.5" />
                <text x="120" y="67" textAnchor="middle" className="scene-tag-text">gym</text>
            </g>
        </svg>
    );
}

function PreferencesScene() {
    return (
        <svg viewBox="0 0 240 200" className="scene scene-prefs">
            <g className="scene-pop scene-pop-1">
                <rect x="20" y="36" width="88" height="34" rx="17" fill="#fff" stroke={INK} strokeWidth="2.5" />
                <text x="64" y="58" textAnchor="middle" className="scene-tag-text">casual</text>
            </g>
            <g className="scene-pop scene-pop-2">
                <rect x="118" y="30" width="100" height="34" rx="17" fill="#ffb3d9" stroke={INK} strokeWidth="2.5" />
                <text x="168" y="52" textAnchor="middle" className="scene-tag-text">oversized</text>
            </g>
            <g className="scene-pop scene-pop-3">
                <rect x="46" y="86" width="84" height="34" rx="17" fill="#a9d4ff" stroke={INK} strokeWidth="2.5" />
                <text x="88" y="108" textAnchor="middle" className="scene-tag-text">cotton</text>
            </g>
            <g className="scene-pop scene-pop-4">
                <circle cx="70" cy="160" r="16" fill="#ff6f1e" stroke={INK} strokeWidth="2.5" />
                <circle cx="112" cy="160" r="16" fill="#22c55e" stroke={INK} strokeWidth="2.5" />
                <circle cx="154" cy="160" r="16" fill="#3b82f6" stroke={INK} strokeWidth="2.5" />
                <circle cx="196" cy="160" r="16" fill="#fff" stroke={INK} strokeWidth="2.5" />
            </g>
            <path className="scene-pencil" d="M168 108 l40 -40 l12 12 l-40 40 l-16 4 z" fill="#ffe27a" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
    );
}

function OutfitScene() {
    return (
        <svg viewBox="0 0 240 200" className="scene scene-outfit">
            <g className="scene-slide-top">
                <path d="M102 30 L80 42 L88 60 L96 56 L96 98 L144 98 L144 56 L152 60 L160 42 L138 30 Q120 42 102 30 Z" fill="#ff66cf" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            </g>
            <g className="scene-slide-bottom">
                <path d="M96 100 H144 L150 178 H126 L120 128 L114 178 H90 Z" fill="#3b82f6" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            </g>
            <g className="scene-burst">
                <path d="M44 60 l5 -15 l5 15 l15 5 l-15 5 l-5 15 l-5 -15 l-15 -5 z" fill="#22c55e" stroke={INK} strokeWidth="2" />
                <path d="M192 52 l4 -12 l4 12 l12 4 l-12 4 l-4 12 l-4 -12 l-12 -4 z" fill="#ffe27a" stroke={INK} strokeWidth="2" />
                <path d="M196 150 l4 -12 l4 12 l12 4 l-12 4 l-4 12 l-4 -12 l-12 -4 z" fill="#ff6f1e" stroke={INK} strokeWidth="2" />
                <path d="M40 150 l3 -9 l3 9 l9 3 l-9 3 l-3 9 l-3 -9 l-9 -3 z" fill="#3b82f6" stroke={INK} strokeWidth="2" />
            </g>
        </svg>
    );
}

function SaveScene() {
    const clipId = `heart-clip-${useId().replace(/:/g, "")}`;
    return (
        <svg viewBox="0 0 240 200" className="scene scene-save">
            <defs>
                <clipPath id={clipId}>
                    <path d="M120 170 S54 128 54 82 a33 33 0 0 1 66 -10 a33 33 0 0 1 66 10 c0 46 -66 88 -66 88 z" />
                </clipPath>
            </defs>
            <path d="M120 170 S54 128 54 82 a33 33 0 0 1 66 -10 a33 33 0 0 1 66 10 c0 46 -66 88 -66 88 z" fill="#fff" />
            <g clipPath={`url(#${clipId})`}>
                <rect className="scene-fill" x="40" y="40" width="160" height="140" fill="#ff66cf" />
            </g>
            <path d="M120 170 S54 128 54 82 a33 33 0 0 1 66 -10 a33 33 0 0 1 66 10 c0 46 -66 88 -66 88 z" fill="none" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
            <circle cx="102" cy="96" r="5" fill={INK} />
            <circle cx="138" cy="96" r="5" fill={INK} />
            <path d="M108 112 q12 10 24 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <path className="scene-float scene-float-1" d="M40 60 c-6 -4 -6 -10 -2 -10 c2 0 2 1 2 2 c0 -1 0 -2 2 -2 c4 0 4 6 -2 10 z" fill="#ff6f1e" stroke={INK} strokeWidth="1.5" />
            <path className="scene-float scene-float-2" d="M200 70 c-6 -4 -6 -10 -2 -10 c2 0 2 1 2 2 c0 -1 0 -2 2 -2 c4 0 4 6 -2 10 z" fill="#ff66cf" stroke={INK} strokeWidth="1.5" />
        </svg>
    );
}

const SCENES = [AccountScene, ClothesScene, PlaceScene, PreferencesScene, OutfitScene, SaveScene];

function HowScene({ step }) {
    const Scene = SCENES[step];
    if (!Scene) {
        return null;
    }
    return <Scene />;
}

export default HowScene;
