import React, { useEffect, useRef, useState } from "react";

const flowPoints = [
  "Strategic Alignment",
  "Precision Engineering",
  "Secure Deployment",
  "Continuous Optimization",
];

const ComplimentarySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [headingText, setHeadingText] = useState("");
  const [descText, setDescText] = useState("");
  const [flowStart, setFlowStart] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const fullHeading = "1 Year Enterprise-Grade Hosting";
  const fullDesc =
    "We operate as a long-term technical partner. Every engagement follows a structured system designed for clarity, stability, and measurable growth.";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !hasStarted) {
      setHasStarted(true);
    }
  }, [isVisible, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let i = 0;
    let descInterval: ReturnType<typeof setInterval> | null = null;

    const headingInterval = setInterval(() => {
      setHeadingText(fullHeading.slice(0, i + 1));
      i++;
      if (i === fullHeading.length) clearInterval(headingInterval);
    }, 40);

    const descTimeout = setTimeout(() => {
      let j = 0;
      descInterval = setInterval(() => {
        setDescText(fullDesc.slice(0, j + 1));
        j++;
        if (j === fullDesc.length) {
          if (descInterval) clearInterval(descInterval);
          setFlowStart(true);
        }
      }, 20);
    }, 1500);

    return () => {
      clearInterval(headingInterval);
      clearTimeout(descTimeout);
      if (descInterval) clearInterval(descInterval);
    };
  }, [hasStarted, fullHeading, fullDesc]);

  useEffect(() => {
    if (!flowStart) return;

    let step = 0;

    const interval = setInterval(() => {
      setActiveStep(step);
      step++;

      if (step >= flowPoints.length) clearInterval(interval);
    }, 900);

    return () => clearInterval(interval);
  }, [flowStart]);

  return (
    <section
      ref={sectionRef}
      className={`partnership-section ${hasStarted ? "active" : ""} relative bg-[#fff7f7] text-black py-36 px-6 md:px-16 overflow-hidden`}
    >

      {/* RED ENERGY SMOKE */}
      <div className={`absolute inset-0 energy-smoke ${isVisible ? "active" : ""}`} />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-8">

          <p className="micro-label text-red-600 font-medium">
            Structured Partnership Model
          </p>

          <h2 className="main-heading">
            {headingText}
          </h2>

          <h3 className="sub-heading">
            1 Year <span className={`highlight-free ${isVisible ? "active" : ""}`}>FREE</span> Hosting Included
          </h3>

          <p className="description text-black/60">
            {descText}
          </p>

        </div>

        {/* RIGHT FLOW */}
        <div className="relative flex justify-center">

          <div className="flow-container">

            <div className="flow-line" />

            {flowPoints.map((point, i) => (
              <div
                key={i}
                className={`flow-item ${i <= activeStep ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.2}s` }}
              >
                <div className="flow-node" />
                <span>{point}</span>
              </div>
            ))}

          </div>

        </div>

      </div>

      <style>{`

        /* ===== ENERGY SMOKE ===== */

        .energy-smoke {
          background:
            radial-gradient(circle at 70% 50%, rgba(225,6,0,0.12) 0%, transparent 60%),
            radial-gradient(circle at 60% 40%, rgba(225,6,0,0.08) 0%, transparent 70%);
          opacity: 0.6;
        }

        .energy-smoke.active{
          animation: smokeMove 10s ease-in-out infinite alternate;
        }

        @keyframes smokeMove {
          from { transform: translateY(-10px) scale(1); }
          to { transform: translateY(10px) scale(1.05); }
        }

        /* ===== TEXT ANIMATION ===== */

        .micro-label,
        .main-heading,
        .sub-heading,
        .description {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.9s ease;
        }

        .partnership-section.active .micro-label {
          opacity: 1;
          transform: translateY(0);
        }

        .partnership-section.active .main-heading {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }

        .partnership-section.active .sub-heading {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.4s;
        }

        .partnership-section.active .description {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.6s;
        }

        .main-heading {
          font-size: 2.8rem;
          font-weight: 700;
        }

        .sub-heading {
          font-size: 1.5rem;
          color: #E10600;
        }

        /* ===== FREE WORD PULSE ===== */

        .highlight-free {
          position: relative;
          color: #E10600;
          text-shadow: 0 0 12px rgba(225,6,0,0.6);
        }

        .highlight-free.active{
          animation: freePulse 2s ease-in-out infinite;
        }

        @keyframes freePulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.18); }
        }

        /* ===== FLOW SYSTEM ===== */

        .flow-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .flow-line {
          position: absolute;
          left: 8px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(0,0,0,0.2);
        }

        .flow-item {
          display: flex;
          align-items: center;
          gap: 20px;
          opacity: 0;
          transform: translateX(20px);
          transition: 0.8s ease;
        }

        .flow-item.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .flow-node {
          width: 14px;
          height: 14px;
          background: #E10600;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(225,6,0,0.5);
        }

        .flow-item span {
          font-size: 1.1rem;
          color: #333;
        }

      `}</style>
    </section>
  );
};

export default ComplimentarySection;
