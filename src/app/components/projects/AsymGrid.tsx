import GridTile from "./GridTile";

interface AsymGridProps {
  image: string;
  showBack: boolean;
  project: any;
  onClientClick: () => void;
}

export default function AsymGrid({
  image,
  showBack,
  project,
  onClientClick,
}: AsymGridProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-4 h-[500px]">

      <GridTile
        image={image}
        showBack={showBack}
        position="col-span-2 row-span-2"
        title={project.title}
        description={project.description}
        isClient={project.isClient}
        onClick={onClientClick}
      />

      <GridTile
        image={image}
        showBack={showBack}
        position="col-span-1 row-span-1"
        title={project.title}
        description={project.description}
      />

      <GridTile
        image={image}
        showBack={showBack}
        position="col-span-1 row-span-2"
        title={project.title}
        description={project.description}
      />

      <GridTile
        image={image}
        showBack={showBack}
        position="col-span-1 row-span-1"
        title={project.title}
        description={project.description}
      />

      <GridTile
        image={image}
        showBack={showBack}
        position="col-span-1 row-span-2"
        title={project.title}
        description={project.description}
      />

      <GridTile
        image={image}
        showBack={showBack}
        position="col-span-1 row-span-1"
        title={project.title}
        description={project.description}
      />

      <GridTile
        image={image}
        showBack={showBack}
        position="col-span-1 row-span-1"
        title={project.title}
        description={project.description}
      />
    </div>
  );
}