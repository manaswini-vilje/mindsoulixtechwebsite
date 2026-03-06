import { motion } from "framer-motion";

interface GridTileProps {
  image: string;
  showBack: boolean;
  position: string;
  isClient?: boolean;
  onClick?: () => void;
  title: string;
  description: string;
}

export default function GridTile({
  image,
  showBack,
  position,
 
  title,
  description,
}: GridTileProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${position}`}
      style={{ perspective: "1200px" }}
    
    >
      <motion.div
        animate={{ rotateY: showBack ? 180 : 0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT (Image Slice) */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>

        {/* BACK (Details) */}
        <div
          className="absolute inset-0 bg-black/90 border border-red-500/40 p-6 flex flex-col justify-center"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <h3 className="text-red-500 font-bold text-lg">{title}</h3>
          <p className="text-gray-300 text-sm mt-3">{description}</p>
        </div>
      </motion.div>
    </div>
  );
}