import React from "react";
import HeaderLeftButton from "../Buttons/HeaderLeftButton";
import HeaderRightButton from "../Buttons/HeaderRightButton";
import HeaderShutdown from "../Buttons/HeaderShutdown";
import HeaderDisconnect from "../Buttons/HeaderDisconnect";
// import CompanyName from "../Company/CompanyName";

interface Entity {
  id: string;
  headerPosition: "left" | "right";
  imgSrc?: string;
  iconSrc?: string;
  title: string | Record<string, string>;
  subtitle?: string | Record<string, string>;
}

interface HeaderProps {
  entities: Entity[];
  onToggleHeader: () => void;
  onToggleWindow: (windowId: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  entities,
  onToggleHeader,
  onToggleWindow,
}) => {
  const toggleWindow = (buttonName: string) => {
    onToggleHeader();
    onToggleWindow(buttonName);
  };

  const shutdown = () => {
    // TODO: Implement shutdown functionality
    console.log("Shutting down...");
  };

  const getLocalizedTitle = (entity: Entity) => {
    if (typeof entity.title === "string") return entity.title;
    return entity.title["en"] || Object.values(entity.title)[0] || "";
  };

  const getLocalizedSubtitle = (entity: Entity) => {
    if (!entity.subtitle) return "";
    if (typeof entity.subtitle === "string") return entity.subtitle;
    return entity.subtitle["en"] || Object.values(entity.subtitle)[0] || "";
  };

  return (
    <header className="header-component select-none">
      <div className="absolute left-0 header-radius overflow-hidden bottom-0 mb-8 modal-size z-50 bg-color-blue-window">
        <div className="w-full h-full relative overflow-hidden">
          <div className="h-16 flex items-center px-2 header-top-background">
            {/* <CompanyName className="w-11 h-11 stroke-white-1 header-profile-shadow" /> */}
            <h2 className="text-lg ml-2 text-white text-shadow-header font-bold">
              Age of AI
            </h2>
          </div>
          <section className="relative w-full h-full px-0.5">
            <hr className="absolute top-0 left-0 right-0 bg-orange-hr block" />
            <div className="w-full h-full flex">
              <div className="w-7/12 h-full bg-white px-1 py-1">
                {entities
                  .filter((entity) => entity.headerPosition === "left")
                  .map((entity) => (
                    <div key={entity.id} className="flex flex-col gap-3 py-2">
                      <HeaderLeftButton
                        buttonName={entity.id}
                        onToggleButton={() => toggleWindow(entity.id)}
                        className="w-full text-left"
                        children={{
                          img: entity.imgSrc && (
                            <img
                              src={entity.imgSrc}
                              alt={`${entity.title} icon`}
                            />
                          ),
                          title: (
                            <span className="font-verdana text-[0.7rem] font-semibold block">
                              {getLocalizedTitle(entity)}
                            </span>
                          ),
                          subtitle: entity.subtitle ? (
                            <span className="font-tahoma text-[11px] font-[400] text-gray-500 block">
                              {getLocalizedSubtitle(entity)}
                            </span>
                          ) : null,
                        }}
                      />
                    </div>
                  ))}
              </div>
              <div className="w-1/2 h-full bg-color-blue-header-left left-blue-header-1 px-1">
                <div className="py-2">
                  {entities
                    .filter((entity) => entity.headerPosition === "right")
                    .map((entity) => (
                      <div key={entity.id}>
                        <HeaderRightButton
                          buttonName={entity.id}
                          buttonContent={{
                            img: entity.iconSrc ? (
                              <img
                                src={entity.iconSrc}
                                alt={
                                  typeof entity.title === "string"
                                    ? entity.title
                                    : entity.title["en"] ||
                                      Object.values(entity.title)[0] ||
                                      ""
                                }
                              />
                            ) : null,
                            text: getLocalizedTitle(entity),
                          }}
                          onToggleButton={toggleWindow}
                          className="w-full cursor-pointer"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
          <div className="absolute bottom-0 h-12 w-full">
            <div className="header-bot-background h-full flex justify-end items-center">
              <div className="flex h-5/6 gap-3 mr-2">
                <HeaderDisconnect
                  onClick={onToggleHeader}
                  className="cursor-pointer"
                />
                <HeaderShutdown
                  onClick={shutdown}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
