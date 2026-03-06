import AsymGrid from "./AsymGrid";

interface ProjectSlideProps {
  project: any;
  showBack: boolean;
  onClientClick: () => void;
}

export default function ProjectSlide({
  project,
  showBack,
  onClientClick,
}: ProjectSlideProps) {
  const handleClick = () => {
    if (project.isClient) {
      onClientClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={project.isClient ? "cursor-pointer" : ""}
    >
      <AsymGrid
        image={project.image}
        showBack={showBack}
        project={project}
        onClientClick={onClientClick}
      />
    </div>
  );
}