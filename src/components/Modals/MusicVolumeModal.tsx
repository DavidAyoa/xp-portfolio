import React from "react";

interface MusicVolumeModalProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const MusicVolumeModal: React.FC<MusicVolumeModalProps> = ({
  volume,
  onVolumeChange,
}) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
  };

  return (
    <section className="absolute bottom-10 right-5 md:right-9 w-24 rounded-t-md overflow-hidden bg-window-blue-deactivated p-0.5">
      <div className="absolute top-0 left-0 h-7 w-full z-10 flex items-center px-1.5 bg-header-window-active">
        <img
          src="/img/icons/volume-icon-sm.webp"
          alt="Volume icon"
          className="w-4 h-4 mr-1"
        />
        <h4 className="text-header-window text-header-shadow truncate">
          <span style={{ verticalAlign: "inherit" }}>Control</span>
        </h4>
      </div>
      <div className="bg-light-yellow h-52 mt-3 pr-1">
        <div className="h-full w-full flex items-center px-2">
          <label
            className="text-black text-xs span-trebuchet-pixel pr-4"
            htmlFor="volume"
          >
            <span style={{ verticalAlign: "inherit" }}>Volume</span>
          </label>
          <input
            className="slider cursor-pointer"
            type="range"
            min="0"
            max="1"
            step="0.2"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </section>
  );
};

export default MusicVolumeModal;
