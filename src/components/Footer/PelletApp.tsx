import React from "react";

interface Entity {
  id: string;
  imgSrc: string;
  title: string | Record<string, string>;
  [key: string]: any; // Allow additional properties
}

interface PelletAppProps {
  entity: Entity;
  onToggleWindow: (windowId: string) => void;
  className?: string;
}

const PelletApp: React.FC<PelletAppProps> = ({
  entity,
  onToggleWindow,
  className = "",
}) => {
  const handleClick = () => {
    onToggleWindow(entity.id);
  };

  return (
    <div className="flex items-center h-full gap-1 py-1 mt-px sm:w-44 select-none cursor-pointer flex-shrink">
      <div className="flex items-center px-2 w-full h-full bg-pellet-blue hover:brightness-110 rounded-sm bg-pellet-blue-deactivated shadow-pellet-footer-deactivated">
        <div className="flex gap-1 mt-px">
          <button
            onClick={handleClick}
            className={`flex items-center h-full px-2 hover:bg-blue-500 hover:bg-opacity-30 ${className}`}
          >
            <img
              src={entity.imgSrc}
              alt={
                typeof entity.title === "string"
                  ? entity.title
                  : entity.title["en"] || Object.values(entity.title)[0] || ""
              }
              className="w-5 h-5 object-contain"
            />
            <p className="small-p text-white text-[0.7rem] truncate hidden sm:block ml-2">
              {typeof entity.title === "string"
                ? entity.title
                : entity.title["en"] || Object.values(entity.title)[0] || ""}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PelletApp;
