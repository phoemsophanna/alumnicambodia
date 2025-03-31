import VideoData from "@/data/videoData";
import React from "react";

const Video = ({ setOpen }) => {
  const { title } = VideoData;

  return (
    <section className="help-them__top-video-box">
      <a
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        style={{ cursor: "pointer" }}
        className="video-img help-them__top-video-btn video-popup"
        title="Play Icon"
        id="videolink"
      >
        <span className="video-play">
          <i className="fa fa-play"></i>
        </span>
      </a>
      <p className="help-them__top-video-text">{title}</p>
    </section>
  );
};

export default Video;
