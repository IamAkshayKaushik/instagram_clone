import { useEffect, useRef } from "react";
import propTypes from "prop-types";

function VideoComponent({ stream, className = "", ...props }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return <video ref={videoRef} autoPlay playsInline className={` p-5 ${className}`} {...props} />;
}

VideoComponent.propTypes = {
  stream: propTypes.object,
  className: propTypes.string,
};

export default VideoComponent;
