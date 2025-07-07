import React from "react";
import StartButton from "../Buttons/StartButton";
import FooterRight from "./FooterRight";
import PelletApp from "./PelletApp";

interface Entity {
  id: string;
  imgSrc: string;
  title: string | Record<string, string>;
  [key: string]: any; // Allow additional properties
}

interface FooterProps {
  entities: Entity[];
  onToggleHeader: () => void;
  onToggleWindow: (windowId: string) => void;
}

const Footer: React.FC<FooterProps> = ({
  entities,
  onToggleHeader,
  onToggleWindow,
}) => {
  return (
    <footer>
      <div className="absolute bottom-0 footer-gradient shadow-footer w-full z-40">
        <div className="h-8 flex items-center">
          <div className="flex items-center h-full overflow-hidden">
            <StartButton onClick={onToggleHeader} className="h-full px-2" />
            <div className="flex w-10/12 h-full ml-px sm:ml-2 sm:gap-0.5">
              {entities.map((entity) => (
                <PelletApp
                  key={entity.id}
                  entity={entity}
                  onToggleWindow={onToggleWindow}
                  className="shrink-0"
                />
              ))}
            </div>
          </div>
          <FooterRight />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
