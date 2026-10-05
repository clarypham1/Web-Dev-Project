
import { useState } from "react";
import "./How.css";
import HowScene from "./HowScenes.jsx";

const STEPS = [
    {
        title: "Create an account",
        text: "Sign up for a Closis account using your email address and log in to start using your digital wardrobe.",
    },
    {
        title: "Add categories and your clothes",
        text: "Create categories such as hoodies, shirts, pants, etc. Upload your clothes and accessories to your digital wardrobe. You can add information such as category, color, brand, and details.",
    },
    {
        title: "Choose your destination",
        text: "Tell Closis where you are going. You can choose places such as school, work, the gym, or a cafe.",
    },
    {
        title: "Add your preferences",
        text: "Add keywords such as your preferred color, style, or material.",
    },
    {
        title: "Discover outfits",
        text: "Closis uses your wardrobe, preferences, destination and weather information to help suggest outfits.",
    },
    {
        title: "Save your favourites",
        text: "Save outfits you like and check your outfit history later.",
    },
];

function How() {
    const [activeStep, setActiveStep] = useState(0);
    const [checkedSteps, setCheckedSteps] = useState([0]);

    const showStep = (index) => {
        setActiveStep(index);
        if (!checkedSteps.includes(index)) {
            setCheckedSteps([...checkedSteps, index]);
        }
    };

    const doneCount = checkedSteps.length;

    let progressText = `${doneCount} of ${STEPS.length} checked`;
    if (doneCount === STEPS.length) {
        progressText = "All done! You're ready ✓";
    }

    return (
        <main className="how">

            <section className="how-introduction">
                <h1>How Closis works</h1>

                <p>
                    Closis helps you generate outfits from your own digital wardrobe based on where you are going, your preferences, and the weather.
                </p>

                <p className="how-hint">Hover over (or tap) each step to see it in action</p>
            </section>

            <section className="how-board">

                <div className="how-clipboard">
                    <div className="how-clip" aria-hidden="true"></div>

                    <div className="how-paper">
                        <div className="how-paper-header">
                            <h2>My Closis to-do list</h2>
                            <span className="how-progress">{progressText}</span>
                        </div>

                        <ol className="how-checklist">
                            {STEPS.map((step, index) => {
                                const isChecked = checkedSteps.includes(index);
                                const isActive = activeStep === index;

                                let className = "how-item";
                                if (isChecked) {
                                    className = `${className} is-checked`;
                                }
                                if (isActive) {
                                    className = `${className} is-active`;
                                }

                                return (
                                    <li key={step.title} className={className}>
                                        <button
                                            type="button"
                                            className="how-item-button"
                                            onMouseEnter={() => showStep(index)}
                                            onFocus={() => showStep(index)}
                                            onClick={() => showStep(index)}
                                            aria-pressed={isActive}
                                        >
                                            <span className="how-box" aria-hidden="true">
                                                <svg viewBox="0 0 32 32">
                                                    <path className="how-tick" d="M6 17 l7 7 l14 -18" />
                                                </svg>
                                            </span>

                                            <span className="how-item-text">
                                                <span className="how-item-title">
                                                    <span className="how-step-number">{index + 1}.</span> {step.title}
                                                </span>
                                                <span className="how-item-desc">{step.text}</span>
                                            </span>
                                        </button>

                                        {isActive && (
                                            <div className="how-inline-scene" aria-hidden="true">
                                                <HowScene key={index} step={index} />
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>

                <aside className="how-stage" aria-live="polite">
                    <div className="how-stage-frame">
                        <span className="how-stage-tag">Step {activeStep + 1}</span>
                        <HowScene key={activeStep} step={activeStep} />
                    </div>
                    <p className="how-stage-caption">{STEPS[activeStep].title}</p>
                </aside>

            </section>
        </main>
    );
}

export default How;
