import { useEffect, useState } from "react";
import ProjectSlide from "./ProjectSlide";

interface ProjectCarouselProps {
  projects: any[];
  onClientClick: () => void;
  isActive: boolean;
}

export default function ProjectCarousel({
  projects,
  onClientClick,
  isActive,
}: ProjectCarouselProps) {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    let timeout1: ReturnType<typeof setTimeout>;
    let timeout2: ReturnType<typeof setTimeout>;
  
    const cycle = () => {
      timeout1 = setTimeout(() => {
        setShowBack(true);
      }, 2000);
  
      timeout2 = setTimeout(() => {
        setShowBack(false);
        setIndex((prev) => (prev + 1) % projects.length);
      }, 4000);
    };
  
    cycle();
    const interval = setInterval(cycle, 4000);
  
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearInterval(interval);
    };
  }, [projects.length, isActive]);

  return (
    <div className="text-center">
      <ProjectSlide
        project={projects[index]}
        showBack={showBack}
        onClientClick={onClientClick}
      />

      <h3 className="text-2xl font-bold text-white mt-6">
        {projects[index].title}
      </h3>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-4">
        {projects.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-red-500 shadow-[0_0_12px_rgba(255,0,0,0.9)] scale-125"
                : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
