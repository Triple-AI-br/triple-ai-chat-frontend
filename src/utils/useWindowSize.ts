import { useState } from "react";

const UseWindowSize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  window.addEventListener("resize", function() {
    
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  return {
    width,
    height
  };

};

export {UseWindowSize};