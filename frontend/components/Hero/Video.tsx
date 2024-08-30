import React from "react";

const Video = () => {
  return (
    <video
      loop
      autoPlay
      muted
      src={"./videos/amber-fort.mp4"}
      className="object-cover w-full h-[60vh] lg:h-[80vh]"
    />
  );
};

export default Video;
